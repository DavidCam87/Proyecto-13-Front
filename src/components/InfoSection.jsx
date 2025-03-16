import { Box, Heading, Text } from '@chakra-ui/react';

export const InfoSection = ({ title, children, mt = 16 }) => (
  <Box mt={mt} aria-label={`Sección de información: ${title}`}>
    <Heading as="h2" size="xl" mb={4}>
      {title}
    </Heading>
    {children}
  </Box>
);