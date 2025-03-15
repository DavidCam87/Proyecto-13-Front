import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react'

export const AboutSection = ({ title, content, image }) => (
  <Box>
    <Heading as="h2" size="xl" mb={4}>
      {title}
    </Heading>
    <Flex direction={{ base: "column", md: "row" }} align="center" gap={5}>
      <Text color="gray.600" fontSize="lg" flex="1">
        {content}
      </Text>
      <Image
        src={image.src}
        alt={image.alt}
        rounded="md"
        objectFit="cover"
        maxWidth="40%"
      />
    </Flex>
  </Box>
)