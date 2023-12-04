import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registerUser } from './signupApi';
import { User } from '../model/common';
import { useDispatch } from "react-redux"
import { SET_SESSION } from '../redux';


const Signup: React.FC = () => {
    const [registrationData, setRegistrationData] = useState<User>({
        user_id: -1,
        username: '',
        email: '',
        password: ''
      });


  const [error, setError] = useState<{ message?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Appeler la fonction registerUser ici
    registerUser(
      registrationData,
      (session) => {
        // Gérer le résultat (par exemple, rediriger l'utilisateur vers une page de connexion)
        console.log('User registered successfully:', session);
        dispatch(SET_SESSION(session));
        navigate('/messages');
      },
      (registrationError) => {
        // Gérer les erreurs (par exemple, afficher un message d'erreur)
        setError({ message: registrationError.message });
      }
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name+" "+value);
  };

  return (
    <Box p={4} maxW="xl" mx="auto" width="30%" mt="5em">
      <Heading mb={4} textAlign="center" size="lg">
        Inscription
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            placeholder="Enter your username"
            value={registrationData.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={registrationData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={registrationData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" width="100%" colorScheme="teal">
          Inscription
        </Button>
      </form>

      {/* Display errors similar to the login form */}
      {error.message && (
        <Box mt={4} color="red.500">
          <span>{error.message}</span>
        </Box>
      )}

      <Box mt={4} textAlign="center">
        <span>Vous avez déjà un compte ?</span>{' '}
        <Link as={RouterLink} to="/login" color="teal.500">
          Connectez-vous
        </Link>
      </Box>
    </Box>
  );
};

export default Signup;
