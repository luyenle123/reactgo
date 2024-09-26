import '../styles/layout.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import * as constants from '../constants/constant.js'
import { Loader } from '../components/Loader/loader.js';
import { IsLogin } from '../services/userService.js';
import Footer from '../components/Footer/footer.js';
import Bannerfull from '../components/Banners/bannerfull.js';
import NavBar from '../components/Navigations/navBar.js';

const Layout = () => {
    const navigate = useNavigate();

    var isLogin = IsLogin();
    useEffect(() => {
        if(!IsLogin()){
            navigate('/' + constants.NAV_LOGIN)
        }
    }, [navigate]);

    //console.log('>> render layout');
    
    const mainContainerClass = isLogin ? 'main-container' : 'main-container-login';

  return (
    <>
    {isLogin && <NavBar isLogin={isLogin}/>}
        <div className={mainContainerClass}>
            <Loader isActive={false}/>
            {isLogin && <Bannerfull/> }
            <Outlet />
        </div>
        <Footer/>
    </>
  )
};

export default Layout;