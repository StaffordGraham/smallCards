if (true==false){shouldITrump}
if (true==false){canIfollow}
if (true==false){doesPlayerHaveCardsInSuit}
if (true==false){canIWinTrump}
if (true==false){canIOverTrump}
if (true==false){shouldITrump}
if (true==false){canIfollow}
if (true==false){canIFollowAndWin}
if (true==false){selectOpeningLead}
if (true==false){selectLead}
if (true==false){doIHaveCardsInThisSuit}
if (true==false){lowestWinner}
if (true==false){highestWinner}
if (true==false){canPlayerBeatTrumps}
if (true==false){loopThroughSuitsForLead}
if (true==false){playHighestCard}
if (true==false){playLowestCard}


//start playLowestCard
function playLowestCard(Player, Suit){
 const TL = Tricks.length - 1;
  winningCard=Tricks[TL].winningCard;
  let testList = [];

  switch (Suit) {
    case 'S':
      testList = Players[Player].Spades;
      break;
    case 'H':
      testList = Players[Player].Hearts;
      break;
    case 'D':
      testList = Players[Player].Diamonds;
      break;
    case 'C':
      testList = Players[Player].Clubs;
      break;
  }

  testList.sort((a, b) => a - b);
  testList.reverse();
  let tl =testList.length-1
  if (testList[0]>testList[tl])
  {
    testList.reverse()
  }

  let answer = testList[0];
  
  return answer;
}


//End playLowestCard


function playHighestCard(Player, Suit){
 const TL = Tricks.length - 1;
  winningCard=Tricks[TL].winningCard;
  let testList = [];

  switch (Suit) {
    case 'S':
      testList = Players[Player].Spades;
      break;
    case 'H':
      testList = Players[Player].Hearts;
      break;
    case 'D':
      testList = Players[Player].Diamonds;
      break;
    case 'C':
      testList = Players[Player].Clubs;
      break;
  }

  testList.sort((a, b) => a - b);
  testList.reverse();
  let tl =testList.length-1
  if (testList[0]<testList[tl])
  {
    testList.reverse()
  }

  let answer = testList[0];
  
  return answer;
}


function shouldITrump(){
if(flag)
{flag=flag}
let answer=true
Suits=["S","H","D","C"]

PN=Tricks[Tricks.length-1].toPlay
let trumpPlayed = Tricks[Tricks.length-1].trumpPlayed
suit=Deals[Deals.length-1].bidSuit
let SN=Suits.indexOf(suit)
let iCanOverTrump=canIOverTrump()
// let canIWinTrump = canIWinTrump()
let partnerWinning=isPartnerWinning()


answer = true
// False if No Trumps
if (suit=='N')
{return false}
// False if Player is void in trumps 

if (Players[PN].Suits[SN].length<1){
	answer=false
}
// False if trump played and I can't beat it
if (trumpPlayed&&!iCanOverTrump){
  answer = false
}
// if partner winning and dummy can't beat partner
if(partnerWinning)
{ 
 answer=false
}



return answer 
}



function canIfollow(){

  if (flag==true){
    flag=flag
  }

  let Answer =true
  let LS=Tricks[Tricks.length-1].leadSuit
  let Suits=['S','H','D','C']
	let TL = Tricks.length-1
	let trumpSuit = Tricks[TL].bidSuit
	let PN = Tricks[TL].toPlay
	let pos=Tricks[TL].cardArray.length
	let SN=Suits.indexOf(Tricks[TL].leadSuit)
  if (Players[PN].Suits[SN].length<1){
    Answer = false

  }
  return Answer
}

function defenderPlay(){
 if (flag==true){
  flag=flag
 }
	let Suits=['S','H','D','C']
	let TL = Tricks.length-1
	let trumpSuit = Tricks[TL].bidSuit
	let PN = Tricks[TL].toPlay
	let pos=Tricks[TL].cardArray.length
	let SN=Suits.indexOf(Tricks[TL].leadSuit)

  }




function doesPlayerHaveCardsInSuit(playerNumber,suitNumber){
if (flag==true)
{flag=flag}

PN=playerNumber
SN=suitNumber
return( Players[PN].Suits[SN].length>0)

}

function canIWinTrump() {
  if (flag==true){
    flag=flag
  }
  let Suits=['S','H','D','C']
	let TL = Tricks.length-1
  if (Tricks[TL].trumpPlayed==false)
  {return true}
	let trumpSuit = Tricks[TL].bidSuit
	let PN = Tricks[TL].toPlay
	let pos=Tricks[TL].cardArray.length
	let SN=Suits.indexOf(Tricks[TL].leadSuit)
  if (Players[PN].Suits[SN].length<1){
   return false}


  
    if (canIOverTrump == true) {
      return true;
    } else {
      return false;
    
  }
}

