import { getDb } from '../util/db.js'
import { ObjectId } from "mongodb"

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
            res.status(582).json( { message: 'Reservierungs ID nicht gefunden'})
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


