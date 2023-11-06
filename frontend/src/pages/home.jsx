import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, IconButton, TextField } from '@mui/material'
import { Add as AddIcon, Clear as ClearIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { showErrorSnack, showSuccessSnack } from '../stores/application'
import { addTodo, deleteTodo, setTodos, toggleTodo } from '../stores/todos'
import { useDispatch, useSelector } from 'react-redux'

const backend = import.meta.env.VITE_BACKEND_URL

const activeTodoStyles = {
	bgcolor: 'rgb(232, 232, 255)',
	color: 'blue',
}

const inactiveTodoStyles = {
	bgcolor: 'rgb(225, 225, 225)',
	color: 'grey',
	textDecoration: 'line-through',
}

export default function Home() {
	const navigate = useNavigate()
	const [task, setTask] = React.useState('')
	const dispatch = useDispatch()
	const { todos } = useSelector((state) => state.todos)

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			return navigate('/login')
		}
		fetchTodos()
	}, [])

	async function fetchTodos() {
		const token = localStorage.getItem('token')
		const res = await fetch(backend + '/todos', {
			method: 'GET',
			headers: { authorization: `Bearer ${token}` },
		})
		const json = await res.json()

		if (!res.ok) {
			dispatch(showErrorSnack(json.message))
			if (res.status === 401) {
				navigate('/login')
			}
			return
		}

		dispatch(setTodos(json.todos))
	}

	function logout() {
		localStorage.removeItem('token')
		navigate('/login')
		dispatch(showSuccessSnack('You are logged out successfully!'))
	}

	const addTodoCallback = async () => {
		const token = localStorage.getItem('token')
		const res = await fetch(backend + '/todos', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify({ task }),
		})
		const json = await res.json()

		if (!res.ok) {
			dispatch(showErrorSnack(json.message))
			if (res.status === 401) {
				navigate('/login')
			}
			return
		}

		dispatch(addTodo(json.todo))
		setTask('')
	}

	const toggleTodoCallback = async (todo) => {
		const token = localStorage.getItem('token')
		const res = await fetch(backend + '/todos/' + todo._id, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify({ done: !todo.done }),
		})
		const json = await res.json()

		if (!res.ok) {
			dispatch(showErrorSnack(json.message))
			if (res.status === 401) {
				navigate('/login')
			}
			return
		}

		dispatch(toggleTodo(todo))
	}

	const deleteTodoCallback = async (todo) => {
		const token = localStorage.getItem('token')
		const res = await fetch(backend + '/todos/' + todo._id, {
			method: 'DELETE',
			headers: { authorization: `Bearer ${token}` },
		})

		if (!res.ok) {
			dispatch(showErrorSnack(json.message))
			if (res.status === 401) {
				navigate('/login')
			}
			return
		}

		dispatch(deleteTodo(todo))
	}

	return (
		<>
			<Box padding={3} maxWidth={700} sx={{ mx: 'auto' }}>
				<Typography variant='h2' gutterBottom sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
					<span>My Todos</span>
					<span>
						<Button
							variant='contained'
							size='small'
							color='error'
							sx={{ borderRadius: '50px', px: '20px' }}
							startIcon={<LogoutIcon />}
							onClick={logout}
						>
							Logout
						</Button>
					</span>
				</Typography>

				<Box sx={{ display: 'flex', mb: 3 }}>
					<TextField
						onChange={(e) => setTask(e.target.value)}
						value={task}
						label='Enter the task'
						size='small'
						variant='filled'
						fullWidth
						sx={{ mr: 1 }}
					/>
					<Button
						variant='contained'
						size='small'
						disabled={!task}
						sx={{ borderRadius: '50px', px: '40px' }}
						startIcon={<AddIcon />}
						onClick={addTodoCallback}
					>
						ADD
					</Button>
				</Box>

				{todos.map((todo) => (
					<Box key={todo._id}>
						<Typography
							onClick={() => toggleTodoCallback(todo)}
							variant='h6'
							gutterBottom
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mb: 4,
								p: 2,
								px: 4,
								borderRadius: 4,
								...(todo.done ? inactiveTodoStyles : activeTodoStyles),
							}}
						>
							<span>{todo.task}</span>
							<IconButton
								color='error'
								sx={{ width: '50px', height: '50px' }}
								onClick={(e) => {
									e.stopPropagation()
									deleteTodoCallback(todo)
								}}
							>
								<ClearIcon />
							</IconButton>
						</Typography>
					</Box>
				))}
			</Box>
		</>
	)
}
