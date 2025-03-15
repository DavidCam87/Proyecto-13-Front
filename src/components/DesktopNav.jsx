import { Stack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useNavLinks from './NavLinks';
import useAuthStore from '../store/authStore';

const DesktopNav = () => {
  const Links = useNavLinks();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <Stack direction={'row'} spacing={6} display={{ base: 'none', md: 'flex' }}>
      {Links.map((link) => (
        <Button as={RouterLink} to={link.to} key={link.name} variant="ghost">
          {link.name}
        </Button>
      ))}
      {isAuthenticated && (
        <Button onClick={logout} variant={'solid'} colorScheme={'red'}>
          Logout
        </Button>
      )}
    </Stack>
  );
};

export default DesktopNav;