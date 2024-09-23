import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Loader } from "../Loader/loader.js";
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {LoginAPI} from '../../services/userService.js';
import * as constants from '../../constants/constant.js'

import '../../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);     
    const navigate = useNavigate();

    const inputRef = React.useRef();

    // useEffect(()=>{
    //     document.getElementById('root').style.backgroundImage = `url('../images/bg_001.jpg')`;
    // })

    useEffect(() => {
      if(localStorage.getItem(constants.AUTH_NAME)){
          navigate('/')
      }
    });

    useEffect(() => {
      if(inputRef)
      {
        inputRef.current.focus();      
      }
    }, []);
    
    const emailChangeHandle = (e) => {
      setEmail(e.target.value);
    }

    const passwordChangeHandle = (e) => {
      setPassword(e.target.value);
    }    

    const handleloginClick = async (e) => {

      if(!email || !password){
        toast('Input username and password');
        return;
      }      

        setIsLoading(true);
        var res = await LoginAPI('emilys','emilyspass');
        if(res.isSuccess)
        {
          if(res.data.accessToken !== undefined){
            localStorage.setItem(constants.AUTH_NAME, res.data.accessToken);
            toast('Login successful.');
            navigate('/');
          }
        }
        else{
          toast('Error: ' + res.data);
        }

        setIsLoading(false);         
    };
  return (
    <div className='login-main'>
        {isLoading && <Loader/> }

        {/* <div className="container">
          <div className="element">
            <p>I am vertically centered.</p>
          </div>
        </div> */}

        <div className='login-container'>
          
            <div className='login-header'>Login</div>
            <div className='login-form'>

              <div className='item-block'>
                <input ref={inputRef} className='item-block-textbox' type='text' id='email' placeholder='user name' maxLength={100} onChange={emailChangeHandle}/>
              </div>

              <div className='item-block'>
                <input className='item-block-textbox' type='password' id='password' placeholder='password' maxLength={100} onChange={passwordChangeHandle}/>
              </div>

              <div className='item-block-2'>
                <label className="form-control">
                  <input type="checkbox" name="checkbox" />
                  <span className='form-control-label'>Remember</span>
                </label>
              </div>

              <div className='item-block'>
                <button className='login-button' onClick={handleloginClick}>Login</button>
              </div>              
                
            </div>
        </div>
    </div>
  )
}

export default Login;