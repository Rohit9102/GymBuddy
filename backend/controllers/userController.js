import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// login user 

const loginUser = async(req, res) => {

    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user

const registerUser = async(req, res) => {

    const {name, password, email} = req.body;
    
    try {
        // checks user already exits in db
        const exists = await userModel.findOne({email});

        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        // validating email format and strong pass
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.lenght<8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // for encrypt password we use bycrpt --- hashing user password
        const salt = await bcrypt.genSalt(10)                                     // Salt is a random string of characters that is added to a password before hashing. It makes every password unique, even if two users have the same password.
        const hashedPassword = await bcrypt.hash(password, salt);


        // create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
       
        // save user in db
        const user = await newUser.save()

        const token = createToken(user._id)

        // send token
        res.json({success:true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}


export {loginUser, registerUser}