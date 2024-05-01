import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/loginPage/Login';
import Signup from './pages/loginPage/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import CronScheduler from './components/cron/CronScheduler';
import MyFunction from './pages/myFunction/MyFunction';
import Notification from './pages/notification/Notification';
import FunctionList from './components/FunctionList';
import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';

var host = "localhost"
var port = "8000"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [re, setRe] = useState(false);
  const [schedulers, setSchedulers] = useState([]);


  const handleLoginSuccess = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    axios({
      baseURL: `http://${host}:${port}/api/jobs`,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      method: 'get',
    }).then((response) => {
      setSchedulers(response.data);
    });
  }, [re]);


  const { setColorMode } = useColorMode();

  useEffect(() => {
    const dataTheme = document.documentElement.getAttribute("data-theme");

    if (dataTheme === "light") {
      setColorMode("light");
    } else {
      setColorMode("light");
    }

    if (localStorage.getItem("token")) {
      handleLoginSuccess();
    }

  }, []);




  return (
    <Router>
      <div>
        {isLoggedIn && (
          <div>
            <NavBar handleLoginSuccess={handleLoginSuccess} />
            <Footer />
          </div>
        )}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={isLoggedIn ? <Dashboard schedulers={schedulers} /> : <Login onLoginSuccess={handleLoginSuccess} setIsLoggedIn={setIsLoggedIn} re={re} setRe={setRe}/>} />
          <Route path="/cron" element={<CronScheduler schedulers={schedulers} re={re} setRe={setRe} />} />
          <Route path="/myFunction" element={<MyFunction />} />
          <Route path="/listFunctions" element={<FunctionList />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;