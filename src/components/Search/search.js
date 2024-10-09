import React, { useState, useEffect } from 'react'
import { SearchProduct } from '../../services/productAPI.js';
import { toast } from 'react-toastify';
import { LoaderToggle } from "../Loader/loader.js";
import { useSearchParams } from "react-router-dom";

import '../../styles/search.css';
import '../../styles/searchBox.css';
import SearchBox from './searchBox.js';
import ProductCardItem from '../Product/productCard.js';
import Fourcolumnblock from '../blocks/fourcolumnblock.js';

export default function Search(){
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

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
                            return <ProductCardItem key = {p.id} type={1} product = {p}/>
                        })}
                    </div>
                  </div>  
                </div>
            </>
          }       
        </div>

        <Fourcolumnblock />
    </div>
  )
}