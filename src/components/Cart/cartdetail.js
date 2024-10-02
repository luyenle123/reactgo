import {useEffect, useState} from 'react'
import { LoaderToggle } from "../Loader/loader.js";
import { toast } from 'react-toastify';
import { GetCartDetail } from '../../services/cartService.js';
import * as constants from '../../constants/constant.js'

import '../../styles/cart.css';

export default function CartPageDetail(){

    const [cart, setCart] = useState({products:[]}); 
    //const [isLoading, setIsLoading] = useState(false);
    
    const doGetCartDetail = async() => {
        //setIsLoading(true);
        LoaderToggle(true);
        var res = await GetCartDetail(5);
        if(res.isSuccess)
        {
            setCart(res.data);
        }
        else{
            toast(res.data);
        }

        //setIsLoading(false);
        LoaderToggle(false);
    }    

    useEffect(() => {
        doGetCartDetail();
    }, []);

    const handleGoToCheckoutClick = (e) => {
        //setIsLoading(true);
        LoaderToggle(true);
        setTimeout(() => {
            toast('There are some item is invalid.');
            //setIsLoading(false);
            LoaderToggle(false);
        }, 1000);
    };
    
    const handleQuantityUpClick = (e) => {
        //if(isLoading) return;
        //etIsLoading(true);
        LoaderToggle(true);
        setTimeout(() => {
            toast('Change quantity');
            //setIsLoading(false);
            LoaderToggle(false);
        }, 500);        
    };

    const handleQuantityDownClick = (e) => {
        //if(isLoading) return;
        //setIsLoading(true);
        LoaderToggle(true);
        setTimeout(() => {
            toast('Change quantity');
            //setIsLoading(false);
            LoaderToggle(false);
        }, 500);  
    };
    
    const handleRemoveCartItemClick = (e) => {
        //if(isLoading) return;
        //setIsLoading(true);
        LoaderToggle(true);
        setTimeout(() => {
            toast('Remove item: ' + e.target.value);
            //setIsLoading(false);
            LoaderToggle(false);
        }, 1000);         
    };

    var data = {
        handleQuantityUpClick: handleQuantityUpClick,
        handleQuantityDownClick: handleQuantityDownClick,
        handleRemoveCartItemClick: handleRemoveCartItemClick,
        handleGoToCheckoutClick: handleGoToCheckoutClick
    };

    const hasData = cart && cart.id;

  return (
    <>    
        {/* {isLoading && <Loader/> } */}

        <div className='cart-detail-container'>

            <div className='cart-detail-header'>
                Cart Detail
            </div>

            <div className='cart-detail-body'>
                <div className="cart-products">
                    {cart.products.map((p) => {
                        return <ProductItem key = {p.id} product = {p} eventhandle={data}/>
                    })}
                </div>

                {hasData && <CartSummary cart={cart} eventhandle={data}/> }
            </div>
        </div>
    </>
  )
}

export function CartSummary(props){
    return(
        <>
            <div className='cart-summary-container'>
                <div className='cart-summary'>
                    <div className='cart-summary-header'>Summary</div>                

                    <div className='cart-detail-summary'>
                        <div className='cart-detail-summary-item'>
                            <div className='cart-detail-summary-item-label'>Products</div>
                            <div className='cart-detail-summary-item-number'>{props.cart.totalProducts}</div>
                        </div>

                        <div className='cart-detail-summary-item'>
                            <div className='cart-detail-summary-item-label'>Total quantity</div>
                            <div className='cart-detail-summary-item-number'>{props.cart.totalQuantity}</div>
                        </div>

                        <div className='cart-detail-summary-item'>
                            <div className='cart-detail-summary-item-label'>Total discount</div>
                            <div className='cart-detail-summary-item-number'>{props.cart.discountedTotal} $</div>
                        </div>
                    </div>

                    <div className='cart-detail-total'>
                        <p>Total: {props.cart.total} $</p>
                        <p>Shipping: FREE</p>
                    </div>

                    <div className='cart-summary-buttons'>
                        <button className='checkout-button' onClick={props.eventhandle.handleGoToCheckoutClick}>Go to Checkout</button>
                    </div>
                </div>
            </div>        
        </>
    );
}

export function ProductItem(props){
    return(
        <div className="cart-detail-item">
            <div className="cart-detail-item-img">
                <img src={props.product.thumbnail} alt={props.product.title} />  
            </div>
            <div className='cart-detail-item-data'>
                {/* <div className="cart-detail-item-title">
                    <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id='+props.product.id}>
                        {props.product.title}
                    </a>
                </div> */}

                <div className='cart-detail-item-info'>
                    <div className="cart-detail-item-id">{props.product.id}</div>
                    <div className='cart-detail-item-title'>
                        <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id='+props.product.id}>
                            {props.product.title}
                        </a>
                    </div>
                    <div className='cart-detail-item-description'>
                        {props.product.title}
                    </div>

                    <div className="cart-detail-item-price">{props.product.price} $</div>
                </div>

                <div className='cart-detail-item-amount'>
                    <div className="cart-detail-item-quantity float-right">
                            <button className='quantity-adjust-button' onClick={props.eventhandle.handleQuantityDownClick}>-</button>
                            <div className='txt-quantity'>{props.product.quantity}</div>
                            <button className='quantity-adjust-button' onClick={props.eventhandle.handleQuantityUpClick}>+</button>
                        </div>                    
                    <div className="cart-detail-item-total">{props.product.total.toFixed(2)} $</div>

                <div className="cart-detail-item-remove">
                    <button className='cart-detail-item-remove-button' onClick={props.eventhandle.handleRemoveCartItemClick} title='Delete' value={props.product.id}>X</button>
                </div>                    
                </div>                

                {/* <div className="cart-detail-item-quantity">
                    <button className='quantity-adjust-button' onClick={props.eventhandle.handleQuantityDownClick}>-</button>
                    <div className='txt-quantity'>{props.product.quantity}</div>
                    <button className='quantity-adjust-button' onClick={props.eventhandle.handleQuantityUpClick}>+</button>
                </div>
                <div className="cart-detail-item-price">{props.product.price} $</div>
                <div className="cart-detail-item-total">{props.product.total.toFixed(2)} $</div>
                <div className="cart-detail-item-remove">
                    <button className='cart-detail-item-remove-button' onClick={props.eventhandle.handleRemoveCartItemClick} title='Delete' value={props.product.id}>X</button>
                </div> */}
            </div>
        </div>
    );
}