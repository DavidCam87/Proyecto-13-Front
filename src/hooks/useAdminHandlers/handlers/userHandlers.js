import { deleteUserAdmin, updateUserAdmin } from '../../../utils/api';
import { showToast } from '../utils/toastHelper';

export const createUserHandlers = (setUsers, toast) => ({
  delete: async (id) => {
    try {
      await deleteUserAdmin(id);
      setUsers(prev => prev.filter(u => u._id !== id));
      showToast(toast, { title: 'Usuario eliminado', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo eliminar el usuario',
        status: 'error'
      });
    }
  },

  edit: async (user) => {
    const newName = window.prompt("Ingrese nuevo nombre:", user.name);
    if (!newName) return;

    const newEmail = window.prompt("Ingrese nuevo email:", user.email);
    if (!newEmail) return;

    try {
      const updated = await updateUserAdmin(user._id, {
        name: newName,
        email: newEmail,
        role: user.role
      });

      setUsers(prev => prev.map(u =>
        u._id === user._id ? updated : u
      ));

      showToast(toast, { title: 'Usuario actualizado', status: 'success' });
    } catch (error) {
      showToast(toast, {
        title: 'Error',
        description: 'No se pudo actualizar el usuario',
        status: 'error'
      });
    }
  }
});