import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
export const register = (req,res)=>{
    
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[req.body.email, req.body.username], (err,data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User Already Exists")

        //Encypt Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Insert User to DB
        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q,[values], (err,data) =>{
            if(err) return res.json(err)
            return res.status(200).json("User Created")
        })
    })

}
export const login = (req,res)=>{

    //CHECK USER EXISTS
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username], (err,data) => {
        if (err) return res.json(err)
        if (data.length == 0) return res.status(404).json("USER NOT FOUND")

        //CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        if(!isPasswordCorrect) return res.status(400).json("WRONG USERNAME OR PASSWORD")
        const token = jwt.sign({id:data[0].id}, "jwtkey")
        const {password, ...other} = data[0]
        res.cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json(other)

    })

}
export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("USER LOGED OUT")

}