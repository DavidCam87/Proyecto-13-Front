import { deleteAppointmentAdmin, updateAppointmentAdmin } from '../../../utils/api';
import { showToast } from '../utils/toastHelper';

const calculateEndTime = (startTime) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endTime = new Date();
  endTime.setHours(hours + 1);
  endTime.setMinutes(minutes);
  return `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
};

export const createAppointmentHandlers = (setAppointments, toast) => ({
  delete: async (id) => {
    try {
      await deleteAppointmentAdmin(id);
      setAppointments(prev => prev.filter(app => app._id !== id));
      showToast(toast, { title: 'Cita eliminada', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo eliminar la cita',
        status: 'error'
      });
    }
  },

  edit: async (appointment) => {
    const newDate = window.prompt("Ingrese nueva fecha (DD/MM/YYYY):", appointment.date);
    if (!newDate) return;

    const newStartTime = window.prompt("Ingrese nueva hora de inicio (HH:MM):", appointment.startTime);
    if (!newStartTime) return;

    try {
      const updated = await updateAppointmentAdmin(appointment._id, {
        date: newDate,
        startTime: newStartTime,
        endTime: calculateEndTime(newStartTime),
        user: appointment.user._id,
        service: appointment.service._id,
        mecanic: appointment.mecanic._id,
      });

      setAppointments(prev => prev.map(app =>
        app._id === appointment._id ? updated : app
      ));

      showToast(toast, { title: 'Cita actualizada', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo actualizar la cita',
        status: 'error'
      });
    }
  }
});