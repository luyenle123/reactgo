import React, { useState } from 'react'

import '../../styles/blog.css';
import { GetConfig, Pagination } from '../Pagination/pagination';
import { GetPageInfo } from '../Pagination/paginationUtils';
import { Loader } from '../Loader/loader';
import PostItem from './blogItem';
import { useFetchData } from '../../services/useFetchData';
import { GetPostListUrl } from '../../services/blogAPI';

export default function BlogList() {
    const [pageData, setPageData] = useState({page:1, size: 12, sorting: 1});
    const emptyPosts = [{},{},{},{},{},{},{},{},{},{},{},{}];

    const url = GetPostListUrl(pageData.page, pageData.size, pageData.sorting);
    const [data, isLoading, error] = useFetchData(url);
    const posts = data?.posts;
    const pageInfo = data ? GetPageInfo(data.total, data.posts.length, pageData.page, pageData.size, pageData.sorting) : {total: 0, pageSize:12, sorting:1};

    if(error){
        console.log(error);
    }

    const PageChanged = (page, pageSize) => {
        setPageData({page: page, size: pageSize});
    };    

    const gotData = posts && posts.length > 0;
    const config = GetConfig(isLoading, gotData, pageInfo);
    config.hideSortOption = true;
    config.hideDisplayOption = true;
    config.hideDisplayPageInfo = true;
    config.hidePageOption = true;
    config.PageChanged = PageChanged;

    const emptyConfig = GetConfig(isLoading, true, GetPageInfo(12, 12, 1, pageInfo.pageSize, pageInfo.sorting));
    emptyConfig.hideSortOption = true;
    emptyConfig.hideDisplayOption = true;
    emptyConfig.hideDisplayPageInfo = true;
    emptyConfig.hidePageOption = true;

    return (
        <div className='blog-conatiner'>
            <div className='blog-header'>
                Blog
            </div>

            {isLoading && <Loader isActive={true}/>}
          
            <div className='blog-list-wrapper'>
                {!posts ? 
                    <>
                        <div className='empty-item'>
                            <Pagination config={emptyConfig}/>
                        </div>
                    </> 
                    : 
                    <>{config.hasData && <Pagination config={config}/>}</>
                }

                <div className="blog-list">
                    {!posts ? 
                    <>
                        {emptyPosts.map((post, i) => (<PostItem key={i} post={post} isEmpty={true}/> ))}
                    </> 
                    : 
                    <>
                        {posts?.map((post, i) => (<PostItem key={i} post={post}/> ))}
                    </>}
                </div>
            </div>                 
        </div>
    )
}