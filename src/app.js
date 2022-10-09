require('dotenv').config()      //Obtener variables de entorno del archivo .env
const express = require('express')
const fs = require('fs');
const http = require('http');
const https = require('https');
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')


const httpsServerOptions = {
    key:  fs.readFileSync("/etc/letsencrypt/live/api-workflow.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/api-workflow.com/fullchain.pem")
};


const path = require('path')

const app = express()
const server = http.createServer(app);
server.listen('80','172.26.1.27');


const serverHttps = https.createServer(httpsServerOptions, app);
serverHttps.listen('443','172.26.1.27');

app.use((req, res, next) => {
    if (req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`);
});

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

// app.listen(3000, () => {
//     console.log('Server on port 3000')
// })




