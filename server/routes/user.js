const Router = require('express')
const router = new Router()
const userController = require('@controllers/userController.js')
const authCheckJwt = require('@middleware/authCheckJwt.js')

// Регистрация
router.post('/registration', userController.registration)
// вход
router.post('/auth', userController.auth)
// проверка JWT и отправка нового
router.post('/refresh', userController.refreshTokens)
// список всех пользователей
router.get('/list', authCheckJwt, userController.getAll)

module.exports = router