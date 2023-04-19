//

// wird all 10 Minuten aufgerufen
export const getFetchFrontEndAufweckenInterval = async (req, res) => {
   const aufwecken = async () => {
        try {
          const response = await  fetch(`https://bootsverleih-frontend.onrender.com`)
          console.log(response)
          res.status(247).json( { message: `FrontEnd aufgeweckt ${response}`})
            
        } catch (err) {
            console.log(err)
            res.status(547).json( { message: `Fehler bei getFetchFrontEndAufweckenInterval: ${err} `})
        }
    }

    setInterval(( ) => aufwecken(), 1200000) // 600000 = 10 Minuten 1200000 = 20 Minuten
    // oder
    
}