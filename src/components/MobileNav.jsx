import { Box, VStack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useNavLinks from './NavLinks';
import useAuthStore from '../store/authStore';

const MobileNav = ({ onToggle }) => {
  const Links = useNavLinks();

  const { isAuthenticated, logout } = useAuthStore();

  return (
    <Box pb={4} display={{ base: 'block', md: 'none' }}>
      <VStack as={'nav'} spacing={4}>
        {Links.map((link) => (
          <Button as={RouterLink} to={link.to} key={link.name} variant="ghost" width="100%" onClick={onToggle}>
            {link.name}
          </Button>
        ))}
        {isAuthenticated && (
          <Button onClick={logout} variant={'solid'} colorScheme={'red'} width="100%">
            Logout
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default MobileNav;