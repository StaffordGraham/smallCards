// script.js
//Dom Content Loaded line 11
//startPlay Line 23
//flag button 35
//shuffle and deal line 45
//nextTrick line 119

// const { useCallback } = require("react")

// Import the Player class from Player.js
//A
//B
//C
if (true==false){clearHand}
if (true==false){clearPlayedCards}
if (true==false){clearDisplayedCardBack}


if  (true==false){closeAllModals}
if (true==false){computeLayoutMetrics}
if (true==false){convertCard}
if (true==false){disableTrickButtons}
if (true==false){displayCards}
if (true==false){domLoadfunc}
//E
if (true==false){eventHandlersFunc}
if (true==false){exitTeachingMode}
if (true==false){enterTeachingMode}
//F
//G
//H
if (true==false){handleCardGameData}
//I
//J
//K
//L
if (true==false){load_DealFromLibrary}
if (true==false){loadSelectedFile};
if (true==false){loadJSON}

//M
//N
if (true==false){nextDeal}
if (true==false){nextTrick}

//O
if (true==false){openButtonFunc}

//P
if (true==false){populateGame}
if (true==false){populateLibraryTable}
if (true==false){playAgain}
if (true==false){playCard}
if (true==false){populateGame}
//Q
//R
if (true==false){reLoadLastDeal}
if (true==false){removePlayerCard}
if (true==false){resetDeal}

//S
if (true==false){scoopTrick}
if (true==false){showContract}
if (true==false){showScoreModal}
if (true==false){showBackCard}
if (true==false){startPlay}
if (true==false){sweepCard}
if (true==false){showScoreCircle}
if (true==false){showTrickControls}

//T
if (true==false){test}
if (true==false){testRun}

if (true==false){takeBackTrick}
if (true==false){trickOver}
//U
//V
//W
if (true==false){wrapWinningCard}
if (true==false){westLeadBtn}



//*GLOBAL VARIABLES
var zIndexCounter=1;
var deck;
var cd; // current card
const PLAY_TO_CENTRE_SPEED = 1000;   // ms
const COLLECT_TRICK_SPEED = 300;     // ms




//*
window.flag=false;
window.counter=0
window.nextTrickNumber=0
window.MCCCounter=0
let autoPlay =false ;
let startPlayCounter=0
flag=false;
let fullDisplay=false;
let trickCollected=false;
let moveCardToCentreCounter =0
const debugFastPlay=true
const beenInCollectTrick=false;
var scoopTrickGuard = false;
var showBackCardGuard=false;
var sweepCardGuard=false;
var loadJSONGuard=false;
var nextTrickGuard=false;
var showScoreCircleGuard=false;
var handOverGuard=false;
var pauseGuard=false;
var fileBeenLoadedGuard=false;
var startPlayGuard=false
window.handIsOver=false;
let restoringTrick=false; 
var noBoxes = true;
var loadFileGuard = false;
var playGhostCardGuardPlayed = false;
var pauseCounter=0
var trickOverCounter=0
var trickOverRunning=false
var scoreTrickCounter=0
var scoopTrickCounter=0
var showBackCardCounter=0
var sweepCardCounter=0
var nextTrickCounter = 0
var devCounter=0
var noClicking=false
var timeToLead = false;
//*GLOBAL ARRAYS
const settings = {
    autoCollect: true,
    clickToCollect: false,
    collectDelay: 2000,
    animationSpeed: 1000,
    cardScale: 1.0,
    tableTheme: "green"
};
let rafIDs =[];
let timeoutIDs = [];
var Tricks = [];
var Scores = [];
var Deals = [];
let Players =[];
var Files = [];
var dealLibrary=[]
var suitsPlayed=[]
var showCards=false;
const playerNames =["South","West","North","East"]
const suitNames=["Spades","Hearts","Diamonds","Clubs"]
let tempAutos =[]
let southTempAuto=[]
let westTempAuto=[]
let northTempAuto =[]

let eastTempAuto=[]
tempAutos.push(southTempAuto)
tempAutos.push(westTempAuto)
tempAutos.push(northTempAuto)
tempAutos.push(eastTempAuto)
var suitDict={}
suitDict["S"]="Spade"
suitDict["H"]="Heart"
suitDict["D"]="Diamond"
suitDict["N"]="No Trump"
suitDict["C"]="Club"