function canIFollowAndWin(){
  if (flag==true){
    flag=flag
  }
  suits=['S','H','D','C']
  let playedCards=[...Tricks[Tricks.length-1].cardArray]
  playedCards=playedCards.map(n=>n.faceValue)
  PN = Tricks[Tricks.length-1].toPlay
  SN=Tricks[Tricks.length-1].leadSuit
  SN=suits.indexOf(SN)
  let playerCards=Players[PN].Suits[SN]
  playerCards=playerCards.map(n=>n%13)
  SN=SN
  let highestPlayedCard=Math.max(...playedCards)
  let playerHighest=Math.max(...playerCards)
  

  return (playerHighest>highestPlayedCard)
   

}

function selectOpeningLead() {
  if (flag==true)
  {flag==flag}
  let openSuit = "";
  let PN=Tricks[Tricks.length-1].toPlay
  let player =Players[PN]
  let temp = player.name;
  let cn=0;

  if (player.leads.length > 0) {
    let s = player.leads[0];
    let crd = new Card(player.leads[0], player.playerNumber);

    if (doIHaveCardsInThisSuit(player, crd.suit) === true) {
      cn = player.leads[0];
      player.reserveLeads.push(player.leads[0]);
      player.leads.shift();
    } else {
      // 1. First highest of longest suit
      switch (playerLongestSuit(player)) {
        case "C":
          openSuit = "C";
          cn = player.hand.clubs.cards[3].cardNumber;
          break;
        case "D":
          openSuit = "D";
          cn = player.hand.diamonds.cards[3].cardNumber;
          break;
        case "H":
          openSuit = "H";
          cn = player.hand.hearts.cards[3].cardNumber;
          break;
        case "S":
          openSuit = "S";
          cn = player.hand.spades.cards[3].cardNumber;
          break;
      }
    }
  }

  return cn;
}


  // Possibly the following line is intended to be used; but currently it's just a statement
  // leaving it as-is unless you specify otherwise
  // player.playerLead;

  // if (Players[PN].LeadNo == 1) {
  //   let tempcard = new Card(cn, 1);

  //   switch (player.wind) {
  //     case "East":
  //       east.partnerLead = tempcard.suit;
  //       break;
  //     case "West":
  //       west.partnerLead = tempcard.suit;
  //       break;
  //   }
  // }
  function listSuitsPlayed(cn, suitsPlayed) {
  let sat = suitFromCardNumber(cn)
	if (flag==true){
		flag=flag
	}
	
	if(!suitsPlayed.includes(sat)){
		suitsPlayed.push(sat)
	
}

  }

function voidPlay(Player) {
  if (flag == true) {
    flag = flag;
  }

  let Answer = 100;

  if (doIHaveCardsInThisSuit(Player, trump)) {
    Answer = shouldITrump(Player);
  } else {
    Answer = discard(Player);
  }

  return Answer;
}
function willGiveRuffDiscard(suit) {

  let suits=["S","H","D","C"]
  let SN=suits.indexOf(suit)
  let PN=2
  return (Players[PN].Suits[SN].length<1)
  }

function loopThroughSuitsForLead(player) {
  if (flag==true)
    {flag=flag}
  const suitList = ["S", "H", "D", "C"];
  const choiceList = [];
  let suitChoice = "";
  PN=Tricks[Tricks.length-1].toPlay

  // Put Partner Lead at the top of the list if the player has it
  if (Players[PN].partnerLeadSuit !== null) {
    switch (Players[PN].partnerLeadSuit) {
      case "S":
        if (player.hand.spades.cards.length > 0) choiceList.push("S");
        break;
      case "H":
        if (player.hand.hearts.cards.length > 0) choiceList.push("H");
        break;
      case "D":
        if (player.hand.diamonds.cards.length > 0) choiceList.push("D");
        break;
      case "C":
        if (player.hand.clubs.cards.length > 0) choiceList.push("C");
        break;
    }
  }

  // Add remaining suits
  for (let i = 0; i < suitList.length; i++) {
    switch (suitList[i]) {
      case "S":
        if (Players[PN].Spades.length > 0) choiceList.push("S");
        break;
      case "H":
        if (Players[PN].Hearts.length > 0) choiceList.push("H");
        break;
      case "D":
        if (Players[PN].Diamonds.length > 0) choiceList.push("D");
        break;
      case "C":
        if (Players[PN].Clubs.length > 0) choiceList.push("C");
        break;
    }
  }

  // Pick the first suit that won't give a ruff
  for (let i = 0; i < choiceList.length; i++) {
    if (!willGiveRuffDiscard(choiceList[i])) {
      suitChoice = choiceList[i];
      break;
    }
  }

  // Default to first choice if no suitable suit found
  if (suitChoice.length == 0 && choiceList.length > 0) {
    suitChoice = choiceList[0];
  }

  // Return the lowest card in that suit
  let crdno = 0;
  const playerObj = Players[PN];
  switch (suitChoice) {
    case "S":
      crdno = playerObj.Spades[playerObj.Spades.length - 1];
      break;
    case "H":
      crdno = playerObj.Hearts[playerObj.Hearts.length - 1];
      break;
    case "D":
      crdno = playerObj.Diamonds[playerObj.Diamonds.length - 1];
      break;
    case "C":
      crdno = playerObj.Clubs[playerObj.Clubs.length - 1];
      break;
  }
  return crdno;
}

