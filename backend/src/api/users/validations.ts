import { Request, Response, NextFunction } from 'express'
import { validate } from 'super-easy-validator'

function postUser(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			name: 'string|min:3',
			email: 'email',
			password: 'string|min:3',
		}
		const { errors } = validate(rules, req.body)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}
		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

function patchUser(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			name: 'optional|string|min:3',
			email: 'optional|email',
			password: 'optional|string|min:3',
		}

		const { errors } = validate(rules, req.body)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

const validations = {
	postUser,
	patchUser,
}

export default validations
