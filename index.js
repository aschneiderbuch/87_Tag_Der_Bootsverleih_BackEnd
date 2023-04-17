import express from 'express'
import './util/config.js'
import morgan from 'morgan'
import cors from 'cors'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

import { getDb } from './util/db.js'


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
// AlleReservierunge 
app.get('api/v1/alleReservierungen' , alleReservierungen)    // = Zahl

// reseervierung
app.get('api/v1/reservierung/:id', getReservierung)       // id von BODY mit req.params holen
app.delete('api/v1/reservierung/:id', deleteReservierung)       // id von BODY mit req.params holen
app.post('api/v1/reservierung', postReservierung)




// Server    
 // npm run dev   =>  nodemon index.js     
   // oder      npm run start => node index.js
app.listen(BACKEND_PORT, () => { 
    console.log(`Server läuft auf Port ${BACKEND_PORT}`)
})