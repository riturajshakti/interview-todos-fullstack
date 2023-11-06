import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { showSuccessSnack, showErrorSnack, showInfoSnack } from '../stores/application'
import { useDispatch } from 'react-redux'

const backend = import.meta.env.VITE_BACKEND_URL

export default function Register() {
	const navigate = useNavigate()
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [confirmPassword, setConfirmPassword] = React.useState('')
	const [showPassword, setShowPassword] = React.useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
	const dispatch = useDispatch()

	async function register() {
		const res = await fetch(backend + '/users', {
			method: 'POST',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({name, email, password})
		})
		const json = await res.json()

		if(!res.ok) {
			return dispatch(showErrorSnack(json.message))
		}

		dispatch(showSuccessSnack('Account created successfully!'))
		navigate('/login')
	}

	return (
		<>
			<Box padding={3} maxWidth={700} sx={{ mx: 'auto' }}>
				<Typography variant='h2' gutterBottom sx={{ mb: 4 }}>
					Register
				</Typography>

				<TextField value={name}
					onChange={(e) => setName(e.target.value)} label='Name' variant='filled' fullWidth sx={{ mb: 3 }} />

				<TextField value={email}
					onChange={(e) => setEmail(e.target.value)} label='Email' type='email' variant='filled' fullWidth sx={{ mb: 3 }} />

				<TextField
				value={password}
				onChange={(e) => setPassword(e.target.value)}
					type={showPassword ? 'text' : 'password'}
					label='Password'
					variant='filled'
					fullWidth
					sx={{ mb: 3 }}
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

				<TextField
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
					type={showConfirmPassword ? 'text' : 'password'}
					label='Confirm Password'
					variant='filled'
					fullWidth
					sx={{ mb: 2 }}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => setShowConfirmPassword((e) => !e)}
									onMouseDown={(e) => e.preventDefault()}
									edge='end'
								>
									{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<Button
					variant='contained'
					size='large'
					sx={{
						display: 'block',
						borderRadius: '50px',
						px: '50px',
						mx: 'auto',
						mb: 2
					}}
					disabled={!name || !email || !password || password !== confirmPassword}
					onClick={register}
				>
					Register
				</Button>

				<Link to='/login' style={{ textDecoration: 'none', marginTop: '20px' }}>
						<Typography variant='body1' gutterBottom sx={{ textAlign: 'center', color: 'blue' }}>
							Click here to Login
						</Typography>
					</Link>
			</Box>
		</>
	)
}

