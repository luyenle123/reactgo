
const FetchData = async (url) => {
    try {
        const response = await new Promise(            
            resolve => {
                fetch(url)
                .then((res) => {
                    if (res.ok) {
                      return res.json();
                    }
                    resolve({data: res, isSuccess: false});
                })
                .then((res) =>{
                    resolve({data: res, isSuccess: true})
                })
                .catch(err => {
                    resolve({data: err, isSuccess: false});
                })
            }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

const PutData = async(url, body) => {
    return SendData(url, body, 'PUT');
}

const PostData = async (url, body) => {   
    return SendData(url, body, 'POST');
}

const SendData = async (url, body, method) => { 
    try {        
        const response = await new Promise(            
            resolve => {
                fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                  })
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
                    resolve({data: err, isSuccess: false})
                  })
            }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

export { FetchData, PutData, PostData};