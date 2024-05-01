import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

var host = "localhost"
var port = "8000"


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
      const response = await fetch(`http://${host}:${port}/api/signup`, {
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <HStack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} w="300px" bg="white" p={6} rounded="md" boxShadow="md">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                size="sm"
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
                size="sm"
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
                size="sm"
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
                size="sm"
                rounded="md"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="sm"
              rounded="md">
              Sign Up
            </Button>
            <Button size="sm"
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