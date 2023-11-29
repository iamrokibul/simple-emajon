import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = ({cart, handleClearCart, children}) => {
    
    // console.log(cart);

    let total = 0;
    let shippingTotal = 0;
    let quantity = 0;
    for(const product of cart){
        
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }

        // product.quantity = product.quantity || 1;

        total = total + product.price * product.quantity;
        shippingTotal = shippingTotal + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = total*7/100;
    const grandTotal = total + shippingTotal + tax;
    // const grandPriceTotal = Math.ceil(grandTotal);

    let clearBtn;
    if(cart.length !== 0){
        clearBtn = <button onClick={handleClearCart} className="btn-clear-cart"> Clear Cart <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
    }

    return (
        <div className='cart'>
            <h2>This is Summary</h2><br/>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${total}</p>
            <p>Shipping Charge: ${shippingTotal}</p>
            <p>Total Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            {clearBtn}
            {/* <button onClick={handleClearCart} className="btn-clear-cart"> Clear Cart <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button> */}
            {children}
        </div>
    );
};

export default Cart;