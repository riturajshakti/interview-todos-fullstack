import { Router } from 'express'
import validations from './validations'
import controllers from './controllers'
import auth from '../auth/auth'
const router = Router()

router.post('/', auth.authorizeUser, validations.postTodo, controllers.postTodo)

router.get('/', auth.authorizeUser, controllers.getTodos)

router.patch('/:id', auth.authorizeUser, validations.patchTodo, controllers.patchTodo)

router.delete('/:id', auth.authorizeUser, validations.deleteTodo, controllers.deleteTodo)

module.exports = router
