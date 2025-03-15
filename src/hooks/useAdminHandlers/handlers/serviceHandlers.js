import { createServiceAdmin, deleteServiceAdmin, updateServiceAdmin } from '../../../utils/api';
import { showToast } from '../utils/toastHelper';

export const createServiceHandlers = (setServices, toast) => ({
  add: async (newService) => {
    if (!newService.name.trim() || !newService.description.trim()) return;

    try {
      const addedService = await createServiceAdmin(newService);
      setServices(prev => [...prev, addedService]);
      showToast(toast, { title: 'Servicio añadido', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo agregar el servicio',
        status: 'error'
      });
    }
  },

  delete: async (id) => {
    try {
      await deleteServiceAdmin(id);
      setServices(prev => prev.filter(s => s._id !== id));
      showToast(toast, { title: 'Servicio eliminado', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo eliminar el servicio',
        status: 'error'
      });
    }
  },

  edit: async (service) => {
    const newName = window.prompt("Ingrese nuevo nombre:", service.name);
    if (!newName) return;

    const newDescription = window.prompt("Ingrese nueva descripción:", service.description);
    if (newDescription === null) return;

    try {
      const updated = await updateServiceAdmin(service._id, {
        name: newName,
        description: newDescription
      });

      setServices(prev => prev.map(s =>
        s._id === service._id ? updated : s
      ));

      showToast(toast, { title: 'Servicio actualizado', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo actualizar el servicio',
        status: 'error'
      });
    }
  }
});