// document.getElementById('flagBtn').addEventListener('click',function(){
//   flag=!flag
//   this.textContent=String (flag)

document.getElementById('nextTrickBtn').addEventListener('click', () => {
    clearTabledCards();
});

function testFunction(){
}
 
function takeBackTrick(){
  restoringTrick=true
  let tbtTempList = Players[1].leads
  let TL = Tricks.length
  let trk = Tricks[Tricks.length - 1];
  let scr=Scores[Scores.length-1]
  if (trk.winningPlayer % 2 === 0) {
    // East‑West
    scr.eastWestTricks -= 1;
} else {
    // North‑South
    scr.northSouthTricks -= 1;
}
let crds = trk.cardArray;   // array of Card objects
crds.forEach(crd => {
    Players[crd.holderNumber].addCard(crd.cardNumber);
});

//replace west_leads and east-leads
let theDeal =Deals[Deals.length-1]
crds.forEach(crd=>{
  let x =crd.cardNumber
  if (theDeal.west_leads.includes(x)){
    Players[crd.holderNumber].leads.unshift(x)
  }

})

// Remove any DOM elements for the cards that were played
crds.forEach(crd => {
    const el = document.getElementById(`card-${crd.cardNumber}-${crd.holderNumber}`);    if (el) el.remove();
});


clearTabledCards();
clearDisplayedCards();
Players[0].displayHand()
Players[1].displayHand()
Players[2].displayHand()
Players[3].displayHand()
Tricks.pop()
TL =Tricks.length
let leader = 0 
if (TL==0) {
  leader = 1
}
else
{
leader=Tricks[TL-1].winningPlayer
}


let trk1 = new Trick(leader);
Tricks.push(trk1)
var last = Tricks.length-1;
		var testNumber = Tricks[last].toPlay;
restoringTrick=false

newContinuePlay()

}





document.getElementById('doubleDummy').addEventListener('click',function(){
  showCards=true;
  enterTeachingMode()
  reLoadLastDeal()
})

document.getElementById('takeBackBtn').addEventListener('click',function(){
  takeBackTrick()
})


testRunButton=document.getElementById('testBtn')
testRunButton.addEventListener('click',function(){
  testRun()
})

flagButton = document.getElementById('flagBtn')
flagButton.addEventListener('click', function() {
  flag = !flag;
  this.textContent = String(flag);
});

document.addEventListener("DOMContentLoaded", function() {
  domLoadfunc()
  eventHandlersFunc()
  showLibraryScreen()
 
});
let autoPlayButton =document.getElementById("watchAutoPlay")
autoPlayButton.addEventListener("click",function(){
  autoPlay=true
  showCards=true
  enterTeachingMode()
  reLoadLastDeal()

})

let replayDealButton=document.getElementById("replayDealButton")
replayDealButton.addEventListener("click",function(){
  reLoadLastDeal()
})
 let nextDealButton=document.getElementById("nextDealButton")
        nextDealButton.addEventListener("click",function(){
          if (autoPlay){
            autoPlay=false
          }
          resetDeal()
          nextDeal()
        })

function populateLibraryTable() {
  
  const tableBody = document.getElementById("libraryTableBody");
  tableBody.innerHTML = ""; // clear existing rows


  libDeals.forEach((hand, index) => {
    const row = document.createElement("tr");
    
    

    row.innerHTML = `
      <td>${hand.name}</td>
      <td>${hand.description}</td>
      <td>${hand.reference}</td>
    `;

    // Make the row clickable
    row.addEventListener("click", () => {
      load_DealFromLibrary(index);
    });

    tableBody.appendChild(row);
  });
}


function showLibraryScreen() {
  const libraryOverlay = document.getElementById("libraryOverlay");
  libraryOverlay.classList.remove("hidden");
  populateLibraryTable();
}
function hideWelcomeScreen() {
  const welcomeOverlay = document.getElementById("welcomeOverlay");
  document.getElementById("welcomeOverlay").style.display = "none";
  welcomeOverlay.classList.remove("modal");
  welcomeOverlay.classList.add("hidden");   
}


