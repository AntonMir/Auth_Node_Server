const Router = require('express')
const router = new Router()

const auth = require('@routes/auth.js')

router.use('/auth', auth)

module.exports = router