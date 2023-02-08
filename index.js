import express from 'express'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieparser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

const app = express()
app.use(cookieparser())

app.use(cors({
  origin: '*'
}))

app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({
    extended: true }))

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage})

const upload = multer({storage: storage})

app.post("/api/upload", upload.single('file'), (req, res) => {
  if (!req.file) {
      console.log("No file upload");
  } else {
      console.log(req.file.filename)
      var imgsrc = 'https://classicsblogapi.herokuapp.com/public/uploads/' + req.file.filename
      var insertData = "INSERT INTO posts(img)VALUES(?)"
      db.query(insertData, [imgsrc], (err, result) => {
          if (err) throw err
          console.log("file uploaded")
      })
  }
});
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Connected to ${PORT}!`)
})