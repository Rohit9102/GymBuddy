
import { useContext, useState } from 'react';
import './LoginPopup.css';
import { logoAsset } from '../../assets/asset';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '/api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);  // Close the login popup after successful login
        toast.success('Login successful!'); // Show success toast
      } else {
        toast.error(response.data.message); // Show error toast
      }
    } catch (error) {
      toast.error('An error occurred, please try again later.');
    }
  };

  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name, image } = result.data.user;
        const token = result.data.token;

        const obj = { email, name, image, token };
        localStorage.setItem('user-info', JSON.stringify(obj));

        setToken(token);
        navigate('/');
        setShowLogin(false);  // Close the login popup after Google login
        toast.success('Google login successful!');  // Success toast for Google login
      }
    } catch (err) {
      console.log('Error during Google login:', err);
      toast.error('Google login failed.');  // Error toast for Google login failure
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
    prompt: 'select_account', // Forces account chooser screen
  });

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={logoAsset.cross_icon} alt='' />
        </div>

        <div className='login-popup-inputs'>
          {currState === 'Login' ? (
            <></>
          ) : (
            <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required />
        </div>

        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}

        <button type='button' onClick={() => googleLogin()}>
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPopup;
