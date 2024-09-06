import '../styles/logout.css';

import { useEffect, useState } from 'react';
import { Loader } from "../components/Loader/loader.js";
import { useNavigate } from "react-router-dom";
import * as constants from '../constants/constant.js'

const LogoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try{
      setIsLoading(true);
      localStorage.removeItem(constants.AUTH_NAME);
      setTimeout(() => {
        navigate('/' + constants.NAV_LOGIN); 
  
        setIsLoading(false);
      }, 1000);
    }catch (error) {
      navigate('/');
    }
  }, []);

  return (
    <>
      {isLoading && <Loader/> }
        <div className='logout-main'>      
          <div className='logout-container'>
            <p>LOGGING OUT</p>
          </div>
        </div>
    </>
  )
}

export default LogoutPage;