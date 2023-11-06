require('dotenv').config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import constants from './src/utils/constants'
import colors from './src/utils/colors'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))
app.use('uploads', express.static('uploads'))

app.use(cors())

// user routes
app.use('/api/auth', require('./src/api/auth/routes'))
app.use('/api/users', require('./src/api/users/routes'))
app.use('/api/todos', require('./src/api/todos/routes'))

app.listen(process.env.PORT, async () => {
	console.log(colors.fgBrightGreen + 'INFO: ' + colors.reset + 'Server started!')

	// mongodb setup
	const client = await mongoose.connect(process.env.MONGO_URL!, {
		dbName: process.env.DATABASE!,
	})
	constants.db = client.connection
	console.log(colors.fgBrightGreen + 'INFO: ' + colors.reset + 'Atlas connected!')
})