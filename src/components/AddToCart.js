import React, { useContext, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../context/cart_context';
import { ProductsContext } from '../context/products_context';
import '../styles/addToCart.css';

const AddToCart = () => {
    const { single_product: { inventory: { available } }, single_product: { id } } = useContext(ProductsContext);
    const { addToCart } = useContext(CartContext);
    const [amount, setAmount] = useState(1);
    const [amountAvailable, setAmountAvailable] = useState(available);

    const addToAmount = () => {
        setAmount(prevAmount => prevAmount + 1)
        if (amount === amountAvailable) setAmount(amountAvailable);
    }

    const subtractFromAmount = () => {
        setAmount(prevAmount => prevAmount - 1)
        if (amount === 1) setAmount(1);
    }

    return (
        <div className='add-cart-container'>
            <h2 className='number'>{amount}</h2>
            <button className='plus-btn btns' onClick={addToAmount}><FaPlus /></button>
            <button className='minus-btn btns' onClick={subtractFromAmount}><FaMinus /></button>
            <button className='add-to-cart-btn' onClick={() => addToCart(id, amount)}>ADD TO CART</button>
        </div>
        )
}

export default AddToCart;