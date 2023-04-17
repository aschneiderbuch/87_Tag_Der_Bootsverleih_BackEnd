import express from 'express'
import './util/config.js'
import morgan from 'morgan'
import cors from 'cors'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

//import { getDb } from './util/db.js'

//fetches
import { postReservierung, getAlleReservierungen, getReservierungById } from './controller/reservierung.js'


const app = express()
const BACKEND_PORT = process.env.BACKEND_PORT 

// logger
app.use(morgan('dev'))

// CORS
const CORS_WHITELIST = process.env.CORS_WHITELIST
app.use(cors( { origin: CORS_WHITELIST }))



// Middleware für JSON     // content-type: application/json
app.use(express.json())

// Middleware multer   inputFelder  // content-type: multipart/form-data
 const upload = multer()



// fetches
// alleReservierungen 
app.get('/api/v1/alleReservierungen' , getAlleReservierungen)    //291   = Zahl

// reservierung
 app.get('/api/v1/reservierung/:id', getReservierungById)       //2 id von BODY mit req.params holen
// app.delete('/api/v1/reservierung/:id', deleteReservierung)       //3 id von BODY mit req.params holen

 app.post('/api/v1/reservierung',upload.any(), postReservierung)           //4 eine neue Reservierung hinzufügen

// aktuelleReservierung
// app.get('/api/v1/aktuelleReservierung', getAktuelleReservierung)   //5 = Zahl   + DB filter Datum > als Heute


// verfuegbareBoote      
// app.get('/api/v1/verfuegbareBoote', getVerfuegbareBoote)    //6   = Zahl    

//alleBoote
// app.get('/api/v1/alleBoote', getAlleBoote)                   //7 = Zahl

// boote
// app.get('/api/v1/boote/:id', getBoote)                       //8 id von BODY mit req.params holen
// app.delete('/api/v1/boote/:id', deleteBoote)                 //9 id von BODY mit req.params holen

// app.post('/api/v1/boote',upload.any() postBoote)                          //0 ein neues Boot hinzufügen


// Server    
 // npm run dev   =>  nodemon index.js     
   // oder      npm run start => node index.js
app.listen(BACKEND_PORT, () => { 
    console.log(`Server läuft auf Port ${BACKEND_PORT}`)
})