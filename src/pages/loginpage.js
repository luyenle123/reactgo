import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { Suspense } from 'react';

const Login = React.lazy(() => import('../components/Login/login'));
const LoginPage = () => {
  // const google_client_id =  '';
  return (
    <Suspense>
      <GoogleOAuthProvider clientId=''>
        <Login/>
      </GoogleOAuthProvider> 
    </Suspense>    
  )
}

export default LoginPage;