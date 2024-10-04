import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductList from "./pages/productlist";
import UserList from "./pages/userlist";
import OtherPage from "./pages/other";
import CartPage from "./pages/cart";
import LoginPage from './pages/loginpage';
import LogoutPage from './pages/logoutpage';
import ProductDetailPage from './pages/productDetailPage';
import * as constants from './constants/constant.js'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from './pages/search.js';
import BlogPage from './pages/blog.js';
import ContactUsPage from './pages/contactus.js';
import AboutPage from './pages/about.js';
import LoginLayout from './layouts/loginLayout.js';
import MainLayout from './layouts/mainLayout.js';
import NoBannerLayout from './layouts/noBannerLayout.js';

// const EmptyLayoutRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <EmptyLayout>
//           <Component {...matchProps} />
//         </EmptyLayout>
//       )}
//     />
//   );
// };

// const LoginLayoutRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <LoginLayout>
//           <Component {...matchProps} />
//         </LoginLayout>
//       )}
//     />
//   );
// };

// const MainLayoutRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <MainLayout>
//           <Component {...matchProps} />
//         </MainLayout>
//       )}
//     />
//   );
// };

export default function App() {
  return (
    <>
      <ToastContainer autoClose={1000}/>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path={constants.NAV_PRODUCT_LIST} element={<ProductList />} />
            <Route path={constants.NAV_PRODUCT_DETAIL} element={<ProductDetailPage />} />
            <Route path={constants.NAV_USER_LIST} element={<UserList />} />
            <Route path={constants.NAV_CART_DETAIL} element={<CartPage />} />            
            <Route path={constants.NAV_SEARCH} element={<SearchPage/>} />
            <Route path={constants.NAV_BLOG} element={<BlogPage/>} />
            <Route path={constants.NAV_CONTACT_US} element={<ContactUsPage/>} />                 
          </Route>

          <Route path="/" element={<LoginLayout />}>
            <Route path={constants.NAV_LOGIN} index element={<LoginPage />} />
            <Route path={constants.NAV_LOGOUT} index element={<LogoutPage />} />       
          </Route>

          <Route path="/" element={<NoBannerLayout />}>
            <Route path={constants.NAV_OTHERS} element={<OtherPage />} />
            <Route path={constants.NAV_ABOUT} element={<AboutPage/>} />  
          </Route>        
        </Routes>
      </BrowserRouter>
    </>
  );
}
