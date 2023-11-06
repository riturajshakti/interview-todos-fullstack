import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { showErrorSnack, showSuccessSnack } from '../stores/application'

const backend = import.meta.env.VITE_BACKEND_URL

export default function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [remember, setRemember] = React.useState(true)
	const [showPassword, setShowPassword] = React.useState(false)
	const dispatch = useDispatch()

	async function login() {
		const res = await fetch(backend + '/auth/login', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password, remember }),
		})
		const json = await res.json()

		if (!res.ok) {
			return dispatch(showErrorSnack(json.message))
		}

		dispatch(showSuccessSnack('Login successful!'))
		localStorage.setItem('token', json.token)
		navigate('/')
	}

	return (
		<>
			<Box padding={3} maxWidth={700} sx={{ mx: 'auto' }}>
				<Typography variant='h2' gutterBottom sx={{ mb: 4 }}>
					Login
				</Typography>

				<TextField
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label='Email'
					type='email'
					variant='filled'
					fullWidth
					sx={{ mb: 3 }}
				/>

				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type={showPassword ? 'text' : 'password'}
					label='Password'
					variant='filled'
					fullWidth
					sx={{ mb: 2 }}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => setShowPassword((e) => !e)}
									onMouseDown={(e) => e.preventDefault()}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<FormControlLabel
					control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
					label='Stay logged in'
					sx={{ mb: 3 }}
				/>

				<Button
					disabled={!email || !password}
					variant='contained'
					size='large'
					sx={{
						display: 'block',
						borderRadius: '50px',
						px: '50px',
						mx: 'auto',
						mb: 2,
					}}
					onClick={login}
				>
					Login
				</Button>

				<Link to='/register' style={{ textDecoration: 'none', marginTop: '20px' }}>
					<Typography variant='body1' gutterBottom sx={{ textAlign: 'center', color: 'blue' }}>
						Click here to register
					</Typography>
				</Link>
			</Box>
		</>
	)
}
