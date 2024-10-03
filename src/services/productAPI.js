import * as constants from '../constants/constant.js'
import { FetchData } from '../services/queryServiceBase.js';

const BuildSortParam = (type) => {
    switch(type){
        case(1):
            return 'sortBy=price&order=asc';
        case(2):
            return 'sortBy=price&order=desc';
        case(3):
            return 'sortBy=title&order=asc';
        case(4):
            return 'sortBy=title&order=desc';
        default:
            return 'sortBy=price&order=asc';
    }
}

const GetCategoryList = async () => {
    var url = constants.CATEGORY_LIST_URL;
    var result = await FetchData(url);
    return result;
}

const GetCategoryProduct = async (category, page, pageSize, sorting) => {
    var skip = (page - 1) * pageSize;
    var sort = BuildSortParam(sorting);
    var pagging = '&limit='+ pageSize + '&skip=' + skip;
    var url = constants.CATEGORY_URL + '/' + category + '?' + sort + pagging;;  
    return FetchData(url);
}

const GetProductList = async (page, pageSize, sorting) => {
    var skip = (page - 1) * pageSize;
    var sort = BuildSortParam(sorting);
    var pagging = '&limit='+ pageSize + '&skip=' + skip;
    var url = constants.PRODUCT_URL + '?' + sort + pagging; 
    return FetchData(url);
}

const GetProductDetail = async (productId) => {
    var url = constants.PRODUCT_URL + '/' + productId;
    return FetchData(url);
}

const SearchProduct = async (key) => {
    var url = constants.SEARCH_PRODUCT_URL + '?q=' + key ;
    return FetchData(url);
}

export { GetCategoryList, GetCategoryProduct, GetProductList, GetProductDetail, SearchProduct };

// const FetchData = async (url) => {
//     try {
//         const response = await new Promise(            
//             resolve => {
//                 fetch(url)
//                 .then((res) => {
//                     if (res.ok) {
//                       return res.json();
//                     }
//                     resolve({data: res.status, isSuccess: false});
//                 })
//                 .then((res) =>{
//                     resolve({data: res, isSuccess: true})
//                 })
//                 .catch(err => {
//                     resolve({data: err, isSuccess: false});
//                 })
//             }
//         );
//         return response;
//     } catch (error) {
//         return {data: error, isSuccess: false};
//     }
// }