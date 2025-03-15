import { useMemo } from 'react';
import useAuthStore from '../store/authStore';

const useNavLinks = () => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  return useMemo(() => [
    { name: 'Servicios', to: '/services' },
    isAuthenticated && !isAdmin ? { name: 'Mis Citas', to: '/mis-citas' } : null,
    isAuthenticated && isAdmin ? { name: 'Admin Dashboard', to: '/admin-dashboard' } : null,
    isAuthenticated && isAdmin ? { name: 'Calendario', to: '/calendario' } : null,
    !isAuthenticated ? { name: 'Login', to: '/login' } : null,
    !isAuthenticated ? { name: 'Registrarse', to: '/register' } : null,
  ].filter(Boolean), [isAuthenticated, isAdmin]);
};

export default useNavLinks;