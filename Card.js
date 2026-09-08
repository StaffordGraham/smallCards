


class Card 


	{
	constructor (cardNumber,holderNumber){
	
		this.cardNumber=cardNumber;
		this.name=this.calculateName(this.cardNumber)
		this.suit=this.calculateSuitName(cardNumber);
		this.face= this.calculateFace(cardNumber)
		this.faceValue=cardNumber%13
		this.rankValue=cardNumber%13
		this.src=this.name +".jpg"
		this.holderNumber=holderNumber;
		this.suitNumber=Math.floor(cardNumber/13)
		this.suitName = this.calculateSuitName(cardNumber)
		this.suitSymbol=this.calculateSuitSymbol(cardNumber)
		}
	
calculateName(cardNumber){
	//console.log('in calculateName')
	let cardNames=[]
	cardNames=["2","3","4","5","6","7","8","9","T","J","Q","K","A"]
	let suits=["S","H","D","C"]
	let SN=suits[Math.floor(cardNumber/13)]
	let fc=cardNumber%13
	let fcn=cardNames[fc]
	return fcn+SN

}
calculateSuitName(cardNumber){
	 const suits=["S","H","D","C"]
	 let SN = Math.floor(cardNumber/13)
	 let answer= suits[SN]
	 return answer

}
calculateSuitSymbol(cardNumber){
const suitSymbols = ["♠", "♥", "♦", "♣"];
	 let SN = Math.floor(cardNumber/13)
	 let answer= suitSymbols[SN]
	 return answer


}


calculateFace(cardNumber){
	var facenumber=Math.floor(cardNumber%13);
	var faceName ="";
	switch(facenumber){
		case 0:
			faceName="2";
			break
		case 1:
			faceName ="3";
			break
		case 2:
			faceName ="4";
			break
		case 3:
			faceName="5";
			break
		case 4:
			faceName="6";
			break
		case 5:
			faceName ="7";
			break
		case 6:
		faceName = "8";
		break
		case 7:
			faceName="9";
			break
		case 8:
			faceName="T";
			break
		case 9:
			faceName="J";
			break
		case 10:
			faceName="Q";
			break
		case 11:
			faceName="K";
			break
		case 12:
			faceName="A";
			break
		
	}//end switch
	return faceName;
	
}//end calculateFace


	CalculateSRC(){

		return this.name+".jpg";

	}
	calculateFaceValue(cardNumber){
	cardNumber = parseInt(cardNumber);
		var faceValue=cardNumber%13;
		return faceValue;
	}
	

	
	}
