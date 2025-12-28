import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
    }
  };

  return (
      <div className="min-h-screen flex flex-col" style={{background: '#f5f5f5'}}>
        <nav className="text-white shadow-md" style={{background: '#1f2937'}}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link
                  to={hasRole('AGENT_GUICHET') ? '/agent/dashboard' : '/client/dashboard'}
                  className="flex items-center space-x-3 hover:opacity-90 transition"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: '#3b82f6'}}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">Bankati</span>
              </Link>

              <div className="flex items-center gap-6">
                {/* Informations utilisateur */}
                <div className="hidden md:flex items-center space-x-3 px-4 py-2 rounded-lg" style={{background: '#374151'}}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold" style={{background: '#3b82f6', color: '#fff'}}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">{user?.username}</div>
                    <div className="text-xs opacity-75">
                      {user?.role === 'AGENT_GUICHET' ? 'Agent Guichet' : 'Client'}
                    </div>
                  </div>
                </div>

                {/* Menu Agent */}
                {hasRole('AGENT_GUICHET') && (
                    <>
                      <Link
                          to="/agent/dashboard"
                          className="hidden md:block hover:text-blue-300 transition font-medium"
                      >
                        Tableau de bord
                      </Link>
                      <Link
                          to="/agent/clients"
                          className="hidden md:block hover:text-blue-300 transition font-medium"
                      >
                        Clients
                      </Link>
                      <Link
                          to="/agent/comptes"
                          className="hidden md:block hover:text-blue-300 transition font-medium"
                      >
                        Comptes
                      </Link>
                    </>
                )}

                {/* Menu Client */}
                {hasRole('CLIENT') && (
                    <>
                      <Link
                          to="/client/dashboard"
                          className="hidden md:block hover:text-blue-300 transition font-medium"
                      >
                        Tableau de bord
                      </Link>
                      <Link
                          to="/client/virement"
                          className="hidden md:block hover:text-blue-300 transition font-medium"
                      >
                        Nouveau Virement
                      </Link>
                    </>
                )}

                {/* Changer mot de passe */}
                <Link
                    to="/change-password"
                    className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-sm font-medium">Sécurité</span>
                </Link>

                {/* Bouton déconnexion */}
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition"
                    style={{background: '#ef4444', color: 'white'}}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ef4444';
                      e.target.style.transform = 'translateY(0)';
                    }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden lg:inline">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>

        <Footer />
      </div>
  );
};

export default Layout;