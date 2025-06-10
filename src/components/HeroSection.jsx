import { Box, Heading, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import RotatingImage from './RotatingImage';

export const HeroSection = ({ titleParts, description, buttons }) => {
  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
          {titleParts.map((text, index) => (
            <Text key={index} as={'span'} position={'relative'} color={index === 1 ? 'red.400' : 'inherit'}>
              {text}
              {index === 0 && <br />}
            </Text>
          ))}
        </Heading>
        <Text color={'gray.500'}>{description}</Text>
        <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              as={RouterLink}
              to={button.to}
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={button.colorScheme}
              aria-label={button.ariaLabel || button.text} // Agregado aria-label
              _hover={{ bg: useColorModeValue(`${button.colorScheme}.100`, `${button.colorScheme}.600`) }} // Transición al pasar el cursor
            >
              {button.text}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Box position={'relative'} height={'365px'} rounded={'2xl'} width={'full'} overflow={'hidden'}>
        <RotatingImage />
      </Box>
    </Stack>
  );
};