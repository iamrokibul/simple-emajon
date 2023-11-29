import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        // console.log(storedCart);
        const savedCart = [];
        //1. Get id 
        for(const id in storedCart){
            //2. Get the product using id
            const addedProduct = products.find(product => product.id === id);
            //3. Get quantity of the product
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                // console.log(addedProduct);
            }
        }
        setCart(savedCart);

    }, [products]); // Products dependency


    const handleAddToCart = (product) => {
        // const newCart = [...cart, product]
        let newCart = [];

        // If product doesn't exists in the cart set 1
        // If exist then update cart by 1
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    let reviewBtn;
    if(cart.length !== 0){
        reviewBtn = <Link to="/orders"> <button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon></button> </Link>
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key = {product.id}
                        products = {product}
                        handleAddToCart = {handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="summary-container">
                <Cart 
                    cart={cart}
                    handleClearCart = {handleClearCart}
                >
                    {reviewBtn}
                    {/* <Link to="/orders">
                        <button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon></button>
                    </Link> */}
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;