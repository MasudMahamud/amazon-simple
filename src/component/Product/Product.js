import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './product.css'

const Product = (props) => {
    const { img, name, seller, price, stock,  } = props.product;
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt="" srcset="" />
            </div>
            <div className="product-details">
                <h4>{name}</h4>
                <br />
                <p className="by">By: {seller} </p>
                <br />
                <strong className="price"> Price: ${price} </strong>
                <br />
                <p className="stock">Only {stock} left in stock - Order soon</p>
                <button className="addToCartBtn" onClick={()=>props.handleAddProduct(props.product)} ><FontAwesomeIcon icon={faShoppingCart} /> Add to cart </button>
            </div>
        </div>
    );
};

export default Product;