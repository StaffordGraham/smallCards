// DEAL LIBRARY
// The deal library is one .js file, chosen with the Select Deal Library button, in the format InstructConstruct saves:
//     const libDeals = [ {deal}, {deal}, ... ]
// ("var" or "let" also work, and a trailing module.exports line is ignored).
//
// The file dialog opens in DEFAULT_LIBRARY_FOLDER. The chosen file's full path is shown on the library
// screen and in the main window, and remembered (localStorage) so the same file opens next time.
// The file is re-read each time the library screen opens, so hands just saved by InstructConstruct appear.
//
// A web page cannot open a file dialog in a given folder or learn a file's full path, so the app must be
// served by serve.py (python serve.py), which shows the dialog and reads the file.

const DEFAULT_LIBRARY_FOLDER = "C:\\Users\\sgcam\\Projects\\DealLibraries"

// Optional headings shown above the deal list, by file name; any other library is headed by its file name
const LIBRARY_TITLES = {
  dealLibrary:          "Mendelson Winning Ways to Play Your Cards",
  funBridgeDealLibrary: "FunBridge Deals"
}

// All deal browsing, selection and loading reads from currentLibrary
var currentLibrary = []
var currentLibraryInfo = null   // {path, title} of the loaded library file

const LIBRARY_STORAGE_KEY = "smallCards.dealLibraryPath"
const NOT_SERVED_MESSAGE = "Deal libraries can only be loaded when smallCards is started with:\n" +
                           "    python serve.py\nthen open http://localhost:5502"
let libraryRequest = 0
let promptedForLibrary = false

function libraryInfo(path){
  const name = path.split("\\").pop().replace(/\.js$/i, "")
  return { path: path, title: LIBRARY_TITLES[name] || name }
}

// Reads a library file and returns its libDeals array.
// The file runs inside its own function, so its const/let/var and module.exports
// never clash with the page or with another library.
function loadDealLibrary(path){
  return fetch("/library/file?path=" + encodeURIComponent(path), { cache: "no-store" })
    .catch(() => { throw new Error(NOT_SERVED_MESSAGE) })
    .then(response => {
      if (!response.headers.get("X-SmallCards")){ throw new Error(NOT_SERVED_MESSAGE) }
      if (response.status === 404){ throw new Error("The deal library file does not exist:\n" + path) }
      if (!response.ok){ throw new Error("Could not load the deal library file\n" + path + "\n\n" + response.statusText) }
      return response.text()
    })
    .then(text => {
      let deals
      try {
        deals = new Function("module", "exports",
          text + "\nreturn typeof libDeals === 'undefined' ? undefined : libDeals")({ exports: {} }, {})
      } catch (e) {
        throw new Error(path + "\nis not a valid deal library:\n" + e.message)
      }
      if (!Array.isArray(deals) || deals.some(deal => !deal || typeof deal !== "object")){
        throw new Error(path + "\nis not a valid deal library: it does not define libDeals = [ {deal}, ... ]")
      }
      return deals
    })
}

// Loads the library file at path and makes it the current one.
// If it cannot be loaded, the error is shown and the current library is left unchanged.
function openDealLibrary(path){
  const request = ++libraryRequest
  return loadDealLibrary(path).then(deals => {
    if (request !== libraryRequest){ return }   // a later request has superseded this one
    currentLibrary = deals
    currentLibraryInfo = libraryInfo(path)
    try { localStorage.setItem(LIBRARY_STORAGE_KEY, path) } catch (e) { /* storage unavailable */ }
    refreshLibraryViews()
  }).catch(err => {
    if (request !== libraryRequest){ return }
    console.error(err)
    alert(err.message)
    refreshLibraryViews()
  })
}

// Select Deal Library: Windows file dialog (shown by serve.py), then load the chosen file
function chooseDealLibrary(){
  promptedForLibrary = true
  return fetch("/library/choose", { cache: "no-store" })
    .then(response => {
      if (!response.headers.get("X-SmallCards")){ throw new Error(NOT_SERVED_MESSAGE) }
      return response.json()
    })
    .catch(err => { throw new Error(err.message === NOT_SERVED_MESSAGE ? err.message : NOT_SERVED_MESSAGE) })
    .then(choice => {
      if (choice.path){ return openDealLibrary(choice.path) }   // null: dialog cancelled, keep the current library
    })
    .catch(err => {
      console.error(err)
      alert(err.message)
    })
}

// Re-reads the current library, or opens the one remembered from last time,
// or (first time only) asks for one
function refreshDealLibraries(){
  let path = currentLibraryInfo && currentLibraryInfo.path
  if (!path){
    try { path = localStorage.getItem(LIBRARY_STORAGE_KEY) } catch (e) { /* storage unavailable */ }
  }
  if (path){ return openDealLibrary(path) }
  refreshLibraryViews()
  if (!promptedForLibrary){ return chooseDealLibrary() }
}

function refreshLibraryViews(){
  const path = currentLibraryInfo ? currentLibraryInfo.path : "No deal library selected"

  const pathText = document.getElementById("libraryPath")
  if (pathText){ pathText.textContent = path }

  const pathLabel = document.getElementById("libraryPathLabel")
  if (pathLabel){ pathLabel.textContent = "Library: " + path }

  const title = document.getElementById("libraryTitle")
  if (title){ title.textContent = currentLibraryInfo ? currentLibraryInfo.title : "" }

  if (typeof populateLibraryTable === "function"){ populateLibraryTable() }
}

function getLibraryDeal(index){
  return currentLibrary[index]
}

function getRandomLibraryDeal(){
  return currentLibrary[Math.floor(Math.random() * currentLibrary.length)]
}

// The library is first read when script.js shows the library screen (showLibraryScreen)
function initDealLibraries(){
  document.getElementById("selectLibraryBtn").addEventListener("click", chooseDealLibrary)
}

document.addEventListener("DOMContentLoaded", initDealLibraries)
