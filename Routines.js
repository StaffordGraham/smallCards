// const { resolve } = require("path")

if (true==false){newContinuePlay}
if (true==false){dfplay}
if (true==false){cardsInSuit}
if (true==false){playCard}
if (true==false){cardImageonTable}
if(true===false){moveCardToCentre}
if (true==false){suitFromCardNumber}
if (true===false){suitNumberFromCardNumber}
if (true==false){properFollow}
if (true==false){interesection}
if (true==false){noRevoke}
if (true ==false)[suitFromCardNumber]
if (true==false){areWeWinning}
if (true ==false){ImVoid}
if (true==false){shouldITrump}
if (true==false){whichTrump}
if (true==false) showBackCard
if (true==false){scoopTrick}
if (true==false){nextCard}
if (true==false){collectTrick}
if (true==false){handOver}
if (true==false){trickOver}
if (true==false){pause(1)}
if (true==false){nextCard}
if (true===false){voidInSuit}
if (true===false){clearTabledCards}
if (true===false){computeLayoutMetrics}
if (true==false){nextDeal}
if (true==false){testRun}
if(true==false){clearTheBoard}
if(true==false){replayDeal}
if (true===false){resetDeal}
if (true==false){clearTheBoard}
if (true==false){nextCard}


function testRun(){
	const labels=["southAuto","westAuto","northAuto","eastAuto"]
for (let i = 0; i < tempAutos.length; i++) {
	let identifier =playerNames[i]+"auto"
    console.log(`"${labels[i]}": [${tempAutos[i].join(", ")}],`);}


}


	function pointArrow(){
	return
	nowTp=Tricks[Tricks.length-1].toPlay
	const arrow =document.getElementById("arrow");
	arrow.classList.remove("north","south")

	switch (nowTp){

		case 0:
			arrow.classList.add("south");
			break
		case 2:
			arrow.classList.add("north")
			break
		

	}


	}

function  computeLayoutMetrics() {
	const imageContainer=document.getElementById("imageContainer")

	const rect = imageContainer.getBoundingClientRect();
	const cardWidth = Math.max(60,rect.width * .07 );
	const cardHeight = cardWidth * 1.4; // preserves aspect ratio
	const overlap = cardWidth * 0.3; // 30% overlap for fans
	const topMargin = cardHeight * 0.1;
	const bottomMargin = cardHeight * 0.1;
	const northOffset = cardHeight * 0.05
	const southOffset = cardHeight * 0.05
	
	return { rect, cardWidth, cardHeight, overlap, topMargin, bottomMargin, northOffset, southOffset };

	 }

function selectLead(player) {
  if (flag == true) {
    flag = flag;
  }
PN = Tricks[Tricks.length-1].toPlay
  let cn = 0;

  if (Players[PN].leads.length > 0) {
    cn = Players[PN].leads.shift();
  } else {
    cn = loopThroughSuitsForLead(player);
  }
  return cn;
}//end selectLead



function showAllCards()
{
}
function dfplay(){//start dfplay
	if (flag==true){
		flag=flag
	}
	let cn = 0
	let Suits=['S','H','D','C']

	let firstTrick=false
	let firstCardInTrick=false
	if (Tricks[Tricks.length-1].cardArray.length==0)
	{
		firstCardInTrick=true
	}
	let TL = Tricks.length-1
	if (TL==0){firstTrick=true}
	let position =Tricks[TL].cardArray.length
	let trumpSuit = Tricks[TL].trumpSuit
	let trumpAway=false
	let PN = Tricks[TL].toPlay
	let SN=Suits.indexOf(Tricks[TL].leadSuit)
	if (!firstCardInTrick)
		{
			iCanFollow=canIfollow()
			trumpAway=shouldITrump()


		}
	

	

	switch (position){
	case 0:
		cn=selectLead()
		break;
	default:

		if (iCanFollow)
			{
				cn=followSuit(PN)
			}
		else
		if (trumpAway){
			cn=playTrump()
		}
		else
		{cn=discard()}
}
return cn

}




//  newContinuePlay()
	








function tabledCardsRemove(){
	    const cardsToRemove = document.querySelectorAll(".tabledCard");
		cardsToRemove.forEach((card) => {
      		card.remove();
   		 });

}


