import api from './api'

/**
 * @param {string} id 
 * @param {{ name?: string, email?: string, role?: string, ... }} data 
 */
export const updateUser = (id, data) => {
  return api.put(`/perfil/users/${id}`, data)
}

/**
 * @param {string} id 
 */
export const deleteUser = (id) => {
  return api.delete(`/perfil/users/${id}`)
}
