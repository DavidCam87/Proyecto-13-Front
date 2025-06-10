import React, { useState } from 'react';
import { Box, VStack, Heading, Select, Button, Input, Text, Spinner, useToast, FormControl, FormLabel, } from '@chakra-ui/react';
import { FaUpload, FaDownload } from 'react-icons/fa'; // Importar iconos
import api from '../../utils/api';

const AdminImportExport = () => {
  const [selectedModel, setSelectedModel] = useState(''); // Modelo seleccionado (user, service, etc.)
  const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado para subir
  const [fileName, setFileName] = useState(''); // Nombre del archivo seleccionado
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const toast = useToast();

  // Opciones para el selector de modelos
  const modelOptions = [
    { value: 'user', label: 'Usuarios' },
    { value: 'service', label: 'Servicios' },
    { value: 'mecanic', label: 'Mecánicos' },
    { value: 'appointment', label: 'Citas' },
  ];

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName('');
    }
  };

  //Subida (Importación)
  const handleUpload = async () => {
    if (!selectedModel || !selectedFile) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona un modelo y un archivo Excel.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoadingUpload(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Se lee response.data y forzamos multipart/form-data
      const { data } = await api.post(
        `/admin/import-excel/${selectedModel}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast({
        title: 'Éxito',
        description: data.message || `Datos de ${selectedModel} importados correctamente.`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });

      // selección después de subir limpia
      setSelectedFile(null);
      setFileName('');
      const fileInput = document.getElementById('excel-upload-input');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error al importar:', error);
      toast({
        title: 'Error de Importación',
        description:
          error.response?.data?.message ||
          error.message ||
          'Ocurrió un problema al subir el archivo.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoadingUpload(false);
    }
  };

  // Descarga (Exportación)
  const handleDownload = async () => {
    if (!selectedModel) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona un modelo para exportar.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoadingDownload(true);

    try {
      const response = await api.get(
        `/admin/export-excel/${selectedModel}`,
        { responseType: 'blob' }
      );

      const disposition = response.headers['content-disposition'];
      let downloadFileName = `${selectedModel}s_export.xlsx`;
      if (disposition && disposition.includes('attachment')) {
        const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
        if (match && match[1]) {
          downloadFileName = match[1].replace(/['"]/g, '');
        }
      }

      //Se crea enlace para descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Éxito',
        description: `Archivo ${downloadFileName} descargado.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al descargar:', error);
      toast({
        title: 'Error de Descarga',
        description:
          error.response?.data?.message ||
          error.message ||
          'Ocurrió un problema al descargar el archivo.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoadingDownload(false);
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack spacing={6} align="stretch">
        <Heading size="md">Importar / Exportar Datos desde Excel</Heading>

        <FormControl isRequired>
          <FormLabel htmlFor="model-select">Selecciona el Tipo de Dato</FormLabel>
          <Select
            id="model-select"
            placeholder="-- Elige un modelo --"
            value={selectedModel}
            onChange={handleModelChange}
          >
            {modelOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Heading size="sm" mb={3}>Importar Datos</Heading>
          <FormControl>
            <Input
              type="file"
              id="excel-upload-input"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button
              as="label"
              htmlFor="excel-upload-input"
              colorScheme="blue"
              cursor="pointer"
              leftIcon={<FaUpload />}
              mr={3}
            >
              Seleccionar Archivo
            </Button>
            {fileName && <Text as="span" verticalAlign="middle">{fileName}</Text>}
          </FormControl>

          <Button
            mt={3}
            colorScheme="green"
            leftIcon={isLoadingUpload ? <Spinner size="sm" /> : <FaUpload />}
            isLoading={isLoadingUpload}
            isDisabled={!selectedModel || !selectedFile || isLoadingUpload}
            onClick={handleUpload}
          >
            Subir e Importar
          </Button>
        </Box>

        <Box>
          <Heading size="sm" mb={3}>Exportar Datos</Heading>
          <Button
            colorScheme="teal"
            leftIcon={isLoadingDownload ? <Spinner size="sm" /> : <FaDownload />}
            isLoading={isLoadingDownload}
            isDisabled={!selectedModel || isLoadingDownload}
            onClick={handleDownload}
          >
            Descargar Excel
          </Button>
        </Box>

      </VStack>
    </Box>
  );
};

export default AdminImportExport;