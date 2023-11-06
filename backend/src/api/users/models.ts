import { Schema, model, Document } from 'mongoose'

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

export interface IUser extends Document {
	_id: Schema.Types.ObjectId
	name: string
	email: number
	password: string
	createdAt: Date
  updatedAt: Date
}

export const User = model('User', UserSchema, 'users')
