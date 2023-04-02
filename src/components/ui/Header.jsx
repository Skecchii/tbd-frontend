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
const CreateButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CreateButton = styled.button`
    display: flex;
    justify-content: center;
    color: #fff;
    width: 12rem;
    background-color: #45a29e;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease;

    &:hover {
        background-color: #66fcf1;
        color: #0b0c10;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo><Link to='/'>My App</Link></Logo>
            <CreateButtonContainer>
                <CreateButton>
                    <Link to="/create">Create Product</Link>
                </CreateButton>
            </CreateButtonContainer>
            <SideNav />
        </HeaderContainer>
    );
}

export default Header;
