import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, HStack, Image, Input, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const host = import.meta.env.VITE_HOST;


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${host}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration Successful, Please login with new credentials")
        
      } else {
        alert('Username or email already exists');
      }
    } catch (error) {
      alert('Username or email already exists');
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box display="flex" bg="#f8f8f8" width="100vw">
      
      <HStack bg="white" height="100vh" width="100vw" rounded="md" boxShadow="md" display="flex" justifyContent="flex-start" alignItems="center" >
      <Box overflow="hidden" height="inherit" >
        <Image src='/cron.png' alt="logo" height="100%" />
      </Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} p={16} width="40vw">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                
                rounded="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                
                rounded="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                
                rounded="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                
                rounded="md"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" 
              rounded="md">
              Sign Up
            </Button>
            <Button 
              rounded="md">
              <Link to="/">Login</Link>
            </Button>
          </Stack>
        </form>
      </HStack>
    </Box>
  );
};


export default Signup;