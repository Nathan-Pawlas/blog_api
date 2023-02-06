import { db } from "../db.js"
import jwt from 'jsonwebtoken'

export const getPosts = (req,res)=> {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" 
    : "SELECT * FROM posts"

    db.query(q,[req.query.cat], (err,data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const q =
    "SELECT p.id, `username`, `title`, `desc`, `text`, p.img, `cat`,`date` FROM posts p ON u.id = p.uid WHERE p.id = ? "
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err)
  
      return res.status(200).json(data[0])
    })
  }

  export const addPost = (req, res) => {
      const q =
        "INSERT INTO posts(`title`, `desc`, `text`, `img`, `cat`, `date`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.text,
        req.body.img,
        req.body.cat,
        req.body.date,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
  };

export const deletePost = (req,res)=> {
  //CHECK TOKEN
    const postId = req.params.id
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

    db.query(q,[postId, userInfo.id], (err,data) => {
      if(err) return res.status(403).json("YOU CAN NOT DELETE OTHER'S POSTS")

      return res.json("POST DELETED")
    })
  
}

export const updatePost = (req, res) => {
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=?, `text`=? WHERE `id` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.text];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
};