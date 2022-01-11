// const inputFrom = document.getElementById('from')
const inputFrom = document.querySelector("#from")
const inputTo = document.querySelector("#to")
const switchButton = document.querySelector(".switch")
const selectFromCurrencies = document.querySelector("#from_currencies")
const selectToCurrencies = document.querySelector("#to_currencies")
const submitInput = document.querySelector("[type='submit']")
const form = document.querySelector("form")


const switchCurrencies = (event) => 
{
    event.preventDefault()
    //TODO: Inverser les monnaies from et to
    console.log('le bouton switch a été cliqué')
    [inputFrom.value, inputTo.value] = [inputTo.value, inputFrom.value]
}

const submitForm = async (event) => 
{
    event.preventDefault()
    //TODO: Récupérer la valeur tapée dans le champ from
    const fromValue = inputFrom.value

    //TODO: Récupérer la valeur du select from
    const currencyFrom = selectFromCurrencies.value

    //TODO: Récupérer la valeur du select to
    const currencyTo = selectToCurrencies.value

    //TODO: Vérifier que currencyFrom et currencyTo ne sont pas égaux
    if (currencyFrom === currencyTo)
    {
        alert('Vous n\'avez pas changer la valeur !')
        return
    }

    //TODO: Afficher une alerte si le champ from est vide
    if (!fromValue)
    {
        alert('Vous n\'avez pas entré de valeur !')
        return
    }

    console.log('fromValue:', fromValue)
    //TODO: lancer la requête à l'API en lui fournissant la valeur tapée dans from
    try
    {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${fromValue}&from=${currencyFrom}&to=${currencyTo}`)
        const json = await response.json()
        console.log('Réponse complète :', json)
        console.log('Résultat :', json.rates[currencyTo])

        inputTo.value = json.rates[currencyTo]
    }

    catch (error)
    {
        console.error('Erreur dans la requête :', error)
        alert('Oups ! Une erreur est arrivée, veuillez ré-essayer ultérieurement')
    }
}

const updateSelectValue = async () => 
{
    // //Requête Ajax (Asynchronous Js and Xml)
    // fetch('https://api.frankfurter.app/currencies')
    //     .then((result) => result.json())
    //     .then((data) => 
    //     {
    //         // Je crée une chaîne de craratères vide
    //         let htmlContent = ''

    //         // Je remplis la chaîne de caractère avec des balises HTLM utilisant les clés et les valeurs de chaque entrée de l'objet

    //         for( const [key, value] of Object.entries(data))
    //         {
    //             const option = `<option value="${key}">${value}</option>`
    //             htmlContent += option
    //         }
    //         console.log(htmlContent)

    //         //Je remplace le HTML des deux menus select par htmlContent
    //         selectFromCurrencies.innerHTML = htmlContent
    //         selectToCurrencies.innerHTML = htmlContent
    //     })
    //     .catch((error) => console.error('Erreur updateSelectValue : ',error))

    try 
    {
        // Stocker le résultat de la promesse json() dans la constante result
        const result = await fetch('https://api.frankfurter.app/currencies')

        // Stocker le résultat de la promesse json() dans la constante data
        const data = await result.json()

        let htmlContent = ''

        // Je remplis la chaîne de caractère avec des balises HTLM utilisant les clés et les valeurs de chaque entrée de l'objet

        for( const [key, value] of Object.entries(data))
        {
            const option = `<option value="${key}">${value}</option>`
            htmlContent += option
        }

        //Je remplace le HTML des deux menus select par htmlContent
        selectFromCurrencies.innerHTML = htmlContent
        selectToCurrencies.innerHTML = htmlContent

    } 
    catch (error) 
    {
        console.error('Erreur updateSlectValue :', error)
    }
}

//TODO: traiter la réponse de l'API en remplissant le champ from
switchButton.addEventListener("click", switchCurrencies)
form.addEventListener("submit", submitForm)

//Appel de fonctions au chargement de la page
updateSelectValue()

// switchButton.addEventListener
// (
//     'click', (event) => 
//     {
//         event.preventDefault()
//         console.log('le bouton a été cliqué')
//     }
// )