import '../../styles/cart.css';
import cartIcon from '../../images/cart.png';

import { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';
import { GetCartDetail, AddToCart } from '../../services/cartService.js';
import { LoaderToggle } from "../Loader/loader.js";
import * as constants from '../../constants/constant.js'
import { useNavigate } from 'react-router-dom';

export const UpdateCartInfo = async(res, qty) => {
  
  if(!res)
  {
    res = await GetCartDetail(5);
  }
  if(res.isSuccess)
  {
    var element = document.getElementById('cart-item-number');
    if(element){
      if(!qty){qty = 0;}
      var currentQty = parseInt(element.innerText);
      if(!currentQty){ currentQty = 0; }
      if(currentQty === 0) { currentQty = res.data.totalQuantity; }
      element.innerHTML = currentQty + qty;
      console.log('Updatae cart info :' + res.data.totalQuantity);
    }
  }

  return res;
}

export const Cart = () => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [cart, setCart] = useState({});
  //const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //console.log('Cart Info');

  const handleCartClick = async (e) => {
     if(showMiniCart)
     {
      setShowMiniCart(false);
     }
     else{
      //setIsLoading(true);
      LoaderToggle(true);
      var res = await GetCartDetail(5);
      if(res.isSuccess)
      {
        setCart(res.data);
      }
      else{
        setCart({totalQuantity:0, total:0, totalProducts:0});
      }
      setShowMiniCart(true);
      LoaderToggle(false);
      //setIsLoading(false);
     }
  };
  
  const HideMiniCart = () =>{
    setShowMiniCart(false);
  }

  const handleContinueClick = () =>{
    navigate('/' + constants.NAV_PRODUCT_LIST);
    setShowMiniCart(false);
  }
  
  const handleViewCartClick = () =>{
    navigate('/' + constants.NAV_CART_DETAIL);
    setShowMiniCart(false);
  }  

  useEffect(() => {

    async function FetchCartDetail() {
      const res = await GetCartDetail(5);
      if(res.isSuccess)
      {
        setCart(res.data);
      }      
    }

    FetchCartDetail();
  }, []);  


    //UpdateCartInfo(res);


  return (
    <>
      {/* {isLoading && <Loader/>} */}
      <div className='cart-info'>
        <div className='cart-icon'>
          <img src={cartIcon} alt='cart' onClick={() => handleCartClick()}/>
          <div id='cart-item-number' className='cart-item-number'>{cart.totalQuantity}</div>
        </div>
        {showMiniCart && <CartDropdown cart={cart} toggleHidden = { HideMiniCart} continueShoppingClick = {handleContinueClick} viewCartClick={handleViewCartClick}/> }
      </div>    
    </>
  )
}

const CartDropdown = ({ cart, toggleHidden, continueShoppingClick, viewCartClick }) => (
  <div className='cart-dropdown-container'>
    <div className='cart-dropdown-bg' onClick={toggleHidden}></div>
    <div className="cart-dropdown">
      <div className='cart-dropdown-header'>
        <p>
          {cart.totalQuantity} Items, {cart.totalProducts} products, {cart.total.toFixed(2)} $
        </p>
      </div>      
      <div className="cart-items">
        {(cart && cart.products && cart.products.length) ? (
          cart.products.map(item => <ProductItem key={item.id} product = {item} />)
        ) : (
          <div className="empty-message"> Your cart is empty </div>
        )}
      </div>
      <div className='cart-dropdown-buttons'>
        <button className={'base-button continue-button'} onClick={continueShoppingClick}>Continue Shopping</button>
        <button className={'base-button viewcart-button'} onClick={viewCartClick}>View Cart</button>
      </div>
    </div>
  </div>
);

export function ProductItem({product}){
  return(
    <div className='cart-items-row'>
      <div className='cart-items-img-container'>
        <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id='+product.id}>
          <img src={product.thumbnail} alt={product.title} />
        </a>
      </div>
      
      <div className='cart-items-row-detail'>
        <div className="cart-items-title">
          <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id='+product.id}>
            {product.title}
          </a>          
          </div>
          <div className='cart-items-r-value'>
            <div className='cart-items-quantity number-box'>{product.quantity}</div>
            <div className='cart-items-price number-box'>{product.price} $</div>
          </div>
      </div>
    </div>
  );
}

export const DoAddToCart = async (productId, productCode, updateStatus) => {
  var res = await AddToCart(productId, 1);
  if(res.isSuccess){
    //toast("Add '" + productCode + "' to cart successful.");
  }
  else{
    toast('Error: ' + res.data);
  }

    updateStatus(true);
}