function whichTrump(Player,trump)
{
	
	if (flag==true)
	{flag=flag}
	
	var Answer=100
	var nowTp = Tricks[Tricks.length-1].toPlay;
	 if (nowTp==3)
	 	{
			Answer = lowestWinner(Player,trump)
		}
		else
		{
			Answer=highestWinner(Player,trump)
		}
		return Answer

}
function nextCard(){
	if (flag==true){
		flag=flag
	}

let cn = 0
let hn=0;
var last = Tricks.length-1;
		var testNumber = Tricks[last].toPlay;
let nowTp = Tricks[Tricks.length-1].toPlay;
hn=nowTp


					

				switch (nowTp){
				case 0:
					if (!autoPlay){
						South.canclick=true
						North.canclick=false
						return
					}else {
						South.canclick=false;
						North.canclick=false
						cn=Players[0].autoList.shift()
						trkNum=Tricks.length
					}
					break

				case 1:
					if (!autoPlay){
					cn=dfplay()
					}
					else {

					cn=Players[1].autoList.shift()
					}
		
					break
				case 2: 
				if (!autoPlay){
						South.canclick=false
						North.canclick=true
						return
				} else{
						trkNum=Tricks.length
						cn=Players[2].autoList.shift()
				}
						break
						
				
				case 3:
					if (!autoPlay){
						cn=dfplay()
					}
					else
						{
						cn=Players[3].autoList.shift()
						}
						break
				}
				// Delay before playing card
				safeSetTimeout(function(){
							playCard(cn,nowTp);
				},500);	
			}
			

				


				


					//end nextCard




function newContinuePlay(){
if (flag==true){
		flag=flag

	}	
if (!Array.isArray(Tricks)) {
        return;
    }

if (!Array.isArray(Tricks) || Tricks.length === 0) {
    westLeadBtnFunc();
}
if (Tricks.length === 0) {
        if (restoringTrick) {
           
            const trk = new Trick(1);
            Tricks.push(trk);
            restoringTrick = false;   
        } else {
            // Normal start of a hand
            westLeadBtnFunc();
            return;
        }
	}

	

//Variables
	let trickCount=Tricks.length
	let cardCount =Tricks[Tricks.length-1].cardArray.length
	if (cardCount==4 && !trickCollected){
		return
	}

if (flag){
	flag=flag
}
	if(trickCount>=13 && cardCount==4){
		if (handOverGuard===false){
			handOver()
			return
		}
	}
	if(cardCount==4){
		trickOver()
	}
	else
	{
		var last = Tricks.length-1;
		var testNumber = Tricks[last].toPlay;
		nextCard()
	}
	

}//end newContinuePlay

	
	function clearTheBoard(){
	const container = document.getElementById("imageContainer");

	document.querySelectorAll(".playerCard, .tabledCard").forEach(img => {
    img.replaceWith(img.cloneNode(true));
});
container.querySelectorAll(".collectedCard").forEach(img => {
    img.replaceWith(img.cloneNode(true)); // remove listeners
    img.remove();                         // remove from DOM
});

container.querySelectorAll(".trickDot").forEach(dot => {
    dot.replaceWith(dot.cloneNode(true));
});

	document.getElementById("nsTricks").classList.add("hidden");
	document.getElementById("ewTricks").classList.add("hidden");
	document.getElementById("scoreOverlay").classList.add("hidden")
	let containerLength =document.querySelectorAll("#imageContainer img").length
	
	}

	function nextDeal(){
		clearTheBoard()
	    showLibraryScreen()
	
}


	

	clearTheBoard()
	const container = document.getElementById("imageContainer");
	container.querySelectorAll("img").forEach(img => {
    img.replaceWith(img.cloneNode(true));  // removes all listeners
});


	document.querySelectorAll(".playerCard, .tabledCard").forEach(img => {
    img.replaceWith(img.cloneNode(true));
});


timeoutIDs.forEach(id => clearTimeout(id));
timeoutIDs = [];
rafIDs.forEach(id => cancelAnimationFrame(id));
	rafIDs=[]
 rafIDsLength=rafIDs.length
 timeoutIDsLength=timeoutIDs.length
