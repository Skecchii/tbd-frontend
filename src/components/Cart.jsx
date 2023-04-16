import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CartContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CartHeading = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const CartList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 500px;
    max-height: 1250px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
        background: #45b6ab;
        border-radius: 10px;
    }
`;


const CartItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.25rem;
    img {
        margin-right: 1rem;
        width: 100px;
        height: 100px;
    }
`;

const EmptyCartMessage = styled.p`
    font-size: 1.75rem;
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemName = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const ItemLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
        color: #66fcf1;
    }
`;

const ItemPrice = styled.p`
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
`;

const RemoveButton = styled.button`
    background-color: transparent;
    color: #66fcf1;
    border: none;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
        color: #45b6ab;
    }
`;

const ClearButton = styled.button`
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
        background-color: #66fcf1;
        color: #333;
    }
`;

const TotalPrice = styled.p`
    font-size: 1.5rem;
    margin-top: 1rem;
    text-align: right;
    width: 100%;
    max-width: 500px;
`;



const Cart = () => {

    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const [showModal, setShowModal] = useState(false);

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id))
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const total = items.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const groupedItems = items.reduce((groups, item) => {
        const existingItem = groups.find(groupedItem => groupedItem._id === item._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            groups.push({ ...item, quantity: 1 });
        }
        return groups;
    }, []);

    return (
        <CartContainer>
            <CartHeading>Cart</CartHeading>
            {items.length === 0 ? (
                <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
            ) : (
                <>
                    <CartList>
                        {groupedItems.map((item, index) => (
                            <CartItem key={`${item._id}-${index}`}>
                                <img src={item.imageUrl} alt={item.name} width="100" height="100" />
                                <ItemDetails>
                                    <ItemLink to={`/product/${item._id}`}>
                                        <ItemName>{item.name}</ItemName>
                                    </ItemLink>
                                    <ItemPrice>${item.price} x {item.quantity}</ItemPrice>
                                    <RemoveButton onClick={() => handleRemoveItem(item._id)}>Remove</RemoveButton>
                                </ItemDetails>
                            </CartItem>
                        ))}
                    </CartList>
                    <TotalPrice>Total: ${total}</TotalPrice>
                    <ClearButton onClick={handleClearCart}>Clear Cart</ClearButton>
                </>
            )}
        </CartContainer>
    );
};

export default Cart