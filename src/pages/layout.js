import '../styles/layout.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Cart } from '../components/CartPage/cart'
import { useEffect } from 'react';
import * as constants from '../constants/constant.js'
import { Loader } from '../components/Loader/loader.js';
import { IsLogin } from '../services/userService.js';
import Footer from '../components/Footer/footer.js';

const Layout = () => {
    const navigate = useNavigate();

    var isLogin = false;
    useEffect(() => {
        isLogin = IsLogin();
        if(!isLogin){
            navigate('/' + constants.NAV_LOGIN)
        }
    }, []);

    if(!isLogin){
        isLogin = IsLogin();
    }

    //console.log('>> render layout');
    
    const mainContainerClass = isLogin ? 'main-container' : 'main-container-login';

  return (
    <>
    {isLogin && 
        <div  className="navigation-container">          
            <nav className="navigation">
                <ul className="nav-list">
                    {!isLogin && <li> <Link to={'/' + constants.NAV_LOGIN}>Login</Link> </li>}

                    {isLogin && 
                        <>
                            <li>
                                <Link to={'/' + constants.NAV_LOGOUT} className='nav-logout'>Logout</Link>
                            </li>                            
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to={'/' + constants.NAV_USER_LIST}>Users</Link>
                            </li>          
                            <li>
                                <Link to={'/' + constants.NAV_PRODUCT_LIST}>Products</Link>
                            </li>
                            <li>
                                <Link to={'/' + constants.NAV_SEARCH}>Search</Link>
                            </li>                              
                            <li>
                                <Link to={'/' + constants.NAV_CART_DETAIL}>Cart Detail</Link>
                            </li>                      
                            <li>
                                <Link to={'/' + constants.NAV_OTHERS}>Others</Link>
                            </li>                    
                        </>
                    }
                </ul>
            </nav>
            <div className="cart">
            <Cart/>
            </div>
        </div>
    }
        <div className={mainContainerClass}>
            <Loader isActive={false}/>
            <Outlet />
        </div>
        <Footer/>
    </>
  )
};

export default Layout;