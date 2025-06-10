import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../api';
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
      const resp = await apiRegister(formData);
      toast({
        title: 'Éxito',
        description: resp.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate('/');
    } catch (err) {
      const resp = err.response?.data;

      if (Array.isArray(resp?.errors)) {
        resp.errors.forEach(({ msg }) =>
          toast({
            title: 'Error de validación',
            description: msg,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        );
      } else {
        toast({
          title: 'Error',
          description: resp?.message || 'Ocurrió un error durante el registro',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleChange, handleSubmit };
};

export default useRegisterHandlers;