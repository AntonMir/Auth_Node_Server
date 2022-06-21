const Router = require('express')
const router = new Router()
const authController = require('@controllers/authController.js')
const authCheckAccessJwt = require('@middleware/authCheckAccessJwt.js')

// Регистрация
router.post('/signup', authController.signup)
// вход
router.post('/login', authController.login)
// проверка JWT и отправка нового
router.post('/refresh', authCheckAccessJwt, authController.refresh)

module.exports = router