function playCardFromSuit(player, suit, top) {
  let cn;

  switch (top) {
    case true:
      cn = lowestWinner(player, suit);
      break;
    case false:
      cn = followSuit(player, suit);
      break;
  }

  return cn;
}
function secondPlay(player) {
  if (flag == true) {
    flag = flag;
  }
  let cn=0
    suits=["S","H","D","C"]
    PN=Tricks[Tricks.length-1].toPlay
    SN=Tricks[Tricks.length-1].leadSuit
    SN=suits.indexOf(SN)
  

  // Play low card in suit
 

  PN =PN
  SN=SN
  const hasCards = doesPlayerHaveCardsInSuit(PN,SN);

  switch (hasCards) {
    case true:
      switch (coverHonourWithHonour()) {
        case true:
          cn = lowestWinner(player, leadSuit);
          break;
        case false:
          cn = followSuit();
          break;
      }
      break;
    case false:
      cn = discard(player);
      break;
  }

  return cn;
}


function trump(player) {
  let CN = 0;
  const DL = Deals.length - 1;
  const DLObject = Deals[DL];
  const TL = Tricks.length - 1;
  const TSObject = Tricks[TL];

  switch (DLObject.bidSuit) {
    case 'S':
      CN = player.hand.spades.cards[player.hand.spades.cards.length - 1].cardNumber;
      break;
    case 'H':
      CN = player.hand.hearts.cards[player.hand.hearts.cards.length - 1].cardNumber;
      break;
    case 'D':
      CN = player.hand.diamonds.cards[player.hand.diamonds.cards.length - 1].cardNumber;
      break;
    case 'C':
      CN = player.hand.clubs.cards[player.hand.clubs.cards.length - 1].cardNumber;
      break;
  }
  return CN;
}

function isThisAnHonour(crd) {
  return crd.FaceValue >= 10;
}
function canIBeatDummyTrump(Player) {
  if (Player.Name === "East") {
    return true;
  }

  let fList = [];
  let dList = [];

  for (const cd of North.Hand.HandCards) {
    if (cd.Suit === Contracts.Last.Suit) {
      fList.push(cd);
    }
  }

  for (const cd of Player.Hand.HandCards) {
    if (cd.Suit === Contracts.Last.Suit) {
      dList.push(cd);
    }
  }

  fList.sort((a, b) => a.FaceValue - b.FaceValue);
  dList.sort((a, b) => a.FaceValue - b.FaceValue);

  if (fList[0].FaceValue < fList[fList.length - 1].FaceValue) {
    fList.reverse();
  }

  if (dList[0].FaceValue < dList[dList.length - 1].FaceValue) {
    dList.reverse();
  }

  if (fList[0].FaceValue > dList[0].FaceValue) {
    return true;
  } else {
    return false;
  }
}
function coverHonourWithHonour(Player) {
  let flag='flag'
  let CN = 0;
  let PN =Player 
  let listOfCards=[...Tricks[Tricks.length-1].cardArray]
  TN=listOfCards[0].cardNumber

  return (TN>9)
}
function thirdPlay(Player) {
  if (flag==true){
    flag=flag
  }
  let CN=0
  let Suit=Tricks[Tricks.length-1].leadSuit
  if (HaveICardsInThisSuit(Player,Suit))
  {
    CN=followSuit(Player,Suit)}
  else
  {
if (shouldITrump){
    CN=playTrump(Player)
}
else
{
  CN=discard(Player)
}






}
return CN
}

function fourthPlay(){
   if (flag==true){
    flag=flag
  }
  let CN=0
  let Suit=Tricks[Tricks.length-1].leadSuit
  if (HaveICardsInThisSuit(Player,Suit))
  {
    CN=followSuit(Player,Suit)}
  else
  {
if (shouldITrump()){
    CN=playTrump(Player)
}
else
{
  CN=discard()
}
}
return CN
}

function canWeWin(Player, Suit) {
  if (flag == true) {
    flag = flag;
  }

  const TL = Tricks.length;
  let answer = false;
  let dList = [];

  switch (Suit) {
    case 'S':
      dList = [...Players[Player].Spades];
      break;
    case 'H':
      dList = [...Players[Player].Hearts];
      break;
    case 'D':
      dList = [...Players[Player].Diamonds];
      break;
    case 'C':
      dList = [...Players[Player].Clubs];
      break;
  }

  dList.sort((a, b) => a.Ranking - b.Ranking);

  if (dList.length > 0) {
    if (dList[0].Ranking < dList[dList.length - 1].Ranking) {
      dList.reverse();
    }
  }

  if (dList.length > 0 && dList[0].rank > Tricks[TL].winningCard.rank) {
    return true;
  } else {
    return false;
  }
}
function highestCardInSuit(Player,Suit){//start highestCardInSuit


}//end highestCardInSuit

