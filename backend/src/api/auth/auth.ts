import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from '../users/models'

interface UserPayload {
	_id: string
	email: string
	hash: string
}

async function authorizeUser(req: Request, res: Response, next: NextFunction) {
	try {
		const { authorization } = req.headers
		if (!authorization) {
			return res.status(401).json({ message: 'authorization failed' })
		}
		if (!authorization.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'authorization failed' })
		}
		const token = authorization.substring('Bearer '.length)
		const { _id, email, hash } = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
		const user = await User.findOne({ _id, email })
		if (!user) {
			return res.status(404).json({ message: 'user not found' })
		}
		if (user.password.slice(-10) !== hash) {
			return res.status(401).json({ message: 'authorization failed' })
		}
    res.locals.user = user
		return next()
	} catch (error) {
		console.log(error)
		return res.status(401).json({ message: 'authorization failed' })
	}
}

const auth = {
	authorizeUser,
}

export default auth
