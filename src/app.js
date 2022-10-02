const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})
//app.use(multer({storage}).single('image'));
app.use(multer({storage}).array('images', 12));

//Routes API
app.use(require('./routes/index'))

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('API SP')
})

app.listen(3000, () => {
    console.log('Server on port 3000')
})