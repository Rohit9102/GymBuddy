// import Profile from '../models/profileModel.js';

// // Controller function to save user data
// export const saveProfile = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       age,
//       gender,
//       address,
//       weight,
//       height,
//       goal,
//       preferredDiet,
//       dateOfBirth,
//       bloodGroup,
//       allergy,
//       bmi,
//       bmiMessage,
//       proteinIntake,
//       waterIntake
//     } = req.body;

//     const profileImageUrl = req.file ? `/images/${req.file.filename}` : null;

//     const newProfile = new Profile({
//       name,
//       email,
//       phone,
//       age,
//       gender,
//       address,
//       weight,
//       height,
//       goal,
//       preferredDiet,
//       dateOfBirth,
//       bloodGroup,
//       allergy,
//       bmi,
//       bmiMessage,
//       proteinIntake,
//       waterIntake,
//       profileImageUrl
//     });

//     const savedProfile = await newProfile.save();

//     res.status(201).json(savedProfile);
//   } catch (error) {
//     console.error('Error saving profile:', error);
//     res.status(500).json({ message: 'Error saving profile' });
//   }
// };



import profileModel from "../models/profileModel.js";
import fs from 'fs';


// Add profile function
const addProfile = async (req, res) => {
    const { name, email, gender, age, dateOfBirth, proteinIntake, carbIntake, calorieIntake } = req.body;
    let image_filename = `${req.file.filename}`;  // Assuming image is uploaded

    const newProfile = new profileModel({
        name,
        email,
        gender,
        age,
        profileImageUrl: image_filename,  // Store image file name or URL
        dateOfBirth,
        proteinIntake,
        carbIntake,
        calorieIntake,
    });

    try {
        await newProfile.save();
        res.json({ success: true, message: "Profile Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while saving profile" });
    }
};

export default addProfile;