rafIDsLength=rafIDs.length

	Scores.pop()
	Tricks.length=0
	Players.forEach(player=>player.clearHand())
	document.getElementById("contractLabel").textContent = "";
	void document.getElementById("imageContainer").offsetHeight
	 timeoutIDsLength=timeoutIDs.length
	 rafIDsLength=rafIDs.length




	


function safeSetTimeout(fn,ms){
	  const id = setTimeout(fn, ms);
    timeoutIDs.push(id);
    return id;
}
   function cardsInSuit(holderNumber, suit) {//Start cardsInSuit
  holderNumber = parseInt(holderNumber);
  const players = {
    0: South,
    1: West,
    2: North,
    3: East
  };

 

  const player = players[holderNumber];
  
  if (!player) {
    // Handle invalid holderNumber
    return 0;
  }

  switch (suit) {
    case 'S':
      return player.Spades.length;
    case 'H':
      return player.Hearts.length;
    case 'D':
      return player.Diamonds.length;
    case 'C':
      return player.Clubs.length;
    default:
      // Handle invalid suit
      return 0;
  }
}
//End cardsInSuit

//Start doNothing








function winnerOnTop(){
	let cn =Tricks[Tricks.length-1].winner

}


	
		

	 // end is it holderNumber's turn to play
/************************** */
//code to place the image of the card on the table. This is duplicate of code at 912
// function cardImageonTable(cardNumber,holderNumber){
// 	 let left=0
// 	 switch(holderNumber){
// 		case 3:
// 			left = window.innerWidth-40
// 			break;
// 		case 1:
// 			left = 40
// 			break;
// 	 }
// 	 let ttop=window.innerHeight/2
// 	let crd=new Card(cardNumber,holderNumber)
// 	let pimage = new Image();
// 		pimage.className="playerCard";
// 		pimage.id =crd.name;
// 		pimage.src=crd.src;
// 		pimage.alt="playerCard";
// 		pimage.setAttribute('cardNumber',crd.cardNumber);
// 		pimage.setAttribute('holderNumber',holderNumber);
// 		pimage.setAttribute('collect','collect')
// 		pimage.style.width="85px";
// 		pimage.style.height="120px";
// 		pimage.style.position='absolute';
// 		pimage.style.left = left+"px";
// 		pimage.style.top =ttop +"px";
// 		imageContainer.appendChild(pimage);
// }



// ************************************
// code to 'play' the card and move to the centre of the table




		// const players = {
		// 	0: South,
		// 	1: West,
		// 	2: North,
		// 	3: East
		// };

		
				
			
		
 
		
		

