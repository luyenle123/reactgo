import '../styles/layout.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from 'react';
import * as constants from '../constants/constant.js'
import { Loader } from '../components/Loader/loader.js';
import { IsLogin } from '../services/userAPI.js';
import Footer from '../components/Footer/footer.js';
import Bannerfull from '../components/Banners/bannerfull.js';
import NavBar from '../components/Navigations/navBar.js';

const MainLayout = () => {
    const navigate = useNavigate();
    var isLogin = IsLogin();
    const navBar = useMemo(() => NavBar(isLogin), [isLogin]);

    useEffect(() => {
        if(!IsLogin()){
            navigate('/' + constants.NAV_LOGIN)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const mainContainerClass = isLogin ? 'main-container' : 'main-container-login';

  return (
    <>
        {isLogin && <>{navBar}</>}
        
        {isLogin && <div className='mt-40'><Bannerfull/></div> }
        
        <div className={mainContainerClass}>
            <Loader isActive={false}/>            
            <Outlet />
        </div>
        <Footer/>
    </>
  )
};

export default MainLayout;