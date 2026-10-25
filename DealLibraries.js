// DEAL LIBRARIES
// Every .js file in DEFAULT_LIBRARY_FOLDER is a deal library, in the format InstructConstruct saves:
//     const libDeals = [ {deal}, {deal}, ... ]
// ("var" or "let" also work, and a trailing module.exports line is ignored).
//
// Each time the library screen opens, the folder is listed again and the chosen library re-read,
// so libraries and hands just saved by InstructConstruct appear without changing anything here.
//
// A web page cannot list a folder, so the app must be served by serve.py (python serve.py),
// which reads DEFAULT_LIBRARY_FOLDER from this file and serves the folder at /<folder name>/.

const DEFAULT_LIBRARY_FOLDER = "C:\\Users\\sgcam\\Projects\\DealLibraries"

// Optional headings shown above the deal list; any other library is headed by its file name
const LIBRARY_TITLES = {
  dealLibrary:          "Mendelson Winning Ways to Play Your Cards",
  funBridgeDealLibrary: "FunBridge Deals"
}

// All deal browsing, selection and loading reads from currentLibrary
var currentLibrary = []
var currentLibraryInfo = null

let dealLibraries = []         // {id, file, title} for each library file in the folder
const LIBRARY_STORAGE_KEY = "smallCards.dealLibrary"
let libraryRequest = 0

function findLibraryInfo(id){
  return dealLibraries.find(lib => lib.id === id)
}

// The route serve.py serves DEFAULT_LIBRARY_FOLDER on: /<folder name>/
function libraryFolderUrl(){
  return "/" + DEFAULT_LIBRARY_FOLDER.split("\\").pop() + "/"
}

// Asks serve.py which library files are in the folder
function listDealLibraries(){
  return fetch(libraryFolderUrl(), { cache: "no-store" })
    .then(response => response.json())
    .catch(() => null)
    .then(listing => {
      if (!listing || !Array.isArray(listing.files)){
        throw new Error("The deal library folder cannot be listed.\n\n" +
                        "Start smallCards with:  python serve.py\nthen open http://localhost:5502")
      }
      if (!listing.found){
        throw new Error("The deal library folder was not found:\n" + DEFAULT_LIBRARY_FOLDER)
      }
      if (listing.files.length === 0){
        throw new Error("There are no deal library (.js) files in\n" + DEFAULT_LIBRARY_FOLDER)
      }
      return listing.files.map(file => {
        const id = file.replace(/\.js$/i, "")
        return { id: id, file: file, title: LIBRARY_TITLES[id] || id }
      })
    })
}

// Reads a library file and returns its libDeals array.
// The file runs inside its own function, so its const/let/var and module.exports
// never clash with the page or with another library.
function loadDealLibrary(info){
  return fetch(libraryFolderUrl() + encodeURIComponent(info.file), { cache: "no-store" })
    .then(response => {
      if (!response.ok){
        throw new Error("Could not load " + info.file + " from the deal library folder\n" + DEFAULT_LIBRARY_FOLDER)
      }
      return response.text()
    })
    .then(text => {
      let deals
      try {
        deals = new Function("module", "exports",
          text + "\nreturn typeof libDeals === 'undefined' ? undefined : libDeals")({ exports: {} }, {})
      } catch (e) {
        throw new Error(info.file + " could not be read:\n" + e.message)
      }
      if (!Array.isArray(deals)){
        throw new Error(info.file + " does not define libDeals = [...]")
      }
      return deals
    })
}

// Makes the given library the current one and refreshes every deal list
function selectDealLibrary(id){
  const request = ++libraryRequest
  const info = findLibraryInfo(id)
  return loadDealLibrary(info).then(deals => {
    if (request !== libraryRequest){ return }   // a later selection has superseded this one
    currentLibrary = deals
    currentLibraryInfo = info
    try { localStorage.setItem(LIBRARY_STORAGE_KEY, id) } catch (e) { /* storage unavailable */ }
    refreshLibraryViews()
  }).catch(err => {
    if (request !== libraryRequest){ return }
    console.error(err)
    alert(err.message)
    refreshLibraryViews()   // put the drop-down back to the library still in use
  })
}

// Lists the folder again, then re-reads the current (or remembered, or first) library
function refreshDealLibraries(){
  const request = ++libraryRequest
  return listDealLibraries().then(libraries => {
    if (request !== libraryRequest){ return }
    dealLibraries = libraries
    fillLibrarySelect()

    let id = currentLibraryInfo && currentLibraryInfo.id
    if (!findLibraryInfo(id)){
      try { id = localStorage.getItem(LIBRARY_STORAGE_KEY) } catch (e) { /* storage unavailable */ }
    }
    if (!findLibraryInfo(id)){ id = dealLibraries[0].id }
    return selectDealLibrary(id)
  }).catch(err => {
    if (request !== libraryRequest){ return }
    console.error(err)
    alert(err.message)
  })
}

function fillLibrarySelect(){
  const select = document.getElementById("dealLibrarySelect")
  select.innerHTML = ""
  dealLibraries.forEach(lib => {
    const option = document.createElement("option")
    option.value = lib.id
    option.textContent = lib.id
    select.appendChild(option)
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

// The libraries are first read when script.js shows the library screen (showLibraryScreen)
function initDealLibraries(){
  const select = document.getElementById("dealLibrarySelect")
  select.addEventListener("change", () => selectDealLibrary(select.value))
}

document.addEventListener("DOMContentLoaded", initDealLibraries)
