import React from 'react'
import {} from '../../styles/addtocartbutton.css';

export const AddToCartButton = (props) => {
  return (
    <button className="pdp-add-to-cart-button" onClick={() => props.handleAddToCartClick(props.product)}>Add To Cart</button>
  )
}
