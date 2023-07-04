// prendo il riferimento alla textarea
const textAreaReference = document.getElementById('textArea')

// prendiamo i riferimenti ai 3 bottoni
const loadButton = document.getElementById('load')
const saveButton = document.getElementById('save')
const resetButton = document.getElementById('reset')

const save = function () {
  // salvo in una variabile il contenuto testuale della textarea
  const textAreaContent = textAreaReference.value // le textarea funzionano esattamente come degli <input />
  // textAreaContent è già una stringa, non abbiamo bisogno di convertirlo in niente
  localStorage.setItem('notepad-memory', textAreaContent)
  alert('Contenuto salvato!')
}

const load = function () {
  // proviamo a recuperare il valore di 'notepad-memory' dal localStorage
  const memory = localStorage.getItem('notepad-memory')
  // memory può anche essere null
  if (memory) {
    // il valore è stato trovato! rimettiamolo come value della textarea
    textAreaReference.value = memory
  } else {
    // il valore non esiste, scrivo un messaggio per l'utente
    alert('memoria non trovata!')
  }
}

const reset = function () {
  // prima di tutto svuoto la textarea nel DOM
  textAreaReference.value = ''
  // ora svuoto anche "notepad-memory" nel localStorage
  localStorage.removeItem('notepad-memory')
  alert('Memoria svuotata!')
}

saveButton.addEventListener('click', save) // senza () perchè altrimenti verrebbe invocata automaticamente!
loadButton.addEventListener('click', load)
resetButton.addEventListener('click', reset)
