import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: [true, "Please add the user username"]
        },
        email:{
            type: String,
            required: [true, "Please add the user email address"],
            unique: [true, "Email address already taken"]
        },
        password:{
            type: String,
            required: [true, "Please add the user password"]
        }
    },
    {
        timestamps: true 
    }
)

export default mongoose.model("UserModel", userSchema)