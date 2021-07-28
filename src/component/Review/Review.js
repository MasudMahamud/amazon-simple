import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import orderImages from '../../images/giphy.gif';
import './Review.css'
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment')
        //     setCart([]);
        //    processOrder();
        //    setOrderPlaced(true);
    }

    const handleRemoveProduct = (productKey) => {
        //console.log('Removing',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //carts
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const carTProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(carTProduct)
    }, []);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={orderImages} alt="" />
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd =>
                        <ReviewItem
                            key={pd.key}
                            handleRemoveProduct={handleRemoveProduct}
                            product={pd} >
                        </ReviewItem>)
                }
                {thankyou}
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="addToCartBtn">
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;



