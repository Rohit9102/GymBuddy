import React from 'react'
import './AppDownload.css'
import { logoAsset } from '../../assets/asset'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>

        <p>For Better Experience Download <br /> GymBuddy</p>

        <div className='app-download-platforms'>
            <img src={logoAsset.play_store}/>
            <img src={logoAsset.app_store}/>

        </div>

    </div>
  )
}

export default AppDownload