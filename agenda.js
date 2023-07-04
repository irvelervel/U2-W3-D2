class Appointment {
  constructor(_name, _date) {
    this.name = _name
    this.date = _date
  }
}

// prendo i riferimenti agli input
const appointmentNameReference = document.getElementById('appointment-name')
const appointmentDateReference = document.getElementById('appointment-date')

// prendo un riferimento al form, in modo da fermare il suo comportamento di default
const formReference = document.querySelector('form')

const saveNewAppointment = function (e) {
  e.preventDefault()
  // creo un oggetto a partire dal nome e dalla data dell'appuntamento
  const newAppointment = new Appointment(
    appointmentNameReference.value,
    appointmentDateReference.value
  )
  console.log(newAppointment)
  //   ho creato l'evento! ora devo inserirlo nel localStorage
  // ...però lavoriamo con un oggetto! devo prima stringifizzarlo
  //   const stringifiedAppointment = JSON.stringify(newAppointment)
  //   localStorage.setItem('appointments', stringifiedAppointment)
  // questo approccio funziona, ma in questo modo posso salvare solamente un appuntamento! quelli successivi lo sovrascriveranno

  // ...proviamo a salvare in localStorage un array di appuntamenti
  // recuperiamo prima di tutto l'array già esistente!
  const existingAppointments = localStorage.getItem('appointments')
  // fatto. due possibilità: appointments è già un array di appuntamenti (stringhifizzato), oppure appointments è null
  if (existingAppointments) {
    // avevo già salvato degli appuntamenti in questo array in precedenza!
    // come aggiungo un nuovo concerto all'array già esistente in localStorage?
    // existingAppointments è il contenuto del localStorage, ma è un array stringhifizzato!
    const existingAppointmentsAsArray = JSON.parse(existingAppointments) // lo ri-trasforma in array
    // ora abbiamo l'array nuovamente in forma di array!
    // inseriamo il newAppointment alla fine dell'array di eventi precedentemente creato
    existingAppointmentsAsArray.push(newAppointment)
    // ri-salviamo l'array con il newAppointment alla fine nel localStorage, ma attenzione! dobbiamo ri-stringhifizzarlo...
    localStorage.setItem(
      'appointments',
      JSON.stringify(existingAppointmentsAsArray)
    )
    // svuoto il form completata l'operazione
    appointmentNameReference.value = ''
    appointmentDateReference.value = ''
    generateList() // alla fine della creazione del nuovo evento, rigenero la lista
  } else {
    // questa è la prima volta che apro la pagina, oppure in ogni caso non ho ancora salvato nessun appuntamento...
    // mi creo per la prima volta l'array di appuntamenti
    const appointmentsList = []
    // pusho dentro questo array vuoto il mio primo appuntamento
    appointmentsList.push(newAppointment)
    // sono pronto per salvarlo nel localStorage! ma attenzione: non posso salvarlo con il suo valore di array...
    localStorage.setItem('appointments', JSON.stringify(appointmentsList))
    // svuoto il form completata l'operazione
    appointmentNameReference.value = ''
    appointmentDateReference.value = ''
    generateList() // alla fine della creazione del nuovo evento, rigenero la lista
  }
}

formReference.addEventListener('submit', saveNewAppointment)

const generateList = function () {
  // riempiamo la lista degli eventi al caricamento della pagina a partire dal mio contenuto del localStorage
  const appointmentsFromLocalStorage = localStorage.getItem('appointments') // come stringa!!
  if (appointmentsFromLocalStorage) {
    const listReference = document.querySelector('#appointments-list ul')
    listReference.innerHTML = ''
    // proseguiamo nel nostro codice solamente se ci sono eventi da mostrare!
    const appointments = JSON.parse(appointmentsFromLocalStorage)
    // appointments è un array vero e proprio con gli oggetti evento dentro
    //   genero i miei list-item a partire dall'array appointments
    appointments.forEach((app) => {
      let newLi = document.createElement('li')
      newLi.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between'
      ) // inserisco la classe CSS di bootstrap
      newLi.innerText = `${app.name} il ${app.date}`
      // <li class="list-group-item">Concerto dei Pooh il 17-12-2023</li>
      // inserisco il bottone per eliminare l'evento
      let deleteButton = document.createElement('button')
      deleteButton.classList.add('btn', 'btn-danger')
      deleteButton.innerHTML = '<i class="bi bi-trash3-fill"></i>'
      deleteButton.addEventListener('click', function () {
        // EXTRA: inserisci qui il codice per eliminare
        // un elemento dalla lista (e dal localStorage!)
        console.log('clicked!')
      })
      newLi.appendChild(deleteButton)
      // ora appendiamo il nuovo <li> alla <ul>
      listReference.appendChild(newLi)
    })
  }
}

generateList()
