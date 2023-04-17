import { getDb } from '../util/db.js'
import { ObjectId  } from 'mongodb' // ! für die ID, damit man vom FrontEnd den req.params auslesen kann

const COL = 'boote'

// postBoot      hinzufügen
export const postBoot = async (req, res) => {
    try{
        console.log(req.body)
        const db = await getDb()
        const boot = await db.collection(COL).insertOne(req.body)
        console.log(boot)
        res.status(290).json({ message: `Boot wurde hinzugefügt: ${boot}`})
    } catch (err) {
        console.log(err)
        res.status(590).json( { message: `Fehler bei postBoot: ${err}`})
    }
}



// alleBoote      findet Zahl
export const getAlleBoote = async (req, res) => {
    try{
        const db = await getDb()
        const boot =await db.collection(COL).find().count()
        console.log(boot)
        res.status(297).json( { boot } )
    } catch (err) {
        console.log(err)
        res.status(597).json( { message: `Fehler bei getAlleBoote: ${err}`})
    }
}


// boot     anhand der ID finden      getBootById
export const getBooteById = async (req, res) => {
    try{
        const { id } = req.params  // ! id von BODY mit req.params holen
        const db = await getDb()
        const boot = await db.collection(COL).findOne( { _id: new ObjectId(id)})
        console.log(boot)
        if (boot) {
            res.status(298).json( { boot} )
        } else {
            res.status(588).json( { message: `Boot ID ${id} nicht gefunden`})
        }
    } catch (err) {
        console.log(err)
        res.status(598).json( { message: `Fehler bei getBooteById: ${err}`})
    }
}



// deleteBooteById     anhand der ID löschen      
export const deleteBooteById = async (req, res) => {
    try {
        const { id } = req.params // ! id von BODY mit req.params holen
        const db = await getDb()
        const boot = await db.collection(COL).deleteOne( { _id: new ObjectId(id)})
        console.log(boot)
        if (boot.deletedCount === 1) {
            res.status(299).json( { message: `Boot ID ${id} wurde gelöscht`})
        }else {
            res.status(589).json( { message: `Boot ID ${id} nicht gefunden`})
        }
    } catch (err) {
        console.log(err)
        res.status(599).json( { message: `Fehler bei deleteBooteById: ${err}`})
    }
}