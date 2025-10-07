export interface User {
  id: string;
  name: string;
  email: string;
  tenant_id: string;
  tenant_name: string;
  role: string;
}

export interface Tenant {
  id: string;
  name: string;
}

export interface System {
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

export interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  systems: System[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

