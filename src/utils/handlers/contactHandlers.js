export const handleChange = (e, setFormData, formData) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

export const handleSubmit = (e, formData, toast) => { // Asegúrate de que toast esté aquí
  e.preventDefault();
  const mailtoLink = `mailto:tu-email@example.com?subject=${encodeURIComponent(
    formData.subject
  )}&body=${encodeURIComponent(
    `Nombre: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  )}`;
  window.location.href = mailtoLink;
  toast({
    title: "Email abierto",
    description: "Se ha abierto tu cliente de correo electrónico.",
    status: "success",
    duration: 3000,
    isClosable: true,
  });
};

export const handleWhatsApp = (toast) => { // Asegúrate de que toast esté aquí
  const phone = "1234567890";
  const message = "Hola, me gustaría contactar con ustedes.";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
  toast({
    title: "WhatsApp abierto",
    description: "Se ha abierto WhatsApp en una nueva pestaña.",
    status: "success",
    duration: 3000,
    isClosable: true,
  });
};