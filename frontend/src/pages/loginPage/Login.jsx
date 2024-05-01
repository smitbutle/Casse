import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Link, HStack } from '@chakra-ui/react';
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
      alert('Network error - testing phase');
      props.onLoginSuccess();
    }
  };

  const routeToSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="#f8f8f8">
      <HStack>
      <Stack spacing={4} w="300px" bg="white" p={6} rounded="md" boxShadow="md" >
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required size="sm"
            rounded="md" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required size="sm"
            rounded="md" />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="sm"
          rounded="md" onClick={handleSubmit}>
          Login
        </Button>
        <Button size="sm"
          rounded="md" onClick={routeToSignUp}>
          <Link>Sign Up</Link>
        </Button>
      </Stack>
      </HStack>
    </Box>
  );
};

export default Login;