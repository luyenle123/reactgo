import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Loader } from "../Loader/loader.js";
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {LoginAPI} from '../../services/userService.js';
import * as constants from '../../constants/constant.js'
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin  } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import env from "react-dotenv";

// import { OAuth2Client} from 'google-auth-library';

import '../../styles/login.css'
import googleIcon from '../../images/google.png';

const google_client_id =  '';

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

    useEffect(
      () => {
          if (user) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                console.log('PROFILE: ' + res.data);
            })
            .catch((err) => console.log('ERROR: ' + err));
          }
      },
      [ user ]
  );
  
    
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
 
  const GoogleLoginButton = () => {
    const handleGoogleAuth = useGoogleLogin({
      onSuccess: codeResponse => {
        console.log(codeResponse);

        const code = JSON.stringify({ code: decodeURIComponent(codeResponse.code) });
        const client_id = google_client_id;
        const client_secret = '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';
        const redirect_uri = 'http://localhost:3001';
        const grant_type = 'authorization_code';

        fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            code,
            client_id,
            client_secret,
            redirect_uri,
            grant_type,
          }),
        })
        .then(response => response.json())
        .then(tokens => {
          //res.json(tokens);
          setUser(tokens)
          console.log(tokens);
        })
        .catch(error => {
          // Handle errors in the token exchange
          console.error('Token exchange error:', error);
        });        
      
        toast.success('Sign in with Google completed.');
      },
      onError: () => toast.error("Login Failed"),
      flow: "auth-code",
    });

    return (
      <button className='login-button-base login-button-google' onClick={handleGoogleAuth}>
        <img src={googleIcon} width={20} height={20} alt='google'></img>
      </button>  
    );
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
             

                {/* <GoogleOAuthProvider clientId={google_client_id}>
                  <GoogleLoginButton />
                </GoogleOAuthProvider> */}

              {/* <MyCustomButton onClick={() => login()}>Sign in with Google 🚀</MyCustomButton>; */}
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