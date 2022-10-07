const express = require('express')
const fs = require('fs');
const http = require('http');
const https = require('https');
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')


const httpsServerOptions = {
    key:  fs.readFileSync("C:\\Users\\Dev\\Documents\\GitHub\\backend\\src\\certificado_desarrollo\\prueba-privateKey.key"),
    cert: fs.readFileSync("C:\\Users\\Dev\\Documents\\GitHub\\backend\\src\\certificado_desarrollo\\prueba.crt")
};


const path = require('path')

const app = express()
const server = http.createServer(app);
server.listen('3000','127.0.0.1');


const serverHttps = https.createServer(httpsServerOptions, app);
serverHttps.listen('443','127.0.0.1');

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




