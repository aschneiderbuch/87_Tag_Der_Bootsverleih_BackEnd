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

import { postBoot, getAlleBoote, getBooteById, 
  deleteBooteById, getAlleBooteObj, getBooteBildById, getBooteMitBildern } from './controller/boote.js'

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
 // ! Bilder speichern auf dem Server     in die MongoDB geht nur der Pfad zum Speicherplatz auf dem Server
 // ! Damit die MongoDB nicht aufgebläht wird, die Bilder nicht doppelt gespeichert werden und die DB weiter gut scalierbar bleibt 
 const uploadBild = multer( { dest: 'uploadBild/'} )
 app.use('/uploadBild', express.static('./uploadBild'))



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
 // ! Vorsicht hier muss er noch die Reservierungen aus der DB holen und dann die Boote aus der DB holen
 // ! prüft ob es bei den Reservierungen schon eine welches_boot gibt, wenn ja, dann nicht mitzählen ? 
 // app.get('/api/v1/verfuegbareBoote', getVerfuegbareBoote)    //296   = Zahl    
// + Objekt
// app.get('/api/v1/verfuegbareBooteObj', getVerfuegbareBooteObj) //266 = Objekt


//alleBoote
 app.get('/api/v1/alleBoote', getAlleBoote)                   //297 = Zahl
 app.get('/api/v1/alleBooteObj', getAlleBooteObj)               //267 = Objekt

// boote
app.get('/api/v1/boote/:id', getBooteById)                       //298 id von BODY mit req.params holen
app.delete('/api/v1/boote/:id', deleteBooteById)                 //299 id von BODY mit req.params holen

// ! wenn nicht upload.any() dann wegen Bild upload.single('bild')   req.body.bild muss vom FrontEnd kommen
app.post('/api/v1/boote',uploadBild.single('bild'), postBoot)               //290 ein neues Boot hinzufügen

// ! Bild fetch zum anzeigen     im FrontEnd einbauen mit     <img src='..../api/v1/boote/..._idVomBoot_perMongoDB.../bild' alt='BootBild' />
// id muss die _id vom Boot sein     
//  so in React rein  
//  <img src="http://localhost:9999/api/v1/boote/643d7e0390c84ce2bb3aeeef/bild" alt='BootBild' />
/*    
MongoDB
_id: new ObjectId("643d7e0390c84ce2bb3aeeef"),
baujahr : "1994",
seriennummer : "123454",
material : "Pappe",
bootsart : "Segelboot",
bild: 'uploadBild/fb9c6b817fb2a4d73ff2ada9ef411599'
 */
app.get('/api/v1/boote/:id/bild', getBooteBildById)             // 240

//  alleBoote mit Bildern      
app.get('/api/v1/booteBilder', getBooteMitBildern)    //  246  = zahl

// Server    
 // npm run dev   =>  nodemon index.js     
   // oder      npm run start => node index.js
app.listen(BACKEND_PORT, () => { 
    console.log(`Server läuft auf Port ${BACKEND_PORT}`)
})