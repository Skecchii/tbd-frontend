import React from 'react';
import styled from 'styled-components';
import SideNav from './SideNav';
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
    background: #0B0C10;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.25rem;
`;
const Logo = styled.h1`
    font-size: 1.5rem;
    color: #c5c6c7;
    font-weight: bold;
    display: inline-block;

    a {
        cursor: default;
        text-decoration: none;
        color: inherit;
        &:hover {
            text-decoration: none;
            color: inherit;
        }
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo><Link to='/'>My App</Link></Logo>
            <SideNav />
        </HeaderContainer>
    );
}

export default Header;
