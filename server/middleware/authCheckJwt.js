/**
 * В данном модуле будем декодировать JWT
 * и проверять его на валидность
 */

const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next() // Если параметр запроса отличается от GET, POST, PUT, DELETE, то пропускаем эту мидлвару
    }

    try {

        const accessToken = req.headers.authorization.split(" ")[1] // берем тело токена
        if (!accessToken) {
            // если токена нет, отдаем ошибку
            return res.status(401).json({ message: 'Не авторизован' })
        }

        // Если токен есть, надо расшифровать
        const payload = jwt.verify(accessToken, process.env.SECRET_KEY)

        // decoded - оъект с данными пользователя: email, id, role
        // эти данные полуили из JWT
        // функцией next() передаем их в следующую мидлвару
        req.user = payload
        next()

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ message: 'Время жизни Access токена истекло' })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Невалидный Access токен!' })
        }
        return res.status(401).json({ message: 'Не авторизован' })
    }
}