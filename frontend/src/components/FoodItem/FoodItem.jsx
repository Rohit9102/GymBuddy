import { useContext } from 'react'
import './FoodItem.css'
import { logoAsset } from '../../assets/asset'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className="food-item">

        <div className="food-item-img-container">

            <img className='food-item-image' src={image}/>

            {
                !cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={logoAsset.add_icon_white} />
                : <div className='food-item-counter'>

                    <img  onClick={()=>removeFromCart(id)} src={logoAsset.remove_icon_red} />
                    <p>{cartItems[id]}</p>

                    <img  onClick={()=>addToCart(id)} src={logoAsset.add_icon_green} />

                </div>

            }
        </div>

        <div className="food-item-info">

            <div className="food-item-name-rating">

                <p>{name}</p>

                <img src={logoAsset.rating_stars}/>
            </div>

            <p className='food-item-desc'>{description}</p>

            <p className='food-item-price'>${price}</p>
        </div>

    </div>
  )
}

export default FoodItem