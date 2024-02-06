import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
//@desc Register a user
//@route POST /api/users/register
//@access public { for the time being }

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvail = await UserModel.findOne({ email: email })
    if(userAvail){
        res.status(400)
        throw new Error("User already registered")
    }

    // create a Hashed pwd
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        username,
        email,
        password: hashedPwd
    })
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else {
        res.status(400);
        throw new Error("User data is not valid.")
    }
})


//@desc Register a user
//@route POST /api/users/login
//@access public { for the time being }

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await UserModel.findOne({email})
    // compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        // if this is try we need to provide an access token in the response
        const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" } // 1minute
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or Password is not valid")
    }
})


//@desc Current User Info
//@route GET /api/users/current
//@access private

export const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)    
})