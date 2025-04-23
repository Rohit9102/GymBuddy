// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import {
//   Button,
//   Form,
//   Input,
//   Upload,
//   Select,
//   DatePicker,
//   message,
//   Card,
//   Row,
//   Col,
//   Spin,
// } from 'antd';
// import { UploadOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
// import moment from 'moment';

// const { Option } = Select;

// const getBMIMessage = (bmi) => {
//   const value = parseFloat(bmi);
//   if (value < 18.5) return 'You are underweight. Consider a balanced diet and strength training.';
//   if (value < 25) return 'You are in a healthy weight range. Keep it up!';
//   if (value < 30) return 'You are overweight. Regular exercise and diet management is recommended.';
//   return 'You are obese. Consult a doctor or nutritionist for health advice.';
// };

// const Profile = () => {
//   const [form] = Form.useForm();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null);

//   const fetchUserData = async () => {
//     try {
//       const storedData = JSON.parse(localStorage.getItem('userProfile'));
//       if (storedData) {
//         setUserData(storedData);
//         const formattedData = {
//           ...storedData,
//           dateOfBirth: storedData.dateOfBirth ? moment(storedData.dateOfBirth) : null,
//         };
//         form.setFieldsValue(formattedData);
//       }
//     } catch (err) {
//       message.error('Failed to load profile data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const calculateMetrics = (weight, height) => {
//     const heightInMeters = height / 100;
//     const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//     const proteinIntake = (weight * 1.6).toFixed(1); 
//     const waterIntake = (weight * 65).toFixed(0); 
//     const bmiMessage = getBMIMessage(bmi);
//     return { bmi, proteinIntake, waterIntake, bmiMessage };
//   };

//   const handleSubmit = async (values) => {
//     try {
//       const data = {
//         ...values,
//         dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
//       };

//       if (data.weight && data.height) {
//         const metrics = calculateMetrics(parseFloat(data.weight), parseFloat(data.height));
//         Object.assign(data, metrics);
//       }

//       if (imageFile) data.profileImageUrl = URL.createObjectURL(imageFile);

//       localStorage.setItem('userProfile', JSON.stringify(data));
//       setUserData(data);
//       setIsEditing(false);
//       message.success('Profile updated locally!');
//     } catch (err) {
//       message.error('Error saving profile.');
//     }
//   };

//   const uploadProps = {
//     beforeUpload: (file) => {
//       setImageFile(file);
//       return false;
//     },
//     showUploadList: false,
//   };

//   if (loading) return <Spin fullscreen />;

//   return (
//     <Card title={`Welcome, ${userData?.name || 'User'}`} style={{ maxWidth: 900, margin: 'auto' }}>
//       {(!userData || isEditing) ? (
//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//           <Row justify="center">
//             <Col>
//               <Form.Item name="profileImage" label="Profile Image">
//                 <Upload {...uploadProps}>
//                   <Button icon={<UploadOutlined />}>Select Image</Button>
//                 </Upload>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}><Form.Item name="name" label="Name"><Input /></Form.Item></Col>
//             <Col span={12}><Form.Item name="email" label="Email"><Input /></Form.Item></Col>
//             <Col span={12}><Form.Item name="phoneNumber" label="Phone Number"><Input /></Form.Item></Col>
//             <Col span={12}><Form.Item name="age" label="Age"><Input /></Form.Item></Col>
//             <Col span={12}><Form.Item name="gender" label="Gender">
//               <Select placeholder="Select gender">
//                 <Option value="Male">Male</Option>
//                 <Option value="Female">Female</Option>
//                 <Option value="Other">Other</Option>
//               </Select>
//             </Form.Item></Col>
//             <Col span={12}><Form.Item name="address" label="Address"><Input /></Form.Item></Col>
//             <Col span={12}><Form.Item name="weight" label="Weight (kg)"><Input /></Form.Item></Col>
//             <Col span={12}><Form.Item name="height" label="Height (cm)"><Input /></Form.Item></Col>
//             <Col span={12}>
//               <Form.Item name="goal" label="Goal">
//                 <Select placeholder="Select your goal">
//                   <Option value="Cutting">Cutting</Option>
//                   <Option value="Bulking">Bulking</Option>
//                   <Option value="Maintenance">Maintenance</Option>
//                   <Option value="Weight Loss">Weight Loss</Option>
//                   <Option value="Fitness">Fitness</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="preferredDiet" label="Preferred Diet">
//                 <Select placeholder="Select preferred diet">
//                   <Option value="Vegetarian">Vegetarian</Option>
//                   <Option value="Non-Vegetarian">Non-Vegetarian</Option>
//                   <Option value="Vegan">Vegan</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="dateOfBirth" label="Date of Birth">
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="bloodGroup" label="Blood Group">
//                 <Select placeholder="Select blood group">
//                   {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
//                     <Option key={group} value={group}>{group}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={24}><Form.Item name="allergy" label="Allergy Info"><Input /></Form.Item></Col>
//           </Row>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">Save Profile</Button>
//           </Form.Item>
//         </Form>
//       ) : (
//         <>
//           <div style={{ textAlign: 'center', marginBottom: 24 }}>
//             <img
//               src={userData.profileImageUrl || '/default-profile.png'}
//               alt="Profile"
//               style={{ width: 120, height: 120, borderRadius: '50%' }}
//             />
//           </div>

