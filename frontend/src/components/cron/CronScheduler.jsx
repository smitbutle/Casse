import MainHeader from './MainHeader';
import SchedulerListItem from '../SchedulerListItem';
import {
  Container,
  List,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';



function CronScheduler({schedulers,  re, setRe}) {

  return (localStorage.getItem("token") == null || localStorage.getItem("token") == '') ? <Navigate to="/" /> :
    <Container maxW="container.xl">
      <MainHeader setRe={setRe} re={re}/>
      <List mt={4} spacing={4}>
        {schedulers.map((scheduler) => (
          <SchedulerListItem key={scheduler.id} scheduler={scheduler} setRe={setRe} re={re}/>
        ))}
      </List>
    </Container>
}

export default CronScheduler;
