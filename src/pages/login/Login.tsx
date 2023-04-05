import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Api } from '../../shared/services/api/axios-config'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await Api.post('/auth/login', { email, password })
      const token = response.data.data.token
      console.log(token)
      localStorage.setItem('authToken', token)
      navigate('/adm-page')
    } catch (error) {
      setUser(true)
      console.log(error)
    }
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      justifyContent={'center'}
      flexDirection="column"
      gap={3}
      width={'100%'}
      height="100%"
      sx={{ backgroundColor: '#D6EAF8 ' }}
    >
      <Box
        sx={{
          height: 130,
          width: 200,
        }}
        component="img"
        src="https://static.goomer.app/stores/63568/products/mobile_menu/templates/91794/logo_v1600432939.png"
      />
      <Box
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        flexDirection="column"
        p={5}
        borderRadius={2}
        sx={{
          backgroundColor: '#fff ',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          Login
        </Typography>
        {user && <Typography color="red">Usuario não cadastrado</Typography>}
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <TextField
            color="info"
            id="email"
            label="Email"
            type="email"
            value={email}
            margin="normal"
            onChange={handleEmailChange}
            required
            fullWidth
            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            margin="normal"
            onChange={handlePasswordChange}
            required
            fullWidth
            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  )
}
