import React, { useState } from 'react';
// conponents
import Login from '@components/authPage/elements/Login.js';
import Register from '@components/authPage/elements/Register.js';
// redux
import { store } from '@store/store.js'
// img
/// styled
import styled from 'styled-components';


export default function AuthPage() {

    const [chosenForm, setChosenForm] = useState(store.getState().authPageChosenForm);

    const choseLogin = () => {
        setChosenForm('login');
    }

    const choseRegister = () => {
        setChosenForm('register');
    }

    store.subscribe(() => setChosenForm(store.getState().authPageChosenForm))

    return (
        <AuthPageStyled>
            <AuthForms>
                <ButtonsWrapper>
                    <Button
                        style={chosenForm === 'login' ? { borderBottom: 'none', borderRight: 'none' } : {}}
                        onClick={choseLogin}
                    >
                        Вход
                    </Button>
                    <Button
                        style={chosenForm === 'register' ? { borderBottom: 'none', borderLeft: 'none' } : {}}
                        onClick={choseRegister}>
                        Регистрация
                    </Button>
                </ButtonsWrapper>
                {chosenForm === 'login' ? <Login /> : <Register />}
            </AuthForms>
        </AuthPageStyled>
    )

}


const AuthPageStyled = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`

const AuthForms = styled.div`
    min-width: 500px;
    margin: auto;
    background-color: #fff;
`

const ButtonsWrapper = styled.div`
    display: flex;
    margin: 0;
    z-index: 1;
`

const Button = styled.div`
    text-align: center;
    font-size: calc(0.8vw + 8px);
    cursor: pointer;
    border: 1px #aaa solid;
    padding: 10px 40px;
    flex: 1;

    &:nth-of-type(1) {
        border-radius: 10px 0 10px 0;
    }
    &:nth-of-type(2) {
        border-radius: 0 10px 0 10px;
    }
`