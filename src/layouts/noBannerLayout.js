import '../styles/layout.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from 'react';
import * as constants from '../constants/constant.js'
import { IsLogin } from '../services/userAPI.js';
import Footer from '../components/Footer/footer.js';
import NavBar from '../components/Navigations/navBar.js';

const NoBannerLayout = () => {
    const navigate = useNavigate();
    var isLogin = IsLogin();
    const navBar = useMemo(() => NavBar(isLogin), [isLogin]);

    useEffect(() => {
        if(!IsLogin()){
            navigate('/' + constants.NAV_LOGIN)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
        {isLogin && <>{navBar}</>}    
        
        <div className='main-container mt-40'>
            <Outlet />
        </div>
        <Footer/>
    </>
  )
};

export default NoBannerLayout;