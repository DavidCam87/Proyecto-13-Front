import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../utils/Context';
import { startTimeOptions } from '../data/startTimeOptions';
import useMechanics from '../hooks/useMechanics';
import useAppointmentForm from '../hooks/useAppointmentForm';
import NoServiceSelected from '../components/NoServiceSelected';
import AppointmentForm from '../components/AppointmentForm';

const Appointments = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { services } = useContext(AppContext);
  const mechanics = useMechanics();

  // Obtener servicio seleccionado
  let selectedService = location.state?.selectedService;
  if (!selectedService) {
    const serviceId = searchParams.get('serviceId');
    if (serviceId && services.length > 0) {
      selectedService = services.find(s => s._id === serviceId);
    }
  }

  // Form handling
  const form = useAppointmentForm(selectedService);

  if (!selectedService) {
    return <NoServiceSelected />;
  }

  return (
    <AppointmentForm
      selectedService={selectedService}
      mechanics={mechanics}
      startTimeOptions={startTimeOptions}
      {...form}
    />
  );
};

export default Appointments;