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
		this.trumpSuit=Deals[Deals.length-1].bidSuit
		this.leadSuit =" ";
		this.theHighCard=0;
		this.highestRankingPlayer =0;
		this.winningCardNumber=0
		this.winningCardRank=0
		this.trickScored=false
		this.scardsScooped = false
		this.beenHere=false
		this.noTrump = false
		this.leadSuitNumber= -1
		if (Deals[Deals.length-1].bidSuit=='N'){
			this.noTrump=true

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
	let suitNum =suitNumberFromCardNumber(crd)
	var cn = crd;
	var hn = this.toPlay;
	let trumpSuit=Deals[Deals.length-1].bidSuit

	let followSuit=true
	let cardIsTrump=false
	if (crd.suit!=this.leadSuit)
	{followSuit=false}
	if(this.noTrump==false){
	if (crd.suit==trumpSuit)
	{this.trumpPlayed=true}
	}
			if (this.cardArray.length==0)
					{//start if 
					this.toPlay=crd.holderNumber;
					this.leadSuit=crd.suit;
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
	
	tempArray.forEach(card=>{
		let rv = card.rankValue
		if (card.suit!=this.leadSuit && card.suit!=this.trumpSuit)
			{card.rankValue=0
				return
			}
			if (this.trumpPlayed==true&& card.suit!=this.trumpSuit){
				card.rankValue=0
				return
			}
	})
tempArray.sort((a,b)=>b.rankValue - a.rankValue);
let last = tempArray.length -1;

if(tempArray[0].rankValue<tempArray[last].rankValue){
	tempArray.reverse()
}

if (flag==true){
	flag=flag		
}
this.winningCardRank=tempArray[0].rankValue
this.winningPlayer= tempArray[0].holderNumber
this.winningCardNumber = tempArray[0].cardNumber
let name = tempArray[0].name

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
