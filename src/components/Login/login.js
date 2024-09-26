import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Loader } from "../Loader/loader.js";
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {GetGoogleUerInfo, LoginAPI} from '../../services/userService.js';
import * as constants from '../../constants/constant.js'
import { useGoogleLogin  } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

import '../../styles/login.css'
import googleIcon from '../../images/google.png';

const google_client_id =  '980791468427-0um1vqe2ptvth730ufm4mauk2omeg5pf.apps.googleusercontent.com';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);     
    const navigate = useNavigate();
    const [ user, setUser ] = useState();
    const [ profile, setProfile ] = useState();

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

    useEffect(() => {
      async function getUserInfo() {
        var userInfo = await GetGoogleUerInfo(user.access_token);

        if(userInfo.isSuccess){
          console.log('USER INFO: ');
          console.log(userInfo);
          console.log('--------------------');
          setProfile(userInfo.data);
          toast.success('login success with ' + userInfo?.data?.name + '' + userInfo?.data?.email);
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
    }, [ user ]);
  
    
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

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
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
                  <input type="checkbox" name="checkbox" />
                  <div className='checkbox-label'>Remember</div>
              </div>

              <div className='item-block'>
                <button className='login-button-base login-button' onClick={handleLoginClick}>Login</button>
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
              
              <div className='item-block text-center'>
                <p>
                  <a href='/login'>Forgot password</a>
                </p>
              </div>                
                
            </div>
        </div>
    </div>
  )
}

export default Login;