function removeCardFromHand(cardNumber,holderNumber){
	if (flag){
		flag=flag
	}
			Players[holderNumber].removeCard(cardNumber,holderNumber);
			Players[holderNumber].removeCardBack()
}



		
		//end switch
	



		function addCardToTrick(cardNumber,holderNumber){

		console.log('In addCardToTrick with',cardNumber,holderNumber)
		var tricksLength = Tricks.length-1;
		var cd = new Card(cardNumber,holderNumber);		
		let testName=cd.name
		Tricks[tricksLength-1].addCard(cd);

		
		
		
		
	}
	
	function computeWestMetrics(){

	const rect = imageContainer.getBoundingClientRect();
	const cardWidth = Math.max(60,rect.width * .06 );
	const cardHeight = cardWidth * 1.4; // preserves aspect ratio
	const overlap = cardWidth * 0.3; // 30% overlap for fans
	const topMargin = cardHeight * 0.1;
	const bottomMargin = cardHeight * 0.1;
	const northOffset = cardHeight * 0.05
	const southOffset = cardHeight * 0.05
	
	return { rect, cardWidth, cardHeight, overlap, topMargin, bottomMargin, northOffset, southOffset };

	 }
	

		
		

	async  function  playCard(cardNumber, holderNumber) {//start playCard

		
		if(flag){
			flag=flag
		}
		
		let cd = new Card(cardNumber,holderNumber);

		
		if (noClicking==true)
		{return}
		zIndexCounter=0; 
		let cardsPlaye=Tricks[Tricks.length-1].cardArray.length
	 		
	 if(Tricks[Tricks.length-1].cardArray.length ==0)
	 {
	Tricks[Tricks.length-1].leadSuit = cd.suit;
	 }
		
		holderNumber = +holderNumber;
		cardNumber= +cardNumber;
		var last = Tricks.length-1;
		var testNumber = Tricks[last].toPlay;
		
		if (holderNumber != testNumber){// is it holderNumber's turn to play
			
			return;

	 }
	 var theLeadSuit = Tricks[Tricks.length-1].leadSuit;
	 var vIS=voidInSuit(cardNumber,holderNumber)
	 var theSuit = cd.suit;
	// if Player is not following suit
	 if (theSuit !=theLeadSuit && vIS){
		return
	 }
	 let crd=new Card(cardNumber,holderNumber)
	 Tricks[Tricks.length-1].addCard(crd);
	
	const imageContainer=document.getElementById("imageContainer")
if (flag){
	flag=flag
}

	const metrics=Players[holderNumber].computeLayoutMetrics(imageContainer)
	const pos =calcCentrePositions(holderNumber)

	if (holderNumber%2==1){
		defenderCardonTable(metrics,cardNumber,holderNumber)

	}
	else{
		cardImageonTable(metrics, cardNumber, holderNumber);

	}
	removeCardFromHand(cardNumber,holderNumber)
	 South.canclick = false; 
		  North.canclick = false; 
		  noClicking = false; 

	await moveCardToCentre(pos, cardNumber,holderNumber)

	
	changeEventListeners(cardNumber,holderNumber)

	
		
		tempAutos[holderNumber].push(cardNumber)
		if (Tricks[Tricks.length-1].cardArray.length==4)
		{
					enableTrickButtons()

			
			
		}
		  newContinuePlay(); 
	
	 
		 
	 //End playCard function
	}






		
	
	 function properFollow(cardNumber,holderNumber){
	
		//If it is the first card in the trick, the issue not arise
		var last = Tricks.length-1;
		var testing = Tricks[last].cardArray.length;
		if (testing ==0){
			return true;
		}
	
		
		var theSuit = cd.suit;
	
		var theLeadSuit = Tricks[Tricks.length-1].leadSuit;
		
		if( theSuit ==theLeadSuit)
		{return true}
		if (doIHaveCardInSuit(theLeadSuit,holderNumber))
		
			
				var bb = this.doIHaveCardInSuit(theLeadSuit,holderNumber);

			//	if (this.doIHaveCardInSuit(theLeadSuit,holderNumber)==false ){
				//return true;}
				//else {return false;}

			}
			
		
function voidInSuit(cardNumber, holderNumber) {
    let theSuit = suitNumberFromCardNumber(cardNumber);
    let lengo = theSuit.length;

    if (lengo === 0) {
        return true;
    } else {
        return false;
    }
}

		 
		
	

	function suitNumberFromCardNumber(cardNumber){//start Function suitNumberFromCardNumber
		var suitNum = Math.floor(cardNumber/13);
		return suitNum;
	}//end function suitNumberFromCardNumber
	
	 function suitFromCardNumber(cardNumber){//start Function suitFromCardNumber
		
		var suets= ['S','H','D','C'];
	
		var suitNumber = Math.floor(cardNumber/13);
		
		 var theAnswer= suets[suitNumber];

		 return theAnswer;
		
	}//end function suitFromCardNumber

	
		// Example JavaScript code to clear all player's cards from the screen



// Example button click event to trigger the clearPlayerCards function

	

	 function interesection(){//start intersection function
		var TL = Tricks.length-1
		if (Tricks[TL].cardArray.length ==3){//All players have played
			
			switch (Tricks.length){//start switch
				case 13://deal has been played
				//score the hand. 
				break;
				default:
					var TL = Tricks.length - 1;
					var latestTrick = Tricks[TL];
					latestTrick.findWinner();
					var winna = latestTrick.winner;
					var trk = new Trick(winna); // Winner of last trick is HolderNumber
					Tricks.push(trk);//the trick is pushed on to the Tricks array. 
					break;
			}//end switch
		} //end if
		
		else{
			// newContinuePlay();			
			
			}



		}//end all players have played

	



	//end intersection function
