import * as constants from '../constants/constant.js'
import { FetchData } from './queryServiceBase.js';

const BuildSortParam = (type) => {
    switch(type){
        case(1):
            return 'sortBy=title&order=asc';
        case(2):
            return 'sortBy=title&order=desc';
        default:
            return 'sortBy=title&order=asc';
    }
}

const GetPostListUrl = (page, pageSize, sorting) => {
    var skip = (page - 1) * pageSize;
    var sort = BuildSortParam(sorting);
    var pagging = '&limit='+ pageSize + '&skip=' + skip;
    var url = constants.POST_URL + '?' + sort + pagging; 
    return url;
}

const GetPostCommentUrl = (postId) => {
    var url = constants.POST_URL + '/' + postId + '/comments'; 
    return url;
}

const GetPostList = async (page, pageSize, sorting) => {
    return FetchData(GetPostListUrl(page, pageSize, sorting)); 
}

const GetPostComments = async (postId) => {
    return FetchData(GetPostCommentUrl(postId)); 
}

const GetPostDetail = async (postId) => {
    var url = constants.POST_URL + '/' + postId;
    return FetchData(url);
}


export { GetPostList, GetPostComments, GetPostDetail, GetPostListUrl, GetPostCommentUrl };
