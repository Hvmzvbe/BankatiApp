import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DebitCompte = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [debitInfo, setDebitInfo] = useState(null);
    const [errors, setErrors] = useState({});
    const [compteInfo, setCompteInfo] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const [formData, setFormData] = useState({
        rib: '',
        montant: '',
        motif: '',
        typeOperation: 'DEBIT'
    });

    // Rechercher le compte
    const handleSearchCompte = async () => {
        if (!formData.rib) {
            setErrors({ rib: 'Veuillez saisir un RIB' });
            return;
        }

        setSearchLoading(true);
        setErrors({});

        try {
            const response = await api.get(`/comptes/rib/${formData.rib}`);
            setCompteInfo(response.data);
        } catch (err) {
            setErrors({ rib: 'Compte non trouvé avec ce RIB' });
            setCompteInfo(null);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (name === 'rib') {
            setCompteInfo(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validations côté client
        if (!compteInfo) {
            setErrors({ rib: 'Veuillez d\'abord rechercher le compte' });
            return;
        }

        if (parseFloat(formData.montant) <= 0) {
            setErrors({ montant: 'Le montant doit être supérieur à 0' });
            return;
        }

        if (parseFloat(formData.montant) > compteInfo.solde) {
            setErrors({ montant: `Solde insuffisant. Solde disponible: ${compteInfo.solde.toFixed(2)} DH` });
            return;
        }

        if (!formData.motif.trim()) {
            setErrors({ motif: 'Le motif est obligatoire' });
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/debit-compte', {
                rib: formData.rib,
                montant: parseFloat(formData.montant),
                motif: formData.motif,
                typeOperation: 'DEBIT'
            });

            setDebitInfo(response.data);
            setSuccess(true);

            // Réinitialiser le formulaire
            setFormData({
                rib: '',
                montant: '',
                motif: '',
                typeOperation: 'DEBIT'
            });
            setCompteInfo(null);

        } catch (err) {
            if (err.response?.data) {
                if (typeof err.response.data === 'object' && !err.response.data.message) {
                    setErrors(err.response.data);
                } else {
                    setErrors({ general: err.response.data.message || 'Une erreur est survenue' });
                }
            } else {
                setErrors({ general: 'Une erreur est survenue' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Débiter un compte bancaire
                </h2>

                <p className="text-gray-600 mb-6">
                    Cette fonctionnalité permet de débiter le compte d'un client pour qu'il puisse effectuer des virements.
                </p>

                {success && debitInfo && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-3 flex-1">
                                <h3 className="text-lg font-semibold text-green-800">Débit effectué avec succès !</h3>
                                <div className="mt-3 text-sm text-green-700 space-y-2">
                                    <p><strong>RIB:</strong> {debitInfo.rib}</p>
                                    <p><strong>Montant débité:</strong> {debitInfo.montant.toFixed(2)} DH</p>
                                    <p><strong>Ancien solde:</strong> {debitInfo.ancienSolde.toFixed(2)} DH</p>
                                    <p><strong>Nouveau solde:</strong> {debitInfo.nouveauSolde.toFixed(2)} DH</p>
                                    <p><strong>Motif:</strong> {debitInfo.motif}</p>
                                    <p><strong>Date:</strong> {new Date(debitInfo.dateDebit).toLocaleString('fr-MA')}</p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-green-700 hover:text-green-800 font-semibold"
                                    >
                                        Effectuer un autre débit →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* RIB */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            RIB (24 chiffres) <span className="text-red-500">*</span>
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="rib"
                                value={formData.rib}
                                onChange={handleChange}
                                maxLength="24"
                                placeholder="000000000000000000000000"
                                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono ${
                                    errors.rib ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />

                            <button
                                type="button"
                                onClick={handleSearchCompte}
                                disabled={searchLoading || !formData.rib}
                                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                            >
                                {searchLoading ? 'Recherche...' : 'Rechercher'}
                            </button>
                        </div>

                        {errors.rib && (
                            <p className="text-red-500 text-sm mt-1">{errors.rib}</p>
                        )}
                    </div>

                    {/* Informations du compte */}
                    {compteInfo && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-3">Informations du compte</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-600">RIB:</span>
                                    <p className="font-medium font-mono">{compteInfo.rib}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Solde actuel:</span>
                                    <p className="font-medium">{compteInfo.solde.toFixed(2)} DH</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Titulaire:</span>
                                    <p className="font-medium">{compteInfo.clientPrenom} {compteInfo.clientNom}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Statut:</span>
                                    <p className={`font-medium ${
                                        compteInfo.statut === 'OUVERT' ? 'text-green-600' :
                                            compteInfo.statut === 'BLOQUE' ? 'text-red-600' :
                                                'text-gray-600'
                                    }`}>
                                        {compteInfo.statut}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Montant */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Montant à débiter (DH) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="montant"
                            value={formData.montant}
                            onChange={handleChange}
                            step="0.01"
                            min="0.01"
                            placeholder="0.00"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.montant ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        />
                        {errors.montant && (
                            <p className="text-red-500 text-sm mt-1">{errors.montant}</p>
                        )}
                    </div>

                    {/* Motif */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Motif du débit <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="motif"
                            value={formData.motif}
                            onChange={handleChange}
                            maxLength="255"
                            placeholder="Ex: Retrait, Frais, Ajustement..."
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.motif ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        />
                        {errors.motif && (
                            <p className="text-red-500 text-sm mt-1">{errors.motif}</p>
                        )}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/agent/dashboard')}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !compteInfo}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Traitement...' : 'Débiter le compte'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        <strong>⚠️ Attention:</strong> Cette opération débitera immédiatement le compte et enregistrera une opération.
                        Assurez-vous que les informations sont correctes avant de confirmer.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DebitCompte;