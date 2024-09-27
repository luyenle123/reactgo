import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { GetPageInfo } from "../Pagination/paginationUtils.js";
import { Pagination, GetConfig, CloneConfig } from '../Pagination/pagination.js'
import { Loader } from "../Loader/loader.js";
import {GetUserList} from '../../services/userService.js';

export default function Users(){
    const [users, setUsers] = useState([]);
    const [pageinfo, setPageInfo] = useState({pageSize:15, sorting:1});
    const [gotData, setgotData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const queryData = (page) => {
        setIsLoading(true);
        setTimeout(() => {
            doFetchUser(page);
        }, 500);
      };
      
    const doFetchUser = async (page) => {
        var skip = (page - 1) * pageinfo.pageSize;
        var res = await GetUserList(page, pageinfo.pageSize, skip);
        if(res.isSuccess)
        {
            setUsers(res.data.users);
            setPageInfo(GetPageInfo(res.data.total, res.data.users.length, page, pageinfo.pageSize, pageinfo.sorting));
            setgotData(true);
        }
        else{
            toast('Error: ' + res.data);
        }
        setIsLoading(false);
    }

    // const handleClick = () => {
    //     queryData(1);
    // };

    const handleNextClick = () => {
        if(pageinfo.page >= pageinfo.totalPage) return;
        var page = pageinfo.page+1;
        if(page > pageinfo.totalPage){ page = pageinfo.page}
        queryData(page);
    };
    
    const handleBackClick = () => {
        if(pageinfo.page <= 1) return;
        var page = pageinfo.page-1;
        if(page <= 0){ page = 1}
        queryData(page);
    };

    const handlePagination = (e) => {
        if(parseInt(e.target.value) === pageinfo.page) return;
        queryData(e.target.value);
    };


    const handleItemDisplayChanged = (e) => {
        var newPageSize = parseInt(e.target.value);
        pageinfo.pageSize = newPageSize;

        queryData(1);
    };

    const handleSortingChanged = (e) => {
      
    };    
   
    const config = GetConfig(isLoading, gotData, pageinfo);
    config.hideSortOption = true;
    config.hideDisplayOption = false;
    config.handlePaginationNumberClick = handlePagination;
    config.handleBackClick = handleBackClick;
    config.handleNextClick = handleNextClick;
    config.handleItemDisplayChanged = handleItemDisplayChanged;
    config.handleSortingChanged = handleSortingChanged; 

    useEffect(()=>{
        async function FetchUser() {
            var res = await GetUserList(1, pageinfo.pageSize, 0);
            if(res.isSuccess)
            {
                setUsers(res.data.users);
                setPageInfo(GetPageInfo(res.data.total, res.data.users.length, 1, pageinfo.pageSize, pageinfo.sorting));
                setgotData(true);
            }
            else{
                toast('Error: ' + res.data);
            }
            setIsLoading(false);
        }

        FetchUser();
    }, [pageinfo.pageSize, pageinfo.sorting]);

    return(
        <>
            {config.isLoading && <Loader/>}        
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