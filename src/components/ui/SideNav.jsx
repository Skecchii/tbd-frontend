import { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const NavContainer = styled.div`
    position: fixed;
    top:0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 10%;
    height: 100%;
    background-color: #333;
    transition: all 0.3s ease-in-out;
    z-index: 999;
    display: flex;
    flex-direction: column;
    flex: 1;
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
const NavIconsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const NavIcon = styled.div`
    font-size: 1.5rem;
    margin-left: 1.25rem;
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
const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.25rem;
    &:hover {
        text-decoration: underline;
        color: #66FCF1;
    }
`;
const CartLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: none;
    border-radius: 0;
    font-size: 1.75rem;
    margin-top: auto;
    height: 5%;
    background-color: #1f2833;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
        background-color: #66FCF1;
        color: #333;
    }
`;
const CartIcon = styled(Link)`
    position: relative;
    text-decoration: none;
    color: inherit;
    cursor: default;
    &:hover {
        text-decoration: none;
        color: inherit;
    }
`;
const CartIndicator = styled.div`
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    width: 0.75rem;
    height: 0.75rem;
    background-color: #66FCF1;
    border-radius: 50%;
`;

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const items = useSelector(state => state.cart.items)

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const handleSideNavClick = () => {
        setIsOpen(false)
    }

    return (
        <>
            <NavIconsContainer>
                <NavIcon>
                    <CartIcon to='/cart'>
                        <FaShoppingCart />
                        {items.length > 0 && <CartIndicator />}
                    </CartIcon>
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
            </NavIconsContainer>
            <Overlay isOpen={isOpen} onClick={toggleNav} />
            <NavContainer isOpen={isOpen}>
                <NavHeader>
                    <NavIcon onClick={toggleNav}>
                        <FaTimes />
                    </NavIcon>
                </NavHeader>
                <NavItems>
                    <NavItem>
                        <NavLink to="/" onClick={handleSideNavClick}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="#" onClick={handleSideNavClick}>Products</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="#" onClick={handleSideNavClick}>About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="#" onClick={handleSideNavClick}>Contact Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/create" onClick={handleSideNavClick}>Create Product</NavLink>
                    </NavItem>
                </NavItems>
                <CartLink to="/cart" onClick={handleSideNavClick}>Cart</CartLink>
            </NavContainer>
        </>
    );
};

export default SideNav;