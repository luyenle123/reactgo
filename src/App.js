import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
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

export default function App() {
  //console.log('App');
  return (
    <>
      <ToastContainer autoClose={1000}/>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path={constants.NAV_LOGIN} index element={<LoginPage />} />
            <Route path={constants.NAV_LOGOUT} index element={<LogoutPage />} />
            <Route index element={<Home />} />
            <Route path={constants.NAV_PRODUCT_LIST} element={<ProductList />} />
            <Route path={constants.NAV_PRODUCT_DETAIL} element={<ProductDetailPage />} />
            <Route path={constants.NAV_USER_LIST} element={<UserList />} />
            <Route path={constants.NAV_CART_DETAIL} element={<CartPage />} />
            <Route path={constants.NAV_OTHERS} element={<OtherPage />} />
            <Route path={constants.NAV_SEARCH} element={<SearchPage/>} />
            <Route path={constants.NAV_BLOG} element={<BlogPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
