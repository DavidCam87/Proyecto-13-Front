import { getAllAppointmentsAdmin, getAllUsersAdmin, getMecanics, getServices, } from '../../utils/api';
import { createAppointmentHandlers } from './handlers/adminAppointmentHandlers';
import { createUserHandlers } from './handlers/userHandlers';
import { createMecanicHandlers } from './handlers/adminMecanicHandlers';
import { createServiceHandlers } from './handlers/adminServiceHandlers';
import { useState } from 'react'; //Import useState

export const useAdminHandlers = (stateSetters, toast) => {
  const {
    setAppointments,
    setUsers,
    setMecanics,
    setServices
  } = stateSetters;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [apps, usersData, mecanicsData, servicesData] = await Promise.all([
        getAllAppointmentsAdmin(),
        getAllUsersAdmin(),
        getMecanics(),
        getServices(),
      ]);
      setAppointments(apps);
      setUsers(usersData);
      setMecanics(mecanicsData);
      setServices(servicesData);
    } catch (err) {
      setError(err);
      toast({
        title: 'Error',
        description: 'Error al cargar los datos administrativos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchInitialData,
    handleAppointment: createAppointmentHandlers(setAppointments, toast),
    handleUser: createUserHandlers(setUsers, toast),
    handleMecanic: createMecanicHandlers(setMecanics, toast),
    handleService: createServiceHandlers(setServices, toast),
    loading,
    error,
  };
};

export const showToast = (toast, { title, description = '', status }) => {
  toast({
    title,
    description,
    status,
    duration: status === 'error' ? 3000 : 2000,
    isClosable: true,
    position: 'top-right'
  });
};