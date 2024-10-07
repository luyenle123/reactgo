import * as constants from '../../constants/constant';
import '../../styles/categoryblock.css';
import React, { memo, useEffect, useState } from 'react'
import { GetCategoryList } from '../../services/productAPI.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const Categoryblock = () => {
    const [cateories, setCateories] = useState([]);
    const emptyCategories = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
         
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

  return (
    <>
        <div className='category-block-container'>
            <div className='category-block-header'>
                Browse a category
                <hr/>
            </div>
            {/* .slice(0, 8) */}
            <div className='category-list-container'>
                {cateories && cateories.length > 0 ? 
                <>
                    {cateories.map((p, i) => ( <CategoryItem key = {i} id={i+1} category = {p} /> ))}
                </> : 
                <>
                    {emptyCategories.map((p, i) => ( <EmptyCategoryItem key = {i} /> ))}
                </> }
            </div>
        </div>
    </>
  )
}

export function CategoryItem(props){
    return(
        <div className="category-block-item"> 
            <Link to={'/' + constants.NAV_PRODUCT_LIST + '?cat=' + props.category }>
                <div className='image-container opacity-50'>
                    <LazyLoadImage
                        alt={props.category}
                        height={110}
                        src={'../images/categories/b/' + props.id +'.svg'}
                        width={110}/>
                    {/* <img src={'../images/categories/b/' + props.id +'.svg'} width={150} height={150} alt={props.category}/> */}
                </div>
                
                <div className='display-text'>
                    {props.category}
                </div>
            </Link>
        </div>
    );
}

export function EmptyCategoryItem(){
    return(
        <div className="category-block-item empty-item"> 
            <div className='image-container'>
                <div className='empty-image  bg-gray'>

                </div>
            </div>
            
            <div className='display-text'>
                category name
            </div>
        </div>
    );
}

export default memo(Categoryblock);