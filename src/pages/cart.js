import React, { Suspense } from 'react';
// import '../styles/cart.css';

//import {CartPageDetail} from '../components/CartPage/cartdetail';

const CartPageDetail = React.lazy(() => import('../components/Cart/cartdetail'));

const CartPage = () => {
    return (
        <>
        {/* fallback = {<p>Loading...</p>} */}
          <Suspense>
            <CartPageDetail/>
          </Suspense>
        </>
      );
  };
  
  export default CartPage;