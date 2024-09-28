import React, { useState, useEffect } from 'react'
import { SearchProduct } from '../../services/productService.js';
import { toast } from 'react-toastify';
import { LoaderToggle } from "../Loader/loader.js";
import { DoAddToCart,UpdateCartInfo } from "../Cart/cart.js";
import { useSearchParams } from "react-router-dom";

import '../../styles/search.css';
import '../../styles/searchBox.css';
import SearchBox from './searchBox.js';
import ProductCardItem from '../Product/productCart.js';
import CartPopupResult from '../Cart/cartPopupResult.js';

export default function Search(){
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartProduct, setCartProduct] = useState(undefined); 

  const text = searchParams.get('text');
  
  useEffect(() => {
    async function DoSearch(searchText) {
      LoaderToggle(true);
      var res = await SearchProduct(searchText);
      if(res.isSuccess)
      {
        setSearchText(searchText);
        setProducts(res.data.products);
      }
      else{
          toast('Error: ' + res.data);
      }
      LoaderToggle(false);
    }

    if(text && text.length >= 3){
      DoSearch(text);
      setSearchParams('');
    }
  }, [text, setSearchParams]);  

const handleAddToCartClick = (product) => {
  LoaderToggle(true);
  LoaderToggle(true);
  DoAddToCart(product.id, product.sku, () => {
      LoaderToggle(false, () => {
          setTimeout(function(){ setCartProduct(product)}, 100);
        });
        UpdateCartInfo(null, 1);
  });  
};

const handleSearch = async (key) => {
  if(!key || key.length < 3) return;

  LoaderToggle(true);
  var res = await SearchProduct(key);
  if(res.isSuccess)
  {
    setSearchText(key);
    setProducts(res.data.products);
  }
  else{
      toast('Error: ' + res.data);
  }
  LoaderToggle(false);
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

        <SearchBox handleSearch={handleSearch} text={text}/>

        <div className='search-page-result'>
          {products.length <= 0 && <div className='search-page-no-result'>No Result</div>}

          {
            products.length > 0 &&
            <>
              <div className='search-page-result-info'>
                Found: {products.length} entries for {searchText}
              </div>
              
                <div className='product-result-container'>
                  <div className="product-list-container">
                    <div className="product-flex">
                        {products.map((p) => {
                            return <ProductCardItem key = {p.id} type={1} product = {p} handleAddToCartClick={handleAddToCartClick}/>
                        })}
                    </div>
                  </div>  
                </div>
            </>
          }       
        </div>
        { cartProduct && <CartPopupResult product={cartProduct} handleCallback={() => { setCartProduct(undefined)}}/> }
    </div>
  )
}

// export function ProductItem(props){
//   return(
//       <div className="product-result-card"> 
//               <div className="product-img">
//                   <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id=' + props.product.id}>
//                       <img className='product-image' src={props.product.thumbnail} alt={props.product.title}/>
//                   </a>
//               </div>

//               <p className="product-title">{props.product.title}</p>
//               <p className="product-sku">{props.product.sku}</p>
//               <p className="product-description">{props.product.description}</p>
//               <p className="product-stock">{props.product.availabilityStatus} ({props.product.stock})</p>
//               <p className="product-price">{props.product.price} $</p>

//               <div className="product-card-buttons">
//                   <button className="add-to-cart-button" onClick={props.handleAddToCartClick} value={props.product.id} sku={props.product.sku} price={props.product.price}>Add To Cart</button>
//               </div>
//       </div>
//   );
// }