function clearPlayedCards() {
      const cardsToRemove = document.querySelectorAll(".tabledCard");
      cardsToRemove.forEach(card => {
      card.remove();
   
      });
  }

function clearDisplayedCards(scoreMessage){
     const cardImages = document.querySelectorAll('.playerCard');
      cardImages.forEach(image => image.remove());

    const cardBacks=document.querySelectorAll('.cardBack')
    cardBacks.forEach(image=>image.remove())

}

function returnToLibrary(){

  document.getElementById("scoreOverlay").classList.add("hidden");
  document.getElementById("libraryOverlay").classList.remove("hidden");
    document.getElementById("background-overlay").style.display = "none";   // ← add this

}

function showScoreModal(message){
  let theScoreMessage=message
let overlay=document.getElementById("background-overlay")
let scoreBox=document.getElementById("score-box")
let scoreContent=document.getElementById("scoreContent")

// scoreContent.innerHTML=theScoreMessage
  scoreContent.innerText = theScoreMessage; // update only the message text

overlay.style.display='flex'

};

function disableTrickButtons(){
   const controls = document.getElementById("trickControls");
    controls.style.pointerEvents = "none";
    controls.style.opacity = "0.5";
}

function enableTrickButtons() {
    const controls = document.getElementById("trickControls");
    controls.style.pointerEvents = "auto";
    controls.style.opacity = "1";
}

function enterTeachingMode() {
  console.log ('in enterTeaching')
    document.body.classList.add("teaching-mode");
}

function exitTeachingMode() {
    document.body.classList.remove("teaching-mode");
}


   
      
//FUNCTIONS RE THE PLAY OF THE HAND
function startPlay(){
  if (flag){
    flag=flag
  }

  if (startPlayGuard){return}
  startPlayGuard=true
  startPlayCounter+=1

  
  
 
  document.getElementById("contractScreenOverlay").classList.add("hidden");
  let dls=Deals.length-1
  suitsPlayed.length=0

 let a=Deals[dls].w_leads
  b=Players[1].leads

  Tricks.length=0
  cn =Players[1].leads.shift();
  a=Deals[dls].w_leads
   b=Players[1].leads

  
  
  var hn = 1;
  cd = new Card(cn, 1);

  let score = new Scorer();
  Scores.push(score);
  var trk = new Trick(1); 
  var leadSuit = cd.suit;
  trk.leadSuit = leadSuit;
  Tricks.push(trk); // push the trick

  document.querySelectorAll('.playerCard').forEach(img => img.offsetWidth);
// Force browser to register transitions for all cards
document.querySelectorAll('.playerCard, .tabledCard').forEach(img => {
    img.offsetWidth;   // layout flush
});
    document.getElementById("trickControls").classList.remove("hidden");
        disableTrickButtons();   // still unclickable until 4 cards are played
  playCard(cn, 1);

}





function removePlayerCard() {
  Players.forEach(player => {
    player.Suits.forEach(suit => {
      suit.length = 0; // Clears all items in the suit list
    }); // Added closing brace and semicolon for inner forEach
    player.fullHand.length = 0;
    player.leads.length = 0;
    player.discards.length = 0;
    player.partnerLeadSuit = "";
    player.myLeadSuit = "";
  }); // Added closing brace and semicolon for outer forEach
}

