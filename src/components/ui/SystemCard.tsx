import React from 'react';
import { System } from '../../types';

interface SystemCardProps {
  system: System;
  onSelect: (system: System) => void;
}

const SystemCard: React.FC<SystemCardProps> = ({ system, onSelect }) => {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      'BuildingOfficeIcon': '🏢',
      'DocumentTextIcon': '📄',
      'ChartBarIcon': '📊',
      'CogIcon': '⚙️',
      'BookOpenIcon': '📚'
    };
    return iconMap[iconName] || '📱';
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      'green': 'bg-green-50 border-green-200 hover:bg-green-100',
      'gray': 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      'purple': 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    };
    return colorMap[color] || 'bg-blue-50 border-blue-200 hover:bg-blue-100';
  };

  const formatLastAccess = (lastAccess?: string) => {
    if (!lastAccess) return 'Nunca';
    
    const date = new Date(lastAccess);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div 
      className={`
        p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 
        ${getColorClasses(system.color)}
        ${system.hasAccess ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}
      `}
      onClick={() => system.hasAccess && onSelect(system)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">
          {getIconComponent(system.icon)}
        </div>
        {system.hasAccess && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Acceso
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {system.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {system.description}
        </p>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-xs text-gray-500">
          <span className="font-medium">Último acceso:</span>
          <span className="ml-2">{formatLastAccess(system.lastAccess)}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button
          className={`
            w-full py-2 px-4 rounded-md font-medium text-sm transition-colors
            ${system.hasAccess 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!system.hasAccess}
        >
          {system.hasAccess ? 'Acceder al Sistema' : 'Sin Acceso'}
        </button>
      </div>
    </div>
  );
};

export default SystemCard;
