import { getDb } from '../util/db.js'
import { ObjectId } from "mongodb"   // ! für die ID damit man vom FrontEnd req.params holen kann

const COL = 'reservierung'

export const postReservierung = async (req, res) => {
    try{
        console.log(req.body)
        // ! schickt ID vom Boot mit req.body.welches_boot
        const db = await getDb()
        const reservierung = await db.collection(COL_VALID).insertOne(req.body)
        console.log(reservierung)
        res.status(294).json({message: `Reservierung wurde hinzugefügt: ${reservierung}`})
    } catch (err) {
        console.log(err)
        res.status(594).json( { message: `Fehler bei postReservierung: ${err}` } )
    
}}

// updateReservierung so könnte man daten der Reservierung ändern
// 
export const updateReservierung = async (req, res) => {
    console.log(req.body)
    
    try {
        const db = await getDb()
        // const reservierung = await db.collection(COL).updateOne( { _id: new ObjectId(req.body.id) } )
       //  const reservierung = await db.collection(COL).updateOne( { _id: new ObjectId(req.body.id) }, { $set: { startdatum: req.body.startdatum, enddatum: req.body.enddatum } } )
       const reservierung = await db.collection(COL).updateOne( { _id: new ObjectId(req.body.id) }, { $set: { startdatum: req.body.startdatum, enddatum: req.body.enddatum, welches_boot: req.body.welches_boot}})
       console.log(reservierung)
       if (reservierung) {
         res.status(264).json( {reservierung}) }
         else {
            res.status(564).json( { message: `Reservierung ID ${req.body.id} nicht gefunden`})
         }
    } catch (err) {
        console.log(err)
        res.status(554).json( { message: `Fehler bei updateReservierung: ${err} `})        
    }
}




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



// createReservierungValid 
// ! MongoDB Validierung nur 1x am Anfang ausführen    - da es createCollection() macht
const COL_VALID = 'reservierungValid'
export const createReservierungValid = async (req, res) => {
    try{
        const db = await getDb()
        const reservierung = await db.createCollection(COL_VALID , {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: 'reservierungValid',

                    required: ['startdatum', 'enddatum', 'welches_boot'],

                    properties: {
                        startdatum: {
                            bsonType: 'date',
                            description: 'startdatum muss ein Datum sein jjjj-mm-tt'
                        },
                        enddatum: {
                            bsonType: 'date',
                            description: 'enddatum muss ein Datum sein jjjj-mm-tt'
                        },
                        welches_boot: {
                            bsonType: 'string',
                            description: 'ist ein String mit der Boot _id (ObjectId)'
                        }
                    }
                }
            }
        })
        console.log(reservierung)
        // ! wichtig .json() führt zu Fehler auch jeglicher Input außer String im .send() oder .end()
        res.status(266).send('Reservierung Validierung wurde erstellt')
    } catch (err){
        console.log(err)
        res.status(566).json( { message: `Fehler bei createReservierungValid: ${err} `})
    }
}