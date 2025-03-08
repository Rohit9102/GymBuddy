import { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)
  return (

    <form className="place-order">

      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" id="" />
          <input type="text" placeholder="Last Name" id="" />

        </div>

        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street'/>

        <div className="multi-fields">
          <input type="text" placeholder="City" id="" />
          <input type="text" placeholder="State" id="" />

        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" id="" />
          <input type="text" placeholder="Country" id="" />

        </div>

        <input type="number" placeholder="Phone" id="" />


      </div>

      <div className="place-order-right">

      <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>

          <button>PROCEED TO PAYMENT</button>
        </div>

      </div>


    </form>

  )
}

export default PlaceOrder