function suitNumberFromCardNumber(cardNumber){//start Function suitNumberFromCardNumber 
  var suitNum = Math.floor(cardNumber/13);
  return suitNum;
}//end function suitNumberFromCardNumber

function isPartnerWinning(){
  if (flag==true){
    flag = flag
  }
  let TL = Tricks.length-1
   var PN = Tricks[TL].toPlay
   var myPartner =(PN+2)%4



  let answer =false
   let leadSuit= Tricks[Tricks.length-1].leadSuit
    var SN=suitNumberFromCardNumber(leadSuit)
    let suitNames=["S","H","D","C"]
    let cArray =Tricks[Tricks.length-1].cardArray
    var highestPlayedCardRank=Math.max(...cArray.map(c => c.rankValue));
    var winningCard = cArray.find(c => c.rankValue === highestPlayedCardRank);
    var winningPlayer=winningCard.holderNumber
    if (winningPlayer==myPartner){
      answer=true
    }
   return answer
  }
function isNorthSouthHonour(){
  let TL=Tricks.length-1
  let pos=Tricks[TL].cardArray.length
  let Player=Tricks[TL].toPlay
  let suit=Tricks[TL].leadSuit
  let WC=Tricks[TL].winningCardNumber
   SN=suitNames.indexOf(suit)
const winnerNumber = Tricks[TL].cardArray.find(card => card.rankValue === WC)?.holderNumber ?? null;
   if (WC <10){
    return false
   }
   if (winnerNumber % 2 !=0){
    return false
  }
  else
  {
    return true
  }



}




function followSuit(PN){
  if (flag==true){
      flag=flag
  }
    let leadSuit= Tricks[Tricks.length-1].leadSuit
    let suitNames=["S","H","D","C"]
    var SN=suitNames.indexOf(leadSuit)
    SN = SN+1
    let cArray =Tricks[Tricks.length-1].cardArray
    var highestPlayedCardRank=Math.max(...cArray.map(c => c.rankValue));
    var mySuit =Players[PN].Suits[SN]
    
    let highest =0
    let lowest=0
    let lowestWinner=0
    let cn=0
    let CFW=canIFollowAndWin()
    

  let TL=Tricks.length-1
  let pos=Tricks[TL].cardArray.length
  let Player=Tricks[TL].toPlay
  let suit=Tricks[TL].leadSuit
  let WC=Tricks[TL].winningCardNumber
   SN=suitNames.indexOf(suit)
 // let playerCards=Players[PN].Suits[SN].map(card=>card.cardNumber)
  //let playerFaceValues=Players[PN].Suits[SN].map(card=>card.faceValue)
  let cardNumberList=Players[PN].Suits[SN]
  let honour=isNorthSouthHonour()
  let weWin=isPartnerWinning()
  
  highest=Math.max(...cardNumberList)
  lowest=Math.min(...cardNumberList)
  let winnerList=cardNumberList.filter(num=> num>WC)
  if (winnerList.length>0){
      lowestWinner=Math.min(...winnerList)
      

  }

  if (flag==true){
    flag=flag
  }
  switch (pos){
    case 1:
      if (CFW==true && honour==true){
        cn=lowestWinner

      }
      else{
        cn=lowest
      }
      break
    case 2:
      if (CFW && weWin==false){
        cn=playHighestCard(Player, suit)
      }
      else
      { cn = playLowestCard(Player,suit)}
      break


    case 3:
      if (flag==true)
      {
        flag=flag
      }
    if (CFW==true&& !weWin){
      cn=lowestWinner;
    }
      else{
        cn=lowest
      }
   break;
    

  }
return cn

}
function oldFollowSuit(){//start chaseSuit
  if (flag==true){
    flag=flag
  }
  PN = Tricks[Tricks.length-1].toPlay
  let highest = 0
  let lowest=0
  let lowestWinner=0
  let playerNames =["South","West","North","East"]
  let suitNames=["S","H","D","C"]
  let Suit = Tricks[Tricks.length-1].leadSuit
  let SN =suitNames.indexOf(Suit)
  let tempArray=[...Players[PN].Suits[SN]]
  let winningCard =Tricks[Tricks.length-1].winningCard
  console.log(tempArray.join(' '))
  if (tempArray.length>0){

          
          highest= Math.max(...tempArray)
          lowest =Math.min(...tempArray)
          const topHalf=tempArray.filter(value=>value >winningCard)
          lowestWinner=topHalf.length>0 ? Math.min(...topHalf): undefined
          position = Tricks[Tricks.length-1].cardArray.length
          if (flag==true){
            flag=flag
          }
          switch(position){

            case 1:
            return lowest
            break;
            case 2:
                if (canIFollowAndWin()==false)
                {
                  return lowest
                  break;

                }
                else
                {return highest}
                break
              case 3:
                if (canIWin==false)
                {
                  return lowest
                  break;

                }
                else
                {return lowestWinner}
                break

          }
  }






}//end chaseSuit

