import { Box, Flex, Button, useColorModeValue, useDisclosure, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={'start'} align="center">
          <Button
            as={RouterLink}
            to="/"
            variant={'ghost'}
            fontWeight={'bold'}
            aria-label="Inicio"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }} // Transición al pasar el cursor
          >
            Moto Workshop
          </Button>
        </Flex>
        <DesktopNav />
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant={'ghost'}
          aria-label="Abrir/Cerrar menú de navegación"
        />
      </Flex>
      {isOpen && <MobileNav onToggle={onToggle} />}
    </Box>
  );
}

export default Navbar;