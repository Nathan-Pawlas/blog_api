import express from 'express'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({storage})

app.post('/api/upload', upload.single('file'), function (req, res){
    const file = req.file
    res.status(200).json(file.filename)
})

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Connected to ${PORT}!`)
})