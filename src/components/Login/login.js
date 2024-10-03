import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Loader } from "../Loader/loader.js";
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {GetGoogleUerInfo, LoginAPI} from '../../services/userAPI.js';
import * as constants from '../../constants/constant.js'
import { useGoogleLogin  } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

import '../../styles/login.css'
import googleIcon from '../../images/google.png';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);     
    const navigate = useNavigate();
    const [ user, setUser ] = useState();
    // const [ profile, setProfile ] = useState();

    const inputRef = React.useRef();

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

    useEffect(() => {
      async function getUserInfo() {
        var userInfo = await GetGoogleUerInfo(user.access_token);

        if(userInfo.isSuccess){
          console.log('USER INFO: ');
          console.log(userInfo);
          console.log('--------------------');
          // setProfile(userInfo.data);
          toast.success('login success with ' + userInfo?.data?.name + '' + userInfo?.data?.email);

          localStorage.setItem(constants.AUTH_NAME, user?.access_token);
          localStorage.setItem(constants.AUTH_USER_NAME, userInfo?.data?.name);

          navigate('/');
        }
        else{
          toast.error('login failed');
        }
      } 

      if (user) {
        console.log('ACCESS_TOKEN: ' + user.access_token);
        getUserInfo();

        // fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        //     headers: {
        //         Authorization: `Bearer ${user.access_token}`,
        //         Accept: 'application/json'
        //     }
        // })
        // .then((res) => {

        //   fetch(res.url)
        //   .then((res) => {
        //       if (res.ok) {
        //         return res.json();
        //       }
        //   })
        //   .then((res) => {
        //     setProfile(res);

        //     console.log('PROFILE: ');
        //     console.log(res);
        //     console.log('--------------------');                
        //   })
        //   .catch((err) => {
              
        //   });
        // })
        // .catch((err) => console.log('ERROR: ' + err));
      }
    }, [ user, navigate ]);
  
    
    const emailChangeHandle = (e) => {
      setEmail(e.target.value);
    }

    const passwordChangeHandle = (e) => {
      setPassword(e.target.value);
    }    

    const handleLoginClick = async (e) => {

      if(!email || !password){
        toast('Input username and password');
        return;
      }      

        setIsLoading(true);
        var res = await LoginAPI('emilys','emilyspass');
        if(res.isSuccess)
        {
          if(res.data.accessToken !== undefined){
            localStorage.setItem(constants.AUTH_NAME, res?.data?.accessToken);
            localStorage.setItem(constants.AUTH_USER_NAME, res?.data?.username);
            toast('Login successful.');
            navigate('/');
          }
        }
        else{
          toast('Error: ' + res.data);
        }

        setIsLoading(false);         
    };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      //console.log(tokenResponse);
      setUser(tokenResponse);     
    },
    onError: () => toast.error("Login Failed")    
  });  

  return (
    <div className='login-main'>
        {isLoading && <Loader/> }

        <div className='login-container'>
          
            <div className='login-header'>Login</div>
            <div className='login-form'>

              <div className='item-block'>
                <input ref={inputRef} className='item-block-textbox' type='text' id='email' placeholder='user name' maxLength={100} onChange={emailChangeHandle}/>
              </div>

              <div className='item-block'>
                <input className='item-block-textbox' type='password' id='password' placeholder='password' maxLength={100} onChange={passwordChangeHandle}/>
              </div>

              <div className='item-block'>
                <label className='checkbox flex float-left'>
                  <input type="checkbox" name="checkbox" autoFocus className='outline-none w-5 h-5'/> 
                  <span className='ml-2'>Remember</span>
                </label>

                <a href={'/login'} className='hover:underline float-right'>
                  Forgot password
                </a>                  
                  {/* <input type="checkbox" name="checkbox" />
                  <div className='checkbox-label'>Remember</div> */}
              </div>

              <div className='item-block mt-10'>
                <button className='login-button-base login-button' onClick={handleLoginClick}>Login</button>
              </div>

              <div className='item-block text-center'>
                Or
              </div>              
              
              <div className='item-block'>
                {/* <GoogleOAuthProvider clientId={google_client_id}>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);

                      const token = credentialResponse?.credential;
                      const decoded = jwtDecode(token);
                      
                      console.log(decoded.name);
                      console.log(decoded.email);
                      console.log(decoded);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </GoogleOAuthProvider> */}
             
              <button className='login-button-base login-button-google' onClick={() => login()}>
                <img src={googleIcon} width={20} height={20} alt='google'></img>
              </button>  

              </div>
                
            </div>
        </div>
    </div>
  )
}

export default Login;