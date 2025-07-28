import axios from 'axios'

const api = axios.create({
  baseURL: 'https://proyecto-13-back-delta.vercel.app/api/v1'
})
//http://localhost:3000/api/v1
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Funciones para usuarios
export const login = async (credentials) => {
  const response = await api.post('/user/login', credentials)
  return response.data
}

export const register = async (userData) => {
  const response = await api.post('/user/register', userData)
  return response.data
}

export const getServices = async () => {
  const response = await api.get('/service')
  return response.data
}

export const getMecanics = async () => {
  const response = await api.get('/mecanic')
  return response.data
}

export const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointment/newappointment', appointmentData)
  return response.data
}

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointment/${id}`);
  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await api.put(`/appointment/${id}`, appointmentData)
  return response.data
}

export const getFilteredAppointments = async (filters) => {
  const response = await api.get('/appointment', { params: filters })
  return response.data
}

// NUEVAS FUNCIONES ADMIN

//Export-Import

export const importExcel = async (file) => {
  const response = await api.post('/admin/import-excel', file)
  return response.data
}
export const exportExcel = async () => {
  const response = await api.get('/admin/export-excel')
  return response.data
}

// Citas (Appointments)
export const getAllAppointmentsAdmin = async () => {
  const response = await api.get('/admin/appointments')
  return response.data
}

export const updateAppointmentAdmin = async (id, appointmentData) => {
  const response = await api.put(`/admin/appointments/${id}`, appointmentData)
  return response.data
}

export const deleteAppointmentAdmin = async (id) => {
  const response = await api.delete(`/admin/appointments/${id}`)
  return response.data
}

// Usuarios

export const getAllUsersAdmin = async () => {
  const response = await api.get('/admin/users')
  return response.data
}

export const updateUserAdmin = async (id, userData) => {
  const response = await api.put(`/admin/users/${id}`, userData)
  return response.data
}

export const deleteUserAdmin = async (id) => {
  const response = await api.delete(`/admin/users/${id}`)
  return response.data
}

// Mecánicos
export const createMecanicAdmin = async (mecanicData) => {
  const response = await api.post('/admin/mecanics', mecanicData)
  return response.data
}

export const updateMecanicAdmin = async (id, mecanicData) => {
  const response = await api.put(`/admin/mecanics/${id}`, mecanicData)
  return response.data
}

export const deleteMecanicAdmin = async (id) => {
  const response = await api.delete(`/admin/mecanics/${id}`)
  return response.data
}

// Servicios
export const createServiceAdmin = async (serviceData) => {
  const response = await api.post('/admin/services', serviceData)
  return response.data
}

export const updateServiceAdmin = async (id, serviceData) => {
  const response = await api.put(`/admin/services/${id}`, serviceData)
  return response.data
}

export const deleteServiceAdmin = async (id) => {
  const response = await api.delete(`/admin/services/${id}`)
  return response.data
}

export default api