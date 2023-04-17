import { getDb } from '../util/db.js'
import { ObjectId } from "mongodb"   // ! für die ID damit man vom FrontEnd req.params holen kann

const COL = 'reservierung'

export const postReservierung = async (req, res) => {
    try{
        console.log(req.body)
        const db = await getDb()
        const reservierung = await db.collection(COL).insertOne(req.body)
        console.log(reservierung)
        res.status(294).json({message: `Reservierung wurde hinzugefügt: ${reservierung}`})
    } catch (err) {
        console.log(err)
        res.status(594).json( { message: `Fehler bei postReservierung: ${err}` } )
    
}}




// alleReservierungen      findet Zahl  
export const getAlleReservierungen = async (req, res ) => {
    try {
        const db = await getDb()
        const reservierung = await db.collection(COL).find().count()
        console.log(reservierung)
        res.status(291).json( { reservierung})
    } catch (err) {
        console.log(err)
        res.status(591).json( { message: `Fehler bei getAlleReservierungen: ${err}`})
    }
}

// alleReservierungen      findet Objekt
export const getAlleReservierungenObj = async (req, res ) => {
    try {
        const db =await getDb()
        const reservierung = await db.collection(COL).find().toArray()
        console.log(reservierung)
        res.status(261).json( { reservierung})
    } catch (err) {
        console.log(err)
        res.status(561).json( { message: `Fehler bei getAlleReservierungenObj: ${err} `})
    }
}



// reservierung     anhand der ID finden      getReservierungById
export const getReservierungById = async (req, res) => {
    try{
        const { id } = req.params    // ! id von BODY mit req.params holen
        const db = await getDb()
        const reservierung = await db.collection(COL).findOne( { _id: new ObjectId(id) })
        console.log(reservierung)
        if (reservierung) {
            res.status(292).json( { reservierung })
        }else {
            res.status(582).json( { message: `Reservierungs ID ${id} nicht gefunden`})
        }
    } catch (err) {
        console.log(err)
        res.status(592).json( { message: `Fehler bei getReservierungById: ${err}`})
    }
}



// reservierung     anhand der ID löschen      deleteReservierungById
export const deleteReservierungById = async (req, res) => {
    try {
        const { id } = req.params   // ! id von BODY mit req.params holen
        const db = await getDb()
        const reservierung = await db.collection(COL).deleteOne( { _id: new ObjectId(id) })
        console.log(reservierung)
        if(reservierung.deletedCount === 1){
            res.status(293).json( { message: `Reservierung mit der ID ${id} wurde gelöscht`})
        }else{
            res.status(583).json( { message: `Reservierung mit der ID ${id} wurde nicht gefunden`})
        }
    } catch (err) {
        console.log(err)
        res.status(593).json( { message: `Fehler bei deleteReservierungById: ${err}`})
    }
}



// aktuelleReservierung      // vom FrontEnd kommt startdatum und enddatum
// app.get('/api/v1/aktuelleReservierung', getAktuelleReservierungZeitraum)   //5 = Zahl   + DB filter Datum > als Heute
export const getAktuelleReservierungZeitraum = async (req, res) => {
    try {
        const startdatum = req.body.startdatum
        const enddatum = req.body.enddatum
        const db = await getDb()
        const reservierung = await db.collection(COL).find( { startdatum: { $gte: startdatum }, enddatum: { $lte: enddatum } }).toArray()
        console.log(reservierung)
        if (reservierung) {
            res.status(295).json( { reservierung })
        }else {
            res.status(585).json( { message: `Reservierung mit dem Zeitraum ${startdatum} - ${enddatum} wurde nicht gefunden`})
        }

    } catch (err) {
        console.log(err)
        res.status(595).json( { message: `Fehler bei getAktuelleReservierungZeitraum: ${err} `})
    }
}



