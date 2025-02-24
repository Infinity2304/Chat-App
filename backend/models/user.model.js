import mongoose from "mongoose";
import { union } from "zod";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 18,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 18,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male","female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
});

const User = mongoose.model("User", userSchema);

export default User;