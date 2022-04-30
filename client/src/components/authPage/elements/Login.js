import React, { useState, useEffect, useContext } from 'react';
// castom hook
import { useHttp } from '@hooks/http.hook.js'
import { useMessage } from '@hooks/message.hook.js'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// config
import config from '@config/config.js'
// styled
import styled from 'styled-components';


export default function Login() {

    // используем контекст кторый создали (AuthContext)
    // это нужно, чтобы воспользоваться методом login
    const auth = useContext(AuthContext)

    // кастомный хук для вывоа ошибки
    const message = useMessage();

    // кастомный хук для отправки данных
    const { request, error, clearError, isLoading } = useHttp();

    const [form, setForm] = useState({ email: '', password: '' });

    // обработка ошибки запроса к базе
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]);

    const changeUserData = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // авторизуемся
    const loginHandler = async () => {
        try {
            const data = await request({
                url: `${config.authServerUrl}/api/user/auth`,
                method: 'POST',
                body: { email: form.email, password: form.password }
            })
            auth.login(
                data.id,
                data.name,
                data.email,
                data.tokens.accessToken,
                data.tokens.refreshToken
            )
        } catch (e) { }
    }

    return (
        <LoginWrapper>
            <H1>Вход</H1>
            <LoginForm>
                <Input
                    placeholder="Email"
                    id="login-email"
                    type="text"
                    name="email"
                    onChange={changeUserData}
                />

                <Input
                    placeholder="Password"
                    id="login-password"
                    type="password"
                    name="password"
                    onChange={changeUserData}
                />
                <Button
                    onClick={loginHandler}
                    disabled={isLoading}
                >Войти</Button>
            </LoginForm>
        </LoginWrapper>
    )
}

const LoginWrapper = styled.div`
    padding: 20px 100px;
    width: 100%;
    box-shadow: 2 2 5px #000;
    border: 1px #aaa solid;
    border-top: none;
    border-radius: 0 0 10px 10px;
`

const H1 = styled.h1`
    text-align: center;
    font-size: calc(0.9vw + 9px);
    margin: 0 0 20px;
`

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

// использование !import - считается плохой практикой, 
// но в данном случае, перебиваю стандарные стили materialize.css
const Input = styled.input`
    margin-bottom: 30px !important;
    background-color: #fff !important;
    padding: 0 20px !important;
    
    &:focus {
        border-bottom: 1px solid #AAE03D !important;
        box-shadow: 0px 1px 0 0 #AAE03D !important;
    }

    ::placeholder {
        color: #888;
    }
`

const Button = styled.button`
    padding: 5px 25px 10px;
    margin: 15px 0 0 0;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background-color: #fff !important;

    :active {
        box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);        
    }
`