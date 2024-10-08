import '../../styles/productCart.css';

export default function ProductCardItemEmpty(props){
    let cardcontainersizeclass = 'product-card-container-w-default';
    let cardbodysizeclass = 'card-h-default';

    if(props.type && props.type === 1){
        cardcontainersizeclass = 'product-card-container-w-m';
        cardbodysizeclass = 'card-h-m';
    }

    return(
        <div className={'product-card-container emp empty-item ' + cardcontainersizeclass}>
            <div className={'product-card ' + cardbodysizeclass}> 
                    <div className="product-img">
                        <div className='img-empty'></div>
                    </div>

                    <p className="product-title">product title</p>
                    <p className="product-sku">ABCDEFGS</p>
                    <p className="product-description">product description product description product description product description</p>
                    <p className="product-stock">InStock(0)</p>
                    <p className="product-price">00 $</p>

                    <div className="product-card-buttons">
                        <button className="add-to-cart-button" >Add To Cart</button>
                    </div>
            </div>
        </div>
    );
}