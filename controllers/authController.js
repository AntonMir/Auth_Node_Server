const { User, Token } = require('@models/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { updateTokens } = require('@helpers/authHelpers.js')

/**
 * POST /api/auth/signup
 * POST /api/auth/login
 * POST /api/auth/refresh
 */

class AuthController {

    // регистрация
    async signup(req, res) {

        const { name, email, password } = req.body

        if (!name) return res.status(400).json({ message: 'Укажите имя пользователя' })
        if (!email) return res.status(400).json({ message: 'Введите email' })
        if (!password) return res.status(400).json({ message: 'Введите пароль' })

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return res.status(400).json({ message: `Пользователь с email: ${email} уже существует` })
        }

        // хешируем пароль с солью 4(4 круга зашифровки)
        const hashPassword = await bcrypt.hash(password, 4)

        // создаем нового пользователя
        const user = await User.create({ name, email, password: hashPassword })

        // генерим ему токены
        // const newTokens = await updateTokens(user.id)

        // после регистрации отдаем токены на клиент
        return res.status(201).json({message: "Пользователь успешно зарегистрирован"}) 
        // return res.status(201).json({ 
        //     tokens: newTokens, 
        //     email: user.email, 
        //     name: user.name, 
        //     message: "Пользователь успешно зарегистрирован" 
        // }) 
    }


    // вход
    async login(req, res) {   

        const { email, password } = req.body

        if (!email) return res.status(400).json({ message: 'Введите email' })
        if (!password) return res.status(400).json({ message: 'Введите пароль' })

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: 'Пользователь с таким email отсутствует' })

        const comparePussword = await bcrypt.compareSync(password, user.password) // сравниваем 2 пароля

        if (!comparePussword) return res.status(400).json({ message: 'Пароль введен не верно' })

        // генерим ему токены
        const newTokens = await updateTokens(user.id)

        // после регистрации отдаем токены на клиент
        return res.status(201).json({ 
            tokens: newTokens,
            name: user.name,
        }) 
    }


    // Рефреш токен
    async refresh(req, res) {

        const { refreshToken } = req.body
        let payload;
        try {
            // расшифровка
            payload = jwt.verify(refreshToken, process.env.SECRET_KEY)

            if (payload.type !== 'refresh') return res.status(400).json({ message: 'Тип токена отличается от \'refresh\'' })

            //  если tokenId в базе не совпадает с tokenId принятого рефреш токена. . .
            const tokenFromDB = await Token.findOne({ where: { tokenId: payload.id } })

            if (!tokenFromDB) return res.status(400).json({ message: 'Невалидный Refresh токен!' })

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: 'Время жизни Refresh токена истекло' })
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({ message: 'Невалидный Refresh токен!' })
            }
        }
        const token = await Token.findOne({ tokenId: payload.id })

        if (!token) return res.status(404).json({ message: 'Refresh токен отсутствует в базе' })

        const newTokens = await updateTokens(token.userId)

        if (!newTokens) return res.status(404).json({ message: 'Ошибка генерации токенов' })

        return res.status(200).json(newTokens)
    }
}

// экспортируем новый экземпляр класса
module.exports = new AuthController();