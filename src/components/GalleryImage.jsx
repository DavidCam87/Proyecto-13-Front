import { Image } from '@chakra-ui/react'

export const GalleryImage = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    rounded="md"
    objectFit="cover"
    height="250px"
    width="100%"
  />
)