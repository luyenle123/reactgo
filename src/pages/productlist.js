// import { Products } from '../components/Product/products.js';

import React, { Suspense } from 'react';

const Products = React.lazy(() => import('../components/Product/products.js'));

const ProductList = () => {
  //fallback = {<p>Loading...</p>}
  return (
    <>
      <Suspense>
        <Products/>
      </Suspense>
    </>
  );
  };
  
  export default ProductList;