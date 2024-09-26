import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { Suspense } from 'react';
// require('dotenv').config();

const Login = React.lazy(() => import('../components/Login/login'));
const LoginPage = () => {
  const google_client_id =  '';
  return (
    <Suspense>
      <GoogleOAuthProvider clientId={google_client_id}>
        <Login/>
      </GoogleOAuthProvider> 
    </Suspense>    
  )
}

export default LoginPage;