import * as constants from '../constants/constant.js'
import { FetchData, PostData } from '../services/queryServiceBase.js';

const GetUserList = async (page, pageSize) => {
    try {
        var skip = (page - 1) * pageSize;        
        var limit = 'limit='+ pageSize + '&skip=' + skip;
        var url = constants.USER_LIST_URL + '?' + limit;
        var response = await FetchData(url);
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

const LoginAPI = async (username, password) => {
    try {
        const body = JSON.stringify({
            username: username,//'emilys',
            password: password, //'emilyspass',
            expiresInMins: 30, // optional, defaults to 60
          });
        let response = await PostData(constants.LOGIN_URL, body);
        if(response.data.accessToken){
            return response;
        }
        else{
            response.isSuccess = false;
        }
        

        // const response = await new Promise(            
        //     resolve => {
        //         fetch(constants.LOGIN_URL, {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({
        //               username: username,//'emilys',
        //               password: password, //'emilyspass',
        //               expiresInMins: 30, // optional, defaults to 60
        //             })
        //           })
        //           .then((res) => {
        //                 if (res.ok) {
        //                     return res.json();
        //                 }
        //                 resolve({data: res.status, isSuccess: false});
        //             })
        //           .then((res) =>{
        //                 if(res.accessToken !== undefined){
        //                     resolve({data: res, isSuccess: true})
        //                 }
        //             })
        //           .catch(err => {
        //             resolve({data: err, isSuccess: false})
        //           })
        //     }
        // );
        // return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

const IsLogin = () =>{
    if(!localStorage.getItem(constants.AUTH_NAME)){
        return false;
    }
    else{
        return true;
    }
}

const GetGoogleUerInfo = async (accesstoken) => {
    try {
        const response = await new Promise(            
            resolve => {
                fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accesstoken}`, {
                    headers: {
                        Authorization: `Bearer ${accesstoken}`,
                        Accept: 'application/json'
                    }
                })
                .then(async (res) => {

                    var result = await FetchData(res.url);
                    resolve({data: result.data, isSuccess: result.isSuccess});
            
                    // fetch(res.url).then((res) => res.json())
                    // .then((res) => {
                    //   console.log('PROFILE: ');
                    //   console.log(res);
                    //   console.log('--------------------');
                
                    //   resolve({data: res, isSuccess: true});
                    // })
                    // .catch((err) => {
                    //     console.log('ERROR: ' + err);
                    //     resolve({data: err, isSuccess: false});
                    // });
                })
                .catch((err) => {        
                    console.log('ERROR: ' + err)
                    resolve({data: err, isSuccess: false});
                });
            }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }    
}

export { GetUserList, LoginAPI, IsLogin, GetGoogleUerInfo};