import { Request, Response } from 'express'
import { IUser } from '../users/models'
import { Todo } from './models'

async function postTodo(req: Request, res: Response) {
	try {
		const { task } = req.body
		const user = res.locals.user as IUser

		const todo = await Todo.create({ task, user: user._id })

		return res.status(201).json({ todo })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function getTodos(req: Request, res: Response) {
	try {
		const user = res.locals.user as IUser

		let todos = await Todo.find({ user: user._id }).sort({ createdAt: -1 })

		return res.json({ todos })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

interface PatchTodoBody {
	task?: string
	done?: boolean
}

async function patchTodo(req: Request, res: Response) {
	try {
		const { task, done } = req.body as PatchTodoBody
		const { id } = req.params
		let user = res.locals.user as IUser

		const todo = await Todo.findOne({ _id: id, user: user._id })
		if (!todo) {
			return res.status(404).json({ message: 'todo not found' })
		}

		if (!task && !done) {
			return res.json({ message: 'nothing to update' })
		}

		todo.task = task ?? todo.task
		todo.done = done ?? todo.done
		await todo.save()

		return res.json({ message: 'todo updated successfully' })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function deleteTodo(req: Request, res: Response) {
	try {
		const { id } = req.params
		let user = res.locals.user as IUser

		const todo = await Todo.findOne({ _id: id, user: user._id })
		if (!todo) {
			return res.status(404).json({ message: 'todo not found' })
		}

		await todo.deleteOne()

		res.statusMessage = 'todo deleted successfully'
		return res.sendStatus(204);
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

const controllers = {
	postTodo,
	getTodos,
	patchTodo,
	deleteTodo,
}

export default controllers
