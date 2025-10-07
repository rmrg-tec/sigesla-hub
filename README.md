# SigeslaHub

Centro de sistemas empresariales para la gestión de múltiples aplicaciones SIGESLA.

## 🎯 Descripción

SigeslaHub es un frontend que actúa como punto de entrada centralizado para acceder a los diferentes sistemas de la suite SIGESLA. Los usuarios pueden iniciar sesión una vez y acceder a todos los sistemas disponibles según sus permisos.

## ✨ Características

- **Login Unificado**: Una sola autenticación para todos los sistemas
- **Dashboard de Sistemas**: Vista de tarjetas con los sistemas disponibles
- **Acceso Controlado**: Solo muestra sistemas a los que el usuario tiene acceso
- **Diseño Responsivo**: Optimizado para desktop y móvil
- **UI Consistente**: Mantiene el diseño visual de SIGESLA

## 🏗️ Sistemas Soportados

- **SIGESLA**: Sistema de Gestión de Sesiones Laborales
- **Demandas Laborales**: Sistema de Gestión de Demandas Laborales  
- **Reportes**: Sistema de Reportes y Analytics

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Configuración

### Credenciales de Demo
- **Email**: maria.gonzalez@empresa.com
- **Contraseña**: 123456

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_DOMAIN=.tudominio.com
```

**Nota**: Asegúrate de que el backend esté corriendo en el puerto 3000.

## 📱 Uso

1. **Login**: Ingresa tus credenciales en la página de inicio
2. **Dashboard**: Ve los sistemas disponibles en formato de tarjetas
3. **Acceso**: Haz clic en una tarjeta para acceder al sistema correspondiente
4. **Navegación**: Los sistemas se abren en nuevas pestañas manteniendo la sesión

## 🎨 Diseño

- **Colores**: Esquema de colores azul consistente con SIGESLA
- **Iconos**: Lucide React para iconografía moderna
- **Tipografía**: Inter para legibilidad óptima
- **Animaciones**: Transiciones suaves y efectos visuales sutiles

## 🔐 Seguridad

- **JWT en Cookies**: Autenticación con JWT almacenado en cookies httpOnly
- **Cookies Compartidas**: Entre subdominios para SSO (domain: .tudominio.com)
- **HTTPS**: Requerido en producción
- **Validación**: Validación de formularios en frontend
- **2FA**: Soporte para autenticación de dos factores (en desarrollo)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── ui/           # Componentes reutilizables
├── contexts/         # Contextos de React
├── pages/           # Páginas principales
├── types/           # Tipos TypeScript
└── utils/           # Utilidades
```

## 🛠️ Tecnologías

- **React 18**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **Vite**: Build tool y dev server
- **Lucide React**: Iconos

## 📋 TODO

- [ ] Integración con API real
- [ ] Manejo de cookies compartidas
- [ ] Configuración de subdominios
- [ ] Tests unitarios
- [ ] Documentación de API

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de la suite SIGESLA y está sujeto a las políticas de la empresa.
