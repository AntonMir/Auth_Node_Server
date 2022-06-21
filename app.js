require('dotenv').config()
require('module-alias/register')
const express = require('express')
const sequelize = require('@root/db.js')
const models = require('@models/index.js')
const cors = require('cors')
const routes = require('@routes/index.js')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api', routes)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log('!!!', 'Error:', error.message);
    }
}

start() // запуск сервера с подключением