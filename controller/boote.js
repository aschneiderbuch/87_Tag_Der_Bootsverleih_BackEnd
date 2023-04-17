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


