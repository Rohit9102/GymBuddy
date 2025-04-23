
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table, Image, Button, Typography, Popconfirm } from 'antd';

const { Title } = Typography;

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const itemsWithKey = response.data.data.map((item, index) => ({
          ...item,
          key: index,
        }));
        setList(itemsWithKey);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error deleting food");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => (
        <Image
          width={50}
          src={`${url}/images/${image}`}
          alt="food"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id) => (
        <Popconfirm
          title="Are you sure you want to delete this food?"
          onConfirm={() => removeFood(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="primary">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>All Foods List</Title>
      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          pageSize: 6,
          position: ['bottomCenter'], // 👈 centers the pagination
          showSizeChanger: false,     // Optional: hides "items per page" dropdown
        }}
      />
    </div>
  );
};

export default List;
