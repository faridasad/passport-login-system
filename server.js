import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import cookieParser from "cookie-parser"
import requireAuth from "./middlewares/authMiddleware.js"
dotenv.config()

const app = express()

const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to DB");
    })
    .catch(err => {
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())
app.use("/", authRoutes)


app.set('view engine', "ejs")

app.get("/", (req, res) => {
    res.render("index")
})


app.listen(5000, connect())