function oldFollowSuit(Player, leadSuit) {
  let CN = 0;
  let st = leadSuit.charAt(0);
  const TL = Tricks.length;
  let playHigh = 0;
  let playLow = 0;

  switch (st) {
    case 'S': {
      const sl = Players[Player].Spades.length - 1;
      Players[Player].Spades.sort((a, b) => a - b);
      Players[Player].Spades.reverse();
      if (Players[Player].Spades[sl] > Players[Player].Spades[0]) {
        Players[Player].Spades.reverse();
      }
      playHigh = Players[Player].Spades[0];
      playLow = Players[Player].Spades[sl];
      break;
    }
    case 'H': {
      const sl = Players[Player].Hearts.length - 1;
      Players[Player].Hearts.sort((a, b) => a - b);
      Players[Player].Hearts.reverse();
      if (Players[Player].Hearts[sl] > Players[Player].Hearts[0]) {
        Players[Player].Hearts.reverse();
      }
      playHigh = Players[Player].Hearts[0];
      playLow = Players[Player].Hearts[sl];
      break;
    }
    case 'D': {
      const sl = Players[Player].Diamonds.length - 1;
      Players[Player].Diamonds.sort((a, b) => a - b);
      Players[Player].Diamonds.reverse();
      if (Players[Player].Diamonds[sl] > Players[Player].Diamonds[0]) {
        Players[Player].Diamonds.reverse();
      }
      playHigh = Players[Player].Diamonds[0];
      playLow = Players[Player].Diamonds[sl];
      break;
    }
    case 'C': {
      const sl = Players[Player].Clubs.length - 1;
      Players[Player].Clubs.sort((a, b) => a - b);
      Players[Player].Clubs.reverse();
      if (Players[Player].Clubs[sl] > Players[Player].Clubs[0]) {
        Players[Player].Clubs.reverse();
      }
      playHigh = Players[Player].Clubs[0];
      playLow = Players[Player].Clubs[sl];
      break;
    }
  }

  if (areWeWinning(Player)) {
    return playLow;
  } else {
    return playHigh;
  }
}
function canPlayerBeatTrumps(Player) {
  let fList = []; // Trumps on player's hand
  let dList = []; // Trumps played in this round

  for (const cd of Player.Hand.HandCards) {
    if (cd.Suit === Contracts.Last.Suit) {
      fList.push(cd);
    }
  }

  for (const cd of Player.Hand.HandCards) {
    if (cd.Suit === Contracts.Last.Suit) {
      dList.push(cd);
    }
  }

  fList.sort((a, b) => a.FaceValue - b.FaceValue);
  dList.sort((a, b) => a.FaceValue - b.FaceValue);

  if (fList.length === 0) {
    return false;
  }
  if (dList.length === 0) {
    return true;
  }

  if (fList.length > 0 && dList.length > 0) {
    if (fList[0].FaceValue > dList[0].FaceValue) {
      return true;
    } else {
      return false;
    }
  }
}
function lowestWinningCard(Player, Suit, CardFace) {
  switch (Suit) {
    case 'S':
      return Player.Hand.Spades.Lowest_Winning_Card_No(CardFace);
    case 'H':
      return Player.Hand.Hearts.Lowest_Winning_Card_No(CardFace);
    case 'D':
      return Player.Hand.Diamonds.Lowest_Winning_Card_No(CardFace);
    case 'C':
      return Player.Hand.Clubs.Lowest_Winning_Card_No(CardFace);
  }
}
function winningCard() {
  const TL = Tricks.length - 1;
  Tricks[TL].cardArray.forEach(crd => {
    Tricks[TL].reRank(crd);
  });
  Tricks[TL].cardArray.sort((card1, card2) => card2.rank - card1.rank);
  return Tricks[TL].cardArray[0].holderNumber;
}
function areWeWinning(Player, Suit) {
  const TL = Tricks.length - 1;
  Tricks[TL].cardArray.forEach(crd => {
    Tricks[TL].reRank(crd);
  });
  Tricks[TL].cardArray.sort((card1, card2) => card2.rank - card1.rank);
  const winningHolder = Tricks[TL].cardArray[0].holderNumber;
  return Player % 2 === winningHolder % 2;
}
function discard() {
  if (flag == true) {
   flag=flag
  }
  let answer =0

  let PN=Tricks[Tricks.length-1].toPlay
  if (Players[PN].discards.length>0){
    answer=Players[PN].discards.shift()
    return

  }

 
  let suitInitials=["S","H","D","C"]
  const playerSuits={

    0: Players[PN].Suits.Spades,
    1: Players[PN].Suits.Hearts, 
    2: Players[PN].Suits.Diamonds,
    3: Players[PN].Suits.Clubs

 }
 let testSuit = 0;
let testSuitName = '';
let p =0


for (const suit in Players[PN].Suits) {
    const p = Players[PN].Suits[suit].length;
   
    if (p > testSuit)
        {
        testSuit = p;
        testSuitName = suit;
    }
  }
  
 SN=parseInt(testSuitName)

    let cardNumbers =Players[PN].Suits[SN]
    answer =Math.min(...cardNumbers)
    if (answer==0){
      answer =answer
    }
    return answer
  


}
   




