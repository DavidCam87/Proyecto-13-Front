import { useEffect, useState } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Spinner, Center, useToast, } from '@chakra-ui/react';
import MotionBox from '../components/MotionBox';
import AdminAppointments from '../components/adminComponents/AdminAppointments';
import AdminUsers from '../components/adminComponents/AdminUsers';
import AdminMechanics from '../components/adminComponents/AdminMechanics';
import AdminServices from '../components/adminComponents/AdminServices';
import AdminImportExport from '../components/adminComponents/AdminImportExport';
import { useAdminHandlers } from '../hooks/useAdminHandlers/useAdminHandlers';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [mecanics, setMecanics] = useState([]);
  const [services, setServices] = useState([]);
  const [newMecanic, setNewMecanic] = useState('');
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const {
    fetchInitialData,
    handleAppointment,
    handleUser,
    handleMecanic,
    handleService,
  } = useAdminHandlers(
    { setAppointments, setUsers, setMecanics, setServices },
    toast
  );

  useEffect(() => {
    (async () => {
      try {
        await fetchInitialData();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudo cargar datos iniciales',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchInitialData, toast]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return (
      <Center minH="70vh">
        <Spinner size="xl" label="Cargando panel de administración…" />
      </Center>
    );
  }

  return (
    <MotionBox variants={containerVariants} initial="hidden" animate="visible">
      <Box p={4}>
        <Heading mb={4}>Panel de Administración</Heading>
        <Tabs isFitted variant="enclosed">
          <TabList display="flex" flexWrap="wrap">
            <Tab>Citas</Tab>
            <Tab>Usuarios</Tab>
            <Tab>Mecánicos</Tab>
            <Tab>Servicios</Tab>
            <Tab>Importar / Exportar</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdminAppointments
                appointments={appointments}
                onEdit={handleAppointment.edit}
                onDelete={handleAppointment.delete}
              />
            </TabPanel>
            <TabPanel>
              <AdminUsers
                users={users}
                onEdit={handleUser.edit}
                onDelete={handleUser.delete}
              />
            </TabPanel>
            <TabPanel>
              <AdminMechanics
                mechanics={mecanics}
                newMecanic={newMecanic}
                setNewMecanic={setNewMecanic}
                onAdd={() => handleMecanic.add(newMecanic)}
                onEdit={handleMecanic.edit}
                onDelete={handleMecanic.delete}
              />
            </TabPanel>
            <TabPanel>
              <AdminServices
                services={services}
                newService={newService}
                setNewService={setNewService}
                onAdd={() => handleService.add(newService)}
                onEdit={handleService.edit}
                onDelete={handleService.delete}
              />
            </TabPanel>
            <TabPanel>
              <AdminImportExport />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MotionBox>
  );
};

export default AdminDashboard;