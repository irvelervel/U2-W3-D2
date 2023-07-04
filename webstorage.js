// Le WEB Storage API nascono con la standarizzazione di HTML5, al fine di migliorare una tecnologia esistente (cookie).
// La migliorano superando le sue due princiapli limitazioni:
// 1) I cookie possono memorizzare la massimo 4KB di dati
// 2) I cookie non erano stati pensati per il concetto di "sessione"

// La soluzione è stata introdurre due nuove tecnologie per lo stoccaggio dei dati lato client (browser) a breve/medio termine:
// 1) localStorage (che memorizza i dati fino al proprio svuotamento)
// 2) sessionStorage (che permane solamente per la durata della "sessione", quindi si autodistrugge alla chiusura del tab/browser)

// Entrambe queste memorie condividono uno spazio di circa 5MB e memorizzano informazioni separatamente per ogni dominio

// anche essendo due tecnologie separate, i metodi JS per interagire con esse sono sostanzialmente gli stessi
// localStorage.clear() è un metodo che svuota il localStorage
// sessionStorage.clear() è un metodo che svuota il sessionStorage

// ricordiamoci di non salvare dati particolarmente sensibili in questi motori di storage in quanto sono completamente
// esposti all'utente: qualsiasi persona con accesso al browser (o qualsiasi tool) può leggere/scrivere/eliminare records.

// localStorage.clear() // clear() svuota il contenuto del localStorage()
localStorage.setItem('benchmarkResult', 80) // inserisce una coppia chiave/valore nel motore selezionato
// sessionStorage.setItem('benchmarkResult', 80) // inserisce una coppia chiave/valore nel motore selezionato

const recoveredValue = localStorage.getItem('benchmarkResult')
// recoveredValue è '80' (come stringa)

localStorage.removeItem('benchmarkResult') // elimina SOLAMENTE la chiave benchmarkResult

console.log(recoveredValue)

// localStorage.setItem('myobj', { name: 'fufy' }) // <-- il salvataggio di un tipo di dato non primitivo richiederà una conversione! "[object Object]"

// per "stringhifizzare" correttamente un tipo di dato complesso (obj/arr), utilizziamo JSON.stringify()
localStorage.setItem('myObj', JSON.stringify({ name: 'Fufy' })) // --> '{ name: 'Fufy' }' come stringa
localStorage.setItem('myArr', JSON.stringify(['uno', 'due', 'tre']))

// recuperiamo i dati complessi
let objAsAString = localStorage.getItem('myObj') // objAsAString è una stringa!
// ri-trasformiamo ora la stringa nell'oggetto originale: utilizziamo l'inverso di JSON.stringify(), ovvero JSON.parse()
let realObj = JSON.parse(objAsAString)
console.log('OBJ', realObj)

let arrAsAString = localStorage.getItem('myArr') // arrAsAString è una stringa!
// ri-trasformiamo ora la stringa nell'array originale: utilizziamo l'inverso di JSON.stringify(), ovvero JSON.parse()
let realArr = JSON.parse(arrAsAString)
console.log('ARR', realArr)
