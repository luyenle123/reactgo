import * as constants from '../constants/constant.js'

const GetCartDetail = async (cartId) => {
    try {      
        var url = constants.CART_DETAIL_URL + cartId;

        const response = await new Promise(            
            resolve => {
                fetch(url)
                .then((res) => {
                    if (res.ok) {
                      return res.json();
                    }
                    resolve({data: res.status, isSuccess: false});
                })
                .then((res) => {
                    resolve({data: res, isSuccess: true})
                })
                .catch((err) => {
                    resolve({data: err, isSuccess: false});
                });
            }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

const AddToCart = async (productId, quantity) => {
    try {      
        var url = constants.CART_DETAIL_URL + 5;
        const response = await new Promise(            
            resolve => {
                fetch(url, {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      merge: true, 
                      products: [
                        {
                          id: {productId},
                          quantity: 1,
                        },
                      ]
                    })
                  })
                  .then(res => res.json())
                  .then(
                    (res) =>{
                        resolve({data: res, isSuccess: true})
                    }
                  )
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

export { GetCartDetail, AddToCart };

  // fetch('https://dummyjson.com/carts/5', {
  //   method: 'PUT', 
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     merge: true, 
  //     products: [
  //       {
  //         id: {productId},
  //         quantity: 1,
  //       },
  //     ]
  //   })
  // })
  // .then(res => res.json())
  // .then(
  //   (res) =>{
  //     UpdateCartInfo(res);
  //     toast("Add '" + productCode + "' to cart successful.");
  //   }
  // )
  // .catch(err => {
  //   toast('Error: ' + err);
  // })
  // .finally(() => {
  //   updateStatus(true);
  // });

  // fetch('https://dummyjson.com/carts/add', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     userId: 33,
  //     products: [
  //       {
  //         id: {productId},
  //         quantity: 1,
  //       }
  //     ]
  //   })
  // })
  // .then(res => res.json())
  // .then(
  //   (res) =>{
  //     toast("Add '" + productCode + "' to cart successful.");
  //   }
  // )
  // .catch(err => {
  //   toast('Error: ' + err);
  // })
  // .finally(() => {
      
  // }); 