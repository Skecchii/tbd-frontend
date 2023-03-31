import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

const NavContainer = styled.div`
    position: fixed;
    top:0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 10%;
    height: 100%;
    background-color: #333;
    transition: all 0.3s ease-in-out;
    z-index: 999;
`;
const Overlay = styled.div`
    position: fixed;
    top: 0;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 998;
    left: 0;
`;
const NavHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: .5rem;
`;
const NavIcon = styled.div`
    font-size: 1.5rem;
    margin-left: auto;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
        color: #66FCF1;
    }
`;
const NavItems = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

const NavItem = styled.li`
    margin: .5rem 0;
`;
const NavLink = styled.a`
    color: #fff;
    text-decoration: none;
    font-size: 1.25rem;

    &:hover {
        text-decoration: underline;
        color: #66FCF1;
    }
`;
const CartIcon = styled(FaShoppingCart)`
`;
const ButtonContainer = styled.button`
    display: flex;
    height: 65rem;
    background: none;
    border: none;
`;
const CartButton = styled.button`
    color: #333;
    border: none;
    border-radius: 0;
    font-size: 1.25rem;
    padding: .125rem 3.25rem;
    margin-top: auto;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #66FCF1;
    }
`;

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <NavIcon>
                <CartIcon />
            </NavIcon>
            <NavIcon onClick={toggleNav}>
                {isOpen ? (
                    <>
                        <FaTimes />
                    </>
                ) : (
                    <>
                        <FaBars />
                    </>
                )}
            </NavIcon>
            <Overlay isOpen={isOpen} onClick={toggleNav} />
            <NavContainer isOpen={isOpen}>
                <NavHeader>
                    <NavIcon onClick={toggleNav}>
                        <FaTimes />
                    </NavIcon>
                </NavHeader>
                <NavItems>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Products</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Contact Us</NavLink>
                    </NavItem>
                    <ButtonContainer>
                        <CartButton>Cart</CartButton>
                    </ButtonContainer>
                </NavItems>
            </NavContainer>
        </>
    );
};

export default SideNav;
