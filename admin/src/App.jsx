// import React from 'react'
// import Navbar from './components/Navbar/Navbar'
// import Sidebar from './components/Sidebar/Sidebar'
// import { Routes, Route } from 'react-router-dom'
// import Add from './pages/Add/Add'
// import List from './pages/List/List'
// import Orders from './pages/Orders/Orders'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const App = () => {

//   const url = "http://localhost:4000"

//   return (
//     <div>
//       <ToastContainer/>
//       <Navbar/>
//       <hr />

//       <div className="app-content">
//         <Sidebar/>

//         <Routes>
//           <Route path="/add" element={<Add url={url}/>} />
//           <Route path="/list" element={<List url={url}/>} />
//           <Route path="/orders" element={<Orders url={url}/>} />
//         </Routes>
//       </div>

//     </div>
//   )
// }

// export default App


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
  const url = "http://localhost:4000";

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
