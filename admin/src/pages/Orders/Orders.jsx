// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import {toast} from "react-toastify"
// import { useEffect } from 'react'
// import axios from "axios"
// import { assets } from '../../assets/assets'

// const Order = ({url}) => {

//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     const response = await axios.get(url+"/api/order/list");

//     if(response.data.success){
//       setOrders(response.data.data);
//       console.log(response.data.data);

//     }
//     else{
//       toast.error("Error")

//     }
//   }

//   const statusHandler = async(event, orderId) => {
//     const response = await axios.post(url+"/api/order/status",{
//       orderId,
//       status:event.target.value
//     })
//     if(response.data.success){
//       await fetchAllOrders();
//     }

//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, [])

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>

//       <div className="order-list">
//         {orders.map((order, index)=>(
//           <div key={index} className='order-item'>

//             <img src={assets.parcel_icon} alt="" />

//             <div>
//               <p className='order-item-food'>
//                 {order.items.map((item, index) => {

//                   if(index===order.items.length-1){
//                     return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + ", "
//                   }

//                 })}
//               </p>

//               <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>

//               <div className="order-item-address">
//                 <p>{order.address.street + ","}</p>
//                 <p>{order.address.city + ", " + order.address.state + ", " + order.address.country +", "+ order.address.zipcode  }</p>

//               </div>

//               <p className='order-item-phone'>{order.address.phone}</p>

//             </div>

//             <p> Items : {order.items.length}</p>
//             <p>${order.amount}</p>

//             <select onChange={(event) => statusHandler(event, order._id )} value={order.status}>
//               <option value="Food Processing">Food Processing</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>

//             </select>


//           </div>
//         ))}
        
//       </div>
//     </div>
//   )
// }

// export default Order

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Select, Typography, List, Image, Space } from 'antd';
import { assets } from '../../assets/assets';

const { Option } = Select;
const { Title, Text } = Typography;

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Order Page</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <Card>
              <Space align="start">
                <Image
                  src={assets.parcel_icon}
                  width={60}
                  preview={false}
                />
                <div style={{ flex: 1 }}>
                  <Text strong>Items:</Text>{" "}
                  <Text>
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} x {item.quantity}
                        {index < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </Text>
                  <br />

                  <Text strong>Name:</Text>{" "}
                  <Text>{order.address.firstName} {order.address.lastName}</Text>
                  <br />

                  <Text strong>Address:</Text>
                  <Text>
                    <br />
                    {order.address.street},<br />
                    {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                  </Text>
                  <br />

                  <Text strong>Phone:</Text> <Text>{order.address.phone}</Text>
                  <br />

                  <Text strong>Total Items:</Text> <Text>{order.items.length}</Text>
                  <br />

                  <Text strong>Amount:</Text> <Text>${order.amount}</Text>
                  <br />

                  <Text strong>Status:</Text>{" "}
                  <Select
                    style={{ width: 200, marginTop: 8 }}
                    value={order.status}
                    onChange={(value) => statusHandler(value, order._id)}
                  >
                    <Option value="Food Processing">Food Processing</Option>
                    <Option value="Out for delivery">Out for delivery</Option>
                    <Option value="Delivered">Delivered</Option>
                  </Select>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Order;
