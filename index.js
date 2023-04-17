import express from 'express'
import './util/config.js'
import morgan from 'morgan'
import cors from 'cors'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

//import { getDb } from './util/db.js'

//fetches
import { postReservierung, getAlleReservierungen, 
  getReservierungById, deleteReservierungById,
  getAktuelleReservierungZeitraum, getAlleReservierungenObj,updateReservierung } from './controller/reservierung.js'

import { postBoot, getAlleBoote, getBooteById, deleteBooteById, getAlleBooteObj } from './controller/boote.js'

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
app.get('/api/v1/alleReservierungen' , getAlleReservierungen)    //291   = findet Zahl
// + Objekt
app.get('/api/v1/alleReservierungenObj' , getAlleReservierungenObj)  //261 = findet alle Objekt


// reservierung
 app.get('/api/v1/reservierung/:id', getReservierungById)       //292 id von BODY mit req.params holen
 app.delete('/api/v1/reservierung/:id', deleteReservierungById)       //293 id von BODY mit req.params holen

 app.post('/api/v1/reservierung',upload.any(), postReservierung)           //294 eine neue Reservierung hinzufügen
app.put('/api/v1/updateReservierung', upload.any(), updateReservierung)  //264 eine neue Reservierung hinzufügen
// oder mit /:id ? 
// aktuelleReservierung     // multer upload    damit er Datum vom FrontEnd für die Suche in der DB bekommt
// zwei Werte vom FrontEnd kommen: startdatum und enddatum   // Rückgabe alle Reservierungen(Objekte) im Zeitraum
 app.get('/api/v1/aktuelleReservierung', upload.any(), getAktuelleReservierungZeitraum)   //295  = Objekt   + DB filter Datum > als Heute


// verfuegbareBoote     
 // ! Vorsicht hir muss er noch die Reservierungen aus der DB holen und dann die Boote aus der DB holen
// app.get('/api/v1/verfuegbareBoote', getVerfuegbareBoote)    //296   = Zahl    

//alleBoote
 app.get('/api/v1/alleBoote', getAlleBoote)                   //297 = Zahl
 app.get('/api/v1/alleBooteObj', getAlleBooteObj)               //267 = Objekt

// boote
app.get('/api/v1/boote/:id', getBooteById)                       //298 id von BODY mit req.params holen
app.delete('/api/v1/boote/:id', deleteBooteById)                 //299 id von BODY mit req.params holen

app.post('/api/v1/boote',upload.any(), postBoot)               //290 ein neues Boot hinzufügen


// Server    
 // npm run dev   =>  nodemon index.js     
   // oder      npm run start => node index.js
app.listen(BACKEND_PORT, () => { 
    console.log(`Server läuft auf Port ${BACKEND_PORT}`)
})