import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { createAppointment } from '../utils/api';
import useAuthStore from '../store/authStore';

const calculateEndTime = (startTime) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endTime = new Date();
  endTime.setHours(hours + 1);
  endTime.setMinutes(minutes);
  return `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
};
const useAppointmentForm = (selectedService) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    mecanic: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;
    setFormData((prev) => ({
      ...prev,
      startTime,
      endTime: calculateEndTime(startTime),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona un servicio primero',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/services');
      return;
    }

    setIsLoading(true);
    try {
      await createAppointment({
        ...formData,
        date: formData.date,
        user: user._id,
        service: selectedService._id,
        mecanic: formData.mecanic,
      });
      toast({
        title: 'Success',
        description: 'Cita creada exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/mis-citas');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Cita no creada',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleStartTimeChange,
    handleSubmit,
    setFormData
  };
};

export default useAppointmentForm;