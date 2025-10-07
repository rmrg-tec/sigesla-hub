import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import { authService } from '../services/authService';

interface System {
  id: string;
  name: string;
  code: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  hasAccess: boolean;
  lastAccess?: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const systems = await authService.getUserSystems();
        setSystems(systems);
      } catch (error) {
        console.error('Error fetching systems:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSystems();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const formatLastAccess = (lastAccess?: string) => {
    if (!lastAccess) return 'Nunca';
    
    const now = new Date();
    const accessDate = new Date(lastAccess);
    const diffInHours = Math.floor((now.getTime() - accessDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-800">SigeslaHub</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-gray-500">{user?.tenant_name}</div>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Cerrar Sesión"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12 bg-white/50 backdrop-blur-sm rounded-lg p-8 border border-white/30">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bienvenido, {user?.name}
            </h2>
            <p className="text-xl text-gray-600">
              Selecciona un sistema para comenzar
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30">Sistemas Disponibles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {systems.map((system) => (
                <div
                  key={system.id}
                  className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 backdrop-blur-sm ${
                    system.color === 'blue' 
                      ? 'bg-blue-50/30 border-blue-300 hover:border-blue-400' 
                      : system.color === 'purple' 
                      ? 'bg-purple-50/30 border-purple-300 hover:border-purple-400'
                      : 'bg-gray-50/30 border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => {
                    if (system.hasAccess) {
                      window.location.href = system.url;
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      system.color === 'blue' ? 'bg-blue-100' : 
                      system.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      {system.icon === 'BuildingOfficeIcon' ? (
                        <svg className={`w-6 h-6 ${
                          system.color === 'blue' ? 'text-blue-600' : 
                          system.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      ) : (
                        <svg className={`w-6 h-6 ${
                          system.color === 'blue' ? 'text-blue-600' : 
                          system.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Acceso
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h4>
                  <p className="text-gray-600 mb-4">{system.description}</p>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Último acceso: {formatLastAccess(system.lastAccess)}
                  </div>
                  
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                      system.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 
                      system.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 
                      'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (system.hasAccess) {
                        window.location.href = system.url;
                      }
                    }}
                  >
                    Acceder al Sistema
                  </button>
                </div>
              ))}
            </div>
          </div>

          {systems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No hay sistemas disponibles
              </h3>
              <p className="text-gray-500">
                Contacta a tu administrador para obtener acceso a los sistemas.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
