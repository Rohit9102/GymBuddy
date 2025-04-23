
import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;

const App = () => {
  const url = "https://gymbuddy-backend-ylfz.onrender.com";

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ToastContainer />

      <Header style={{ background: '#fff', padding: 0 }}>
        <Navbar />
      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <Sidebar />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              padding: 24,
              minHeight: 280,
              background: '#fff'
            }}
          >
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
