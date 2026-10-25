// DEAL LIBRARIES
// Every deal library is a separate .js file in the same format as dealLibrary.js:
//     var libDeals = [ {deal}, {deal}, ... ]
// (it must be "var", not "const", so that a second library can replace the first).
//
// To add a new library: create the file, then add one line to DEAL_LIBRARIES below.
// Nothing else in the application needs to change.
//   id    - name shown in the Deal Library drop-down
//   file  - the library file
//   title - heading shown above the deal list

const DEAL_LIBRARIES = [
  { id: "dealLibrary",          file: "dealLibrary.js",          title: "Mendelson Winning Ways to Play Your Cards" },
  { id: "funBridgeDealLibrary", file: "funBridgeDealLibrary.js", title: "FunBridge Deals" }
]

// All deal browsing, selection and loading reads from currentLibrary
var currentLibrary = []
var currentLibraryInfo = null

const loadedLibraries = {}     // id -> deals, so a library is only fetched once
const LIBRARY_STORAGE_KEY = "smallCards.dealLibrary"
let libraryRequest = 0

function findLibraryInfo(id){
  return DEAL_LIBRARIES.find(lib => lib.id === id)
}

// Loads a library file by adding a <script> tag, then takes its libDeals array
function loadDealLibrary(id){
  const info = findLibraryInfo(id)
  if (!info){
    return Promise.reject(new Error("Unknown deal library: " + id))
  }
  if (loadedLibraries[id]){
    return Promise.resolve(loadedLibraries[id])
  }
  return new Promise((resolve, reject) => {
    window.libDeals = undefined
    const script = document.createElement("script")
    script.src = info.file
    script.onload = () => {
      const deals = window.libDeals
      window.libDeals = undefined
      script.remove()
      if (!Array.isArray(deals)){
        reject(new Error(info.file + " did not define var libDeals = [...]"))
        return
      }
      loadedLibraries[id] = deals
      resolve(deals)
    }
    script.onerror = () => {
      script.remove()
      reject(new Error("Could not load " + info.file))
    }
    document.head.appendChild(script)
  })
}

// Makes the given library the current one and refreshes every deal list
function selectDealLibrary(id){
  const request = ++libraryRequest
  return loadDealLibrary(id).then(deals => {
    if (request !== libraryRequest){ return }   // a later selection has superseded this one
    currentLibrary = deals
    currentLibraryInfo = findLibraryInfo(id)
    try { localStorage.setItem(LIBRARY_STORAGE_KEY, id) } catch (e) { /* storage unavailable */ }
    refreshLibraryViews()
  }).catch(err => {
    console.error(err)
    alert(err.message)
    refreshLibraryViews()   // put the drop-down back to the library still in use
  })
}

function refreshLibraryViews(){
  const select = document.getElementById("dealLibrarySelect")
  if (select && currentLibraryInfo){ select.value = currentLibraryInfo.id }

  const title = document.getElementById("libraryTitle")
  if (title && currentLibraryInfo){ title.textContent = currentLibraryInfo.title }

  if (typeof populateLibraryTable === "function"){ populateLibraryTable() }
}

function getLibraryDeal(index){
  return currentLibrary[index]
}

function getRandomLibraryDeal(){
  return currentLibrary[Math.floor(Math.random() * currentLibrary.length)]
}

function initDealLibraries(){
  const select = document.getElementById("dealLibrarySelect")
  DEAL_LIBRARIES.forEach(lib => {
    const option = document.createElement("option")
    option.value = lib.id
    option.textContent = lib.id
    select.appendChild(option)
  })
  select.addEventListener("change", () => selectDealLibrary(select.value))

  let startId = DEAL_LIBRARIES[0].id
  try {
    const saved = localStorage.getItem(LIBRARY_STORAGE_KEY)
    if (saved && findLibraryInfo(saved)){ startId = saved }
  } catch (e) { /* storage unavailable */ }
  selectDealLibrary(startId)
}

document.addEventListener("DOMContentLoaded", initDealLibraries)
