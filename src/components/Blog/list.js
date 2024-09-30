import React, { useEffect, useState } from 'react'
import { GetPostList } from '../../services/blogService';

import '../../styles/blog.css';
import { GetConfig, Pagination } from '../Pagination/pagination';
import { toast } from 'react-toastify';
import { GetPageInfo } from '../Pagination/paginationUtils';
import { LoaderToggle } from '../Loader/loader';
import PostItem from './blogItem';
import PostItemEmpty from './blogItemEmpty';

export default function BlogList() {
    const [posts, setPosts] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState({pageSize:12, sorting:1});

    const emptyPosts = [{},{},{},{},{},{},{},{},{},{},{},{}];

    useEffect(() => {
        async function fetchPosts() {                
            const res = await GetPostList(1, pageInfo.pageSize, pageInfo.sorting);
  
            setPosts(res.data.posts);
            setPageInfo(GetPageInfo(res.data.total, res.data.posts.length, 1, pageInfo.pageSize, pageInfo.sorting));            
            setIsLoading(false);
            LoaderToggle(false);
        }
  
        setIsLoading(true);
        LoaderToggle(true);
        fetchPosts();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const queryData = async (page) => {
        LoaderToggle(true);
        setIsLoading(true);
        var res = await GetPostList(page, pageInfo.pageSize, pageInfo.sorting);
        if(res.isSuccess)
        {
            setPosts(res.data.posts);
            setPageInfo(GetPageInfo(res.data.total, res.data.posts.length, page, pageInfo.pageSize, pageInfo.sorting));
        }
        else{
            toast('Error: ' + res.data);
        }
        setIsLoading(false);
        LoaderToggle(false);
    }    
  
    // if(!posts){
    //     return(<>Fetch Blog ...</>);
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

    const gotData = posts && posts.length > 0;
    const config = GetConfig(isLoading, gotData, pageInfo);
    config.hideSortOption = true;
    config.hideDisplayOption = true;
    config.hideDisplayPageInfo = true;
    config.hidePageOption = true;
    config.PageChanged = PageChanged;

    const emptyConfig = GetConfig(isLoading, true, GetPageInfo(12, 12, 1, pageInfo.pageSize, pageInfo.sorting));
    config.hideSortOption = true;
    config.hideDisplayOption = true;
    config.hideDisplayPageInfo = true;
    config.hidePageOption = true;

    return (
        <div className='blog-conatiner'>
            <div className='blog-header'>
                Blog
            </div>
          
            <div className='blog-list-wrapper'>
                {!posts ? 
                    <>
                        <div className='empty-item-without-color'>
                            <Pagination config={emptyConfig}/>
                        </div>
                    </> 
                    : 
                    <>{config.hasData && <Pagination config={config}/>}</>
                }

                <div className="blog-list">
                    {!posts ? 
                    <>
                        {emptyPosts.map((post, i) => (
                            <PostItemEmpty key={i} post={post}/>
                        ))}                    
                    </> 
                    : 
                    <>
                        {posts.map((post, i) => (
                            <PostItem key={i} post={post}/>
                        ))}                    
                    </>}
                </div>
            </div>                 
        </div>
    )
}