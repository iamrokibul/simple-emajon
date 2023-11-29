import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)
    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    let products;
    let checkoutBtn;
    let message;
    if(cart.length !== 0){
        checkoutBtn = <Link to="/checkout"> <button className='btn-proceed'>Proceed Checkout <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon></button> </Link>
        products = <div>
            {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        products={product}
                        handleRemoveFromCart = {handleRemoveFromCart}
                    ></ReviewItem>)
                }
        </div>
    }else if(cart.length === 0){
        message = <h2>No Order Found!</h2>
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {message}
                {products}
                {/* {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        products={product}
                        handleRemoveFromCart = {handleRemoveFromCart}
                    ></ReviewItem>)
                } */}
            </div>
            <div className="summary-container">
                <Cart 
                    cart={cart}
                    handleClearCart = {handleClearCart}
                >
                    {/* <Link to="/checkout">
                        <button className='btn-proceed'>Proceed Checkout <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon></button>
                    </Link> */}
                    {checkoutBtn}
                </Cart>
            </div>
        </div>
    );
};

export default Orders;