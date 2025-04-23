import userModel from "../models/userModel.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2client.getToken(code);

        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name,
                email,
                image: picture
            });
        }

        const { _id } = user;

        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            // {
            //     expiresIn: process.env.JWT_TIMEOUT
            // }
        );

        return res.status(200).json({
            message: "Success",
            token,
            user
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
