import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    };
    let isValid = true;
    
    if (!email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'El correo electrónico no es válido';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(email, password);
      } catch (error: any) {
        console.error('Error de login:', error);
        
        if (error.message === 'REQUIRES_2FA') {
          setFormErrors({ 
            email: '', 
            password: 'Se requiere código 2FA. Funcionalidad en desarrollo.' 
          });
        } else if (error.message === 'MUST_SETUP_2FA') {
          setFormErrors({ 
            email: '', 
            password: 'Debes configurar 2FA. Funcionalidad en desarrollo.' 
          });
        } else {
          setFormErrors({ 
            email: '', 
            password: error.message || 'Credenciales inválidas' 
          });
        }
      }
    }
  };
  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-10">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-blue-600">SigeslaHub</h1>
            <p className="text-gray-600">Centro de Sistemas Empresariales</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Iniciar sesión</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su correo electrónico"
                  leftIcon={<Mail className="h-5 w-5 text-secondary-400" />}
                  error={formErrors.email}
                  fullWidth
                  autoComplete="email"
                  required
                />
                
                <Input
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  leftIcon={<Lock className="h-5 w-5 text-secondary-400" />}
                  error={formErrors.password}
                  fullWidth
                  autoComplete="current-password"
                  required
                />
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    leftIcon={<LogIn className="h-5 w-5" />}
                    isLoading={isLoading}
                  >
                    Iniciar sesión
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button className="text-wine-600 hover:text-wine-800 text-sm font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
