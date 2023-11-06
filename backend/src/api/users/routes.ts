import { Router } from 'express'
import validations from './validations'
import controllers from './controllers'
import auth from '../auth/auth'
const router = Router()

router.post('/', validations.postUser, controllers.postUser)

router.get('/', auth.authorizeUser, controllers.getProfile)

router.patch('/', auth.authorizeUser, validations.patchUser, controllers.patchUser)

module.exports = router
