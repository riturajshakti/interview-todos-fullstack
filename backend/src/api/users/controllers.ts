import { Request, Response } from 'express'
import { IUser, User } from './models'
import helpers from '../../utils/helpers'

async function postUser(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body
		let user = await User.findOne({ email })
		if (user) {
			return res.status(409).json({ message: 'user already exist with this email' })
		}

		user = await User.create({
			name,
			email,
			password: helpers.getHash(password),
		})

		// @ts-ignore
		user.password = undefined

		return res.status(201).json({ user })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function getProfile(req: Request, res: Response) {
	try {
		let user = res.locals.user as IUser

		// @ts-ignore
		user.password = undefined

		return res.json({ user })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function patchUser(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body
		let user = res.locals.user as IUser

		if (email) {
			let user = await User.findOne({ email })
			if (user) {
				return res.status(409).json({ message: 'user with this email already exist' })
			}
		}

		if (!name && !email && !password) {
			return res.json({ message: 'nothing to update' })
		}

		user.name = name ?? user.name
		user.email = email ?? user.email
		user.password = password ? helpers.getHash(password) : user.password
		await user.save()

		let token: string | undefined
		if (email || password) {
			token = helpers.getToken(user)
		}

		return res.json({ token, message: 'user updated successfully' })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

const controllers = {
	postUser,
	getProfile,
	patchUser,
}

export default controllers
