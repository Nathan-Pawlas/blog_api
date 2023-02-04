import { db } from "../db.js"

export const getUsers = (req,res)=> {
    const q = req.query.cat ? "SELECT * FROM users WHERE id=?" 
    : "SELECT * FROM users"

    db.query(q,[req.query.cat], (err,data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}