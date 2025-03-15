import { Container, Text } from '@chakra-ui/react'
import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { GallerySection } from '../components/GallerySection'
import { InfoSection } from '../components/InfoSection'
import MotionBox from '../components/MotionBox'

function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const heroContent = {
    titleParts: ['Expertos En Motocicletas', 'Servicio & Reparacion'],
    description: 'Servicios profesionales de mantenimiento, reparación y personalización de motocicletas. Nuestros técnicos expertos garantizan que su motocicleta funcione al máximo rendimiento.',
    buttons: [
      { to: '/services', text: 'Nuestros Servicios', colorScheme: 'red' },
      { to: '/contact', text: 'Contacta Con Nosotros' }
    ]
  }

  const aboutContent = {
    title: 'Quiénes Somos',
    content: `Somos un taller de motos con años de experiencia, dedicado a brindar un servicio de excelencia a todos los apasionados de las dos ruedas. Nuestro equipo está conformado por expertos mecánicos que comparten la misma pasión por las motocicletas y trabajan cada día para ofrecer soluciones rápidas y efectivas. Nuestra misión es que cada cliente se sienta respaldado, seguro y con la confianza de que su moto está en las mejores manos.`,
    image: {
      src: 'https://cardosoacademy.com/wp-content/uploads/2025/02/DSC8335-Mejorado-NR-scaled.jpg',
      alt: 'Mecánico revisando una moto'
    }
  }

  const galleryImages = [
    { src: 'https://img.freepik.com/fotos-premium/hombre-garaje-esta-revisando-motocicleta_151013-34171.jpg', alt: 'Mecánico revisando una moto' },
    { src: 'https://img.freepik.com/fotos-premium/detalle-tablero-herramientas-taller-motocicletas_156252-4723.jpg', alt: 'Herramientas en el taller' },
    { src: 'https://i.ytimg.com/vi/EwnRh1vFHEc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDgZWeSKhmyehPJqKN_bgEuO7G7zA', alt: 'Moto customizada' },
    { src: 'https://media.istockphoto.com/id/833171812/es/foto/esperamos-poder-servirle.jpg?s=612x612&w=0&k=20&c=AFX28Hc8LCoIy5B-2Xc8KUgdJM_XrOrwhhg1cnD2aHc=', alt: 'Mecánico ajustando una pieza' },
    { src: 'https://mgpmotos.com/wp-content/uploads/Taller.webp', alt: 'Interior del taller' },
    { src: 'https://www.motociclismo.es/uploads/s1/95/43/57/2/taller-moto-2.jpeg', alt: 'Moto en proceso de reparación' }
  ]

  return (
    <>
      <MotionBox variants={containerVariants} initial="hidden" animate="visible">
        <Container maxW={'7xl'}>
          <HeroSection {...heroContent} containerVariants={containerVariants} />
          <Container maxW="7xl" mt={10}>
            <AboutSection {...aboutContent} />
            <GallerySection
              title="Galería de Fotos"
              description="Un vistazo a nuestro taller y el trabajo que realizamos. Desde el mantenimiento básico hasta la personalización más detallada, ¡amamos cada parte del proceso!"
              images={galleryImages}
            />
            <InfoSection title="Información Práctica">
              <Text color="gray.600" fontSize="lg" mb={2}>
                <strong>Horario:</strong> Lunes a Viernes de 8:30 a 16:30
              </Text>
              <Text color="gray.600" fontSize="lg" mb={2}>
                <strong>Ubicación:</strong> C/Alfonso XI, Gran Plaza, 5, 41005 Sevilla
              </Text>
              <Text color="gray.600" fontSize="lg" mb={2}>
                <strong>Contacto:</strong> +34 635 259 873 | contacto@tallermotos.com
              </Text>
              <Text color="gray.600" fontSize="lg">
                Contamos con estacionamiento para motos y coches, zona de espera con bebidas y WiFi, y servicio de recogida y entrega de motocicletas a domicilio (bajo cita previa).
              </Text>
            </InfoSection>
          </Container>
        </Container>
      </MotionBox>
    </>
  )
}

export default Home