document.addEventListener("DOMContentLoaded", () => {

    //Create image container
    imageContainer=document.getElementById("table")


    // Create metrics for mobile layout
    const metrics = createMobileMetrics();

    // Example: your North hand array
    const north_cards =[10,8,6,23,21,14,38,37,31,30,26,44,41];
    const south_cards=[11,9,1,25,23,19,36,35,28,51,47,46,43]
    const east_cards=[1,2,3,4,5,6,7,8,9,10,11,12,13]
    const west_cards=[1,2,3,4,5,6,7,8,9,10,11,12,13]


    // Display the hand
    northDisplayMobile(metrics, north_cards);
    southDisplayMobile(metrics,south_cards)
    westDisplayMobile(metrics,west_cards)
    eastDisplayMobile(metrics,east_cards)
    // eastDisplayMobile(metrics,east_cards)
});



function northDisplayMobile(metrics,cardNumbers){


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
        const leftPos=startX+(index*overlap)
        div.style.position="absolute";
        div.style.left=leftPos+"px"
        div.style.top=northOffset+"px";
        imageContainer.appendChild(div)
        index++
        }
}

function southDisplayMobile(metrics,cardNumbers){


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
        const leftPos=startX+(index*overlap)
        div.style.position="absolute";
        div.style.left=leftPos+"px"
        div.style.bottom = rect.height * 0.05 + "px";
        imageContainer.appendChild(div)
        index++
        }
}

function westDisplayMobile(metrics, cardNumbers) {

    const { cardHeight } = metrics;

    const containerRect = imageContainer.getBoundingClientRect();
    const containerHeight = window.innerHeight;

    const totalCards = cardNumbers.length;
    const overlapY = cardHeight * 0.2;

    const totalHeight = overlapY * (totalCards - 1) + cardHeight;
    const startY = (containerHeight - totalHeight) / 2;
    console.log(startY)

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

function eastDisplayMobile(metrics, cardNumbers) {

    const { cardHeight } = metrics;

    const containerRect = imageContainer.getBoundingClientRect();
    const containerHeight = window.innerHeight;

    const totalCards = cardNumbers.length;
    const overlapY = cardHeight * 0.2;

    const totalHeight = overlapY * (totalCards - 1) + cardHeight;
    const startY = (containerHeight - totalHeight) / 2;
    console.log("cardHeight= ",cardHeight)
    console.log("containerheight = ",containerHeight,"totalHeight = ",totalHeight, "startY = ",startY)

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



function createMobileMetrics() {

    const rect = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    // Convert CSS vw card size into pixel values for positioning
    const containerRect =imageContainer.getBoundingClientRect();
    const containerWidth=containerRect.width
    const cardWidth  = containerWidth * 0.12;   // matches 12vw
    const cardHeight = containerWidth * 0.18;   // matches 18vw

    const metrics = {
        rect,
        cardWidth,
        cardHeight,

        // Included for compatibility with your existing Player code
        overlap: cardHeight * 0.2,
        topMargin: rect.height * 0.02,

        // Where North’s hand should appear
        northOffset: rect.height * 0.05,
        southOffset: rect.height* 0.95,
    };

    return metrics;
}
