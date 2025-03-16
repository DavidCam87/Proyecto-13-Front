import { useState, useEffect } from 'react';
import { getMecanics } from '../utils/api';
import { useToast } from '@chakra-ui/react';

const useMechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchMechanics = async () => {

      try {
        const data = await getMecanics();
        setMechanics(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load mechanics',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchMechanics();
  }, [toast]);

  return mechanics;
};

export default useMechanics;