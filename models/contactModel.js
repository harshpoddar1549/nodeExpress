import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "UserModel"
        },
        name:{
            type: String,
            required: [true, "Please add the contact name"]
        },
        email:{
            type: String,
            required: [true, "Please add the email address"]
        },
        phone:{
            type: String,
            required: [true, "Please add the phone number"]
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("ContactModel", contactSchema)