//           <Row gutter={[16, 16]}>
//             <Col span={12}><p><strong>Name:</strong> {userData.name}</p></Col>
//             <Col span={12}><p><strong>Email:</strong> {userData.email}</p></Col>
//             <Col span={12}><p><strong>Phone Number:</strong> {userData.phoneNumber}</p></Col>
//             <Col span={12}><p><strong>Age:</strong> {userData.age}</p></Col>
//             <Col span={12}><p><strong>Gender:</strong> {userData.gender}</p></Col>
//             <Col span={12}><p><strong>Address:</strong> {userData.address}</p></Col>
//             <Col span={12}><p><strong>Weight:</strong> {userData.weight} kg</p></Col>
//             <Col span={12}><p><strong>Height:</strong> {userData.height} cm</p></Col>
//             <Col span={12}><p><strong>Goal:</strong> {userData.goal}</p></Col>
//             <Col span={12}><p><strong>Preferred Diet:</strong> {userData.preferredDiet}</p></Col>
//             <Col span={12}><p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p></Col>
//             <Col span={12}><p><strong>Blood Group:</strong> {userData.bloodGroup}</p></Col>
//             <Col span={12}><p><strong>Allergy:</strong> {userData.allergy}</p></Col>
//             <Col span={12}><p><strong>BMI:</strong> {userData.bmi}</p></Col>
//             <Col span={24}><p><strong>BMI Message:</strong> {userData.bmiMessage}</p></Col>
//             <Col span={12}><p><strong>Protein Intake:</strong> {userData.proteinIntake} g/day</p></Col>
//             <Col span={12}><p><strong>Water Intake:</strong> {userData.waterIntake} mL/day</p></Col>
//           </Row>

//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: '12px' }}>
//             <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>Edit</Button>
//             <Button icon={<LogoutOutlined />} danger onClick={() => {
//               localStorage.removeItem('token');
//               window.location.href = '/';
//             }}>Logout</Button>
//           </div>
//         </>
//       )}
//     </Card>
//   );
// };

// export default Profile;



import React, { useState } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const Profile = (props) => {
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();
  const { url } = props;

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("age", Number(values.Age));
    formData.append("gender", values.gender);
    formData.append("image", image);
    formData.append("dob", values.dob || "");
    formData.append("protein", values.protein || "");
    formData.append("carb", values.carb || "");
    formData.append("cal", values.cal || "");

    try {
      const response = await axios.post(`${url}/api/profile/profile`, formData);
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
      <h2>Profile</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Upload Image" name="image" rules={[{ required: true, message: 'Please upload an image' }]}>
          <Upload beforeUpload={(file) => { setImage(file); return false; }} showUploadList={{ showRemoveIcon: true }} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name' }]}>
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter Email' }]}>
          <TextArea rows={2} placeholder="Type here" />
        </Form.Item>

        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
          <Select placeholder="Select gender">
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Age" name="Age" rules={[{ required: true, message: 'Please enter Age' }]}>
          <Input type="number" placeholder="Enter age" />
        </Form.Item>

        <Form.Item label="Date of Birth" name="dob">
          <Input type="date" />
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
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// ✅ Add PropTypes validation
Profile.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Profile;
