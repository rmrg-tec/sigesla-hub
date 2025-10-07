import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Tenant, System, AuthContextType } from '../types';
import { authService, LoginCredentials } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión existente
    const checkExistingSession = async () => {
      setIsLoading(true);
      
      try {
        const sessionData = await authService.verifySession();
        
        if (sessionData) {
          setUser(sessionData.user);
          setTenant({
            id: sessionData.user.tenant_id,
            name: sessionData.user.tenant_name
          });
          setSystems(sessionData.systems);
        } else {
          setUser(null);
          setTenant(null);
          setSystems([]);
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
        setUser(null);
        setTenant(null);
        setSystems([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const credentials: LoginCredentials = { email, password };
      const response = await authService.login(credentials);
      
      // Si requiere 2FA o configuración 2FA, lanzar error específico
      if (response.requires2FA) {
        throw new Error('REQUIRES_2FA');
      }
      
      if (response.mustSetup2FA) {
        throw new Error('MUST_SETUP_2FA');
      }
      
      // Login exitoso
      setUser(response.user);
      setTenant({
        id: response.user.tenant_id,
        name: response.user.tenant_name
      });
      
      // Obtener sistemas del usuario
      const systems = await authService.getUserSystems();
      setSystems(systems);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setTenant(null);
      setSystems([]);
    }
  };

  const value: AuthContextType = {
    user,
    tenant,
    systems,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
