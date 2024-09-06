import {} from '../../styles/productdetail.css';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetProductDetail } from '../../services/productService.js';
import { Loader } from "../Loader/loader.js";

const ProductDetail = () => {
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
            <div className={'pdp-block pdp-header'}>
                <div className="pdp-header-image">
                    {product.images && <img src={product.images[0]} alt={product.title} /> }
                </div>                
                <p className='pdp-header-title'>{product.title}</p>
                <p className='pdp-header-sku'>{product.sku}</p>
                <p className='pdp-header-category'>{product.category}</p>
                <p className='pdp-header-brand'>{product.brand}</p>
                <p className='pdp-header-description'>{product.description}</p>
            </div>

            <div className={'pdp-block pdp-spec'}>
                <p>{product.warrantyInformation}</p>
                <p>{product.shippingInformation}</p>
                <p>{product.availabilityStatus}</p>
                <p>{product.returnPolicy}</p>
            </div>
            
            <div className={'pdp-block pdp-gallery'}>
                <p>Gallery</p>
            </div>             

            <div className={'pdp-block pdp-review'}>
                <BuildReview reviews={product.reviews}/>
            </div>
        </div>            
        </>
    );
}

export function BuildReview({reviews}){
    if(!reviews){
        return(
            <></>
        );
    }
    return(
        <>
            {reviews.map((r) => {
                return <ReviewItem key={r.reviewerEmail} data={r}/>
            })}        
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

export { ProductDetail}
