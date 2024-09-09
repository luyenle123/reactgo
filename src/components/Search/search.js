import React, { useEffect, useState } from 'react'
import { SearchProduct } from '../../services/productService.js';
import { toast } from 'react-toastify';
import * as constants from '../../constants/constant.js'
import { LoaderToggle } from "../Loader/loader.js";
import { DoAddToCart,UpdateCartInfo } from "../CartPage/cart.js";

import '../../styles/search.css';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState();

  const inputRef = React.useRef();

  useEffect(() => {
    if(inputRef)
    {
      inputRef.current.focus();      
    }
  }, []);

  const handleSearchClick = async (e) => {
    LoaderToggle(true);
    var res = await SearchProduct(key);
    if(res.isSuccess)
    {
        setProducts(res.data.products);
    }
    else{
        toast('Error: ' + res.data);
    }

    LoaderToggle(false);
  }

const updateStatus = (b) => {
  LoaderToggle(false);
  UpdateCartInfo(null, 1);
}

const handleAddToCartClick = (e) => {
  LoaderToggle(true);
  var productId = parseInt(e.target.value);
  DoAddToCart(productId, e.target.attributes['sku'].value, updateStatus);
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && key && key.length>=3) {
    handleSearchClick();
  }
}

// const isOk  = user => {
//   return (
//     user.age > 20 && 
//     user.name === 'abc' && 
//     user.email === 'abc@gmail.com'
//   );
// }

// const codelist = new Map([
//   ['100', 'Continue'],
//   ['200', 'OK'],
//   ['201', 'Accepted'],
//   ['default', 'No Code']
// ]);

// const GetCode = code => {
//   console.log(codelist.get(code) || codelist.get('default'));
// }

  return (
    <div className='search-page-container'>
        {/* <div className='search-page-header'>
            <p>Search</p>
        </div> */}

        <div className='search-page-box'>
            <div className='search-page-form'>
              <div className="search-textbox">
                <input ref={inputRef} onChange={(e) => setKey(e.target.value)} onKeyDown={handleKeyDown}></input>
              </div>
              <div className='search-button'>
                <button onClick={handleSearchClick} onKeyDown={handleKeyDown}>Search</button>
              </div>
            </div>
        </div>

        <div className='search-page-result'>
          {products.length <= 0 && <div className='search-page-no-result'>No Result</div>}

          {
            products.length > 0 &&
            <>
              <div className='search-page-result-info'>
                Found: {products.length} entries
              </div>
              
                <div className='product-result-container'>
                  <div className="product-list-container">
                    <div className="product-flex">
                        {products.map((p) => {
                            return <ProductItem key = {p.id} product = {p} handleAddToCartClick={handleAddToCartClick}/>
                        })}
                    </div>
                  </div>  
                </div>
            </>
          }       
        </div>

    </div>
  )
}

export function ProductItem(props){
  return(
      <div className="product-result-card"> 
              <div className="product-img">
                  <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id=' + props.product.id}>
                      <img className='product-image' src={props.product.thumbnail} alt={props.product.title}/>
                  </a>
              </div>

              <p className="product-title">{props.product.title}</p>
              <p className="product-sku">{props.product.sku}</p>
              <p className="product-description">{props.product.description}</p>
              <p className="product-stock">{props.product.availabilityStatus} ({props.product.stock})</p>
              <p className="product-price">{props.product.price} $</p>

              <div className="product-card-buttons">
                  <button className="add-to-cart-button" onClick={props.handleAddToCartClick} value={props.product.id} sku={props.product.sku} price={props.product.price}>Add To Cart</button>
              </div>
      </div>
  );
}

export { Search }