function longestHand(Player) {
  const handLengths = [
    ['S', Players[Player].Spades.length],
    ['H', Players[Player].Hearts.length],
    ['D', Players[Player].Diamonds.length],
    ['C', Players[Player].Clubs.length]
  ];

  // Sort descending by length
  handLengths.sort((a, b) => b[1] - a[1]);
  return handLengths[0][0];
}
function needProtectHonour(Player, Suit) {
  return (Suit.Cards[0].HonourProtectionNumber === Suit.Cards.length - 1);
}

function canIOverTrump() {
  //Find the highest trump played, and the highest trump in hand. Compare the two.
  if (flag==true)
  {
    flag=flag

  }



  let answer = false
  trump=Deals[Deals.length-1].bidSuit
  let highestPlayedTrump =0
  let Suits=["S","H","D","C"]
  let PN = Tricks[Tricks.length-1].toPlay
  let SN =Suits.indexOf(trump)

  let myTrumpFaceValues=[]
  myTrumpFaceValues=Players[PN].Suits[SN]
  myTrumpFaceValues = myTrumpFaceValues.map(v => v % 13);

  let MHT=0
  MHT=Math.max(...myTrumpFaceValues)


  if (!Tricks[Tricks.length-1].trumpPlayed){
    answer= true
  }
  else
  {
    highestPlayedTrump=Tricks[Tricks.length-1].winningCardRank
    answer=(MHT>highestPlayedTrump)
  }
  return answer


}
function haveITrumps(Player) {
  let Answer = true;
  const DL = Deals.length - 1;
  const trump = Deals[DL].bidSuit;

  switch (trump) {
    case 'S':
      Answer = (Players[Player].Spades.length > 0);
      break;
    case 'H':
      Answer = (Players[Player].Hearts.length > 0);
      break;
    case 'D':
      Answer = (Players[Player].Diamonds.length > 0);
      break;
    case 'C':
      Answer = (Players[Player].Clubs.length > 0);
      break;
  }
  return Answer;
}







function highestWinner(Player, leadSuit) {
  let CN = 0;
  switch (leadSuit) {
    case 'S':
      CN = Players[Player].Spades[0];
      break;
    case 'H':
      CN = Players[Player].Hearts[0];
      break;
    case 'D':
      CN = Players[Player].Diamonds[0];
      break;
    case 'C':
      CN = Players[Player].Clubs[0];
      break;
  }
  return CN;
}

function canPlayerBeatTrumps(Player) {
  let fList = []; // Trumps on player's hand
  let dList = []; // Trumps played in this round

  for (const cd of Player.Hand.HandCards) {
    if (cd.Suit === Contracts.Last.Suit) {
      fList.push(cd);
    }
  }

  for (const cd of Player.Hand.HandCards) {
    if (cd.Suit === Contracts.Last.Suit) {
      dList.push(cd);
    }
  }

  fList.sort((a, b) => a.FaceValue - b.FaceValue);
  dList.sort((a, b) => a.FaceValue - b.FaceValue);

  if (fList.length === 0) {
    return false;
  }
  if (dList.length === 0) {
    return true;
  }

  if (fList.length > 0 && dList.length > 0) {
    if (fList[0].FaceValue > dList[0].FaceValue) {
      return true;
    } else {
      return false;
    }
  }
}

function lowestWinningCard(Player, Suit, CardFace) {
  switch (Suit) {
    case 'S':
      return Player.Hand.Spades.Lowest_Winning_Card_No(CardFace);
    case 'H':
      return Player.Hand.Hearts.Lowest_Winning_Card_No(CardFace);
    case 'D':
      return Player.Hand.Diamonds.Lowest_Winning_Card_No(CardFace);
    case 'C':
      return Player.Hand.Clubs.Lowest_Winning_Card_No(CardFace);
  }
}
function winningCard() {
  const TL = Tricks.length - 1;
  Tricks[TL].cardArray.forEach(crd => {
    Tricks[TL].reRank(crd);
  });
  Tricks[TL].cardArray.sort((card1, card2) => card2.rank - card1.rank);
  return Tricks[TL].cardArray[0].holderNumber;
}

function areWeWinning(Player, Suit) {
  const TL = Tricks.length - 1;
  Tricks[TL].cardArray.forEach(crd => {
    Tricks[TL].reRank(crd);
  });
  Tricks[TL].cardArray.sort((card1, card2) => card2.rank - card1.rank);
  const winningHolder = Tricks[TL].cardArray[0].holderNumber;
  return Player % 2 === winningHolder % 2;
}