function playAgain(){
 
}





  
	

  // function scoreTrick(){
  //    var TL = Tricks.length - 1;
  //   let thisTrick=Tricks[Tricks.length-1]
  //   let winningCard = thisTrick.winningCardNumber
  //   let winningPlayer=thisTrick.winningPlayer

  // }

  async function nextTrick(){
    if (nextTrickGuard) return;
    nextTrickGuard=true
    if (flag==true){
      flag=flag
    }
  
    let TL = Tricks.length

     let winningPlayer=Tricks[Tricks.length-1].winningPlayer
      let trk=new Trick(winningPlayer)
      let wp = trk.onLead
      Tricks.push(trk)
      wp = Tricks[Tricks.length-1].winningPlayer
      nextTrickGuard=false;
      // newContinuePlay()

  }

  
  async function showScoreCircle(){
    if (showScoreCircleGuard) return
    showScoreCircleGuard=true;
    if (flag==true){
      flag=flag
    }
          const scoreCircle=document.getElementById("score-circle")
          let NST =Scores[Scores.length-1].north_southTricks

    if (Scores[Scores.length-1].north_southTricks >0){
      const scoreNS=document.getElementById("score-ns")
      scoreNS.style.display="block"
    }
    let EWT =Scores[Scores.length-1].east_westTricks
    if (Scores[Scores.length-1].east_westTricks>0){
      const scoreEW=document.getElementById("score-ew")
      scoreEW.style.display="block"
    }
    
showScoreCircleGuard=false;
  }



 async function trickOver(){
 


  if (flag==true){
    flag=flag
  }
  if (trickOverRunning){return} ;
    trickOverRunning=true
      //noClicking=true
      South.canclick=false;
			North.canclick=false;
      let winningCardNumber = Tricks[Tricks.length-1].winningCardNumber
      let winner =Tricks[Tricks.length-1].winningPlayer
   let trickCount=Tricks.length
   const thisTrick=Tricks[trickCount-1]
   const cdArray=thisTrick.cardArray
   const cardCount=cdArray.length
   if (!Array.isArray(thisTrick.cardArray) || thisTrick.cardArray.length===0){
    return
   }
   if (!Array.isArray(Scores)) {
    console.log('no Scores Array')
   }
     let delay = 500
     let noDelay =0
   let counter=0
	
 
     var TL = Tricks.length - 1;
    let winningCard = thisTrick.winningCardNumber
    let winningPlayer=thisTrick.winningPlayer
	  const theScore=Scores[Scores.length-1]

    if (typeof theScore.scoreTrick==="function"){

      theScore.scoreTrick(winningPlayer)
    }
    
    postTrickScore() 
    await pause (noDelay)
   


    nextTrick()
    trickOverRunning=false
    newContinuePlay()
  }

function postTrickScore(){
  return;



  let nsTricks=0
  let ewTricks=0
  let scr =Scores[Scores.length-1]
  nsTricks=scr.north_southTricks
  ewTricks=scr.east_westTricks
  let nposter =document.getElementById("nsTricks")
  nposter.classList.remove("hidden")
  let eposter  =document.getElementById("ewTricks")
  eposter.classList.remove("hidden")
  nposter.textContent="N-S Tricks: "+nsTricks
  eposter.textContent="E-W Tricks: "+ewTricks
 
}
//LOAD LAST FILE

function loadLastHand(fileName){
//Clear the Screen
//Clear tabled cards
const cardsToRemove = document.querySelectorAll(".tabledCard");
    cardsToRemove.forEach((card) => {
      card.remove();
    });

//clear player cards
const playerCards = document.querySelectorAll(".tabledCard");
    playerCards.forEach((card) => {
      card.remove();
    });

for(let player of Players){
  player.clearData();
}

  const data = Files[Files.length-1].data;

//Paste starts

for (var i= 0; i< data.south_cards.length; i++)
          {
            Players[0].addCard(data.south_cards[i])
          }
          for(var j =0; j<data.west_cards.length; j++){
            Players[1].addCard(data.west_cards[j])
          }
          for (var k= 0; k< data.north_cards.length; k++)
          {
            Players[2].addCard(data.north_cards[k])
          }
          for(var m =0; m<data.east_cards.length; m++){
            Players[3].addCard(data.east_cards[m])
          }
          console.log(data.west_leads)
          for (var wl = 0; wl<data.west_leads.length;wl++){
            Players[1].leads.push(data.west_leads[wl])
          }
          console.log (Players[1].leads)
          deal=new Deal(data.name)
          Deals.push(deal)

          var dls = Deals.length-1
          if (dls == -1){dls=0}
         
          var vc = data.contract;
          Deals[dls].bidSuit = vc[2];
          Deals[dls].contract = parseInt(vc[0])

          

          Players[0].displayHand()
          Players[1].displayHand()
          Players[2].displayHand()
          Players[3].displayHand()

         }

       

