import { getDb } from '../util/db.js'
import { ObjectId  } from 'mongodb' // ! für die ID, damit man vom FrontEnd den req.params auslesen kann
// ! damit Bild Pfad gefunden wird
import path from 'path'     // ! für Bild Pfad


const COL = 'boote'

// postBoot      hinzufügen
export const postBoot = async (req, res) => {
    try{
        console.log(req.body)
        // ! zwecks Bild  1. speichert Bild auf BackEnd-Server 
        // ! 2. speichert Pfad vom Bild zum bE-Server in Mongo-DB 
        req.body.bild = req.file.path
        const db = await getDb()
        const boot = await db.collection(COL).insertOne(req.body)
        console.log(boot)
        res.status(290).json({ message: `Boot wurde hinzugefügt: ${boot}`})
    } catch (err) {
        console.log(err)
        res.status(590).json( { message: `Fehler bei postBoot: ${err}`})
    }
}

// ! Bild get fetch
// id muss die _id vom Boot sein 
export const getBooteBildById = async (req, res) => {
    try{
        const { id } = req.params
        const db = await getDb()
        const boot = await db.collection(COL).findOne( { _id: new ObjectId(id) })
        console.log(boot)
        if (boot) {
            //res.sendFile(boot.bild, { root: '.' })
            // res.sendFile(path.join(__dirname, '..', boot.bild))
            // ! wichtig damit der Pfad gefunden wird und richtig zurückgegeben wird und zusammengesetzt wird
            const __filename = new URL(import.meta.url).pathname;
            const __dirname = path.dirname(__filename);
            res.sendFile(path.join(__dirname, '..', boot.bild))
        } else {
            res.status(530).json( { message: `Fehler bei getBooteBildById: Boot mit ID ${id} nicht gefunden`})
            
        }
    } catch (err) {
        console.log(err)
        res.status(540).json({ message: `Fehler bei getBooteBildById: ${err}`})
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


// getAlleBooteObj      findet Objekt
export const getAlleBooteObj = async (req, res) => {
    try {
        const db = await getDb()
        const boot = await db.collection(COL).find().toArray()
        console.log(boot)
        res.status(267).json( { boot } )
    } catch (err) {
        console.log(err) 
        res.status(557).json( { message: `Fehler bei getAlleBooteObj: ${err}`})
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