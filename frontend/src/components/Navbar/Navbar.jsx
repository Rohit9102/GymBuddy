import "./Navbar.css";
import { logoAsset } from "../../../src/assets/asset"; // Import the correct asset object
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("menu");

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")


  }


  return (
    <div className="navbar text-center justify-center">
      <Link to='/'><img
        src={logoAsset.logo}
        alt="Logo"
        className="logo"
        style={{ width: "120px", height: "auto" }}
      /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact</a>
        {/* <li onClick={() => setMenu("profile")} className={menu==="profile"?"active":""}>Profile</li> */}
      </ul>

      <div className="navbar-right">
        <img src={logoAsset.search_icon} alt="Search"/>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={logoAsset.basket_icon} alt="Basket" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>

        {!token?<button onClick={() => setShowLogin(true)}>Sign In</button>
        :<div className="navbar-profile">
          <img src={logoAsset.profile_icon} alt="" />

          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={logoAsset.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={logoAsset.logout_icon} alt="" /><p>Logout</p></li>
          </ul>

        </div>
      }

        
      </div>
    </div>
  );
};

export default Navbar;