function pauseWait(milliseconds){//pauseWait
	var start = new Date().getTime();
	var end = start+milliseconds; 
	while(new Date().getTime()<end)
	{
		//do nothing just wait
	}

}//endpauseWait

function isTrump(cardNumber){//start isTrump
	var TL = Deals.length-1;
	var trump = Deals[TL].bidSuit;
	var suit = this.suitFromCardNumber(cardNumber);
	if (suit==trump)
	{
		return true
	}
	else
	{
		return false
	}
}//end isTrump

async function  handOver(){  

	
	
	if (flag===true){
		flag=flag
	}
	let winningPlayer=Tricks[Tricks.length-1].winningPlayer
      Scores[Scores.length-1].scoreTrick(winningPlayer)
    
	const theScore=Scores[Scores.length-1]
	const nstrics=Scores[Scores.length-1].north_southTricks
	const ewtrics=Scores[Scores.length-1].east_westTricks

	let delay = 10
   let counter=0
   

   let theMessage=Scores[Scores.length-1].scoreHand()

	
 
    
    await pause(2000)
    try {
          await scoopTrick()   
    }
    catch (err){
    }
    await pause(delay)
   
   await  showBackCard()
    // await pause(500)
    await sweepCard() 
    // nextTrick()


handOverGuard=true;
showModal('scoreOverlay')

}
 async function pause(ms){
	if (pauseGuard) return;
	pauseGuard=true

	await  new Promise(resolve => safeSetTimeout(resolve,ms));
	pauseGuard=false;
}
//start defenderCardonTable
function defenderCardonTable(metrics,cardNumber,holderNumber){
	

	 const { cardWidth, cardHeight } = metrics;

    const card = new Card(cardNumber, holderNumber);

    const div = document.createElement("div");
    div.className = "tabledCard card";

    div.setAttribute("data-rank", card.face);
    div.setAttribute("data-suit", card.suitSymbol);
    div.setAttribute("cardNumber", card.cardNumber);
    div.setAttribute("holderNumber", holderNumber);

    div.style.position = "absolute";
    div.style.width = cardWidth + "px";
    div.style.height = cardHeight + "px";

    // Defender starting positions
    let left, top;

    if (holderNumber === 1) { 
        // West
        left = metrics.rect.width * 0.05;
        top  = (metrics.rect.height / 2) - (cardHeight / 2);    } 
		else if (holderNumber === 3) { 
        // East
        left = metrics.rect.width * 0.90 - cardWidth;
        top  = metrics.rect.height * 0.40;
    }

    div.style.left = left + "px";
    div.style.top  = top  + "px";

    imageContainer.appendChild(div);


} // end defenderCardonTable

function cardImageonTable(metrics, cardNumber, holderNumber) {

    const { cardWidth, cardHeight } = metrics;

    const card = new Card(cardNumber, holderNumber);

    const div = document.createElement("div");
    div.className = "tabledCard card";

    div.setAttribute("data-rank", card.face);
    div.setAttribute("data-suit", card.suitSymbol);
    div.setAttribute("cardNumber", card.cardNumber);
    div.setAttribute("holderNumber", holderNumber);

    div.style.position = "absolute";
    div.style.width = cardWidth + "px";
    div.style.height = cardHeight + "px";

    // Start at the player's hand position
    const handCard = document.querySelector(
      ` .playerCard[cardNumber="${cardNumber}"][holderNumber="${holderNumber}"]`
    );

    if (handCard) {
        const rect = handCard.getBoundingClientRect();
        div.style.left = rect.left + "px";
        div.style.top = rect.top + "px";
    }

    imageContainer.appendChild(div);
}
		



