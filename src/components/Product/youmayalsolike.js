
import React, { useEffect, useState } from 'react'
import ProductCardItem from './productCard';
import { GetCategoryProduct } from '../../services/productAPI';
import ProductCardItemEmpty from './productCardEmpty';

import {} from '../../styles/youmayalsolike.css';

export default function Youmayalsolike({currentProduct}){
    const [products, setProducts] = useState([]);
    const productEmptyList = [{},{},{},{},{},{}];

    const category = currentProduct?.category;

    useEffect(() => {
        async function FetchData() {
            var res = await GetCategoryProduct(category, 1, 9, 1);
            if(res.isSuccess)
            {
                const products = res.data.products.filter((p) => p.id !== currentProduct?.id).slice(0, 8);
                setProducts(products);
            }
        }

        if(currentProduct && currentProduct.id)
        {
            FetchData();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProduct]);

  return (
    <>
        <div className='ym-block-container'>
            <div className='ym-block-header'>
                You may also like
            </div>

            <div className='ym-block-body'>
                {products && products.length > 0 ? 
                <>
                    { products.map((product, i) => (<ProductItemContainer  key = {i} product={product} />)) }
                </> : 
                <>
                    { productEmptyList.map((p, i) => (<ProductItemContainer key={i} isEmpty={true}/>)) }
                </>}
            </div>
        </div>
    </>
  )
}

export function ProductItemContainer(props){
    return(
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 relative">
         {props.isEmpty ? <ProductCardItemEmpty/> : <ProductCardItem product={props.product} type={1}/>}
      </div>   
    );
  }
