import '../../styles/product.css';

import { useEffect, useState} from "react";
import { toast } from 'react-toastify';
import { DoAddToCart,UpdateCartInfo } from "../CartPage/cart.js";
import { GetPageInfo } from "../Pagination/paginationUtils.js";
import { LoaderToggle } from "../Loader/loader.js";
import { Pagination, GetConfig, CloneConfig } from '../Pagination/pagination.js'
import { GetProductList,GetCategoryProduct } from '../../services/productService.js';
import { useNavigate } from "react-router-dom";
import * as constants from '../../constants/constant.js'
import { Category, UpdateCategoryProductCount } from './category.js';

/*PRODUCT LISTING*/

export default function Products(){
    const [products, setProducts] = useState(undefined);
    const [pageinfo, setPageInfo] = useState({pageSize:12, sorting:1});
    const [categorySelected, setCategorySelected] = useState();

    var fetchProduct = false;
    const navigate = useNavigate();

    //console.log('>> render Products');
  
    const notify = (msg) => toast(msg);    

    const queryData = (page) => { 
        LoaderToggle(true);

        setTimeout(() => {
            doFetchProduct(page);
        }, 500);
    };      
      
    const doFetchProduct = async (page) => {

        if(categorySelected && !fetchProduct){
            FetCategoryProduct(categorySelected, page);
            return;
        }

        var res = await GetProductList(page, pageinfo.pageSize, pageinfo.sorting);
        if(res.isSuccess)
        {
            setProducts(res.data.products);
            setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageinfo.pageSize, pageinfo.sorting));
            setCategorySelected(undefined);
        }
        else{
            notify('Error: ' + res.data);
        }
        LoaderToggle(false);
    }

    const handleItemDisplayChanged = (e) => {
        var newPageSize = parseInt(e.target.value);
        pageinfo.pageSize = newPageSize;

        queryData(1);
    };

    const handleSortingChanged = (e) => {
        var sortType = parseInt(e.target.value);
        pageinfo.sorting = sortType;

        queryData(1);        
    };

    const handleNextClick = () => {
        if(pageinfo.page >= pageinfo.totalPage) return;
        var page = pageinfo.page+1;
        if(page > pageinfo.totalPage){ page = pageinfo.page}
        queryData(page);
    };
    
    const handleBackClick = () => {
        if(pageinfo.page <= 1) return;
        var page = pageinfo.page-1;
        if(page <= 0){ page = 1}
        queryData(page);
    };

    const handlePaginationNumberClick = (e) => {
        if(parseInt(e.target.value) === pageinfo.page) return;
        queryData(e.target.value);
    };

    const updateStatus = (b) => {
        LoaderToggle(false);
        UpdateCartInfo(null, 1);
    }

    const handleAddToCartClick = (e) => {
        LoaderToggle(true);
        var productId = parseInt(e.target.value);
        DoAddToCart(productId, e.target.attributes['sku'].value, updateStatus);
    };

    const handlePdpBlick = (pId) => {
        navigate( '/' + constants.NAV_PRODUCT_DETAIL +'?id='+ pId);
    };    

    useEffect(() => {

        async function FetchProduct(){     
            var res = await GetProductList(1, pageinfo.pageSize, pageinfo.sorting);
            if(res.isSuccess)
            {
                setProducts(res.data.products);
                setPageInfo(GetPageInfo(res.data.total, res.data.products.length, 1, pageinfo.pageSize, pageinfo.sorting));
                setCategorySelected(undefined);
            }

            LoaderToggle(false);
        }           

        LoaderToggle(true);
        FetchProduct();
    }, [pageinfo.pageSize, pageinfo.sorting]);

    if(!products){
        return(<></>);
    }

    const gotData = products ? true : false;
    const config = GetConfig(false, gotData, pageinfo);
    config.handlePaginationNumberClick = handlePaginationNumberClick;
    config.handleBackClick = handleBackClick;
    config.handleNextClick = handleNextClick;
    config.handleAddToCartClick = handleAddToCartClick;
    config.handleItemDisplayChanged = handleItemDisplayChanged;
    config.handleSortingChanged = handleSortingChanged;
    config.handlePdpBlick = handlePdpBlick;
    config.hideSortOption = false;

    //const config1 = CloneConfig(config);

    const FetCategoryProduct = async (category, page) => {
        LoaderToggle(true);

        if(!page) { page = 1; }
        var res = await GetCategoryProduct(category, page, pageinfo.pageSize, pageinfo.sorting);
        if(res.isSuccess)
        {
            setProducts(res.data.products);
            setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageinfo.pageSize, pageinfo.sorting));
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
                    <Category handleClick={categoryHandleClick} productCount={products.length}/>
                </div>
                <div className='column right'>
                    <div className='product-container'>
                    <ProductList config={config} products={products}/>
                    </div> 
                </div>
            </div>
        </>
    );
}

export function  ProductList(props) {
    if(props.products.length <= 0)
    {
        return(
            <div className="product-list-container">
                { 
                    <div className="product-flex">
                        <div className="no-product">No Product</div>
                    </div>
                }
            </div>
        );
    }
    const config1 = CloneConfig(props.config);
    config1.hideDisplayPageInfo = true;
    config1.hideDisplayOption = true;
    config1.hideSortOption = true;
  return (        
        <div className="product-list-container">
            {props.products && props.products.length > 0 && <Pagination config={props.config}/>}
            <div className="product-flex">
                {props.products.map((p) => {
                    return <ProductItem key = {p.id} product = {p} handleAddToCartClick={props.config.handleAddToCartClick}/>
                })}
            </div>
            {props.products && props.products.length > 0 && <Pagination config={config1}/>}
        </div>    
  )
};

export function ProductItem(props){
    return(
        <div className='product-card-container'>
            <div className="product-card"> 
                    <div className="product-img">
                        <a href={'/' + constants.NAV_PRODUCT_DETAIL + '?id=' + props.product.id}>
                            <img className='product-image' src={props.product.thumbnail} alt={props.product.title} loading='lazy'/>
                        </a>
                    </div>

                    <p className="product-title">{props.product.title}</p>
                    <p className="product-sku">{props.product.sku}</p>
                    <p className="product-description">{props.product.description}</p>
                    <p className="product-stock">{props.product.availabilityStatus} ({props.product.stock})</p>
                    <p className="product-price">{props.product.price} $</p>

                    <div className="product-card-buttons">
                        <button className="add-to-cart-button" onClick={props.handleAddToCartClick} value={props.product.id} sku={props.product.sku} price={props.product.price}>Add To Cart</button>
                    </div>
            </div>
        </div>
    );
}