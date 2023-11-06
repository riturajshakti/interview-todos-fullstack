import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { IUser } from '../api/users/models'

function getHash(password: string) {
	const salt = process.env.PASSWORD_SALT!
	const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
	return hash.toString('hex')
}

function getToken(user: IUser, remember: boolean = false): string {
	const { _id, email, password } = user
	const expiry = remember ? undefined : { expiresIn: '24h' }
	const payload = { _id, email, hash: password.slice(-10) }
	const token = jwt.sign(payload, process.env.JWT_SECRET!, expiry)
	return token
}

const helpers = {
	getHash,
	getToken,
}

export default helpers
