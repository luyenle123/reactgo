import React from 'react'
import { Link } from 'react-router-dom'
import * as constants from '../../constants/constant.js'
import { Cart } from '../Cart/cart'
import '../../styles/navbar.css';

export default function NavBar(isLogin){
  return (
    <div  className="navigation-container">          
    <nav className="navigation">
        <ul className="nav-list">
            {!isLogin && <li> <Link to={'/' + constants.NAV_LOGIN}>Login</Link> </li>}

            {isLogin && 
                <>
                    <li>
                        <div className='welcome'>
                            Hello <span>{localStorage.getItem(constants.AUTH_USER_NAME)}</span>
                        </div>                        
                    </li>
                    <li>
                        <Link to={'/' + constants.NAV_LOGOUT} className='nav-logout'>Logout</Link>
                    </li>                            
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to={'/' + constants.NAV_PRODUCT_LIST}>Products</Link>
                    </li>
                    <li>
                        <Link to={'/' + constants.NAV_SEARCH}>Search</Link>
                    </li>                              
                    <li>
                        <Link to={'/' + constants.NAV_CART_DETAIL}>Cart</Link>
                    </li>
                    <li>
                        <Link to={'/' + constants.NAV_BLOG}>Blog</Link>
                    </li>
                    <li>
                        <Link to={'/' + constants.NAV_CONTACT_US}>Contact Us</Link>
                    </li>
                    <li>
                        <Link to={'/' + constants.NAV_USER_LIST}>Users</Link>
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
  )
}
