// import React from 'react'
// import './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { NavLink } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//         <div className="sidebar-options">
//             <NavLink to='/add' className="sidebar-option">
//                 <img src={assets.add_icon} alt="" />
//                 <p>Add Items</p>
//             </NavLink>

//             <NavLink to='/list' className="sidebar-option">
//                 <img src={assets.order_icon} alt="" />
//                 <p>List Items</p>
//             </NavLink>

//             <NavLink to='/orders' className="sidebar-option">
//                 <img src={assets.order_icon} alt="" />
//                 <p>Orders</p>
//             </NavLink>

//         </div>

//     </div>
//   )
// }

// export default Sidebar

import React from 'react';
import { Menu } from 'antd';
import {
  PlusOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
      onClick={({ key }) => navigate(key)}
    >
      <Menu.Item key="/add" icon={<PlusOutlined />}>
        Add Items
      </Menu.Item>
      <Menu.Item key="/list" icon={<UnorderedListOutlined />}>
        List Items
      </Menu.Item>
      <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
        Orders
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
