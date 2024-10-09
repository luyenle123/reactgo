import '../../styles/product.css';

import { useEffect, useState} from "react";
import { toast } from 'react-toastify';
import { GetPageInfo } from "../Pagination/paginationUtils.js";
import { LoaderToggle } from "../Loader/loader.js";
import { GetConfig, Pagination } from '../Pagination/pagination.js'
import { GetProductList,GetCategoryProduct } from '../../services/productAPI.js';
import { useSearchParams } from "react-router-dom";
import { Category, UpdateCategoryProductCount } from './category.js';
import ProductCardItem from './productCard.js';
import ProductCardItemEmpty from './productCardEmpty.js';
import Threecolumnblock from '../blocks/threecolumnblock.js';

/*PRODUCT LISTING*/

export default function Products(){
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({pageSize:12, sorting:1});
    const [categorySelected, setCategorySelected] = useState(undefined);    
    const [searchParams, setSearchParams] = useSearchParams();
  
    const emptyProducts = [{},{},{},{},{},{},{},{},{},{},{},{}];
    const cat = searchParams.get('cat');
    const notify = (msg) => toast(msg);

    var fetchProduct = false;    
    //console.log('>> render Products');

    const queryData = (page) => { 
        LoaderToggle(true);

        setTimeout(() => {
            doFetchProduct(page);
        }, 1);
    };      
      
    const doFetchProduct = async (page) => {

        if(categorySelected && !fetchProduct){
            FetCategoryProduct(categorySelected, page);
            return;
        }

        var res = await GetProductList(page, pageInfo.pageSize, pageInfo.sorting);
        if(res.isSuccess)
        {
            setProducts(res.data.products);
            setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));
            setCategorySelected(undefined);
        }
        else{
            notify('Error: ' + res.data);
        }
        LoaderToggle(false);
    }

    const LoadMoreProduct = async (category, page) => {
        LoaderToggle(true);
        var res = null;
        if(categorySelected && !fetchProduct){
            res = await GetCategoryProduct(category, page, pageInfo.pageSize, pageInfo.sorting);
        }
        else
        {
            res = await GetProductList(page, pageInfo.pageSize, pageInfo.sorting);
            setCategorySelected(undefined);
        }

        if(!res){
            LoaderToggle(false);
            return;
        }

        if(res.isSuccess)
        {
            if(res.data.products?.length > 0){
                var productlist = products;
                res.data.products.forEach(element => {
                    productlist.push(element);
                });
                setProducts(productlist);
            }

            setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));            
        }
        else{
            notify('Error: ' + res.data);
        }
        LoaderToggle(false);
    }

    const handleSortingChanged = (e) => {
        var sortType = parseInt(e.target.value);
        pageInfo.sorting = sortType;

        queryData(1);        
    };

    let catetory = categorySelected;
    if(!catetory && cat)
        catetory = cat;

    useEffect(() => {
        async function FetchProduct(){
            let res = null;          
            if(catetory && catetory.length > 0){
                res = await GetCategoryProduct(catetory, 1, pageInfo.pageSize, pageInfo.sorting);
            }
            else{
                res = await GetProductList(1, pageInfo.pageSize, pageInfo.sorting);
            }
                        
            if(res.isSuccess)
            {
                setProducts(res.data.products);
                setPageInfo(GetPageInfo(res.data.total, res.data.products.length, 1, pageInfo.pageSize, pageInfo.sorting));
                setCategorySelected(catetory);
            }

            LoaderToggle(false);
        }

        setSearchParams('');
        LoaderToggle(true);
        FetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const PageChanged = (page, pageSize) => {
        if(page !== pageInfo.page){
            pageInfo.pageSize = pageSize;
            LoadMoreProduct(categorySelected, page);
            return;
        }
    };     

    const gotData = products ? true : false;
    const config = GetConfig(false, gotData, pageInfo);
    config.PageChanged = PageChanged;
    config.handleSortingChanged = handleSortingChanged;
    config.hideSortOption = false;
    config.loadMoreOnly = true;

    const FetCategoryProduct = async (category, page) => {
        LoaderToggle(true);

        if(!page) { page = 1; }
        var res = await GetCategoryProduct(category, page, pageInfo.pageSize, pageInfo.sorting);
        if(res.isSuccess)
        {
            setProducts(res.data.products);
            setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));
            setCategorySelected(category);
            UpdateCategoryProductCount(res.data.total)            
        }
        else{
            notify('Error: ' + res.data);
        }
        LoaderToggle(false);
    }   

    const categoryHandleClick = async (category) => {
        if(!category){
            fetchProduct = true;
            setCategorySelected(undefined);            
            LoaderToggle(true);
            doFetchProduct(1);
        }
        else
        {
            fetchProduct = false;
            FetCategoryProduct(category, 1);
        }        
    }       

    return(
        <>
            <div className='row'>
                <div className='column left'>
                    <Category handleClick={categoryHandleClick} productCount={products?.length} category={catetory}/>
                </div>
                <div className='column right'>
                    <div className='product-container'>
                        <ProductList config={config} products={products} emptyProducts={emptyProducts}/>
                    </div>                     
                </div>       
            </div>
            
            <Threecolumnblock/>            
        </>
    );
}

export function ProductList(props) {
  return (        
        <div className="product-list-container">
            <div className='product-list-top'>
                {props.config.pageInfo.total} entries
            </div>
            <div className="product-flex">
                {props.products && props.products.length > 0 ? 
                <>
                    {props.products.map((p) => {
                        return <ProductCardItem key = {p.id} product = {p}/>
                    })}                
                </> : 
                <>
                    {props.emptyProducts.map((p, i) => {
                        return <ProductCardItemEmpty key = {i}/>
                    })}                
                </>}
            </div>

            {props.config.pageInfo.allowLoadMore && 
                <>
                    {props.products && props.products.length > 0 && <Pagination config={props.config}/>}                
                </>
            }
        </div>    
  )
};