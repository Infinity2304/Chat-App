import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        //Checking password matches with confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        //Checking if user already exists
        const user = await User.findOne({ userName });

        //If user already exists then 
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //HASHING PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //END

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {
            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }


    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });
        
    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}   