import { Request, Response } from 'express'
import { User } from '../users/models'
import helpers from '../../utils/helpers'

async function postLogin(req: Request, res: Response) {
	try {
		let { email, password, remember } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: 'user not found' })
		}

		const hash = helpers.getHash(password)
		if (user.password !== hash) {
			return res.status(401).json({ message: 'authentication failed' })
		}

		// @ts-ignore
		const token = helpers.getToken(user, remember)

		return res.json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

const controllers = {
	postLogin,
}

export default controllers
