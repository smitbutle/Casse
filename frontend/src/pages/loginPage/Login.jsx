import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Link, HStack, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

var host = "localhost"
var port = "8000"

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(`http://${host}:${port}/api/login`, data);
      if (response.status === 200) {
        props.onLoginSuccess();
        localStorage.setItem("token", response.data.result.token)
        props.setRe(!props.re)
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Network error - Server down');
      // props.onLoginSuccess();
    }
  };

  const routeToSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box display="flex" bg="#f8f8f8"  width="100vw">
      
      <HStack bg="white" height="100vh" width="100vw" rounded="md" boxShadow="md" display="flex" justifyContent="flex-start" alignItems="center" >
      <Box overflow="hidden" height="inherit" >
        <Image src='/cron.png' alt="logo" height="100%" width="100%" />
      </Box>
      <Stack spacing={4} p={16} width="40vw" >
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
            rounded="md" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
            rounded="md" />
        </FormControl>
        <Button type="submit" colorScheme="blue" 
          rounded="md" onClick={handleSubmit}>
          Login
        </Button>
        <Button 
          rounded="md" onClick={routeToSignUp}>
          <Link>Sign Up</Link>
        </Button>
      </Stack>
      </HStack>
    </Box>
  );
};

export default Login;