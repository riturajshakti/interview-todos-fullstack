import { Request, Response, NextFunction } from 'express'
import { validate } from 'super-easy-validator'

function postTodo(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			task: 'string|min:5',
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

function patchTodo(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			task: 'optional|string|min:5',
      done: 'optional|boolean',
      id: 'mongoid'
		}

		const { errors } = validate(rules, {...req.body, ...req.params})
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

function deleteTodo(req: Request, res: Response, next: NextFunction) {
	try {
		const { errors } = validate({id: 'mongoid'}, req.params)
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
	postTodo,
	patchTodo,
  deleteTodo,
}

export default validations
