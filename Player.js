class Player {
constructor(name,position){
		this.name = name;
		this.Position =position;
		this.canClick=false;
		this.Suits=[]
		this.Spades=[];
		this.Suits.push(this.Spades)
		this.Hearts = [];
		this.Suits.push(this.Hearts)
		this.Diamonds=[];
		this.Suits.push(this.Diamonds)
		this.Clubs= [];
		this.Suits.push(this.Clubs)
		this.fullHand=[];
		this.leads=[];
		this.discards=[];
		this.partnerLeadSuit="";
		this.myLeadSuit=""
		this.numberOfCards=13
		this.holderNumber
		this.findHolderNumber(name)
		this.autoList=[]
		this.fillAutoList(name)
				
}
findHolderNumber(name){
switch(this.name){
	case "South":
		this.holderNumber=0
		break;
	case "West":
		this.holderNumber=1
		break;
	case "North":
		this.holderNumber=2
		break;
	case "East":
		this.holderNumber=3
		break;
}
}


fillAutoList(name){
switch(name){
case "South":
	this.autoList=[29,32,23,25,0,12,10,50,49,42,1,6,3]
	break

case "North":
	this.autoList=[27,31,36,16,11,2,5,39,44,51,45,19,21]

	break
	case "East":
		this.autoList=[33,34,8,14,15,17,40,41,47,48,18,20,22]

	break;
	case "West":
			this.autoList=[38,37,26,13,4,7,9,43,46,28,30,24,35]
			break
	



}


}

clearHand(){
this.Spades.length=0
this.Hearts.length=0
this.Diamonds.length=0
this.Clubs.length=0
this.fullHand.length=0
this.leads.length=0
this.discards.length=0
this.partnerLeadSuit=""
this.myLeadSuit=""

}
DisplayBack(){
	console.log('gone into displayBack')
	if (this.name=='West')
	{flag=flag}
	let startLeft=40
	if (this.name=='East'){startLeft=window.innerWidth-150}


	let numberOfCards=this.numberOfCards
	let cdWidth =85 
	let spacing =20
	let backDisplayHeight= (25*numberOfCards)+60
	let windowHeight=window.innerHeight
	let tPosition=(windowHeight-backDisplayHeight)/2
	const imageContainer=document.getElementById("imageContainer")
	for (let i = 0; i < numberOfCards; i++) {
  	let image = new Image();
  	image.className = "cardBack";
	image.src = "C:/Users/sgcam/Projects/BWARepo/_Red_Back.jpg";
	image.setAttribute('data-side',this.name)
	image.alt = "playerCard";
	image.style.width="85px";
	image.style.height="120px";
	image.style.position="absolute"
	image.setAttribute('holderNumber', '1');

  // Set fixed horizontal position (aligned vertically)
  	image.style.left = startLeft + "px";

  	let topPos = tPosition //+ i * (100 + spacing); // 100 is height, adjust spacing as needed
  	image.style.top = topPos + "px";

	image.style.transform = "rotate(90deg)";
	image.style.transformOrigin = "center";
	tPosition+=spacing

  	if (imageContainer) {
    	imageContainer.appendChild(image);
  }
}
}

removeCardBack(){

	let nowTp = Tricks[Tricks.length-1].toPlay;
	let backImages=[]
	switch(nowTp){
		case 1:
			backImages = document.querySelectorAll('img[data-side="West"]');
			break
		case 3:
			backImages= document.querySelectorAll('img[data-side="East"]');
			break;
	}

if (backImages.length > 0) {
  // Step 2: Find the topmost image (smallest top position)
  let topmostImage = backImages[0];
  let minTop = parseFloat(backImages[0].style.top);

  for (let img of backImages) {
    const topPos = parseFloat(img.style.top);
    if (topPos < minTop) {
      minTop = topPos;
      topmostImage = img;
    }
  }
  topmostImage.remove()

}
}//end removeCardBack


	clearData(){
		this.name = "";
		this.Position ="";
		this.canClick=false;
		this.Suits.length = 0;
		this.Spades.length = 0;
		this.Hearts.length = 0;
		this.Hearts.length = 0;
		this.Diamonds.length = 0;
		this.Clubs.length = 0;
		this.fullHand.length = 0;
		this.leads.length = 0;
		this.discards.length = 0;
		this.partnerLeadSuit="";
	}
	


	addCard(cardNumber){
		
		
			var cardSuit = this.suitFromCardNumber(cardNumber);
			switch (cardSuit){
				case "S":
				this.Spades.push(cardNumber);
				this.Spades.sort(function(a,b){
		return (b-a)

					
				});
				
				break;
				case "H":
				this.Hearts.push(cardNumber);
				this.Hearts.sort(function(a,b){
		return (b-a)
				});
				break;
				case "D":				
				this.Diamonds.push(cardNumber);
				this.Diamonds.sort(function(a,b){
		return (b-a)
				});
				break;
				case "C":
				this.Clubs.push(cardNumber);
				this.Clubs.sort(function(a,b){
		return (b-a);
				});
				break;
			}
			this.suitsIntoHand();
		
	}
	removeCard(cardNumber,holderNumber){//start removeCard
		let hn = holderNumber
		if (flag==true)
			{
				flag=flag
			}
	
	
	
		var cd= new Card(cardNumber,0)
		var st = cd.suit;
	
		switch(st){//start switch
		case "S":
			var indexToRemove = this.Spades.indexOf(cardNumber);		
			this.Spades.splice(indexToRemove, 1);	
			break;
		case "H":
			var indexToRemove = this.Hearts.indexOf(cardNumber);		
			this.Hearts.splice(indexToRemove, 1);
			break; 
		case "D":
			var indexToRemove = this.Diamonds.indexOf(cardNumber);
			this.Diamonds.splice(indexToRemove, 1);
			break;
			case "C":
				var indexToRemove = this.Clubs.indexOf(cardNumber);
				this.Clubs.splice(indexToRemove, 1);
				
			}//end switch
			
		
	}//end removeCard

	


	
	suitFromCardNumber (cardNumber){
		var CN=new Card(cardNumber);		
		return CN.suit;
	}
	///***WEST DISPLAY***
	oldWestDisplay(metrics){///start westDisplay
	const { rect,  cardHeight, } = metrics;
	let totalCardsHeight = cardHeight * 4;
	const spacer = (rect.height - totalCardsHeight) / 4;
   let tpMargin = spacer / 2;
   const spaceAndCardHeight = spacer + cardHeight;

    const spadeTop    = tpMargin;
    const heartTop    = tpMargin + spaceAndCardHeight;
    const diamondTop  = tpMargin + spaceAndCardHeight * 2;
    const clubTop     = tpMargin + spaceAndCardHeight * 3;

	 this.renderSuit(this.Spades,   metrics, spadeTop,1);
    this.renderSuit(this.Hearts,   metrics, heartTop,1);
    this.renderSuit(this.Diamonds, metrics, diamondTop,1);
    this.renderSuit(this.Clubs,    metrics, clubTop,1);
	}

	
///****SOUTH DISPLAY***
	southDisplay(metrics,cardNumbers){


    const { rect, cardWidth, cardHeight ,northOffset,southOffset} = metrics;
    const containerRect=imageContainer.getBoundingClientRect();
    const containerWidth =containerRect.width
    const totalCards=cardNumbers.length
    const overlap=cardWidth*0.35
    const totalWidth =overlap*(totalCards-1)+cardWidth
    const startX= (containerWidth-totalWidth)/2




    let index = 0
    for (let cardNumber of cardNumbers){
       
        let card = new Card(cardNumber,2)
        const div= document.createElement("div");
        div.className="card playerCard";
        div.setAttribute("data-rank",card.face)
        div.setAttribute("data-suit",card.suitSymbol)
		div.setAttribute("cardNumber", card.cardNumber);
		div.setAttribute("holderNumber", this.holderNumber);

        const leftPos=startX+(index*overlap)
        div.style.position="absolute";
        div.style.left=leftPos+"px"
        div.style.bottom = rect.height * 0.05 + "px";
		div.addEventListener("click", this.cardPlayEventListener);
        imageContainer.appendChild(div)
        index++
        }
}

		





		
		
		
		
	///end southDisplayMetrics
		oldSouthDisplay(){	

		const rect =imageContainer.getBoundingClientRect();
		let topPosition = rect.height - 120 + "px";
	
	
		var pageWidth= window.innerWidth;
		var fanWidth= 85 + (25* (this.fullHand.length-1));
		const cLeftPosition=(pageWidth-fanWidth)/2;
		var leftPosition = cLeftPosition;
		for (var i = 0; i< this.fullHand.length; i++)
			{//start for loop
				var cardNumber = this.fullHand[i];
				var card= new Card(cardNumber);
				let Southimage = new Image();
				Southimage.id = card.name;
				Southimage.className="playerCard";
				Southimage.src=card.src;
				Southimage.alt=card.name;
				Southimage.setAttribute('cardNumber',card.cardNumber);
				Southimage.setAttribute('holderNumber','0');
				Southimage.style.width="85px";
				Southimage.style.height="120px";
				Southimage.style.borderRadius='5px';
				Southimage.style.position='absolute';
				Southimage.style.left = leftPosition+"px";
				Southimage.style.top = topPosition;
		
				Southimage.addEventListener("click",function()
						{ //start event listener function
						 
							let cn = Southimage.getAttribute('cardNumber');
							flag=flag
            	let hn = Southimage.getAttribute('holderNumber');
            playCard(cn,hn);		
						});//end event listener function							
				leftPosition +=25;
				imageContainer.appendChild(Southimage);
				}//end for loop 
		}//END southdISPLAY.
		
		///***EAST DISPLAY

	
	 westDisplay(metrics, cardNumbers) {

    const { cardHeight } = metrics;

    const containerRect = imageContainer.getBoundingClientRect();
    const containerHeight = window.innerHeight;

    const totalCards = cardNumbers.length;
    const overlapY = cardHeight * 0.2;

    const totalHeight = overlapY * (totalCards - 1) + cardHeight;
    const startY = (containerHeight - totalHeight) / 2;

    let index = 0;

    for (let cardNumber of cardNumbers) {

        const div = document.createElement("div");
        div.className = "card cardBack";

        const topPos = startY + index * overlapY;

        div.style.position = "absolute";
        div.style.top = topPos + "px";
        div.style.left = "0px";

        imageContainer.appendChild(div);
        index++;
    }
}

 eastDisplayMobile(metrics, cardNumbers) {

    const { cardHeight } = metrics;

    const containerRect = imageContainer.getBoundingClientRect();
    const containerHeight = window.innerHeight;

    const totalCards = cardNumbers.length;
    const overlapY = cardHeight * 0.2;

    const totalHeight = overlapY * (totalCards - 1) + cardHeight;
    const startY = (containerHeight - totalHeight) / 2;
    
    let index = 0;

    for (let cardNumber of cardNumbers) {

        const div = document.createElement("div");
        div.className = "card cardBack";

        const topPos = startY + index * overlapY;

        div.style.position = "absolute";
        div.style.top = topPos + "px";
        div.style.right = "0px";

        imageContainer.appendChild(div);
        index++;
    }
}

		oldEastDisplay(metrics) {
		const { rect, cardWidth, cardHeight, overlap, topMargin, bottomMargin } = metrics;
		let totalCardsHeight = cardHeight * 4
		const spacer = (rect.height-totalCardsHeight)/4
		let tpMargin = spacer/2
		const spaceAndCardHeight=spacer+cardHeight


		const spadeTop    = tpMargin;
		const heartTop    = tpMargin +spaceAndCardHeight
		const diamondTop= tpMargin + spaceAndCardHeight*2 
		const clubTop = tpMargin +spaceAndCardHeight*3


    this.renderSuit(this.Spades,   metrics,spadeTop,3);
    this.renderSuit(this.Hearts,   metrics,heartTop,3);
    this.renderSuit(this.Diamonds, metrics,diamondTop,3);
    this.renderSuit(this.Clubs,    metrics, clubTop,3);
}

		eastDisplay(metrics){///start eastDisplay The Real eastDisplay
	//Putting Down Spades
	const rect =metrics.rect;
	const cardWidth=metrics.cardWidth;
	const cardHeight=metrics.cardHeight;
	const overlap = metrics.overlap
	const topMargin=metrics.topMargin;
	const bottomMargin = metrics.bottomMargin
		
	
	///Layout Spades for East
	 let EleftPosition=rect.width*.03;
	let yspacer=cardHeight*0.6;
	let spadetopPosition = yspacer;

	
	this.Spades.sort(function(a, b) {
				return b - a;
				});
	
	for (var spadeCounter=0; spadeCounter<this.Spades.length; spadeCounter++){///start for loop
		var spadeCardNumber = this.Spades[spadeCounter];
		var spadeCard=new Card(spadeCardNumber);
		let ESimage = new Image();
		ESimage.className="playerCard";

		ESimage.id=spadeCard.name;
		ESimage.src=spadeCard.src;
		ESimage.alt=spadeCard.name;
		ESimage.setAttribute('cardNumber',spadeCard.cardNumber);
		ESimage.setAttribute('holderNumber','3');
		ESimage.style.width=cardWidth+"px";
		ESimage.style.height=cardHeight+"px";
		ESimage.style.position='absolute';
		ESimage.style.left =EleftPosition+"px";
		ESimage.style.top =spadetopPosition +"px";
		ESimage.addEventListener("click",function()
						{this.cardPlayEventListener()
						 
										
						});//end event listener function


		
		EleftPosition +=25;
		
	  imageContainer.appendChild(ESimage);
	}///end for loop
	///end putting down spades
	///putting down Hearts

 yspacer = cardHeight * 0.6;   // 60% of card height		
		eastLeftPosition=rect.width -250;
		this.Hearts.sort(function(a, b) {
					  return b - a;
				});
		for (var heartCounter=0; heartCounter<this.Hearts.length; heartCounter++){///start for loop
			var heartCardNumber = this.Hearts[heartCounter];
			var heartCard=new Card(heartCardNumber);
			let EHimage = new Image();
			EHimage.className="playerCard";

			EHimage.id = heartCard.name;
			EHimage.src=heartCard.src;
			EHimage.alt=heartCard.name;
			EHimage.setAttribute('cardNumber',heartCard.cardNumber);
			EHimage.setAttribute('holderNumber','3');
			EHimage.style.width="85px";
			EHimage.style.height="120px";
			EHimage.style.position='absolute';
			EHimage.style.left = eastLeftPosition+"px";
			EHimage.style.top =heartTopPosition +"px";
			eastLeftPosition +=25;
			EHimage.addEventListener("click",function()
						{ this.cardPlayEventListener()
						 
									
						});//end event listener function
			imageContainer.appendChild(EHimage);
		}///end for loop
		eastLeftPosition +25;	
	
	///End putting down hearts
	///Putting down Diamonds
	
	eastLeftPosition = rect.width -250;	
		var screenHeight = screen.height;
		 yspacer = cardHeight * 0.6;   // 60% of card height

		this.Diamonds.sort(function(a, b) {
					  return b - a;
		  });
		for (var diamondCounter=0; diamondCounter<this.Diamonds.length; diamondCounter++){///start for loop
			var diamondCardNumber = this.Diamonds[diamondCounter];
			var diamondCard=new Card(diamondCardNumber);
			let EDimage = new Image();
			EDimage.className="playerCard";

			EDimage.id=diamondCard.name;
			EDimage.src=diamondCard.src;
			EDimage.alt=diamondCard.name;
			EDimage.setAttribute('cardNumber',diamondCard.cardNumber);
			EDimage.setAttribute('holderNumber','3');
			EDimage.style.width="85px";
			EDimage.style.height="120px";
			EDimage.style.position='absolute';
			EDimage.style.left = eastLeftPosition+"px";
			EDimage.style.top =diamondTopPosition +"px";
			EDimage.addEventListener("click",function()
						{ this.cardPlayEventListener()
						 
							
						});//end event listener function
			eastLeftPosition += 25;
			imageContainer.appendChild(EDimage);
			
		}///end for loop
		///end putting down Diamonds
		
		///start putting down Clubs
		eastLeftPosition = rect.width -250;
		var screenHeight = screenheight;
		 yspacer = cardHeight * 0.6;   // 60% of card height
// 		var clubTopPosition = (yspacer*4)+300;
		this.Clubs.sort(function(a, b) {
					  return b - a;
		  });
		for (var clubCounter=0; clubCounter<this.Clubs.length; clubCounter++){///start for loop
			var clubCardNumber = this.Clubs[clubCounter];
			var clubCard=new Card(clubCardNumber);
			let ECimage = new Image();
			ECimage.className="playerCard";
			ECimage.id=clubCard.name;
			ECimage.src=clubCard.src;
			ECimage.alt=clubCard.name;
			ECimage.setAttribute('cardNumber',clubCard.cardNumber);
			ECimage.setAttribute('holderNumber','3');
			ECimage.style.width="85px";
			ECimage.style.height="120px";
			ECimage.style.position='absolute';
			ECimage.style.left = eastLeftPosition+"px";
			ECimage.style.top =clubTopPosition +"px";
			ECimage.addEventListener("click",function()
						{ this.cardPlayEventListener();		
						});//end event listener function	
						eastLeftPosition += 25;
			imageContainer.appendChild(ECimage);
			
		}///end for loop
		
		
		
		
		
	}///end eastDisplay


//start renderEastSuit
	renderEastSuit(cards, metrics, topPosition, holderNumber = 3) {
    const { rect, cardWidth, cardHeight } = metrics;

    // Start near the right edge
    let left = rect.width - cardWidth - rect.width * 0.03;

    // Move leftwards for each card
    const increment = cardWidth * 0.30;

    cards.sort((a, b) => b - a);
	

	if (cards.length >1){
	let first = cards[0]
	let last = cards[cards.length-1]

		if (first < last){
			cards.reverse()
		}
	}

	 const marginRight = rect.width * 0.03;
    const startLeft = rect.width - marginRight - (cardWidth * 3); 
	left =startLeft

    for (let num of cards) {
        const card = new Card(num);
        const img = new Image();

        img.className = "playerCard";
        img.id = card.name;
        img.src = card.src;
        img.alt = card.name;

        img.setAttribute("cardNumber", card.cardNumber);
        img.setAttribute("holderNumber", holderNumber);

        img.style.width = cardWidth + "px";
        img.style.height = cardHeight + "px";
        img.style.position = "absolute";

        img.style.left = left + "px";
        img.style.top = topPosition + "px";

        img.addEventListener("click", () => {
            playCard(card.cardNumber, holderNumber);
        });

        imageContainer.appendChild(img);

        // Move leftwards
        left += increment;
    }
}
renderSuit(cards, metrics, topPosition, holderNumber) {
    const { rect, cardWidth, cardHeight } = metrics;

    const increment = cardWidth * 0.30;

    // Sort high → low
    cards.sort((a, b) => b - a);

    // Fix ordering if needed
    if (cards.length > 1) {
        let first = cards[0];
        let last = cards[cards.length - 1];
        if (first < last) {
            cards.reverse();
        }
    }

    // Decide starting X based on holderNumber
    let left;

    if (holderNumber === 1) {
        // WEST: start near left edge
        left = rect.width * 0.03;
    } else if (holderNumber === 3) {
        // EAST: start near right edge
        const marginRight = rect.width * 0.03;
        left = rect.width - marginRight - (cardWidth * 3);
    }

    // Lay out the cards
    for (let num of cards) {
        const card = new Card(num);
        const img = new Image();

        img.className = "playerCard";
        img.id = card.name;
        img.src = card.src;
        img.alt = card.name;

        img.setAttribute("cardNumber", card.cardNumber);
        img.setAttribute("holderNumber", holderNumber);

        img.style.width = cardWidth + "px";
        img.style.height = cardHeight + "px";
        img.style.position = "absolute";

        img.style.left = left + "px";
        img.style.top = topPosition + "px";

        img.addEventListener("click", () => {
            playCard(card.cardNumber, holderNumber);
        });

        imageContainer.appendChild(img);

        // Both sides fan to the right
        left += increment;
    }
}



//render Eastsuit

	 computeLayoutMetrics(imageContainer) {

	let cardWidth;
	

    const rect = imageContainer.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
	 if (vw >= 1400) {
        cardWidth = vw * 0.06;
    }
    else if (vw >= 900) {
        cardWidth = vw * 0.08;
    }
    else if (vw >= 600) {
        cardWidth = vw * 0.11;
    }
    else {
        cardWidth = vw * 0.14;  

    // Card size based on screen width
    const cardHeight = cardWidth * 1.4;

    // Overlap still based on card width
    const overlap = cardWidth * 0.3;

    // Vertical spacing based on viewport height
    const topMargin    = vh * 0.03;
    const bottomMargin = vh * 0.03;
    const northOffset  = vh * 0.05;
    const southOffset  = vh * 0.05;

    return { rect, cardWidth, cardHeight, overlap, topMargin, bottomMargin, northOffset, southOffset };
}
	 }

	
	
	displayHand(){//start display hand function
	const container = document.getElementById("imageContainer");
    const metrics = this.computeLayoutMetrics(container);


	
	switch(this.Position){ ///start switch code
		case "South":
			this.southDisplay(metrics,this.fullHand); 
			break;
		case "North":
			this.northDisplay(metrics,this.fullHand);
			break;
		case "East":
			if (showCards){
				this.oldEastDisplay(metrics)
			}
			else{
					this.eastDisplayMobile(metrics,this.fullHand);
			}

			break
		case "West":
			if (showCards){
				this.oldWestDisplay(metrics)
			}
			else{
			this.westDisplay(metrics,this.fullHand);
			}
			break
	}/// end switch statement

			
			
			

	
	/// end switch statement
	
	}//end displayhand
	///******NORTH DISPLAY******

	northDisplay(metrics,cardNumbers){


    const { rect, cardWidth, cardHeight ,northOffset} = metrics;
    const containerRect=imageContainer.getBoundingClientRect();
    const containerWidth =containerRect.width
    const totalCards=cardNumbers.length
    const overlap=cardWidth*0.35
        const totalWidth =overlap*(totalCards-1)+cardWidth
        const startX= (containerWidth-totalWidth)/2



    let index = 0
    for (let cardNumber of cardNumbers){
   

        let card = new Card(cardNumber,2)
        const div= document.createElement("div");
        div.className="card playerCard";
        div.setAttribute("data-rank",card.face)
        div.setAttribute("data-suit",card.suitSymbol)
		div.setAttribute("cardNumber", card.cardNumber);
		div.setAttribute("holderNumber", this.holderNumber);

        const leftPos=startX+(index*overlap)
        div.style.position="absolute";
        div.style.left=leftPos+"px"
        div.style.top=northOffset+"px";
		div.addEventListener("click", this.cardPlayEventListener);
        imageContainer.appendChild(div)
        index++
        }
	}



	
	
	
	
	sortSuit(suitArray){
		suitArray.sort(function(a,b){
		return (b-a)
		});
	}
	
	suitsIntoHand(){//start suitsIntoHand
		this.sortSuit(this.Spades);
		this.sortSuit(this.Hearts);
		this.sortSuit(this.Diamonds);
		this.sortSuit(this.Clubs);
		this.fullHand.splice(0);
		this.fullHand.push(...this.Spades,...this.Hearts,...this.Diamonds,...this.Clubs);
	}//end suitsIntoHand
} //end Player

Player.prototype.cardPlayEventListener = function (e) {
	if (flag==true){
			flag=flag


	}
	// if (noClicking==true){
	// 	return
	// }
	
    const img = e.currentTarget;
    const cn = img.getAttribute("cardNumber");
    const hn = img.getAttribute("holderNumber");
       playCard(cn, hn);
};
