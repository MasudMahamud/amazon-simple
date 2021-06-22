import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce( (total,prd) => total + prd.price ,0);

    let shipping = 0;
    if (total > 50){
        shipping = 0;
    }
    else if (total > 20){
        shipping = 5.99;
    }
    else if(total > 0) {
        shipping = 9.99; 
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal =(total + shipping + Number(tax)).toFixed(2);

    return (
        <div>
             <h3 className="item">Order Summary</h3>
             <h5 className="item">Order Item: {cart.length} </h5>
             <p>Items:</p>
             <p>Price: { (total).toFixed(2) }</p>
             <p><small>Shipping: {shipping}</small></p>
             <p><small>Tax/VAT : {tax}</small></p>
             <p>Total Price: { grandTotal }</p>
        </div>
    );
};

export default Cart;