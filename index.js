import express from 'express'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieparser from 'cookie-parser'
import cors from 'cors'
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


const app = express()
app.use(cookieparser())

cloudinary.config({
  cloud_name: 'dogm9req7',
  api_key: '237215398513971',
  api_secret: 'QpALFaw8KmpLk2gzG0nPq2_pYpo',
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  return res.json({ picture: req.file.path });
});

app.use(cors({
  origin: '*'
}))

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Connected to ${PORT}!`)
})