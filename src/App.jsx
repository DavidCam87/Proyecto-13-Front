import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import MisCitas from './pages/MisCitas'
import Appointment from './pages/Appointment'
import Calendario from './pages/Calendario'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path="/mis-citas" element={<ProtectedRoute><MisCitas /></ProtectedRoute>} />
        <Route path="/calendario" element={<ProtectedRoute><AdminRoute><Calendario /></AdminRoute></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminRoute><AdminDashboard /></AdminRoute></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App