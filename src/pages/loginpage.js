import React, { Suspense } from 'react'
// import Login from '../components/Login/login'

const Login = React.lazy(() => import('../components/Login/login'));

const LoginPage = () => {
  return (
    <Suspense>
      <Login/>
    </Suspense>    
  )
}

export default LoginPage;