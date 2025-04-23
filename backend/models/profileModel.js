// import mongoose from "mongoose"; 

// const profileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: Number, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true },
//   address: { type: String, required: true },
//   weight: { type: Number, required: true },
//   height: { type: Number, required: true },
//   goal: { type: String, required: true },
//   preferredDiet: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true },
//   bloodGroup: { type: String, required: true },         // was 'bloodGrp'
//   allergy: { type: String, required: true },
//   bmi: { type: Number, required: true },
//   bmiMessage: { type: String, required: true },         // was 'message'
//   proteinIntake: { type: Number, required: true },      // was 'protein'
//   waterIntake: { type: Number, required: true },        // was 'water'
//   profileImageUrl: { type: String }                     // Add this to save image path
// });

// const Profile = mongoose.model("Profile", profileSchema);
// export default Profile;


import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  profileImageUrl: { type: String }, // To store the uploaded image URL
  dateOfBirth: { type: Date }, // Optional, based on the form input
  proteinIntake: { type: String }, // Protein intake from the form (e.g. "10g")
  carbIntake: { type: String }, // Carb intake from the form (e.g. "15g")
  calorieIntake: { type: String }, // Calorie intake from the form (e.g. "200cal")
}, { timestamps: true });

const profileModel = mongoose.model('profile', profileSchema);

export default profileModel;

