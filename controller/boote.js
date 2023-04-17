import { getDb } from '../util/db.js'
import { ObjectId } from 'mongodb' // ! für die ID, damit man vom FrontEnd den req.params auslesen kann
// ! damit Bild Pfad gefunden wird
import path from 'path'     // ! für Bild Pfad


const COL = 'boote'

// postBoot      hinzufügen
export const postBoot = async (req, res) => {
    try {
        console.log(req.body)
        // ! zwecks Bild  1. speichert Bild auf BackEnd-Server 
        // ! 2. speichert Pfad vom Bild zum bE-Server in Mongo-DB 
        req.body.bild = req.file.path
        const db = await getDb()
        const boot = await db.collection(COL).insertOne(req.body)
        console.log(boot)
        res.status(290).json({ message: `Boot wurde hinzugefügt: ${boot}` })
    } catch (err) {
        console.log(err)
        res.status(590).json({ message: `Fehler bei postBoot: ${err}` })
    }
}

// ! Bild get fetch
// id muss die _id vom Boot sein 
export const getBooteBildById = async (req, res) => {
    try {
        const { id } = req.params
        const db = await getDb()
        const boot = await db.collection(COL).findOne({ _id: new ObjectId(id) })
        console.log(boot)
        if (boot) {
            //res.sendFile(boot.bild, { root: '.' })
            // res.sendFile(path.join(__dirname, '..', boot.bild))
            // ! wichtig damit der Pfad gefunden wird und richtig zurückgegeben wird und zusammengesetzt wird
            const __filename = new URL(import.meta.url).pathname;
            const __dirname = path.dirname(__filename);
            res.sendFile(path.join(__dirname, '..', boot.bild))
        } else {
            res.status(530).json({ message: `Fehler bei getBooteBildById: Boot mit ID ${id} nicht gefunden` })

        }
    } catch (err) {
        console.log(err)
        res.status(540).json({ message: `Fehler bei getBooteBildById: ${err}` })
    }
}

// alleBoote      findet Zahl
export const getAlleBoote = async (req, res) => {
    try {
        const db = await getDb()
        const boot = await db.collection(COL).find().count()
        console.log(boot)
        res.status(297).json({ boot })
    } catch (err) {
        console.log(err)
        res.status(597).json({ message: `Fehler bei getAlleBoote: ${err}` })
    }
}


// getAlleBooteObj      findet Objekt
export const getAlleBooteObj = async (req, res) => {
    try {
        const db = await getDb()
        const boot = await db.collection(COL).find().toArray()
        console.log(boot)
        res.status(267).json({ boot })
    } catch (err) {
        console.log(err)
        res.status(557).json({ message: `Fehler bei getAlleBooteObj: ${err}` })
    }
}


// boot     anhand der ID finden      getBootById
export const getBooteById = async (req, res) => {
    try {
        const { id } = req.params  // ! id von BODY mit req.params holen
        const db = await getDb()
        const boot = await db.collection(COL).findOne({ _id: new ObjectId(id) })
        console.log(boot)
        if (boot) {
            res.status(298).json({ boot })
        } else {
            res.status(588).json({ message: `Boot ID ${id} nicht gefunden` })
        }
    } catch (err) {
        console.log(err)
        res.status(598).json({ message: `Fehler bei getBooteById: ${err}` })
    }
}



// deleteBooteById     anhand der ID löschen      
export const deleteBooteById = async (req, res) => {
    try {
        const { id } = req.params // ! id von BODY mit req.params holen
        const db = await getDb()
        const boot = await db.collection(COL).deleteOne({ _id: new ObjectId(id) })
        console.log(boot)
        if (boot.deletedCount === 1) {
            res.status(299).json({ message: `Boot ID ${id} wurde gelöscht` })
        } else {
            res.status(589).json({ message: `Boot ID ${id} nicht gefunden` })
        }
    } catch (err) {
        console.log(err)
        res.status(599).json({ message: `Fehler bei deleteBooteById: ${err}` })
    }
}


// getBooteMitBildern     findet Zahl
export const getBooteMitBildern = async (req, res) => {
    try {
        const db = await getDb()
        const boot = await db.collection(COL).find({ bild: { $exists: true } }).count()
        console.log(boot)
        res.status(246).json({ boot })
    } catch (err) {
        console.log(err)
        res.status(546).json({ message: `Fehler bei getVerfuegbareBoote: ${err} ` })
    }
}

// getVerfuegbareBoote     findet Zahl
// fragt den BODY startdatum und enddatum ab
// vergleicht vorhande Daten von startdatum und enddatum mit den Daten im Body ab
// lässt keine überschneidungen bei den reservierung zu
const COL_2 = 'reservierung'
export const getVerfuegbareBoote2 = async (req, res) => {
    try {
        console.log(req.body)
        const startdatum = req.body.startdatum
        const enddatum = req.body.enddatum
        const db = await getDb()
        // vergleicht das es keine Überschneidungen von reservierung gibt
        const reservierung = await db.collection(COL_2).find({ startdatum: { $lte: enddatum }, enddatum: { $gte: startdatum } }).toArray()

        // ! sucht nach Übereinstimmung im ReservierungsZeitraum
        // const reservierung = await db.collection(COL_2).find( { startdatum: {$lte: enddatum, $gte: startdatum },  enddatum: {$gte: startdatum, $lte: enddatum} }).toArray() 


    } catch (err) {
        console.log(err)
        res.status(547).json({ message: `Fehler bei getVerfuegbareBoote: ${err} ` })
    }
}



// getVerfuegbareBoote     findet Zahl

const BOOTE_COLLECTION = 'boote';
const RESERVIERUNG_COLLECTION = 'reservierung';

export const getVerfuegbareBoote = async (req, res) => {
    try {
        const { startdatum, enddatum } = req.body;

        const db = await getDb();

        const alleBoote = await db.collection(BOOTE_COLLECTION).find().toArray();
        const reservierteBoote = await db.collection(RESERVIERUNG_COLLECTION)
            .find({ startdatum: { $lte: enddatum }, enddatum: { $gte: startdatum } })
            .toArray();

        const verfuegbareBoote = alleBoote.filter(boot =>
            !reservierteBoote.some(reservierung => reservierung.bootId === boot._id)
        );
        // anzahl der verfügbaren Boote
        // const anzahlVerfuegbareBoote = verfuegbareBoote.length;
        // console.log(anzahlVerfuegbareBoote);


        res.status(200).json(verfuegbareBoote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Fehler beim Abrufen verfügbarer Boote: ${error}` });
    }
};