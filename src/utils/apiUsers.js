// src/utils/apiUsers.js
import api from './api'  // tu instancia axios con baseURL http://localhost:3000/api/v1

/**
 * Actualiza un usuario (propio o cualquier otro si eres admin)
 * @param {string} id 
 * @param {{ name?: string, email?: string, role?: string, ... }} data 
 */
export const updateUser = (id, data) => {
  // Nota: tu back define PUT en /perfil/users/:id
  return api.put(`/perfil/users/${id}`, data)
}

/**
 * Elimina un usuario (propio o cualquier otro si eres admin)
 * @param {string} id 
 */
export const deleteUser = (id) => {
  return api.delete(`/perfil/users/${id}`)
}
