import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../api';
import useAuthStore from '../../store/authStore';

const useServicesHandlers = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  // Cargar los servicios desde la API
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load services',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesData();
  }, [toast]);

  // Handler para seleccionar un servicio y navegar a la cita
  const handleServiceSelect = (service) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to book a service',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
    navigate('/appointment', { state: { selectedService: service } });
  };

  // Handlers para abrir y cerrar el modal de detalles
  const openModal = (service) => {
    setSelectedServiceDetails(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedServiceDetails(null);
    setIsModalOpen(false);
  };

  return {
    services,
    isLoading,
    handleServiceSelect,
    openModal,
    closeModal,
    selectedServiceDetails,
    isModalOpen,
  };
};

export default useServicesHandlers;
