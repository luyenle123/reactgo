import {} from '../../styles/productdetail.css';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetProductDetail } from '../../services/productAPI.js';
import { Loader, LoaderToggle } from "../Loader/loader.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Youmayalsolike from './youmayalsolike.js';
import { DoAddToCart, UpdateCartInfo } from '../Cart/cart.js';
import CartPopupResult from '../Cart/cartPopupResult.js';
import { AddToCartButton } from '../Buttons/addtocartbutton.js';

const ProductContext = createContext();

export default function ProductDetail(){
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({images:['']});

    const queryData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id')

        setIsLoading(true);
        var res = await GetProductDetail(id);
        if(res.isSuccess)
        {
            setProduct(res.data);
        }
        else{
            toast('Error: ' + res.data);
        }
        
        setIsLoading(false);          
    }

    useEffect(() => {
        queryData();
    }, []);

    return(
        <>
            {isLoading && <Loader/>}

            <div className="pdp-container">

                <ProductContext.Provider value={product}>
                    <PDPHeader/>
                    <PdpSpectTab/>

                    <Youmayalsolike currentProduct={product}/>
                </ProductContext.Provider>
            </div>            
        </>
    );
}

export function PDPHeader(){
    const [cartProduct, setCartProduct] = useState(undefined);    
    const product = useContext(ProductContext);

    const handleAddToCartClick = (product) => {
        LoaderToggle(true);
        DoAddToCart(product.id, product.sku, () => {
            LoaderToggle(false, () => {
                setTimeout(function(){ setCartProduct(product)}, 100);
              });
              UpdateCartInfo(null, 1);
        });     
    };       

  return (
    <>
        { cartProduct && <CartPopupResult product={product} handleCallback={() => { setCartProduct(undefined)}}/> }

        <div className={'pdp-block pdp-header'}>
            <div className="pdp-header-image">
                {product.images && <img src={product.images[0]} alt={product.title} /> }
            </div>                
            <p className='pdp-header-title'>{product.title}</p>
            <p className='pdp-header-sku'>{product.sku}</p>
            <p className='pdp-header-category'>{product.category}</p>
            <p className='pdp-header-brand'>{product.brand}</p>
            <p className='pdp-header-description'>{product.description}</p>

            <div className="pdp-add-to-cart-buttons-wrapper">
                <AddToCartButton handleAddToCartClick={handleAddToCartClick} product={product}/>
            </div>
        </div>    
    </>
  )
}

export function PdpSpectTab(){
    const [tabId, setTabId] = useState(1);

    const tabChanged = (id) => {
        setTabId(id);
    }

    var actvie1 = tabId === 1 ? ' active': '';
    var actvie2 = tabId === 2 ? ' active': '';
    var actvie3 = tabId === 3 ? ' active': '';

    return(
    <>
        <div className='pdp-tab-wrapper'>
            <div className='pdp-tab-header'>
                <div className={'pdp-tab-header-item ' + actvie1} onClick={() => tabChanged(1)}>Spec</div>
                <div className={'pdp-tab-header-item ' + actvie2} onClick={() => tabChanged(2)}>Gallary</div>
                <div className={'pdp-tab-header-item ' + actvie3} onClick={() => tabChanged(3)}>Review</div>
            </div>

            <div className='pdp-tab-body'>
                {tabId === 1 && <Spec/>}
                {tabId === 2 && <Gallery/>}
                {tabId === 3 && <Review/>}
            </div>

        </div>
    </>);
}

export function Spec(){
    const product = useContext(ProductContext);    
    return(
        <>
            <div className={'pdp-spec'}>
                <p>{product.warrantyInformation}</p>
                <p>{product.shippingInformation}</p>
                <p>{product.availabilityStatus}</p>
                <p>{product.returnPolicy}</p>
                <p>{product.rating}</p>
                <p>{product.discountPercentage}</p>
                <p>{product.minimumOrderQuantity}</p>

                {product.dimensions && 
                <div className='pdp-spec-dimension'>
                    <div className='pdp-spec-dimension-title'>Dimensions</div>
                    <div className='pdp-spec-dimension-detail'>
                        <div>width: {product.dimensions.width}</div>
                        <div>height: {product.dimensions.height}</div>
                        <div>depth: {product.dimensions.depth}</div>
                    </div>
                </div>}

            </div>        
        </>
    );
}

export function Gallery(){
    const product = useContext(ProductContext);    
    return(
        <>
            <div className={'pdp-gallery'}>
                {product.images.map((img, i) => 
                <>
                    <LazyLoadImage className='product-image' alt='gallery image' src={img} key={i} width={300} height={300}/>
                </> )}
            </div>        
        </>
    );
}

export function Review(){
    const product = useContext(ProductContext);    
    return(
        <>
            <div className={'pdp-review'}>
                <BuildReview reviews={product.reviews}/>
            </div>        
        </>
    );
}

export function BuildReview(){
    const product = useContext(ProductContext);

    if(!product || !product.reviews){
        return(
            <></>
        );
    }
    return(
        <>
            {product.reviews.map((r) => { return <ReviewItem key={r.reviewerEmail} data={r}/> })}
        </>
    );
}

export function ReviewItem({data}){
    return(
        <div className="review-item">                                    
            <p>{data.date}</p>
            <p>{data.reviewerName}</p>
            <p>{data.reviewerEmail}</p>
            <p>{data.comment}</p>            
            <p>{data.rating}</p>
        </div>
    );
}
