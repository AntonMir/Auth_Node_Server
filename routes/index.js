const Router = require('express')
const router = new Router()

const user = require('@routes/user.js')

router.use('/user', user)

module.exports = router