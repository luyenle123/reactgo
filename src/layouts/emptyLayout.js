import '../styles/layout.css';
import { Outlet } from "react-router-dom";

const EmptyLayout = () => {
  return (
    <>       
        <div className='main-container-login'>
            <Outlet />
        </div>
    </>
  )
};

export default EmptyLayout;