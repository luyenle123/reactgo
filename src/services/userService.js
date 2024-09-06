import * as constants from '../constants/constant.js'

const GetUserList = async (page, pageSize) => {
    try {
        var skip = (page - 1) * pageSize;        
        var limit = 'limit='+ pageSize + '&skip=' + skip;
        var url = constants.USER_LIST_URL + '?' + limit;        
        const response = await new Promise(            
            resolve => {
                fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    resolve({data: res.status, isSuccess: false});
                })
                .then((res) =>{
                    resolve({data: res, isSuccess: true})
                })
                .catch(err => {
                    resolve({data: err, isSuccess: false});
                })
            }            

            // resolve => {
            //     setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
            // }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

const LoginAPI = async (username, password) => {
    try {        
        const response = await new Promise(            
            resolve => {
                fetch(constants.LOGIN_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      username: username,//'emilys',
                      password: password, //'emilyspass',
                      expiresInMins: 30, // optional, defaults to 60
                    })
                  })
                  .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        resolve({data: res.status, isSuccess: false});
                    })
                  .then((res) =>{
                        if(res.token !== undefined){
                            resolve({data: res, isSuccess: true})
                        }
                    })
                  .catch(err => {
                    resolve({data: err, isSuccess: false})
                  })
            }
        );
        return response;
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

export { GetUserList, LoginAPI, IsLogin};