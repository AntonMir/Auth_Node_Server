const { User, Token } = require('@models/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { updateTokens } = require('@helpers/authHelpers.js')

/**
 * POST /api/user/registration
 * POST /api/user/auth
 * POST /api/user/refresh
 * GET /api/user/list
 */


class UserController {

    // регистрация
    async registration(req, res) {
        const { name, email, password } = req.body

        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Введены некорректные данные email или password при регистрации' })
        }

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return res.status(400).json({ message: `Пользователь с email: ${email} уже существует` })
        }

        // хешируем пароль с солью 4(4 круга зашифровки)
        const hashPassword = await bcrypt.hash(password, 4)

        // создаем нового пользователя
        const user = await User.create({ email, password: hashPassword, name })

        // генерим ему токены
        // const tokens = await updateTokens(user.id)

        // return res.status(201).json({ tokens, email: user.email, name: user.name }) // после регистрации отдаем токен на клиент
        return res.status(201).json({ message: "Пользователь успешно зарегистрирован" })
    }



    // вход
    async auth(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Введены некорректные данные email или password при попытке входа' })
        }

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).json({ message: 'Пользователь с таким email отсутствует' })
        }

        const comparePussword = await bcrypt.compareSync(password, user.password) // сравниваем 2 пароля

        if (!comparePussword) {
            return res.status(400).json({ message: 'Пароль введен не верно' })
        }

        // генерим ему токены
        const tokens = await updateTokens(user.id)

        return res.status(201).json({ id: user.id, email: user.email, name: user.name, tokens }) // после регистрации отдаем токены на клиент
    }

    // Рефреш токен
    async refreshTokens(req, res) {

        const { refreshToken } = req.body
        let payload;
        try {
            payload = jwt.verify(refreshToken, process.env.SECRET_KEY)

            if (payload.type !== 'refresh') {
                return res.status(400).json({ message: 'Тип токена отличается от \'refresh\'' })
            }

            //  если tokenId в базе не совпадает с tokenId принятого рефреш токена. . .
            const tokenFromDB = await Token.findOne({ where: { tokenId: payload.id } })

            if (!tokenFromDB) {
                return res.status(400).json({ message: 'Невалидный Refresh токен!' })
            }

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: 'Время жизни Refresh токена истекло' })
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({ message: 'Невалидный Refresh токен!' })
            }
        }
        const token = await Token.findOne({ tokenId: payload.id })

        if (!token) {
            return res.status(404).json({ message: 'Refresh токен отсутствует в базе' })
        }

        const tokens = await updateTokens(token.userId)

        if (!tokens) {
            return res.status(404).json({ message: 'Ошибка генерации токенов' })
        }

        return res.status(200).json(tokens)
    }

    async getAll(req, res) {
        try {
            const users = await User.findAll()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка получения списка пользователей" })
        }
    }
}

// экспортируем новый экземпляр класса
module.exports = new UserController();