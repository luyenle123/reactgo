import '../../styles/cartPopupResult.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as constants from '../../constants/constant.js'

export default function CartPopupResult({product, handleCallback}){
  const [isdisplay, setIsDisplay] = useState(true);
  const navigate = useNavigate();

  if(!isdisplay || !product){
    return(<></>);
  }  

  const hide = () =>{
    setIsDisplay(false);
    handleCallback();
  }
  
  
  const viewCartClick = () =>{    
    navigate('/' + constants.NAV_CART_DETAIL);
  }

  return(
    <>
      <div id='popup-result' className='popup-result-container' onClick={hide}>
          <div id="popup-result-bg" className='popup-result-bg'></div>
          <div className='popup-result-body-container'>
              <div className='popup-result-body'>
                <div className='popup-result-header'>
                  <p>Add item to cart successful</p>
                </div>

                <div className='popup-result-info'>
                  <img src={product.thumbnail} alt={product.title} width={150} height={150}></img>
                  <div className='product-info'>
                    <p className='sku font-bold'>{product?.sku}</p>
                    <p className='font-bold'>{product?.title}</p>
                    <p className='description'>{product?.description}</p>
                    <p className='price font-bold text-right'>{product?.price} $</p>
                    {/* <ProductRating rating={product.rating}/> */}
                  </div>
                </div>

                <div className='popup-result-buttons'>
                    <button className={'base-button continue-button'} onClick={hide}>Continue Shopping</button>
                    <button className={'base-button viewcart-button'} onClick={viewCartClick}>View Cart</button>
                </div>
              </div>
          </div>
      </div>
    </>
  );
}

