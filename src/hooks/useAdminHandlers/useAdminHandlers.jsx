import { getAllAppointmentsAdmin, getAllUsersAdmin, getMecanics, getServices, } from '../../utils/api';
import { createAppointmentHandlers } from './handlers/appointmentHandlers';
import { createUserHandlers } from './handlers/userHandlers';
import { createMecanicHandlers } from './handlers/mecanicHandlers';
import { createServiceHandlers } from './handlers/serviceHandlers';

export const useAdminHandlers = (stateSetters, toast) => {
  const {
    setAppointments,
    setUsers,
    setMecanics,
    setServices
  } = stateSetters;

  const fetchInitialData = async () => {
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
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al cargar los datos administrativos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    fetchInitialData,
    handleAppointment: createAppointmentHandlers(setAppointments, toast),
    handleUser: createUserHandlers(setUsers, toast),
    handleMecanic: createMecanicHandlers(setMecanics, toast),
    handleService: createServiceHandlers(setServices, toast)
  };
};