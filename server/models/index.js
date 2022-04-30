const sequelize = require('@root/db.js')
const { DataTypes } = require('sequelize')
const User = require('@models/user.js')
const Token = require('@models/token.js')



module.exports = { User, Token }