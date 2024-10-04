import { useState, useEffect } from "react";
import { GetPageInfo } from "../components/Pagination/paginationUtils";
import { FetchData } from "./queryServiceBase";
import { GetPostCommentUrl, GetPostListUrl } from "./blogAPI";
import { FETCH_CACHE_IN_SECOND } from "../constants/cacheconfig";

const useBlogFetcher = (page, size) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = GetPostListUrl(page, size, 1);  

  const FindPostData = () =>{
    return posts.find((x) => x.url === url);
  }

  const CleanUp = (list) => {
    const validItems = [];
    list.forEach((element) => {
        if(!IsInvalidCache(element.lastQuery)){
            validItems.push(element);
        }
    })
    return validItems;
  }

  const AllowFetchData = () => {
    const existData = FindPostData();

    if(!existData){
        return true;
    }
    else{
        return IsInvalidCache(existData.lastQuery);
    }
 } 

  useEffect(() => {
    async function DoFetchData(url) {
        setIsLoading(true);
        const res = await FetchData(url);
        if(res.isSuccess){
            const pinfo = GetPageInfo(res.data.total, res.data.posts.length, page, size, pageInfo.sorting);
            const existPostData = FindPostData();
            if(existPostData){

                const updateList = posts.map(p => {
                    if (p.url !== url) {
                      return p;
                    } else {
                      return {
                        ...p,
                        data: res.data.posts, lastQuery: Date.now(), pageInfo: pinfo
                      };
                    }
                  });

                  setPosts(CleanUp(updateList));
            }
            else
            {
                var list = [...posts,{url: url, data: res.data.posts, pageInfo: pinfo, lastQuery: Date.now()}];
                setPosts(CleanUp(list));
            }            
        }
        else{
            setError(res.data);
        }
        setIsLoading(false);
    }

    if(AllowFetchData()){
        DoFetchData(url);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

    const post = FindPostData();  
    let postsdata = null;
    let pageInfo = {pageSize:12, sorting:1};
    if(post)
    {
        postsdata = post.data;
        pageInfo = post.pageInfo;
    }

  return [postsdata, isLoading, pageInfo, error];
};

const IsInvalidCache = (lastTime) => {
    if(lastTime){
        const millis = Date.now() - lastTime;
        var second = Math.floor(millis / 1000);
        if(second > FETCH_CACHE_IN_SECOND){
            return true;
        }
    }
    return false;
}

const useBlogCommentFetcher = (postId, page, size) => {
    const [postComment, setPostComments] = useState({postId:0, comments: null, lastQuery: null});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageInfo, setPageInfo] = useState({pageSize:12, sorting:1});  

    const url = GetPostCommentUrl(postId);

    const AllowFetchData = () => {
        if(postId && postId > 0 && postComment.postId !== postId){
            return true;
        }
        else{
            return IsInvalidCache(postComment.lastQuery);
        }
    }
  
    useEffect(() => {
      async function DoFetchData(url) {
          setIsLoading(true);
          const res = await FetchData(url);
          if(res.isSuccess){
            setPostComments({postId: postId, comments: res.data.comments, lastQuery: Date.now()});
            setPageInfo(GetPageInfo(res.data.total, res.data.comments.length, page, size, pageInfo.sorting)); 
          }
          else{
              setError(res.data);
          }
          setIsLoading(false);
      }
  
      if(AllowFetchData())
      {
        DoFetchData(url);
      }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);
  
    return [postComment.comments, isLoading, pageInfo, error];
  };

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const FindExistData = () =>{
      return data.find((x) => x.url === url);
    }
  
    const CleanUp = (list) => {
      const validItems = [];
      list.forEach((element) => {
          if(!IsInvalidCache(element.lastQuery)){
              validItems.push(element);
          }
      })
      return validItems;
    }
  
    const AllowFetchData = () => {
      const existData = FindExistData();
  
      if(!existData){
          return true;
      }
      else{
          return IsInvalidCache(existData.lastQuery);
      }
   } 
  
    useEffect(() => {
      async function DoFetchData(url) {
          setIsLoading(true);
          const res = await FetchData(url);
          if(res.isSuccess){
              const existPostData = FindExistData();
              if(existPostData){
  
                  const updateList = data.map(p => {
                      if (p.url !== url) {
                        return p;
                      } else {
                        return {
                          ...p,
                          data: res.data, lastQuery: Date.now()
                        };
                      }
                    });
  
                    setData(CleanUp(updateList));
              }
              else
              {
                  var list = [...data,{url: url, data: res.data, lastQuery: Date.now()}];
                  setData(CleanUp(list));
              }            
          }
          else{
              setError(res.data);
          }
          setIsLoading(false);
      }
  
      if(AllowFetchData()){
          DoFetchData(url);
      }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
  
      const post = FindExistData();  
      let postsdata = post ? post.data : null;
  
    return [postsdata, isLoading, error];
  };
  

export {useBlogFetcher, useBlogCommentFetcher, useFetchData};