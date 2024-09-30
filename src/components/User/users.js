import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { GetPageInfo } from "../Pagination/paginationUtils.js";
import { Pagination, GetConfig, CloneConfig } from '../Pagination/pagination.js'
import { Loader, LoaderToggle } from "../Loader/loader.js";
import {GetUserList} from '../../services/userService.js';

export default function Users(){
    const [users, setUsers] = useState([]);
    const [pageInfo, setPageInfo] = useState({pageSize:12, sorting:1});
    const [isLoading, setIsLoading] = useState(false);

    const queryData = async (page) => {
        LoaderToggle(true);
        setIsLoading(true);
        var skip = (page - 1) * pageInfo.pageSize;
        var res = await GetUserList(page, pageInfo.pageSize, skip);
        if(res.isSuccess)
        {
            setUsers(res.data.users);
            setPageInfo(GetPageInfo(res.data.total, res.data.users.length, page, pageInfo.pageSize, pageInfo.sorting));
        }
        else{
            toast('Error: ' + res.data);
        }
        LoaderToggle(false);
        setIsLoading(false);
    };
      
    // const doFetchUser = async (page) => {
    //     var skip = (page - 1) * pageInfo.pageSize;
    //     var res = await GetUserList(page, pageInfo.pageSize, skip);
    //     if(res.isSuccess)
    //     {
    //         setUsers(res.data.users);
    //         setPageInfo(GetPageInfo(res.data.total, res.data.users.length, page, pageInfo.pageSize, pageInfo.sorting));
    //     }
    //     else{
    //         toast('Error: ' + res.data);
    //     }
    //     setIsLoading(false);
    // }

    const PageChanged = (page, pageSize) => {
        if(page !== pageInfo.page){
            pageInfo.pageSize = pageSize;
            queryData(page);
            return;
        }

        if(pageSize !== pageInfo.pageSize){
            pageInfo.pageSize = pageSize;
            queryData(1);
            return;
        }
    };

    const gotData = users && users.length > 0;
    const config = GetConfig(isLoading, gotData, pageInfo);
    config.hideSortOption = true;
    config.hideDisplayOption = false;
    config.PageChanged = PageChanged;

    useEffect(()=>{
        // async function FetchUser() {
        //     var res = await GetUserList(1, pageInfo.pageSize, 0);
        //     if(res.isSuccess)
        //     {
        //         setUsers(res.data.users);
        //         setPageInfo(GetPageInfo(res.data.total, res.data.users.length, 1, pageInfo.pageSize, pageInfo.sorting));
        //     }
        //     else{
        //         toast('Error: ' + res.data);
        //     }
        //     setIsLoading(false);
        // }

        queryData(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, []);

    return(
        <>
            <div className="user-container">
                {/* {users.length <= 0 && <button onClick={handleClick}>fetch users</button>} */}

                <UserList config={config} users={users}/>
            </div>        
        </>
    );
}


export function UserList({config, users}) {
    const config1 = CloneConfig(config);
    config1.hideDisplayPageInfo = true;
    config1.hideDisplayOption = true;
    config1.hideSortOption = true; 

  return (
    <div className="user-list-container">
        {config.hasData && <Pagination config={config}/>}
        <div className="user-list-items">
            {users.map((u) => {
                return <UserItem key = {u.id} user = {u}/>
            })}
        </div>
        {config1.hasData && <Pagination config={config1}/>}
    </div>
  )
}

export function UserItem({user}){
    return(
        <div className="user-card">
            {/* <p>{user.id}</p> */}
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <div className="user-img">
                <img src={user.image} alt={user.firstName} />  
            </div>            
        </div>
    );
}