// import React from 'react'
// import './Navbar.css'
// import {assets} from '../../assets/assets'

// const Navbar = () => {
//   return (
//     <div className='navbar'>

//         <img className='logo' src={assets.logo} />
//         <img className='profile' src={assets.profile_image} />

//     </div>
//   )
// }

// export default Navbar


import React from 'react';
import { Layout, Row, Col, Tag } from 'antd';
import { assets } from '../../assets/assets';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ background: '#fff', padding: '0 24px' }}>
      <Row justify="space-between" align="middle">
        {/* Logo */}
        <Col>
          <img
            src={assets.logo}
            alt="Logo"
            style={{ height: '60px', objectFit: 'contain' }}
          />
        </Col>

        {/* Admin Section */}
        <Col>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={assets.profile_image}
              alt="Profile"
              style={{
                height: '45px',
                width: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)'
              }}
            />
            <Tag
              color="geekblue"
              style={{
                fontSize: '14px',
                padding: '3px 10px',
                borderRadius: '20px',
                fontWeight: '500',
              }}
            >
              Admin
            </Tag>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
