// Servicio de autenticación para SigeslaHub
// Maneja login/logout con JWT en cookies para compartir entre subdominios

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenant_id: string;
  tenant_name: string;
  catalog_item_id: string;
}

export interface LoginResponse {
  user: User;
  message?: string;
  requires2FA?: boolean;
  mustSetup2FA?: boolean;
  userId?: string;
}

export interface SystemsResponse {
  systems: Array<{
    id: string;
    name: string;
    code: string;
    description: string;
    url: string;
    icon: string;
    color: string;
    hasAccess: boolean;
    lastAccess?: string;
  }>;
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Realiza login y guarda JWT en cookie
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Usar la ruta original del backend para login
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para cookies
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error de autenticación');
      }

      const data = await response.json();

      // Si requiere 2FA o configuración 2FA, devolver sin procesar cookie
      if (data.requires2FA || data.mustSetup2FA) {
        return data;
      }

      // Si el login es exitoso, el JWT se guarda automáticamente en cookie
      // por el backend con httpOnly, secure, sameSite, etc.
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Verifica si hay una sesión válida
   */
  async verifySession(): Promise<{ user: User; systems: SystemsResponse['systems'] } | null> {
    try {
      const response = await fetch(`${this.baseURL}/hub/auth/verify`, {
        method: 'GET',
        credentials: 'include', // Incluye cookies
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verificando sesión:', error);
      return null;
    }
  }

  /**
   * Obtiene los sistemas disponibles para el usuario
   */
  async getUserSystems(): Promise<SystemsResponse['systems']> {
    try {
      const response = await fetch(`${this.baseURL}/hub/tenant-systems`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error obteniendo sistemas');
      }

      const data = await response.json();
      return data.systems || [];
    } catch (error) {
      console.error('Error obteniendo sistemas:', error);
      return [];
    }
  }

  /**
   * Realiza logout eliminando la cookie
   */
  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseURL}/hub/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error en logout:', error);
      // Incluso si hay error, consideramos el logout exitoso
    }
  }

  /**
   * Verifica si el usuario tiene acceso a un sistema específico
   */
  async hasSystemAccess(systemCode: string): Promise<boolean> {
    try {
      const systems = await this.getUserSystems();
      return systems.some(system => system.code === systemCode && system.hasAccess);
    } catch (error) {
      console.error('Error verificando acceso al sistema:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
