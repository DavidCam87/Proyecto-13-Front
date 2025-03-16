import { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const imageUrls = [
  'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://ojsfkgmllttijmptdbbn.supabase.co/storage/v1/object/public/article-media/historia/fc7bda29-ff2b-4ae5-b861-eeb8a9d9da9e/featured/honda-cbr-1000-rr-r-2022.jpeg',
  'https://cdn2.yamaha-motor.eu/prod/product-assets/2025/YZF1000R1COMP/2025-Yamaha-YZF1000R1COMP-EU-Tech_Black-Action-001-03.jpg',
  'https://motoblog.com/wp-content/uploads/2019/09/2020-africa-twin-gallery-05-2400xauto.jpg'
];
const MotionImage = motion.create(Image);

const RotatingImage = ({ interval = 3000, ...rest }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <Box position="relative" width="100%" height="100%">
      <AnimatePresence>
        <MotionImage
          key={index}
          src={imageUrls[index]}
          alt={`Imagen rotativa ${index + 1}`} // Agregado texto alternativo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          {...rest}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AnimatePresence>
    </Box>
  );
};

export default RotatingImage;