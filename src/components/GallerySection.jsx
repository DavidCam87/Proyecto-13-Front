import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react'
import { GalleryImage } from './GalleryImage'

export const GallerySection = ({ title, description, images }) => (
  <Box mt={16}>
    <Heading as="h2" size="xl" mb={4}>
      {title}
    </Heading>
    <Text color="gray.600" fontSize="lg" mb={6}>
      {description}
    </Text>
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
      {images.map((image, index) => (
        <GalleryImage key={index} src={image.src} alt={image.alt} />
      ))}
    </SimpleGrid>
  </Box>
)