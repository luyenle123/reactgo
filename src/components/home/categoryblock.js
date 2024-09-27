// import * as constants from '../../constants/constant';
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
                setCateories(res.data);
            }
        }        

        FetchCategory();
    }, []);

    const handleCategoryClick = (p) => {

    }    

  return (
    <>
        <div className='category-block-container'>
            <div className='category-block-header'>
                Browse a category
                <hr/>
            </div>

            {cateories && cateories.length > 0 && 
                <div className='category-list-container'>
                    {cateories.map((p, i) => ( <CategoryItem key = {i} category = {p} categoryHandleClick = {handleCategoryClick} categorySelected={categorySelected}/> ))}                
                </div>
            }
        </div>
    </>
  )
}

export function CategoryItem(props){
    return(
        <div className="category-block-item" onClick={() => props.categoryHandleClick(props.category)}> 
            <div className='image-container'>
                <img src={categoryIcon1} width={150} height={150} alt={props.category}/>
            </div>
            
            <div className='display-text'>
                {props.category}
            </div>
        </div>
    );
}
