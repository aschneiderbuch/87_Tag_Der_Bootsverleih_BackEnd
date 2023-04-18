# ReadMe

### fetch Routen
    
<>

app.get('/api/v1/alleReservierungen', getAlleReservierungen) -> Zahl
app.get('/api/v1/alleReservierungenObj', getAlleReservierungenObj)  -> Objekt

app.get('/api/v1/reservierung/:id', getReservierungById)   
app.delete('/api/v1/reservierung/:id', deleteReservierungById)  

app.post('/api/v1/reservierung', upload.any(), postReservierung)        
app.put('/api/v1/updateReservierung', upload.any(), updateReservierung)

app.get('/api/v1/aktuelleReservierung', upload.any(), getAktuelleReservierungZeitraum)  

app.post('/api/v1/createReservierungValid' , createReservierungValid)  

<>

app.put('/api/v1/verfuegbareBoote', getVerfuegbareBoote)   -> Zahl    
app.get('/api/v1/verfuegbareBooteObj', getVerfuegbareBooteObj)  -> Objekt


app.get('/api/v1/alleBoote', getAlleBoote)                   -> Zahl
app.get('/api/v1/alleBooteObj', getAlleBooteObj)               -> Objekt

app.get('/api/v1/boote/:id', getBooteById)                     
app.delete('/api/v1/boote/:id', deleteBooteById)                

app.post('/api/v1/boote', uploadBild.single('bild'), postBoot)             

img src='..../api/v1/boote/..._idVomBoot_perMongoDB.../bild' alt='BootBild' /
img src="http://localhost:9999/api/v1/boote/643d7e0390c84ce2bb3aeeef/bild" alt='BootBild' /
app.get('/api/v1/boote/:id/bild', getBooteBildById)             


app.get('/api/v1/booteBilder', getBooteMitBildern)   -> zahl
