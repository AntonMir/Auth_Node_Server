const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const { Token } = require('@models/index.js')



function generateAccessToken(userId) {
    const payload = {
        userId,
        type: 'access'
    }
    const secret = process.env.SECRET_KEY
    const expires = { expiresIn: '10s' }

    return jwt.sign(payload, secret, expires)
}

function generateRefreshToken() {
    const payload = {
        id: uuidv4(),
        type: 'refresh'
    }
    const secret = process.env.SECRET_KEY
    const expires = { expiresIn: '1h' }

    return {
        id: payload.id,
        token: jwt.sign(payload, secret, expires)
    }
}

const replaceDbRefreshToken = (tokenId, userId) =>
    Token.destroy({ where: { userId } })
        .then(() => Token.create({ tokenId, userId }))

const updateTokens = (userId) => {
    const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken()

    return replaceDbRefreshToken(refreshToken.id, userId)
        .then(() => ({
            access_token: accessToken,
            refresh_token: refreshToken.token
        }))
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
    updateTokens
}