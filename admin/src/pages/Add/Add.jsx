
import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", Number(values.price));
    formData.append("category", values.category);
    formData.append("image", image);
    formData.append("quantity", values.quantity || "250g");
    formData.append("protein", values.protein || "");
    formData.append("carb", values.carb || "");
    formData.append("cal", values.cal || "");

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        form.resetFields();
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Add New Product</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Upload Image" name="image" rules={[{ required: true, message: 'Please upload an image' }]}> 
          <Upload beforeUpload={(file) => { setImage(file); return false; }} showUploadList={{ showRemoveIcon: true }} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter product name' }]}> 
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item label="Product Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}> 
          <TextArea rows={4} placeholder="Write content here" />
        </Form.Item>

        <Form.Item label="Product Category" name="category" initialValue="Salad"> 
          <Select>
            <Select.Option value="Salad">Salad</Select.Option>
            <Select.Option value="Rolls">Rolls</Select.Option>
            <Select.Option value="Deserts">Deserts</Select.Option>
            <Select.Option value="Sandwich">Sandwich</Select.Option>
            <Select.Option value="Cake">Cake</Select.Option>
            <Select.Option value="Pure Veg">Pure Veg</Select.Option>
            <Select.Option value="Pasta">Pasta</Select.Option>
            <Select.Option value="Noodles">Noodles</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Product Price" name="price" rules={[{ required: true, message: 'Please enter price' }]}> 
          <Input type="number" placeholder="$1" />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" initialValue="250g"> 
          <Input placeholder="e.g. 250g" />
        </Form.Item>

        <Form.Item label="Protein" name="protein"> 
          <Input placeholder="e.g. 10g" />
        </Form.Item>

        <Form.Item label="Carb" name="carb"> 
          <Input placeholder="e.g. 15g" />
        </Form.Item>

        <Form.Item label="Calories (Cal)" name="cal"> 
          <Input placeholder="e.g. 200cal" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">ADD</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;