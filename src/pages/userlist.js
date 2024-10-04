//import { Users } from '../components/User/users.js';
import '../styles/user.css';
import '../styles/pagination.css';
import React, { Suspense } from 'react';

const Users = React.lazy(() => import('../components/User/users.js'));

const UserList = () => {
    return (
      <>
      {/* fallback = {<p>GO GO - User Loading...</p>} */}
        <Suspense>
          <Users/>
        </Suspense>
      </>
    );
  };
  
export default UserList;