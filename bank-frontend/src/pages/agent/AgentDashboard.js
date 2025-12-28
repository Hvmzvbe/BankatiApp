import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AgentDashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [modifyLoading, setModifyLoading] = useState(false);
  const [modifyErrors, setModifyErrors] = useState({});
  const [modifySuccess, setModifySuccess] = useState(false);
  const [compteInfo, setCompteInfo] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [modifyData, setModifyData] = useState({
    rib: '',
    montant: '',
    typeOperation: 'CREDIT', // CREDIT ou DEBIT
    motif: ''
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/statistics');
      setStatistics(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  // Rechercher le compte par RIB
  const handleSearchCompte = async () => {
    if (!modifyData.rib) {
      setModifyErrors({ rib: 'Veuillez saisir un RIB' });
      return;
    }

    setSearchLoading(true);
    setModifyErrors({});

    try {
      const response = await api.get(`/comptes/rib/${modifyData.rib}`);
      setCompteInfo(response.data);
    } catch (err) {
      setModifyErrors({ rib: 'Compte non trouvé avec ce RIB' });
      setCompteInfo(null);
    } finally {
      setSearchLoading(false);
    }
  };

  // Gestion des changements dans le formulaire
  const handleModifyChange = (e) => {
    const { name, value } = e.target;
    setModifyData(prev => ({
      ...prev,
      [name]: value
    }));

    if (modifyErrors[name]) {
      setModifyErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'rib') {
      setCompteInfo(null);
    }
  };

  // Soumettre la modification
  const handleModifySubmit = async (e) => {
    e.preventDefault();
    setModifyErrors({});

    // Validations
    if (!compteInfo) {
      setModifyErrors({ rib: 'Veuillez d\'abord rechercher le compte' });
      return;
    }

    if (parseFloat(modifyData.montant) <= 0) {
      setModifyErrors({ montant: 'Le montant doit être supérieur à 0' });
      return;
    }

    // Si c'est un débit, vérifier le solde
    if (modifyData.typeOperation === 'DEBIT' && parseFloat(modifyData.montant) > compteInfo.solde) {
      setModifyErrors({ montant: `Solde insuffisant. Solde: ${compteInfo.solde.toFixed(2)} DH` });
      return;
    }

    if (!modifyData.motif.trim()) {
      setModifyErrors({ motif: 'Le motif est obligatoire' });
      return;
    }

    setModifyLoading(true);

    try {
      await api.post('/modifier-solde', {
        rib: modifyData.rib,
        montant: parseFloat(modifyData.montant),
        typeOperation: modifyData.typeOperation,
        motif: modifyData.motif
      });

      setModifySuccess(true);
      setModifyData({ rib: '', montant: '', typeOperation: 'CREDIT', motif: '' });
      setCompteInfo(null);

      // Recharger les statistiques
      fetchStatistics();

      setTimeout(() => {
        setModifySuccess(false);
        setShowModifyForm(false);
      }, 3000);

    } catch (err) {
      if (err.response?.data) {
        if (typeof err.response.data === 'object' && !err.response.data.message) {
          setModifyErrors(err.response.data);
        } else {
          setModifyErrors({ general: err.response.data.message || 'Erreur lors de la modification' });
        }
      } else {
        setModifyErrors({ general: 'Une erreur est survenue' });
      }
    } finally {
      setModifyLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Chargement...</div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Tableau de bord Agent</h2>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
        )}

        {/* Statistiques */}
        {statistics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Clients */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Total Clients</p>
                    <p className="text-4xl font-bold">{statistics.totalClients}</p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-30 rounded-full p-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Comptes */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm mb-1">Total Comptes</p>
                    <p className="text-4xl font-bold">{statistics.totalComptes}</p>
                  </div>
                  <div className="bg-green-400 bg-opacity-30 rounded-full p-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Comptes Ouverts */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm mb-1">Comptes Ouverts</p>
                    <p className="text-4xl font-bold">{statistics.comptesOuverts}</p>
                  </div>
                  <div className="bg-purple-400 bg-opacity-30 rounded-full p-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Détails des comptes */}
        {statistics && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Détails des comptes</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-600 font-semibold text-2xl">{statistics.comptesOuverts}</p>
                  <p className="text-sm text-gray-600 mt-1">Ouverts</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-600 font-semibold text-2xl">{statistics.comptesBloqués}</p>
                  <p className="text-sm text-gray-600 mt-1">Bloqués</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600 font-semibold text-2xl">{statistics.comptesClotures}</p>
                  <p className="text-sm text-gray-600 mt-1">Clôturés</p>
                </div>
              </div>
            </div>
        )}

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
                to="/agent/add-client"
                className="flex items-center p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition group"
            >
              <div className="bg-blue-100 rounded-full p-3 group-hover:bg-blue-200 transition">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Ajouter un client</p>
                <p className="text-sm text-gray-600">Créer un nouveau client</p>
              </div>
            </Link>

            <Link
                to="/agent/add-account"
                className="flex items-center p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition group"
            >
              <div className="bg-green-100 rounded-full p-3 group-hover:bg-green-200 transition">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Créer un compte</p>
                <p className="text-sm text-gray-600">Ouvrir un compte bancaire</p>
              </div>
            </Link>

            <Link
                to="/agent/clients"
                className="flex items-center p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition group"
            >
              <div className="bg-purple-100 rounded-full p-3 group-hover:bg-purple-200 transition">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Voir les clients</p>
                <p className="text-sm text-gray-600">Liste de tous les clients</p>
              </div>
            </Link>

            <Link
                to="/agent/comptes"
                className="flex items-center p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition group"
            >
              <div className="bg-orange-100 rounded-full p-3 group-hover:bg-orange-200 transition">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Voir les comptes</p>
                <p className="text-sm text-gray-600">Liste de tous les comptes</p>
              </div>
            </Link>

            {/* Modifier Solde */}
            <button
                onClick={() => setShowModifyForm(!showModifyForm)}
                className="flex items-center p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition group"
            >
              <div className="bg-red-100 rounded-full p-3 group-hover:bg-red-200 transition">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <p className="font-semibold text-gray-800">Modifier solde</p>
                <p className="text-sm text-gray-600">Créditer ou débiter un compte</p>
              </div>
            </button>
          </div>
        </div>

        {/* Formulaire Modifier Solde */}
        {showModifyForm && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Modifier le solde</h3>
                <button
                    onClick={() => setShowModifyForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              {modifySuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    ✓ Solde modifié avec succès!
                  </div>
              )}

              {modifyErrors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {modifyErrors.general}
                  </div>
              )}

              <form onSubmit={handleModifySubmit} className="space-y-4">
                {/* RIB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RIB <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                        type="text"
                        name="rib"
                        value={modifyData.rib}
                        onChange={handleModifyChange}
                        maxLength="24"
                        placeholder="000000000000000000000000"
                        className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                            modifyErrors.rib ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleSearchCompte}
                        disabled={searchLoading || !modifyData.rib}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm"
                    >
                      {searchLoading ? '...' : 'Chercher'}
                    </button>
                  </div>
                  {modifyErrors.rib && <p className="text-red-500 text-xs mt-1">{modifyErrors.rib}</p>}
                </div>

                {/* Info Compte */}
                {compteInfo && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Titulaire:</span>
                          <p className="font-medium">{compteInfo.clientPrenom} {compteInfo.clientNom}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Solde actuel:</span>
                          <p className="font-bold text-blue-600">{compteInfo.solde.toFixed(2)} DH</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Statut:</span>
                          <p className="font-medium" style={{color: compteInfo.statut === 'OUVERT' ? '#16a34a' : '#dc2626'}}>{compteInfo.statut}</p>
                        </div>
                      </div>
                    </div>
                )}

                {/* Type d'opération */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'opération <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setModifyData(prev => ({...prev, typeOperation: 'CREDIT'}))}
                        className={`py-2 px-3 rounded-lg font-semibold transition text-sm ${
                            modifyData.typeOperation === 'CREDIT'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      ➕ Créditer
                    </button>
                    <button
                        type="button"
                        onClick={() => setModifyData(prev => ({...prev, typeOperation: 'DEBIT'}))}
                        className={`py-2 px-3 rounded-lg font-semibold transition text-sm ${
                            modifyData.typeOperation === 'DEBIT'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      ➖ Débiter
                    </button>
                  </div>
                </div>

                {/* Montant */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant (DH) <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="number"
                      name="montant"
                      value={modifyData.montant}
                      onChange={handleModifyChange}
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${
                          modifyErrors.montant ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                  />
                  {modifyErrors.montant && <p className="text-red-500 text-xs mt-1">{modifyErrors.montant}</p>}
                </div>

                {/* Motif */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motif <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      name="motif"
                      value={modifyData.motif}
                      onChange={handleModifyChange}
                      maxLength="255"
                      placeholder="Ex: Retrait, Dépôt, Correction, Frais..."
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${
                          modifyErrors.motif ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                  />
                  {modifyErrors.motif && <p className="text-red-500 text-xs mt-1">{modifyErrors.motif}</p>}
                </div>

                {/* Boutons */}
                <div className="flex gap-2 pt-2">
                  <button
                      type="button"
                      onClick={() => setShowModifyForm(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                  >
                    Annuler
                  </button>
                  <button
                      type="submit"
                      disabled={modifyLoading || !compteInfo}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                  >
                    {modifyLoading ? 'Traitement...' : 'Modifier'}
                  </button>
                </div>
              </form>
            </div>
        )}
      </div>
  );
};

export default AgentDashboard;