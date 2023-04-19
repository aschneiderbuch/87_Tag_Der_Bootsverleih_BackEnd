//

// wird all 10 Minuten aufgerufen
export const getFetchFrontEndAufweckenInterval = async (req, res) => {
   const aufwecken = async () => {
        try {
          const response = await  fetch(`https://bootsverleih-frontend.onrender.com/alle-reservierungen`)
          console.log(response)
            
        } catch (err) {
            console.log(err)
        }
    }

    setInterval(aufwecken(), 1200000) // 600000 = 10 Minuten 1200000 = 20 Minuten

}