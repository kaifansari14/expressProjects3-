import mongoose from "mongoose";

const userSchamea = new mongoose.Schema(
    {
        fullName:{
            type:String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            require: true,
            trim:true,
        },
        password:{
            type:String,
            require: true,
            trim:true,
        },
        isVerified: {
            email:{
                type:String,
                default:null,
            }
        }
    },{
        timestamps:true,
    }
);

const userModel = mongoose.model("users", userSchamea);

export default userModel;