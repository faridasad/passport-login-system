import User from "../models/User.js"
import jwt from "jsonwebtoken"

const requireAuth = (req, res, next) => {
    const token = req.cookies.access_token

    if (token) {
        jwt.verify(token, 'access_token', (err, decodedToken) =>{
            if (err){
                console.log(err)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect("/login")
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'secret word', async (err, decodedToken) =>{
            if (err){
                console.log(err)
                res.locals.user = null
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}


export default requireAuth;