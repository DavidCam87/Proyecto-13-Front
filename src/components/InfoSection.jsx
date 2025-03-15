import { Box, Heading, Text } from '@chakra-ui/react'

export const InfoSection = ({ title, children }) => (
  <Box mt={16}>
    <Heading as="h2" size="xl" mb={4}>
      {title}
    </Heading>
    {children}
  </Box>
)