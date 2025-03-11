import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://GymBuddy:GymBuddy@cluster0.tbw3t.mongodb.net/GymBuddy').then(() => console.log("DB Connected"));
}

