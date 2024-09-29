import * as constants from '../constants/constant.js'
import { FetchData } from '../services/queryServiceBase.js';

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

const GetPostList = async (page, pageSize, sorting) => {
    var skip = (page - 1) * pageSize;
    var sort = BuildSortParam(sorting);
    var pagging = '&limit='+ pageSize + '&skip=' + skip;
    var url = constants.POST_URL + '?' + sort + pagging; 
    return FetchData(url); 
}

const GetPostComments = async (postId) => {
    var url = constants.POST_URL + '/' + postId + '/comments'; 
    return FetchData(url); 
}

const GetPostDetail = async (postId) => {
    var url = constants.POST_URL + '/' + postId;
    return FetchData(url);
}


export { GetPostList, GetPostComments, GetPostDetail };