function load_DealFromLibrary(dealIndex){
  if (flag){
    flag=flag
  }
    
            const dealData=libDeals[dealIndex]
            let deal = new Deal(dealData)
            
            Deals.push(deal)
            let thedeal=Deals[Deals.length-1]
            let score = new Scorer()
            Scores.push(score)
            document.getElementById('libraryOverlay').classList.add('hidden');
            closeAllModals()
            exitTeachingMode()
            
          

            populateGame(thedeal)            
            displayCards()
            showContract()


  }



// LOAD SELECTED FILE

  
    


          function resetGameState(){
            Tricks.length=0;

            for (let player of Players) {
        for (let suitList of player.Suits) {
            suitList.length = 0; // Clear each suit list
        }
        // If there's a fullHand or other lists, clear those as well
        if (player.fullHand) {
            player.fullHand.length = 0;
        }
        // Reset leads or other properties if necessary
        if (player.leads) {
            player.leads = [];
        }
    }

          }

       
        

        
          

          //document.getElementById("contract").textContent=contemp;

       
function scoopTrick(){
  const cards = document.querySelectorAll(".tabledCards");

    // Determine winner partnership: 0 = NS, 1 = EW
    let winner = Tricks[Tricks.length - 1].winner

    // Target positions for the trick
    const trickTargets = {
        0: { left: "calc(100% - 120px)", top: "calc(100% - 160px)" }, // NS
        1: { left: "20px", top: "calc(100% - 160px)" }                // EW
    };

    const { left, top } = trickTargets[winner];

    // Animate each tabled card to the target
    cards.forEach(card => {
        card.style.left = left;
        card.style.top = top;
        card.style.transform = "scale(0.5)";
        card.classList.remove("tabledCards"); // optional: prevent re-clearing
    });
    hideTrickControls()
}


async function oldScoopTrick(){
  if (scoopTrickGuard) return;
  scoopTrickGuard=true;
  if (flag==true){
    flag=flag
  }
  let TL =Tricks.length
  TL=TL-1
    let winningCardNumber=Tricks[TL].winningCardNumber

const tabledCards = Array.from(document.getElementsByClassName("tabledCard"));
let poop =tabledCards.length

  // Reset all cards rotation
  tabledCards.forEach(card => {
    card.style.transform = 'rotate(0deg)';
  });

  for (const card of tabledCards) {

   
   
  if (card.getAttribute('cardNumber')===String(winningCardNumber)){
        card.style.zIndex= 999;
      }
      else{
        card.style.zIndex=1;
      }
  }


  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  let z = zIndexCounter;

  // Sort so winning card is last
  tabledCards.sort((a, b) => {
    const aWin = a.getAttribute("cardNumber") === String(winningCardNumber);
    const bWin = b.getAttribute("cardNumber") === String(winningCardNumber);
    return aWin ? 1 : bWin ? -1 : 0;
  });

  

  // Animate each card into the center
  for (const card of tabledCards) {
    // Set transition
    card.style.transition = "all 0.2s ease-in-out";

   

    // Create a Promise that resolves after transition ends
    await new Promise(resolve => {
      // Set an event listener for the transition end
      function handleTransitionEnd() {
        card.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      }
      card.addEventListener('transitionend', handleTransitionEnd);

      // Trigger the transition by changing left/top/zIndex/transform if needed
       card.style.left = `${centerX}px`;
      card.style.top = `${centerY }px`;
    });
   
  }
scoopTrickGuard=false;
}

// 
async function showBackCard(){

  
  if (showBackCardGuard) return;
  showBackCardGuard=true;
	const pileTopCard=document.querySelector('.tabledCard')
  if (!pileTopCard){return}

	const pileRect=pileTopCard.getBoundingClientRect()
	const backSrc="_Red_back.jpg"
		document.querySelectorAll('.tabledCard').forEach(card => card.remove())
	replacementCard=document.createElement('img')
	replacementCard.src=backSrc
	replacementCard.classList.add('replacementCard')
	document.body.appendChild(replacementCard)
	replacementCard.style.position='absolute';
	replacementCard.style.left=`${pileRect.left}px`;
	replacementCard.style.top=`${pileRect.top}px`;
	replacementCard.style.width = '85px';
	replacementCard.style.height = `120px`;
	replacementCard.style.zIndex = '1000';
  const cardElement = document.querySelector('.replacementCard')
showBackCardGuard=false;
}

