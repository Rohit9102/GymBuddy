// import express from "express";
// import multer from "multer";
// import path from "path";
// import Profile from "../models/profileModel.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   }
// });

// const upload = multer({ storage });


// router.post("/", upload.single("profileImage"), async (req, res) => {
//   try {
//     const {
//       name, email, phone, age, gender, address, weight,
//       height, goal, preferredDiet, dateOfBirth, bloodGroup, allergy,
//       bmi, bmiMessage, proteinIntake, waterIntake
//     } = req.body;

//     const profileImageUrl = req.file ? `/images/${req.file.filename}` : "";

//     const profileData = {
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
//     };

//     const savedProfile = await Profile.create(profileData);

//     res.status(201).json({
//       message: "Profile saved successfully",
//       profile: savedProfile
//     });
//   } catch (err) {
//     console.error("Profile Save Error:", err);
//     res.status(500).json({ error: "Server error while saving profile" });
//   }
// });

// export default router;


import express from "express";
import addProfile from "../controllers/profileController.js";  // Import the addProfile function
import multer from "multer";

const profileRouter = express.Router();

// Image Storage Setup
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Route to handle profile creation
profileRouter.post("/profile", upload.single("image"), addProfile);  // Use addProfile instead of Profile

export default profileRouter;
