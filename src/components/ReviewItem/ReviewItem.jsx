import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({products, handleRemoveFromCart}) => {
    const {id, name, img, price, quantity, shipping} = products;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className="products-info">
                <div className="product-details">
                    <h5>{name}</h5>
                    <p>Price: ${price}</p>
                    <p>Shipping: ${shipping}</p>
                    <p>Quantity: {quantity}</p>
                </div>
                <button onClick={ () => handleRemoveFromCart(id)} className='trash_btn'><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>
    );
};

export default ReviewItem;