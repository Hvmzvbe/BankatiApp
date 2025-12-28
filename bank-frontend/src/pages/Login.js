import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(username, password);
      login(data.token, { username: data.username, role: data.role });
    } catch (err) {
      setError(err.response?.data?.message || 'Login ou mot de passe erronés');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{background: '#f5f5f5'}}>
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl overflow-hidden" style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'}}>

          {/* Section gauche - Branding */}
          <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between text-white relative overflow-hidden" style={{background: '#1f2937'}}>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full -mr-40 -mt-40 opacity-5" style={{background: 'white'}}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full -ml-48 -mb-48 opacity-5" style={{background: 'white'}}></div>

            <div className="relative z-10">
              <div className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{background: '#3b82f6', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'}}>
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.02-7-9V8.3l7-3.11 7 3.11V11c0 3.98-3.13 8.04-7 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-wide">Bankati</h1>
                    <p className="text-gray-400 text-sm">Votre banque digitale</p>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Bienvenue sur <span style={{color: '#3b82f6'}}>Bankati</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Gérez vos finances en toute simplicité avec notre plateforme bancaire moderne et sécurisée.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'rgba(255, 255, 255, 0.15)'}}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Transactions sécurisées 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'rgba(255, 255, 255, 0.15)'}}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Interface intuitive et moderne</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'rgba(255, 255, 255, 0.15)'}}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Support client réactif</span>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="p-4 rounded-xl border" style={{background: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'rgba(59, 130, 246, 0.3)'}}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Protection maximale</p>
                    <p className="text-xs text-gray-400">Chiffrement SSL & Authentification 2FA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="md:w-1/2 p-8 md:p-12 bg-white">
            <div className="md:hidden mb-8 text-center">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: '#3b82f6'}}>
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold" style={{color: '#1f2937'}}>Bankati</h1>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3" style={{color: '#1f2937'}}>
                  Connexion
                </h2>
                <p style={{color: '#6b7280'}}>
                  Accédez à votre espace personnel
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="border-l-4 p-4 rounded-r-lg" style={{background: '#fee2e2', borderColor: '#ef4444', color: '#7f1d1d'}}>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                      </div>
                    </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: '#1f2937'}}>
                      Identifiant
                    </label>
                    <div className="relative">
                      <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-4 py-3 pl-11 border-2 rounded-lg transition-all outline-none"
                          style={{borderColor: '#e5e7eb', background: '#f9fafb'}}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Votre identifiant"
                          required
                      />
                      <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: '#9ca3af'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: '#1f2937'}}>
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 pl-11 pr-11 border-2 rounded-lg transition-all outline-none"
                          style={{borderColor: '#e5e7eb', background: '#f9fafb'}}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Votre mot de passe"
                          required
                      />
                      <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: '#9ca3af'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                          style={{color: '#9ca3af'}}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                      >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    style={{
                      background: loading ? '#9ca3af' : '#3b82f6'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.background = '#2563eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.background = '#3b82f6';
                    }}
                >
                  {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Connexion...</span>
                      </>
                  ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Se connecter</span>
                      </>
                  )}
                </button>

                <div className="text-center pt-4">
                  <a href="#" className="text-sm font-medium transition-colors" style={{color: '#3b82f6'}} onMouseEnter={(e) => e.target.style.color = '#1d4ed8'} onMouseLeave={(e) => e.target.style.color = '#3b82f6'}>
                    Mot de passe oublié ?
                  </a>
                </div>
              </form>

              <div className="mt-8 p-4 rounded-lg border" style={{background: '#eff6ff', borderColor: '#bfdbfe'}}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: '#3b82f6'}}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{color: '#1e40af'}}>Connexion sécurisée</p>
                    <p className="text-xs mt-1" style={{color: '#1e3a8a'}}>Vos données sont protégées par cryptage SSL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;