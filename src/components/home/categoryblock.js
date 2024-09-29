import * as constants from '../../constants/constant';
import '../../styles/categoryblock.css';
import React, { useEffect, useState } from 'react'
import { GetCategoryList } from '../../services/productService.js';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

export default function Categoryblock(){
    const [cateories, setCateories] = useState([]);
         
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
            {/* .slice(0, 8) */}
            {cateories && cateories.length > 0 && 
                <div className='category-list-container'>
                    {cateories.map((p, i) => ( <CategoryItem key = {i} id={i+1} category = {p} /> ))}                
                </div>
            }
        </div>
    </>
  )
}

export function CategoryItem(props){
    return(
        <div className="category-block-item"> 
            <Link href={'/' + constants.NAV_PRODUCT_LIST + '?cat=' + props.category }>
                <div className='image-container'>
                    <LazyLoadImage
                        alt={props.category}
                        height={120}
                        src={'../images/categories/b/' + props.id +'.svg'}
                        width={120}/>
                    {/* <img src={'../images/categories/b/' + props.id +'.svg'} width={150} height={150} alt={props.category}/> */}
                </div>
                
                <div className='display-text'>
                    {props.category}
                </div>
            </Link>
        </div>
    );
}
