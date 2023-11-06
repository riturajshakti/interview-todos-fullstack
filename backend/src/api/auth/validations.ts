import { Request, Response, NextFunction } from 'express'
import { validate } from 'super-easy-validator'

function postLogin(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			email: 'string|min:3',
			password: 'string|min:3',
			remember: 'optional|boolean',
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
	postLogin,
}

export default validations
