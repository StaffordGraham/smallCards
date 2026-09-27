//turnToPlay Line 16
//addCard Line 41
//findWinner Line 93
//reRank Line 79
if(true==false){rankCardAndPlayer}


class Trick{///start Trick class
	
	constructor(Leader){
		if (flag==true){
			flag=flag
		}

		this.onLead=Leader; //default is that West is on lead
		this.winningPlayer =0;
		this.cardArray =[];
		this.trumpPlayed =false;
		this.toPlay=Leader;
		this.dl=Deals.length
		this.trumpSuitNumber=Deals[Deals.length-1].bidSuitNumber
		this.leadSuit =" ";
		this.leadSuitNumber = null
		this.theHighCard=0;
		this.highestRankingPlayer =0;
		this.winningCardNumber=0
		this.winningCardRank=0
		this.trickScored=false
		this.scardsScooped = false
		this.beenHere=false
		this.noTrump = false
		this.leadSuitNumber= 0
		if (Deals[Deals.length-1].bidSuit=='N'){
			this.noTrump=true
		zIndexCounter =0

		}
		trickCollected=false

		} // end of constructor
		


turnToPlay(tp){//start turn to play
	
	tp +=1;
	tp = tp%4;
	switch(tp){//start switch
case 0:
	this.toPlay =0;
	break;
	case 1:
		this.toPlay =1;
		break;
	case 2:
		this.toPlay=2;
		break;
	case 3:
		this.toPlay=3;
		break;
	}//end switch
	
	
	
	;
	this.toPlay=tp;
}//end turntoplay

addCard(crd){//start addCard
	if (flag==true){
		flag=flag
	}
	let trumpSuitNumber = this.trumpSuit
	let suitList = ['S','H','D','C']
	let suitNumber = crd.suitNumber
		var cn = crd.cardNumber;
	var hn = this.toPlay;


	let followSuit=true
	let cardIsTrump=false
	let trumpPlayed = false
	if (crd.suitNumber!=this.leadSuitNumber)
	{followSuit=false}
	if(this.noTrump==false){
	if (crd.suitNumber==this.trumpSuitNumber)
	{this.trumpPlayed=true}
	}
			if (this.cardArray.length==0)
					{//start if 
					this.toPlay=crd.holderNumber;
					this.leadSuit=crd.suit;
					this.leadSuitNumber=crd.suitNumber

						//end if
				}
				

		
			switch(this.toPlay){
					case 0:
						South.canclick = true;
						North.canclick=false;
						break
						case 2:
							North.canclick =true;
							South.canclick=false;
						break;
			}


	let tempArray=[];

	this.cardArray.push(crd);
	
	
	tempArray = [...this.cardArray];
	
	this.cardArray.forEach(card=>{
		let rv = card.rankValue
		if (card.suitNumber!=this.leadSuitNumber && card.suitNumber!=this.trumpSuitNumber)
			{card.rankValue=0
				return
			}
			if (this.trumpPlayed==true&& card.suitNumber!=this.trumpSuitNumber){
				card.rankValue=0
				return
			}
			
			}
	)
	this.cardArray.sort((a,b)=>b.rankValue - a.rankValue);
let last = this.cardArray.length -1;

if(this.cardArray[0].rankValue<this.cardArray[last].rankValue){
	tempArray.reverse()
}

if (flag==true){
	flag=flag		
}
this.winningCardRank=this.cardArray[0].rankValue
this.winningPlayer= this.cardArray[0].holderNumber
this.winningCardNumber = this.cardArray[0].cardNumber
let name = this.cardArray[0].name

this.toPlay +=1;
this.toPlay = this.toPlay%4;	



		
}




	
//end addCard

suitFromCardNumber(cardNumber){
	let suit =''	
	if ((cardNumber>=0)&&(cardNumber<=12)){
		suit='S'
	}
	if ((cardNumber>=13)&&(cardNumber<=25)){
		suit='H'
	}
	if ((cardNumber>=26)&&(cardNumber<=38)){
		suit='D'
	}
	if ((cardNumber>=39)&&(cardNumber<=51)){
		suit='C'	
	}		
	return suit
}
reRank(crd){//start reRank
if (flag==true)
{
	flag=flag
}
	

if ((crd.suit==this.leadSuit)&&(!this.trumpPlayed)){
return crd.rank
}

if (crd.suit==this.trumpSuit){
	return crd.rank
}
return 0;
}//end reRank


}///end Trick class
