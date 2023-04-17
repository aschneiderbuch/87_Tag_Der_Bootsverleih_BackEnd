import { getDb } from '../util/db.js'

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


