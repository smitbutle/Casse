import * as React from 'react';
import { Container } from '@mui/material';
import MainHeader from './MainHeader';
import List from '@mui/material/List';
import SchedulerListItem from './SchedulerListItem';
import axios from "axios"

function App() {

  const [schedulers, setSchedulers] = React.useState([]);

  const [re, setRe] = React.useState(false);

  React.useEffect(() => {
    require('dotenv').config()
    let username = process.env.REACT_APP_SCHEDULER_USERNAME
    let password = process.env.REACT_APP_SCHEDULER_PASSWORD
    let host = process.env.REACT_APP_SCHEDULER_HOST
    let port = process.env.REACT_APP_SCHEDULER_PORT

    axios({
      baseURL: `http://${host}:${port}/v1/schedulers`,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Basic ${username}:${password}`
      },
      method: 'get',
    }).then((response) => {
      setSchedulers(response.data.schedulers);
    });
  }, [re]);

  return (
    <Container fixed>
      <MainHeader setRe={setRe} re={re}/>
      <List sx={{pt:"7%"}}>
        {schedulers.map((scheduler) => <SchedulerListItem scheduler={scheduler} setRe={setRe} re={re}/>)}
      </List>
    </Container>
  );
}

export default App;
