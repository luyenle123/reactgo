import * as constants from '../../constants/constant';
import '../../styles/categoryblock.css';
import React, { useEffect, useState } from 'react'
import { GetCategoryList } from '../../services/productService.js';

import categoryIcon1 from '../../images/categories/1.png';

export default function Categoryblock(){
    const [cateories, setCateories] = useState([]);
    const [categorySelected, setCategorySelected] = useState();
     
         
    useEffect(() => {
        async function FetchCategory(){     
            var res = await GetCategoryList();
            if(res.isSuccess)
            {
                //const list = res.data.slide(0, 5);
                setCateories(res.data);
            }
        }        

        FetchCategory();
    }, []);

    // const handleCategoryClick = (p) => {

    // }

  return (
    <>
        <div className='category-block-container'>
            <div className='category-block-header'>
                Browse a category
                <hr/>
            </div>

            {cateories && cateories.length > 0 && 
                <div className='category-list-container'>
                    {cateories.slice(0, 8).map((p, i) => ( <CategoryItem key = {i} category = {p} categorySelected={categorySelected}/> ))}                
                </div>
            }
        </div>
    </>
  )
}

export function CategoryItem(props){
    return(
        <div className="category-block-item"> 
            <a href={'/' + constants.NAV_PRODUCT_LIST + '?cat=' + props.category }>
                <div className='image-container'>
                    <img src={categoryIcon1} width={150} height={150} alt={props.category}/>
                </div>
                
                <div className='display-text'>
                    {props.category}
                </div>
            </a>
        </div>
    );
}
