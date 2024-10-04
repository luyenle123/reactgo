import '../styles/layout.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import * as constants from '../constants/constant.js'
import { Loader } from '../components/Loader/loader.js';
import { IsLogin } from '../services/userAPI.js';

const LoginLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!IsLogin()){
            navigate('/' + constants.NAV_LOGIN)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  return (
    <>       
        <div className='main-container-login'>
            <Loader isActive={false}/>
            <Outlet />
        </div>
    </>
  )
};

export default LoginLayout;