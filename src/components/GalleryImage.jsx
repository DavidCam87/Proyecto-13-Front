import { Box, Image, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';

export const GalleryImage = ({ src, alt, height = "250px" }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Box position="relative">
      <Skeleton position="absolute" top={0} left={0} w="100%" h="100%" isLoaded={!loading} />
      <Image
        src={src}
        alt={alt}
        rounded="md"
        objectFit="cover"
        height={height}
        width="100%"
        onLoad={() => setLoading(false)}
      />
    </Box>
  );
};