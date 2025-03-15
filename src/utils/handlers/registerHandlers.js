import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import useAuthStore from '../../store/authStore';

const useRegisterHandlers = (formData, setFormData, setIsLoading) => {
  const navigate = useNavigate();
  const toast = useToast();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      // Loguea al usuario tras el registro exitoso
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
      toast({
        title: 'Registro exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Ocurrió un error durante el registro',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleChange, handleSubmit };
};

export default useRegisterHandlers;
