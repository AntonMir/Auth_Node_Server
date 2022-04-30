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

export default function Register() {

    const auth = useContext(AuthContext)

    const message = useMessage();

    const { request, error, clearError, isLoading } = useHttp();

    const [form, setForm] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]);

    const changeUserData = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            // регистрируемся
            await request({
                url: `${config.authServerUrl}/api/user/registration`,
                method: 'POST',
                body: { ...form }
            })

            // если зарегались успешно, сразу вхдим
            const authData = await request({
                url: `${config.authServerUrl}/api/user/auth`,
                method: 'POST',
                body: { email: form.email, password: form.password }
            })
            auth.login(
                authData.id,
                authData.name,
                authData.email,
                authData.tokens.accessToken,
                authData.tokens.refreshToken
            )
        } catch (error) {
        }
    }

    return (
        <RegisterWrapper>
            <H1>Регистрация</H1>
            <RegForm>

                <Input
                    placeholder="Name"
                    id="register-name"
                    type="text"
                    name="name"
                    onChange={changeUserData}
                />

                <Input
                    placeholder="Email"
                    id="register-email"
                    type="text"
                    name="email"
                    onChange={changeUserData}
                />

                <Input
                    placeholder="Password"
                    id="register-password"
                    type="password"
                    name="password"
                    onChange={changeUserData}
                />


                <Button
                    onClick={registerHandler}
                    disabled={isLoading}
                >Регистрация</Button>
            </RegForm>
        </RegisterWrapper>
    )
}

const RegisterWrapper = styled.div`
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

const RegForm = styled.div`
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