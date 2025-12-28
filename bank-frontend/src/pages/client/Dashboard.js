import React, { useState, useEffect } from 'react';
import dashboardService from '../../services/dashboardService';

const Dashboard = () => {
  const [comptes, setComptes] = useState([]);
  const [selectedRib, setSelectedRib] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllOperations, setShowAllOperations] = useState(false);
  const [operationsPage, setOperationsPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedRib) {
      fetchDashboard(selectedRib);
    }
  }, [selectedRib]);

  const fetchInitialData = async () => {
    try {
      const comptesData = await dashboardService.getMesComptes();
      setComptes(comptesData);

      if (comptesData.length > 0) {
        const dashboardData = await dashboardService.getDashboardDefault();
        setDashboard(dashboardData);
        setSelectedRib(dashboardData.rib);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async (rib) => {
    setLoading(true);
    setShowAllOperations(false);
    try {
      const data = await dashboardService.getDashboard(rib);
      setDashboard(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement du dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadAllOperations = async (page = 0) => {
    try {
      const data = await dashboardService.getOperations(selectedRib, page, 10);
      setOperationsPage(data);
      setCurrentPage(page);
      setShowAllOperations(true);
    } catch (err) {
      setError('Erreur lors du chargement des opérations');
    }
  };

  const handleCompteChange = (e) => {
    setSelectedRib(e.target.value);
  };

  const getTypeClass = (type) => {
    return type === 'CREDIT' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';
  };

  const getTypeSymbol = (type) => {
    return type === 'CREDIT' ? '+' : '-';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-MA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !dashboard) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 border-4 rounded-full animate-spin" style={{borderColor: '#2d6a4f', borderTopColor: 'transparent'}}></div>
            <div className="mt-4 text-xl font-medium" style={{color: '#2d6a4f'}}>Chargement...</div>
          </div>
        </div>
    );
  }

  if (!dashboard) {
    return (
        <div className="rounded-xl border-l-4 px-6 py-5" style={{background: '#fef3c7', borderColor: '#f59e0b', color: '#92400e'}}>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Vous n'avez aucun compte bancaire. Veuillez contacter votre agence.</span>
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold mb-2" style={{color: '#1a4d2e'}}>Mon tableau de bord</h2>
            <p style={{color: '#6b7280'}}>Gérez vos comptes et opérations</p>
          </div>
        </div>

        {error && (
            <div className="border-l-4 px-5 py-4 rounded-r-xl" style={{background: '#fee2e2', borderColor: '#dc2626', color: '#991b1b'}}>
              {error}
            </div>
        )}

        {/* Sélection du compte */}
        {comptes.length > 1 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border" style={{borderColor: '#e5e7eb'}}>
              <label className="block text-sm font-semibold mb-3" style={{color: '#1a4d2e'}}>
                Sélectionner un compte
              </label>
              <select
                  value={selectedRib}
                  onChange={handleCompteChange}
                  className="w-full px-4 py-3 border-2 rounded-xl font-mono transition-all outline-none"
                  style={{borderColor: '#d1d5db', background: '#f9fafb'}}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2d6a4f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
              >
                {comptes.map((compte) => (
                    <option key={compte.id} value={compte.rib}>
                      {compte.rib} - Solde: {compte.solde.toFixed(2)} DH
                    </option>
                ))}
              </select>
            </div>
        )}

        {/* Carte du compte */}
        <div className="rounded-2xl p-8 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 50%, #40916c 100%)', boxShadow: '0 20px 50px rgba(26, 77, 46, 0.4)'}}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -mr-48 -mt-48 opacity-10" style={{background: 'white'}}></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full -ml-36 -mb-36 opacity-10" style={{background: 'white'}}></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-green-100 text-sm font-medium mb-2">Numéro de compte (RIB)</p>
                <p className="text-2xl font-mono font-bold tracking-wider">{dashboard.rib}</p>
              </div>

              <div className="text-right">
              <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  dashboard.statut === 'OUVERT' ? 'bg-green-500' :
                      dashboard.statut === 'BLOQUE' ? 'bg-red-500' :
                          'bg-gray-500'
              }`}>
                {dashboard.statut}
              </span>
              </div>
            </div>

            <div>
              <p className="text-green-100 text-sm font-medium mb-2">Solde disponible</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-5xl font-bold">{dashboard.solde.toFixed(2)}</p>
                <span className="text-2xl font-semibold">DH</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 opacity-30">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
        </div>

        {/* Liste des opérations */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border" style={{borderColor: '#e5e7eb'}}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold" style={{color: '#1a4d2e'}}>
              {showAllOperations ? 'Historique complet' : 'Dernières opérations'}
            </h3>
            {!showAllOperations && dashboard.totalOperations > 10 && (
                <button
                    onClick={() => loadAllOperations(0)}
                    className="px-4 py-2 rounded-lg font-semibold transition-all"
                    style={{background: '#2d6a4f', color: 'white'}}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#1a4d2e';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#2d6a4f';
                      e.target.style.transform = 'translateY(0)';
                    }}
                >
                  Voir tout ({dashboard.totalOperations})
                </button>
            )}
          </div>

          {(!showAllOperations ? dashboard.dernieres10Operations : operationsPage?.content || []).length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-30" style={{color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p style={{color: '#6b7280'}}>Aucune opération</p>
              </div>
          ) : (
              <div className="space-y-3">
                {(!showAllOperations ? dashboard.dernieres10Operations : operationsPage?.content || []).map((operation) => (
                    <div
                        key={operation.id}
                        className="border-2 rounded-xl p-5 transition-all hover:shadow-md"
                        style={{borderColor: '#f3f4f6'}}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2d6a4f40'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                operation.type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <svg className={`w-5 h-5 ${operation.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={operation.type === 'CREDIT' ? "M12 4v16m8-8H4" : "M20 12H4"} />
                              </svg>
                            </div>
                            <div>
                              <p className="font-bold text-lg" style={{color: '#1a4d2e'}}>{operation.intitule}</p>
                              {operation.motif && (
                                  <p className="text-sm" style={{color: '#6b7280'}}>{operation.motif}</p>
                              )}
                            </div>
                          </div>
                          <p className="text-xs ml-13" style={{color: '#9ca3af'}}>
                            {formatDate(operation.dateOperation)}
                          </p>
                        </div>

                        <div className="text-right ml-4">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-2 ${
                        operation.type === 'CREDIT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {operation.type}
                    </span>
                          <p className={`text-2xl font-bold ${getTypeClass(operation.type)}`}>
                            {getTypeSymbol(operation.type)} {operation.montant.toFixed(2)} DH
                          </p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          )}

          {/* Pagination */}
          {showAllOperations && operationsPage && operationsPage.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-6 pt-6 border-t" style={{borderColor: '#e5e7eb'}}>
                <button
                    onClick={() => loadAllOperations(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 border-2 rounded-lg font-medium transition-all disabled:opacity-50"
                    style={{borderColor: '#d1d5db'}}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.borderColor = '#2d6a4f')}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                >
                  Précédent
                </button>

                <span className="text-sm font-medium" style={{color: '#6b7280'}}>
              Page {currentPage + 1} sur {operationsPage.totalPages}
            </span>

                <button
                    onClick={() => loadAllOperations(currentPage + 1)}
                    disabled={operationsPage.last}
                    className="px-4 py-2 border-2 rounded-lg font-medium transition-all disabled:opacity-50"
                    style={{borderColor: '#d1d5db'}}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.borderColor = '#2d6a4f')}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                >
                  Suivant
                </button>
              </div>
          )}

          {showAllOperations && (
              <div className="mt-4 text-center">
                <button
                    onClick={() => setShowAllOperations(false)}
                    className="text-sm font-medium transition-colors"
                    style={{color: '#2d6a4f'}}
                    onMouseEnter={(e) => e.target.style.color = '#1a4d2e'}
                    onMouseLeave={(e) => e.target.style.color = '#2d6a4f'}
                >
                  Afficher uniquement les 10 dernières
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Dashboard;