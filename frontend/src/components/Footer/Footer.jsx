import React from 'react'
import './Footer.css'
import { logoAsset } from '../../assets/asset'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

        <div className='footer-content'>

            <div className='footer-content-left'>

            <img src={logoAsset.logo} alt="Logo" className="footer-logo" />

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident dolor alias modi incidunt ab nostrum dolores doloremque recusandae esse cum, dolorum eius laudantium quibusdam cupiditate? Reiciendis assumenda delectus voluptas non ex inventore sint at quasi. Explicabo, magni expedita. Dolore!</p>

                <div className='footer-social-icons'>
                    <img src={logoAsset.facebook_icon} />
                    <img src={logoAsset.twitter_icon} />
                    <img src={logoAsset.linkedin_icon} />

                </div>

           </div>

           <div className='footer-content-center'>

            <h2>Gym Buddy</h2>

            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>

           </div>

           <div className='footer-content-right'>

            <h2>GET IN TOUCH</h2>

            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@gymbuddy.com</li>
            </ul>

           </div>

        </div>

        <hr />

        <p className='footer-copyright'> 
            Copyright 2025 © GymBuddy.com - All Right Reserved.

        </p>

    </div>
  )
}

export default Footer