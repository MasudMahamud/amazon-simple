import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    //console.log(props);
    const {name, quantity, key, price,img} = props.product;
    return (
        <div className="review">
            <div className="product-details">
                <img src={img} alt="" />
            <h4 >{name} </h4>
            <p className="quantity"> Quantity: {quantity} </p>
            <p>price: {price} </p>
             <br />

             <button 
                className="addToCartBtn" 
                 onClick={()=> props.handleRemoveProduct(key)} >
                  
                 Remove
            </button>
            </div>
            
        </div>
    );
};

export default ReviewItem;