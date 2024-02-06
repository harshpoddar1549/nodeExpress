import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    
    console.log('here!!')
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401)
                throw new Error("USer is not Authorized")
            }
            console.log(decoded)
            req.user = decoded.user
            console.log('Here as well!')
            next()
        })
        if(!token){
            res.status(401)
            throw new Error("User is not Authorozid or the token in missing from the request")
        }
    }
    console.log('Thisss')
})