import React, { Suspense } from 'react';
import '../styles/cart.css';

//import {CartPageDetail} from '../components/CartPage/cartdetail';

const CartPageDetail = React.lazy(() => import('../components/CartPage/cartdetail'));

const CartPage = () => {
    return (
        <>
          <Suspense fallback = {<p>Loading...</p>}>
            <CartPageDetail/>
          </Suspense>
        </>
      );
  };
  
  export default CartPage;