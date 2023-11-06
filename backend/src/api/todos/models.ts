import { Schema, model, Document } from 'mongoose'
import { IUser } from '../users/models'

const TodoSchema = new Schema(
	{
		task: {
			type: String,
			required: true,
		},
		done: Boolean,
		user: {
			type: String,
			required: true,
      ref: 'User'
		},
	},
	{ versionKey: false, timestamps: true }
)

export interface ITodo extends Document {
	_id: Schema.Types.ObjectId
	task: string
	done?: boolean
	user: IUser | string
  createdAt: Date
  updatedAt: Date
}

export const Todo = model('Todo', TodoSchema, 'todos')
