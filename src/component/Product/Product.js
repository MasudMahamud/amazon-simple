import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './product.css'
import { Link } from 'react-router-dom';


const Product = (props) => {
    //console.log(props.product);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">

            <div className="productImage">
                <img src={img} alt="" srcset="" />
            </div>

            <div className="product-details">
                <h4> <Link to={"/product/" + key} > {name} </Link> </h4>
                <br />
                
                <p className="by">By: {seller} </p>

                <strong className="price"> Price: ${price} </strong>
                <p className="stock">Only {stock} left in stock - Order soon</p>
                {props.showAddToCart && <button
                    className="addToCartBtn" onClick={() => props.handleAddProduct(props.product)} >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;