async function sweepCard(){
  if (sweepCardGuard) return;
  sweepCardGuard=true;
 
  const card = document.querySelector('.replacementCard');
  if (!card) return;

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  let targetX,targetY
  let winningPlayer=Tricks[Tricks.length-1].winningPlayer

  // Set up initial styles for transition
  card.style.transition = 'transform 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out';
  card.style.transformOrigin = 'center center';

  // Calculate target position (bottom-right corner with some margin)
  if (winningPlayer%2==0) {

  
   targetX = viewportWidth - 100; // adjust as needed
   targetY = viewportHeight - 100; // adjust as needed
  }
  else {
 targetX=100
 targetY=viewportHeight-100

  }


  // Get current position of the card
  const rect = card.getBoundingClientRect();
  const currentX = rect.left + rect.width / 2;
  const currentY = rect.top + rect.height / 2;

  // Calculate translation
  const deltaX = targetX - currentX;
  const deltaY = targetY - currentY;

  // Apply transform and shrink
  card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.7)`;
  card.style.zIndex = '100'; // ensure it's on top during animation

  // northsouthTricks=0
 


  safeSetTimeout(() => {
  card.classList.remove("replacementCard");
}, 2000); // after animation completes
noClicking=false
if (Tricks.length !=13)
  {
sweepCardGuard=false}
else{
  handOverGuard=true
}
  hideTrickControls()

}
function convertCard(value){
  cd = new Card(value,0)
  return cd.face
}
function safeRAF(fn) {
    const id = requestAnimationFrame(fn);
    rafIDs.push(id);
    return id;
}

 function closeAllModals(){
  // document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('contractScreenOverlay').style.display = 'none';

} 


async function loadJSON(fileToGet){
  console.log ('in load JSON')
  if (loadJSONGuard) return
  const response = await fetch(fileToGet)
  if(!response.ok)
  {
    console.log("Response not ok")
  }
  const dat = await response.json();
  loadJSONGuard=false
  return dat;
}


//START OF STRUCTURED FUNCTION SECTION
function eventHandlersFunc(){


  

  }
    // const file = fileInput.files[0];
    // const reader = new FileReader();


  

 






function domLoadfunc(){
   Deals=[];
   East = new Player("East","East");
   West = new Player("West","West");
   North = new Player ("North","North");
   South = new Player ("South","South");
   Players.push(South);
   Players.push(West);
   Players.push(North);
   Players.push(East);

}

function resetDeal() {
  handOverGuard=false
	let temp = Deals.length
	document.getElementById("scoreOverlay").classList.add("hidden");
    // 1. Cancel ALL async callbacks (removes closure references)
    timeoutIDs.forEach(id => clearTimeout(id));
    timeoutIDs = [];

    rafIDs.forEach(id => cancelAnimationFrame(id));
    rafIDs = [];

    // 2. Remove ALL card DOM nodes (removes DOM references)
    const container = document.getElementById("imageContainer");
    container.querySelectorAll("img").forEach(img => img.remove());

    // 3. Remove ALL event listeners by cloning any remaining nodes
    // (safety net — should be empty after removal above)
    container.querySelectorAll("*").forEach(node => {
        node.replaceWith(node.cloneNode(true));
    });

    // 4. Clear ALL game-state references to cards
    // (removes Card objects, Trick objects, hand arrays)
    Tricks.length = 0;

    Players.forEach(player => {
        player.hand = [];          // remove card references
        if (player.clearHand) {
            player.clearHand();    // if your class does extra cleanup
        }
    });

    // 5. Clear any other global state that may reference cards
    Scores.pop();
    noClicking = false;
    South.canclick = false;
    North.canclick = false;

    // 6. Force layout reflow (flushes browser rendering pipeline)
    void container.offsetHeight;

    // 7. Rebuild the deal from scratch

}

function reLoadLastDeal(){
  if (flag==true){
    flag=flag
  }

devCounter+=1
  resetDeal()
  console.log("afterResetDeal")
 
  

  if (flag){
    flag=flag
  }

 let DL = Deals.length
  lastDealNum=Deals.length-1

  const theDeal =Deals[lastDealNum]
 


  Players.length=0;

   let East = new Player("East","East");
   let West = new Player("West","West");
   let North = new Player ("North","North");
   let South = new Player ("South","South");
    let score = new Scorer()
          Scores.push(score)
   Players.push(South);
   Players.push(West);
   Players.push(North);
   Players.push(East);

  
           populateGame(theDeal)            
           displayCards()
           showContract()
}


function loadSelectedFile(jsonData){


  if (fileBeenLoadedGuard===true) {return};
  fileBeenLoadedGuard = true;

  const deal = new Deal(jsonData);
  Deals.push(deal)
  thedeal=Deals[Deals.length-1]

   let score = new Scorer()
          Scores.push(score)


  

         
          

            populateGame(thedeal)            
            displayCards()
            showContract()
}
  

function populateGame(deal){

if (flag){
  flag=flag
}




       

          for (var i= 0; i< deal.south_cards.length; i++)
          {
            Players[0].addCard(deal.south_cards[i])
          }
          for(var j =0; j<deal.west_cards.length; j++){
            Players[1].addCard(deal.west_cards[j])
          }
          for (var k= 0; k< deal.north_cards.length; k++)
          {
            Players[2].addCard(deal.north_cards[k])
          }
          for(var m =0; m<deal.east_cards.length; m++){
            Players[3].addCard(deal.east_cards[m])
          }
         Players[1].leads=deal.w_leads.slice()
         Players[3].leads=deal.e_leads.slice()
         letnorthCards=Players[2].fullHand
         Players[0].autoList=deal.southAuto;
         Players[1].autoList=deal.westAuto;
         Players[2].autoList=deal.northAuto;
         Players[3].autoList=deal.eastAuto; 

         


        }
    function showModal(id) {
 document.getElementById(id).classList.remove("hidden"); 
 switch (id) {
  case 'welcomeOverlay':
    document.getElementById(id).classList.add("modal");
    break;
  case 'libraryOverlay':
    document.getElementById(id).classList.add("modal");
    break;
  case 'contractScreenOverlay':
    document.getElementById(id).classList.add("modal");
    break;
  case 'scoreOverlay':
    let theMessage=Scores[Scores.length-1].message
    document.getElementById('scoreMessage').innerText = theMessage;
    break
 } 
  }
 function hideModal(id) { 
 document.getElementById(id).classList.add("hidden"); 
 }


   function displayCards(){

    if (flag){
      flag=flag
    }
    let somen = Players[0].name
    let women=Players[1].name
    let nomen=Players[2].name
    let eomen=Players[3].name 
          Players[0].displayHand()//It jumps to this spot
          Players[1].displayHand()
          Players[2].displayHand()
          Players[3].displayHand()
          // showContract()

}

function showContract(){
let c=Deals[Deals.length-1].contractMessage;
document.getElementById('contractText').innerText = c;
const overlay =document.getElementById('contractScreenOverlay')
overlay.classList.remove('hidden')
overlay.style.display='flex'
const starter =document.getElementById('westLeadBtn')
starter.addEventListener('click',westLeadBtnFunc)
}


function westLeadBtnFunc(){
  
closeAllModals()
if (flag){
  flag=flag
}
contractLabel = document.getElementById("contractLabel")  
let c = Deals[Deals.length-1].contract
let theContract=Deals[Deals.length-1].getContract()
contractLabel.innerText =c
startPlayGuard=false
startPlay()
}


//FUNCTIONS FOR THE PLAY OF THE HAND
// These are in routines.js
// continuePlay() is invoked after every card play. 
// It checks if the trick is over or hand is over and acts accordingly.
//HandOver() is invoked when the hand is over.
//TrickOver() is invoked when the trick is over.
// If neither handover nor trickover, it allows the next player to play, 
// if North or South, user can click the card
// if East or West the routines in Defence are used. either human or ghost.



function openButtonFunc(){
  const fileinput=document.getElementById('fileInput')
const file=fileinput.files[0]
const reader=new FileReader()
reader.onload=function(e){
  const content=e.target.result
  document.getElementById('fileContent').textContent=content
}
reader.readAsText(file)

}


function playAgain(){
 document.getElementById('scoreOverlay').style.display='none'

clearDisplayedCards()
clearPlayedCards()
removePlayerCard()
  populateGame(currentGameData);

}