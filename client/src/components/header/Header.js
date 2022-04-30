import { useContext } from 'react';
// components
import User from '@header/elements/User.js';
import LogOutBtn from '@header/elements/LogOutBtn.js';
// context
import { AuthContext } from '@src/context/AuthContext.js';
// styles
import styled from 'styled-components';


export default function Header() {

    const auth = useContext(AuthContext);

    if (auth.isAuthenticated) {
        return (
            <HeaderWrapper>
                <User />
                <LogOutBtn />
            </HeaderWrapper>
        )
    }

    return (
        <></>
    )

}

const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    background-color: #292929;
    height: 80px;
    padding: 0 3%;
`;