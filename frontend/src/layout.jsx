import React from 'react'
import { Outlet } from 'react-router-dom'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { hideSnack } from './stores/application'

function Layout() {
	const { snackMessage, snackOpened, snackType } = useSelector((state) => state.application)
	const dispatch = useDispatch()

	const handleClose = (e, reason) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(hideSnack())
	}

	const action = (
		<React.Fragment>
			<IconButton size='small' color='inherit' onClick={handleClose}>
				<Close fontSize='small' />
			</IconButton>
		</React.Fragment>
	)

	return (
		<div>
			{/* <Nav /> */}
			<Outlet />
			<Snackbar
				open={snackOpened}
				autoHideDuration={6000}
				onClose={handleClose}
				action={action}
			>
        <Alert onClose={handleClose} severity={snackType} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
		</div>
	)
}

export default Layout
