import React, { useEffect, useState } from 'react'
import { GetCategoryList } from '../../services/productService.js';

import '../../styles/category.css';
import { toast } from 'react-toastify';

const Category = ({handleClick, productCount = 0, category = null}) => {
    const [cateories, setCateories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(category);

    console.log('>> render category: ' + category + ' / ' + categorySelected);
  
    const notify = (msg) => toast(msg);       
         
    useEffect(() => {
        async function FetchCategory(){     
            var res = await GetCategoryList();
            if(res.isSuccess)
            {
                setCateories(res.data);
            }
            else{
                notify('Error: ' + res.data);
            }
        }        

        FetchCategory();
    }, []);


    const handleCategoryClick = (p) => {
        if(p === categorySelected) return;
        setCategorySelected(p);
        handleClick(p)
    }

    const handleClearClick = () => {
        setCategorySelected(undefined);
        handleClick()
    }

  return (
    <div className='category-container'>
        <div className='category-header'>Filter</div>
        <div className='category-selection'>
            {
                categorySelected && <>
                    {categorySelected} (<span id='category-product-count'>{productCount}</span>) 
                    <span className='category-selection-clear' onClick={() => handleClearClick()}>X</span>
                </> 
            }
        </div>
        {cateories && cateories.length > 0 && 
            <div className='category-list-container'>
                {cateories.map((p, i) => ( <MapItem key = {i} category = {p} categoryHandleClick = {handleCategoryClick} categorySelected={categorySelected}/> ))}                
            </div>
        }
    </div>
  )
}

export function MapItem(props){
    if(props.categorySelected && props.categorySelected === props.category){
        return (<CategoryItem key = {props.category} category = {props.category} categorySelected={props.categorySelected}/>);
    }
    return (
        <CategoryItem key = {props.category} category = {props.category} categoryHandleClick = {props.categoryHandleClick} categorySelected={props.categorySelected}/>
    )
}

export function CategoryItem(props){
    return(
        <div className="category-item" onClick={() => props.categoryHandleClick(props.category)}> 
            <div className={props.categorySelected === props.category ? "category-item-text active" : "category-item-text"}>
                {props.category}
            </div>            
        </div>
    );
}

const UpdateCategoryProductCount = (productCount) => {
    var element = document.getElementById('category-product-count');
    if(element){
        element.innerText = productCount;
    }
}

export {Category, UpdateCategoryProductCount}