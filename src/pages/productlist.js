// import { Products } from '../components/Product/products.js';

import React, { Suspense } from 'react';

const Products = React.lazy(() => import('../components/Product/products.js'));

const ProductList = () => {
  return (
    <>
      <Suspense fallback = {<p>Loading...</p>}>
        <Products/>
      </Suspense>
    </>
  );
  };
  
  export default ProductList;