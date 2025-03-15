import { createMecanicAdmin, deleteMecanicAdmin, updateMecanicAdmin } from '../../../utils/api';
import { showToast } from '../utils/toastHelper';

export const createMecanicHandlers = (setMecanics, toast) => ({
  add: async (newMecanic) => {
    if (!newMecanic.trim()) return;

    try {
      const addedMecanic = await createMecanicAdmin({ name: newMecanic });
      setMecanics(prev => [...prev, addedMecanic]);
      showToast(toast, { title: 'Mecánico añadido', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo agregar el mecánico',
        status: 'error'
      });
    }
  },

  delete: async (id) => {
    try {
      await deleteMecanicAdmin(id);
      setMecanics(prev => prev.filter(m => m._id !== id));
      showToast(toast, { title: 'Mecánico eliminado', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo eliminar el mecánico',
        status: 'error'
      });
    }
  },

  edit: async (mecanic) => {
    const newName = window.prompt("Ingrese nuevo nombre:", mecanic.name);
    if (!newName) return;

    try {
      const updated = await updateMecanicAdmin(mecanic._id, { name: newName });
      setMecanics(prev => prev.map(m =>
        m._id === mecanic._id ? updated : m
      ));

      showToast(toast, { title: 'Mecánico actualizado', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo actualizar el mecánico',
        status: 'error'
      });
    }
  }
});