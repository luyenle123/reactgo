import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as constants from '../../constants/constant.js'
import '../../styles/productCart.css';
import { Link } from 'react-router-dom';
import CartPopupResult from '../Cart/cartPopupResult.js';
import { useState } from 'react';
import { LoaderToggle } from '../Loader/loader.js';
import { DoAddToCart, UpdateCartInfo } from '../Cart/cart.js';
import { AddToCartButton } from '../Buttons/addtocartbutton.js';

export default function ProductCardItem(props){
    const [cartProduct, setCartProduct] = useState(undefined);

    let cardcontainersizeclass = 'product-card-container-w-default';
    let cardbodysizeclass = 'card-h-default';

    if(props.type && props.type === 1){
        cardcontainersizeclass = 'product-card-container-w-m';
        cardbodysizeclass = 'card-h-m';
    }

    const handleAddToCartClick = (product) => {
        LoaderToggle(true);
        DoAddToCart(product.id, product.sku, () => {
            LoaderToggle(false, () => {
                setTimeout(function(){ setCartProduct(product)}, 100);
              });
              UpdateCartInfo(null, 1);
        });     
    };    

    return(
        <>
            { cartProduct && <CartPopupResult product={props.product} handleCallback={() => { setCartProduct(undefined)}}/> }

            <div className={'product-card-container ' + cardcontainersizeclass}>
            <div className={'product-card ' + cardbodysizeclass}> 
                    <div className="product-img">
                        <Link to={'/' + constants.NAV_PRODUCT_DETAIL + '?id=' + props.product.id}>
                            <LazyLoadImage className='product-image' alt={props.category} src={props.product.thumbnail}/>
                            {/* <img className='product-image' src={props.product.thumbnail} alt={props.product.title} loading='lazy'/> */}
                        </Link>
                    </div>

                    <p className="product-title">{props.product.title}</p>
                    <p className="product-sku">{props.product.sku}</p>
                    <p className="product-description">{props.product.description}</p>
                    <p className="product-stock">{props.product.availabilityStatus} ({props.product.stock})</p>
                    <p className="product-price">{props.product.price} $</p>

                    <div className="product-card-buttons">
                        <AddToCartButton handleAddToCartClick={handleAddToCartClick} product={props.product}/>
                    </div>
            </div>
        </div>
        </>
    );
}