//Calculate Penalty 24
if (true==false){scoreHand}
if (true==false){scoreTrick}
if (true==false){}
if (true==false){}
if (true==false){}
if (true==false){}
if (true==false){}
if (true==false){}
if (true==false){}


class Scorer {
  constructor(){//opening brace for constructor
    this.madeContract = true;
    this.Suit='';
    this.tricksContracted=0;
    this.doubleState=false;
    this.north_southVulnerable=false;
    this.penalty = 0;
    this.perUnderTricks=50;
    this.bidLevel=Deals[Deals.length-1].bidLevel
    this.aim = Deals[Deals.length-1].bidLevel
    this.bidSuit=Deals[Deals.length-1].bidSuit
    this.achievement=0;
    this.pointsPerTrick=0;
    this.pointsForBidAndMade=0
    this.overTrick=0;
    this.scoreAbove=0;
    this.north_southBelow=0;
    this.scoreBelow=0;
    this.scoreInWords="";
    this.gameBonus=300;
    this.north_southTricks=0;
    this.east_westTricks=0;
    this.slamScore=0;
    this.noTrumpBonus=10
    this.message1 =""
    this.message2=""
    this.mesage=""
    this.temp= Deals.length; 
    this.bidSuit=Deals[Deals.length-1].bidSuit
    this.perTrick =[30,30,20,20]
    switch(this.bidSuit){//opening brace for switch
      case 'S':
        this.pointsPerTrick=30
        break;
      case 'H':
        this.pointsPerTrick=30
        break;
      case 'D':
        this.pointsPerTrick=20
        break;
      case 'C':
        this.pointsperTrick=20
        break;
      case 'N':
      this.pointsPerTrick=30
          }
          //closing brace for switch
        }
        //closing brace for constructor
  




 
hideScoreMessage() 
{//opening brace for hideScoreMessage
  document.getElementById('scoreMessage').style.display = 'none';
}//closing brace for hideScoreMessage


     
  


   scoreTrick()
   { //opening brace for scoreTrick
  

    let TL = Tricks.length - 1;
    let thisTrick=Tricks[Tricks.length-1]
    let winningCard = thisTrick.winningCardNumber
    let winningPlayer=thisTrick.winningPlayer
    let winningSide = winningPlayer%2
    if (thisTrick.trickScored==false){
    if (winningPlayer %2 ==0)
        {//opening brace for if statement
      this.north_southTricks+=1}
      else
      {this.east_westTricks+=1}
    }//closing brace for if statement
     
    
this.trickScored=true

  }//closing brace for scoreTrick
    

    


  getContractfull()
  {//opening brace for getContractfull


let cont = ''
let suitDict ={//opening brace for suitDict
  'S':'Spade',
  "H": 'Heart',
  "D": 'Diamond',
  "C": 'Club',
  "N":'No Trump'
}//Closing brace for suitDict
let plural =''
let st=Deals[Deals.length-1].bidSuit
let bidLevel = Deals[Deals.length-1].contract
if (typeof bidLevel !=='string')
{bidLevel=parseInt(bidLevel)}
let aim = parseInt(this.contract)
aim +=6
let trumpSuit=suitDict[st]
if( this.contract>1){plural='s'}

contract =bidLevel + " "+trumpSuit+plural 
console.log(contract)
return contract
}//closing brace for getContractfull
 

  scoreTheTrickWinner(winnerNumber){//opening brace for scoreTheTrickWinner
  
     switch(winnerNumber){//start switch
        case 2:
          this.north_southTricks+=1;
          break;
          case 0:
            this.north_southTricks +=1;
            break;
          case 3:
            this.east_westTricks+=1;
            break;
            case 1:
            this.east_westTricks +=1;
            break;
     }//end switch
     var leftLab = document.getElementById('top-left-label');
     leftLab.textContent = "N-S " + this.north_southTricks;
     var rightLab = document.getElementById('top-right-label');
     rightLab.textContent="E-W "+ this.east_westTricks;
     
        

     }//closing brace for scoreTheTrickWinner;

scoreHand(){
  //opening brace for scoreHand
let scoreResult = ''
let suitDict ={
  'S':'Spade',
  "H": 'Heart',
  "D": 'Diamond',
  "C": 'Club',
  "N":'No Trump'
}
let pointDict={
 'S':30,
  "H": 30,
  "D": 20,
  "C": 20,
  "N":30
}
 //let trump = Deals[Deals.length-1].bidSuit
 let trump =this.bidSuit
  let plural =''
  if (trump !='N'){this.noTrumpBonus=0}
let achievement = this.north_southTricks-6
let aim =this.aim
//let aim = Deals[Deals.length-1].contract

if (aim>1){plural='s'}
  let theTrump= suitDict[trump]+plural
  let full_contract =parseInt(aim)+" "+theTrump
let determiner = achievement-aim 
if (determiner <0){scoreResult='Failed'}
if (determiner ==0){scoreResult='Nailed'}
if(determiner>0 ){scoreResult='Surpasssed'}

switch (scoreResult){
  case 'Failed':
   this.message="Contract Failed"
    break;
  case 'Nailed':
      this.message="Contract Made"
      break;
  case 'Surpasssed':
      this.message="Contract + overtricks."
}

let theMessage = this.message

return theMessage
}}
