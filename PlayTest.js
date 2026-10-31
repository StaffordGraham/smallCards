// PlayTest.js
// Play-test mode, used by ConstructInstruct (F5) to play the hand being edited.
//
// ConstructInstruct serves smallCards itself and opens  index.html?playtest=1 .
// In this mode smallCards does not show the library screen. Instead it:
//   - asks ConstructInstruct for the deal (GET /playtest/state) every second, and
//     starts again whenever a changed deal arrives;
//   - shows a small bar with Restart and Show All Hands;
//   - when a hand is finished, reports every trick back (POST /playtest/result).
// Without ?playtest=1 nothing here does anything, so normal use is unchanged.

const PLAY_TEST = new URLSearchParams(location.search).has("playtest")
const PLAY_TEST_POLL_MS = 1000

var playTestVersion = null      // version of the deal being played (from ConstructInstruct)
var playTestConnected = null

function isPlayTest(){
  return PLAY_TEST
}

// Called instead of showLibraryScreen() when the page opens in play-test mode
function startPlayTest(){
  document.title = "SmallCards Play-test"
  document.body.classList.add("playtest")
  buildPlayTestBar()
  pollPlayTest()
  setInterval(pollPlayTest, PLAY_TEST_POLL_MS)
}

function buildPlayTestBar(){
  const bar = document.createElement("div")
  bar.id = "playTestBar"
  bar.innerHTML = `
    <span id="playTestStatus">Waiting for ConstructInstruct…</span>
    <span id="playTestName"></span>
    <button id="playTestRestart">Restart</button>
    <button id="playTestShowAll">Show All Hands</button>`
  document.body.appendChild(bar)
  document.getElementById("playTestRestart").addEventListener("click", restartPlayTest)
  document.getElementById("playTestShowAll").addEventListener("click", toggleShowAllHands)
  document.getElementById("replayDealButton").addEventListener("click", () => setPlayTestStatus("Play-test"))
}

function setPlayTestStatus(text){
  document.getElementById("playTestStatus").textContent = text
}

function pollPlayTest(){
  const have = playTestVersion === null ? "" : playTestVersion
  fetch("/playtest/state?have=" + have, { cache: "no-store" })
    .then(response => {
      if (!response.ok){ throw new Error(response.statusText) }
      return response.json()
    })
    .then(state => {
      if (playTestConnected !== true){
        playTestConnected = true
        if (playTestVersion !== null){ setPlayTestStatus("Play-test") }
      }
      if (state.deal && state.version !== playTestVersion){
        playTestVersion = state.version
        playTestDeal(state.deal)
      }
    })
    .catch(() => {
      if (playTestConnected !== false){
        playTestConnected = false
        setPlayTestStatus("ConstructInstruct is not running — results cannot be sent")
      }
    })
}

// Start playing a deal sent by ConstructInstruct, abandoning any hand in progress
function playTestDeal(dealData){
  const deal = new Deal(dealData)
  Deals.push(deal)
  document.getElementById("playTestName").textContent = dealData.name || ""
  setPlayTestStatus("Play-test")
  exitTeachingMode()
  validateCheckpoints(deal)
  reLoadLastDeal()
}

function restartPlayTest(){
  if (Deals.length === 0){ return }
  exitTeachingMode()
  setPlayTestStatus("Play-test")
  reLoadLastDeal()
}

function toggleShowAllHands(){
  showCards = !showCards
  document.getElementById("playTestShowAll").textContent = showCards ? "Hide East-West" : "Show All Hands"
  redisplayHands()
}

// Draw the four hands again, e.g. after Show All Hands is switched
function redisplayHands(){
  if (Deals.length === 0){ return }
  clearDisplayedCards()
  Players.forEach(player => {
    player.suitsIntoHand()      // fullHand is not updated as cards are played; the suits are
    player.displayHand()
  })
}

// Called by handOver() (Routines.js) when the 13th trick has been played
function playTestHandOver(){
  if (!PLAY_TEST || playTestVersion === null){ return }
  // A Trick keeps its cards sorted by rank; play order is clockwise from the leader
  // (holder numbers 0 South, 1 West, 2 North, 3 East)
  const playOrder = (trick, card) => (Number(card.holderNumber) - Number(trick.onLead) + 4) % 4
  const tricks = Tricks
    .filter(trick => trick.cardArray.length === 4)
    .map(trick => ({
      cards: trick.cardArray.slice()
        .sort((a, b) => playOrder(trick, a) - playOrder(trick, b))
        .map(card => [Number(card.holderNumber), Number(card.cardNumber)]),
      winner: Number(trick.winningPlayer)
    }))
  fetch("/playtest/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version: playTestVersion, tricks: tricks })
  })
    .then(response => {
      if (!response.ok){ throw new Error(response.statusText) }
      setPlayTestStatus("Result sent to ConstructInstruct ✔")
    })
    .catch(() => setPlayTestStatus("Result NOT sent — is ConstructInstruct still running?"))
}
