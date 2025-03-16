import { useMemo } from 'react';
import useAuthStore from '../store/authStore';

const useNavLinks = () => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  return useMemo(() => [
    { name: 'Servicios', to: '/services', 'aria-label': 'Servicios' },
    isAuthenticated && !isAdmin ? { name: 'Mis Citas', to: '/mis-citas', 'aria-label': 'Mis Citas' } : null,
    isAuthenticated && isAdmin ? { name: 'Admin Dashboard', to: '/admin-dashboard', 'aria-label': 'Panel de Administración' } : null,
    isAuthenticated && isAdmin ? { name: 'Calendario', to: '/calendario', 'aria-label': 'Calendario' } : null,
    !isAuthenticated ? { name: 'Login', to: '/login', 'aria-label': 'Iniciar Sesión' } : null,
    !isAuthenticated ? { name: 'Registrarse', to: '/register', 'aria-label': 'Registrarse' } : null,
  ].filter(Boolean), [isAuthenticated, isAdmin]);
};

export default useNavLinks;