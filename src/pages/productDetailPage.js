import React, { Suspense } from 'react';

const ProductDetail = React.lazy(() => import('../components/Product/productDetail.js'));

const ProductDetailPage = () => {
    return (
      <Suspense>
        <ProductDetail/>
      </Suspense>      
    );
  };
  
export default ProductDetailPage;