const sequelize = require('@root/db.js')
const { DataTypes } = require('sequelize')

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tokenId: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER }
})

module.exports = Token