
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import MyOrders from './pages/MyOrders/MyOrders';
import Profile from './pages/Profile/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const url = "https://gymbuddy-backend-ylfz.onrender.com";



  const GoogleAuthWrapper = () => {
    return(
      <GoogleOAuthProvider clientId='788129086348-mhdo5d4dgb1m58os38pne9gbh117r9hm.apps.googleusercontent.com'>
        <LoginPopup />
      </GoogleOAuthProvider>
    )
  }

  return (
    <>
      {showLogin && (
        <GoogleOAuthProvider clientId="788129086348-mhdo5d4dgb1m58os38pne9gbh117r9hm.apps.googleusercontent.com">
          <LoginPopup setShowLogin={setShowLogin} />
        </GoogleOAuthProvider>
      )}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/profile' element={<Profile url={url}  />} />

          {/* <Route 
            path='/profile' 
            element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} 
          /> */}

        </Routes>
      </div>

      <Footer />

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

    </>
  );
};

export default App;
