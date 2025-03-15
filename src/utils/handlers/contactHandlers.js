export const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

export const handleSubmit = (e) => {
  e.preventDefault();
  // Construir el enlace mailto con los datos del formulario
  const mailtoLink = `mailto:tu-email@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
    `Nombre: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  )}`;
  window.location.href = mailtoLink;
};

export const handleWhatsApp = () => {
  // Reemplaza el número con el tuyo (sin símbolos ni espacios, por ejemplo: 1234567890)
  const phone = '1234567890';
  const message = 'Hola, me gustaría contactar con ustedes.';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
};