function longestHand(Player) {
  const handLengths = [
    ['S', Players[Player].Spades.length],
    ['H', Players[Player].Hearts.length],
    ['D', Players[Player].Diamonds.length],
    ['C', Players[Player].Clubs.length]
  ];

  // Sort descending by length
  handLengths.sort((a, b) => b[1] - a[1]);
  return handLengths[0][0];
}
function needProtectHonour(Player, Suit) {
  return (Suit.Cards[0].HonourProtectionNumber === Suit.Cards.length - 1);
}
function jcanIOverTrump() {



  let answer = false
  let PN=Tricks[Tricks.length-1].toPlay
  let trump =Deals[Deals.length-1].bidSuit
  let WC = Tricks[Tricks.length-1].winningCard
  let WN=WC.cardNumber

  Suits=["S","H","D","C"]
  let SN=Suits.indexOf(trump)
  let suitCards=Players[PN].Suits[SN];
  for (let i = 0; i < suitCards.length; i++) {
  let card = suitCards[i];
  // Ensure card.cardNumber exists
  if (card && card.cardNumber !== undefined) {
    // If cardNumber is a string, convert to number
    if (typeof card.cardNumber === 'string') {
      trumpNumbers.push(parseInt(card.cardNumber, 10));
    } else {
      trumpNumbers.push(card.cardNumber);
    }
  }
}

  let trumpNumbers=Players[PN].Suits[SN].map(card=>card.cardNumber)
  let myHighestTrump=Math.max(...trumpNumbers)
  return (myHighestTrump>WN)
}


  
function haveITrumps(Player) {
  let Answer = true;
  const DL = Deals.length - 1;
  const trump = Deals[DL].bidSuit;

  switch (trump) {
    case 'S':
      Answer = (Players[Player].Spades.length > 0);
      break;
    case 'H':
      Answer = (Players[Player].Hearts.length > 0);
      break;
    case 'D':
      Answer = (Players[Player].Diamonds.length > 0);
      break;
    case 'C':
      Answer = (Players[Player].Clubs.length > 0);
      break;
  }
  return Answer;
}
function canIWin(Player, suit) {
  if (flag == true) {
    flag = flag;
  }

  const TL = Tricks.length - 1;
  const DL = Deals.length - 1;

  const LS = Tricks[TL].leadSuit;
  const trump = Deals[DL].bidSuit;
  const WC = Tricks[TL].winningCard;
  const trumpPlayed = Tricks[TL].trumpPlayed;

  if (!trumpPlayed) {
    return true;
  } else {
    return canIBeatThisCard(Player, WC);
  }
}
function doIHaveCardsInThisSuit(Player, Suit) {
  if (flag == true) {
    flag = flag;
  }

  Suit = Suit.charAt(0);
  let answer = true;
  let det = 0;

  switch (Suit) {
    case "S":
      det = Players[Player].Spades.length;
      break;
    case "H":
      det = Players[Player].Hearts.length;
      break;
    case "D":
      det = Players[Player].Diamonds.length;
      break;
    case "C":
      det = Players[Player].Clubs.length;
      break;
  }

  if (det < 1) {
    answer = false;
  }
  return answer;
}


function lowestWinner(Player, Suit) {
  console.log('in lowest winner');
  if (flag == true) {
    flag = flag;
  }

  const TL = Tricks.length - 1;
  winningCard=Tricks[TL].winningCard;
  let testList = [];

  switch (Suit) {
    case 'S':
      testList = Players[Player].Spades;
      break;
    case 'H':
      testList = Players[Player].Hearts;
      break;
    case 'D':
      testList = Players[Player].Diamonds;
      break;
    case 'C':
      testList = Players[Player].Clubs;
      break;
  }

  testList.sort((a, b) => a - b);
  testList.reverse();

  let answer = 0;
  for (let i = 0; i < testList.length; i++) {
    console.log(testList[i]);
    if (testList[i] > winningCard) {
      answer = testList[i];
    }
  }
  return answer;
}
function highestWinner(Player, leadSuit) {
  let CN = 0;
  switch (leadSuit) {
    case 'S':
      CN = Players[Player].Spades[0];
      break;
    case 'H':
      CN = Players[Player].Hearts[0];
      break;
    case 'D':
      CN = Players[Player].Diamonds[0];
      break;
    case 'C':
      CN = Players[Player].Clubs[0];
      break;
  }
  return CN;
}

