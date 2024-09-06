import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Loader } from '../../Loader/loader';

export default function ProductList() {
    // const [products, setProducts] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    const[page, setpage] = useState(1);

    // const getData = useCallback((page) => {
    //     var pagging = '?limit=10&skip=0';
    //     return fetch('https://dummyjson.com/products' + pagging);
    // }, []);

 

  return (
    <>
        <h1>useCallBack</h1>
        <p>page: {page}</p>        
        <button onClick={() => setpage(1)}>Page 1</button>
        <button onClick={() => setpage((c) => c + 1)}>Next Page</button>

        <ProductItems page={page}/>
    </>
  )
}

export function  ProductItems ({page}) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = () => {
        if(!page){
            page = 1;
        }    
        var skip = (page - 1) * 10;        
        var pagging = '?limit=10&skip='+skip;
        return fetch('https://dummyjson.com/products' + pagging);
    };    

    useEffect(() => {
        setIsLoading(true);
        console.log('query product for page : ' + page);
        getData(page)
        .then((res) => res.json())
        .then((res) => {
            const products = res.products;
            setProducts(products);            
        })
        setIsLoading(false);
    }, [page]);
    
    const handleAddToCartClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            toast('Change quantity');
            setIsLoading(false);
        }, 500);           
    }       

    //console.log('>> render ProductItems');
    if(!products || products.length <= 0)
    {
        return(
            <>
                {isLoading && <Loader/>}

                <div className="product-list-container">
                { 
                    <div className="product-flex">
                        <div className="no-product">No Product</div>
                    </div>
                }
            </div>
            </>
        );
    }
  return (        
        <div>
            <div>
                {products.map((p) => {
                    return <ProductItem key = {p.id} product = {p} handleAddToCartClick={handleAddToCartClick}/>
                })}
            </div>
        </div>    
  )
};

export function ProductItem({product, handleAddToCartClick}){
    return(
        <div> 
                <p >{product.sku}</p>

                <div>
                    <button onClick={handleAddToCartClick} value={product.id} sku={product.sku} price={product.price}>Add To Cart</button>
                </div>
        </div>
    );
}