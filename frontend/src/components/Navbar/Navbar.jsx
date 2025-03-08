import "./Navbar.css";
import { logoAsset } from "../../../src/assets/asset"; // Import the correct asset object
import { useState } from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [menu, setMenu] = useState("home");


  return (
    <div className="navbar text-center justify-center">
      <img
        src={logoAsset.logo}
        alt="Logo"
        className="logo"
        style={{ width: "120px", height: "auto" }}
      />

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact</a>
        <li onClick={() => setMenu("profile")} className={menu==="profile"?"active":""}>Profile</li>
      </ul>

      <div className="navbar-right">
        <img src={logoAsset.search_icon} alt="Search"/>

        <div className="navbar-search-icon">
          <img src={logoAsset.basket_icon} alt="Basket" />
          <div className="dot"></div>
        </div>

        <button className="navbar-signin">Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
