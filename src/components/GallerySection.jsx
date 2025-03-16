import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { GalleryImage } from './GalleryImage';

export const GallerySection = ({ title, description, images, columns = { base: 1, sm: 2, md: 3 } }) => (
  <Box mt={16} aria-label={`Galería: ${title}`}>
    <Heading as="h2" size="xl" mb={4}>
      {title}
    </Heading>
    <Text color="gray.600" fontSize="lg" mb={6}>
      {description}
    </Text>
    <SimpleGrid columns={columns} spacing={5}>
      {images.map((image, index) => (
        <GalleryImage key={index} src={image.src} alt={image.alt} />
      ))}
    </SimpleGrid>
  </Box>
);