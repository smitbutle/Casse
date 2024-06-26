import { useState, useEffect } from 'react';
import {
  Container,
  List,
} from '@chakra-ui/react';
import axios from "axios";
import SchedulerListItem from './SchedulerListItem';
import MainHeader from './MainHeader';

const host = import.meta.env.VITE_HOST;

function CreateJob() {
  const [schedulers, setSchedulers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${host}/api/alljobs`);
        setSchedulers(response.data.schedulers);
      } catch (error) {
        console.error('Error fetching schedulers:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxW="container.xl">
      <MainHeader />
      <List mt="7%" spacing={4}>
        {schedulers.map((scheduler) => (
          <SchedulerListItem key={scheduler.id} scheduler={scheduler} />
        ))}
      </List>
    </Container>
  );
}

export default CreateJob;