// Called as: const pos = calcCentrePositions(holderNumber);
function calcCentrePositions(holderNumber) {
    const container = document.getElementById("imageContainer");
    if (!container) {
        return { left: 0, top: 0 };
    }

    const rect = container.getBoundingClientRect();

    const centreX = rect.width / 2;
    const centreY = rect.height / 2;

    // Approximate card size from your CSS: width: 12vw; height: 18vw
    const cardWidth  = rect.width * 0.12;
    const cardHeight = rect.width * 0.18;

    const offsets = {
        2: { dx: -cardWidth * 0.5, dy: -cardHeight * 1.0 }, // North
        3: { dx:  cardWidth * 0.5, dy: -cardHeight * 0.5 }, // East
        0: { dx: -cardWidth * 0.5, dy:  cardHeight * 0.2 }, // South
        1: { dx: -cardWidth * 1.0, dy: -cardHeight * 0.5 }  // West
    };

    const o = offsets[holderNumber] || { dx: 0, dy: 0 };

    return {
        left: centreX + o.dx,
        top:  centreY + o.dy
    };
}




function changeEventListeners(cardNumber, holderNumber) {

    // Only North/South have visible hand cards
    if (holderNumber % 2 === 1) return;   // West/East → skip entirely

    const card = document.querySelector(
        `.playerCard[cardNumber="${cardNumber}"][holderNumber="${holderNumber}"]`
    );

    if (!card) return;   // card already removed or not found

    card.classList.remove("playerCard");
    card.classList.add("tabledCard");

    card.addEventListener("dblclick", clearTabledCards);
    card.removeEventListener("click", Player.prototype.cardPlayEventListener);
}

function moveCardToCentre(pos, cardNumber, holderNumber) {
    return new Promise(resolve => {

        // Works for BOTH <img> and <div> cards
        const card = document.querySelector(
            `.tabledCard[cardNumber="${cardNumber}"][holderNumber="${holderNumber}"]`
        );

        if (!card) {
            console.warn("moveCardToCentre: no tabledCard found for", cardNumber);
            resolve();
            return;
        }

        function onEnd(e) {
            if (e.target !== card) return;
            card.removeEventListener("transitionend", onEnd);
            resolve();
        }

        card.addEventListener("transitionend", onEnd);

        // Safety timeout
        setTimeout(() => {
            card.removeEventListener("transitionend", onEnd);
            resolve();
        }, 1000);

        requestAnimationFrame(() => {
            card.style.left = pos.left + "px";
            card.style.top  = pos.top  + "px";
            card.style.transform = "scale(0.75)";
        });
    });
}

		

    

    


//end moveCardToCentre

	function clearTabledCards(){
		if (flag){
			flag=flag
		}
		let noc =Tricks[Tricks.length-1].cardArray.length
		if (noc!=4){
			return
		}
		imageContainer=document.getElementById("imageContainer")
		const metrics=computeLayoutMetrics(imageContainer)
		collectTrick(metrics)
	}
 function collectTrick(metrics){
		if (flag==true){
			flag=flag
		}
	 const { rect } = metrics;

	const rightCorner = {
        left: rect.width - 120,
        top: rect.height - 120
    };

    const leftCorner = {
        left: 20,
        top: rect.height - 120
    };


	const winningPlyr=Tricks[Tricks.length-1].winningPlayer
	winnerSide=winningPlyr % 2
	const target = (winnerSide === 0) ? rightCorner : leftCorner;
	const cards = document.querySelectorAll(".tabledCard");


	 cards.forEach(crd => {
        safeRAF(() => {
            crd.style.left = target.left + "px";
            crd.style.top  = target.top  + "px";
            crd.style.transform = "scale(0.5)";
			crd.src="_Red_back.jpg"
			crd.classList.remove("tabledCard");
			crd.classList.add("collectedCard");
        });
	})
	trickCollected=true
	safeSetTimeout(() => {
    document.querySelectorAll(".collectedCard").forEach(img => img.remove());
}, 100); // match your animation duration
if (restoringTrick==false){
	newContinuePlay()
}

}

 



	
	
	

	

	

	


	


function removeCardFromHand(cardNumber,holderNumber){
		
		if (flag==true){
			flag=flag
		}
Players[holderNumber].removeCard(cardNumber,holderNumber);
Players[holderNumber].removeCardBack()
	}



function addCardToTrick(cardNumber,holderNumber)
{
		let cd = new Card(cardNumber,holderNumber);	
		var tricksLength = Tricks.length-1;
		Tricks[tricksLength].addCard(cd);	
	}
	