function lowestWinningCard(Player, Suit, CardFace) {
  switch (Suit) {
    case 'S':
      return Player.Hand.Spades.Lowest_Winning_Card_No(CardFace);
    case 'H':
      return Player.Hand.Hearts.Lowest_Winning_Card_No(CardFace);
    case 'D':
      return Player.Hand.Diamonds.Lowest_Winning_Card_No(CardFace);
    case 'C':
      return Player.Hand.Clubs.Lowest_Winning_Card_No(CardFace);
  }
}
function winningCard() {
  const TL = Tricks.length - 1;
  Tricks[TL].cardArray.forEach(crd => {
    Tricks[TL].reRank(crd);
  });
  Tricks[TL].cardArray.sort((card1, card2) => card2.rank - card1.rank);
  return Tricks[TL].cardArray[0].holderNumber;
}
function areWeWinning(Player, Suit) {
  const TL = Tricks.length - 1;
  Tricks[TL].cardArray.forEach(crd => {
    Tricks[TL].reRank(crd);
  });
  Tricks[TL].cardArray.sort((card1, card2) => card2.rank - card1.rank);
  const winningHolder = Tricks[TL].cardArray[0].holderNumber;
  return Player % 2 === winningHolder % 2;
}

function longestHand(Player) {
  const handLengths = [
    ['S', Players[Player].Spades.length],
    ['H', Players[Player].Hearts.length],
    ['D', Players[Player].Diamonds.length],
    ['C', Players[Player].Clubs.length]
  ];

  // Sort descending by length
  handLengths.sort((a, b) => b[1] - a[1]);
  return handLengths[0][0];
}




//////////////NO CODE ABOVE THIS LINE////////////////////
function trumpOrDiscard( Player) {
  let WC=Tricks[Tricks.length-1].winningCard
  let trumpPlayed=Tricks[Tricks.length-1].trumpPlayed
  let trump =Deals[Deals.length-1].bidSuit
  if (!HaveICardsInThisSuit(Player,trump)){return false}
  if (areWeWinning(Player)){return false}
  if (trumpPlayed&&!canIBeatThisCard(WC,Player)){return false}
 
}

function HaveICardsInThisSuit(Player,Suit)
{
  if (flag==true){
    flag=flag
  }
  PN=Tricks[Tricks.length-1].toPlay
let suits=["S","H","D","C"]
let SN = suits.indexOf(Suit)
let suitLength=Players[PN].Suits[SN].length
if (suitLength>0)
{return true}
else
{return false}
}
function playTrump(){
  let CN =0;
  if (flag==true)
  {
    flag=flag

  }

  let position =Tricks[Tricks.length-1].cardArray.length
  let trumpPlayed=Tricks[Tricks.length-1].trumpPlayed
  switch (position){
    case 4:
      if (trumpPlayed){
      CN=playLowestWinningTrump(Player)
      break;
      }
      else
        CN=playLowestTrump(Player)
      default:
        
          CN=playhighTrump(Player)
          break
        
  }
  
    return CN
}
function playhighTrump(Player){

  trumpSuit=Deals[Deals.length-1].bidSuit
  let suitsList=["S","H","D","C"]
let playersList=["South","West","North","East"]
let SN = suitsList.indexOf(trumpSuit)
let PN =Tricks[Tricks.length-1].toPlay
let tempArray=Players[PN].Suits[SN]
let Answer = Math.max(...tempArray)
return Answer
}

function playLowestWinningTrump(Player){
  let Answer = 0
  if (!trumpPlayed){
    Answer=playLowestTrump(Player)
    return Answer}

testCard =Tricks[Tricks.length-1].winningCard
 trumpSuit=Deals[Deals.length-1].bidSuit
  let suitsList=["S","H","D","C"]
let playersList=["South","West","North","East"]
let SN = suitsList.indexOf(trumpSuit)
let PN =Tricks[Tricks.length-1].toPlay
let tempArray=Players[PN].Suits[SN]
Answer = Math.min(...tempArray.filter(n => n > testCard));
return Answer

}

function playLowestTrump(Player){
   trumpSuit=Deals[Deals.length-1].bidSuit
  let suitsList=["S","H","D","C"]
let playersList=["South","West","North","East"]
let SN = suits.indexOf(trumpSuit)
let PN =Tricks[Tricks.length-1].toPlay
let tempArray=Players[PN].Suits[SN]
Answer = Math.min(...tempArray)
return Answer
}




   









//end trump or discard Purple
function canIBeatThisCard(card,Player){
  const playerNumbers={
    South: 0,
    West: 1,
    North:2,
    East:3
  };
  pNumber=playerNumbers[Player]

  let cd = new Card(card)
  let suitNumber=cd.suitNumber
  let tempSuitArray=Players[pNumber].Suits[suitNumber]

  let rank=cd.rank
 const answer = tempSuitArray.some(rank=> cd.rank)
 return answer
}

function PlayThird(Player){
  let CN=0
  if (HaveICardsInThisSuit(Player,Suit))
  {CN=followSuit(Player,Suit)}
  else
  {//nest a should i trump if clause here. ?? remove this line
if (shouldITrump){
  CN=playTrump(Player)
}
else
{
  CN=discard(Player)
}






}
return CN
}





