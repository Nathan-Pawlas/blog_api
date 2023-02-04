import express from 'express'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()

var corsOptions = {
  origin: "https://main--zesty-starlight-1234d5.netlify.app/",
  credentials: true,
};
app.use(cors(corsOptions));

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

const PORT = 3001;


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Connected to ${PORT}!`)
})