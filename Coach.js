// Coach.js
// Mid-hand correction at the key decision points of a lesson.
// Key points are stored with each lesson in the deal library files (see DealLibraries.js) as "checkpoints":
//
//   "checkpoints": [
//     {
//       "trick": 2,            // EITHER the trick number (1-13) ...
//       "suitLed": 3,          // ... OR the first trick in which this suit is led (0=S 1=H 2=D 3=C)
//       "seat": "N",           // "S" = South's hand, "N" = dummy
//       "accept": [43, 44],    // card numbers that are correct
//       "play": 43,            // optional: card played after the 2nd miss
//       "hint": "...",
//       "explanation": "..."
//     }
//   ]
//
// First miss: card stays in the hand, shakes, hint shown, try again.
// Second miss: correct card named, explanation shown, Continue plays it.
// Correct after a miss: brief "Correct play" message.

const SEAT_HOLDER = { "S": 0, "N": 2 };
const SUIT_LETTERS = ['S', 'H', 'D', 'C'];

var coachMisses = {};   // checkpoint index -> number of misses

function resetCoach() {
	coachMisses = {};
	hideCoach();
}

function cardDisplayName(cardNumber) {
	const crd = new Card(cardNumber, 0);
	return crd.face + crd.suitSymbol;
}

// Warn in the console about checkpoint cards that are not in the right hand
function validateCheckpoints(deal) {
	const checkpoints = deal.checkpoints || [];
	checkpoints.forEach((cp, i) => {
		const holderNumber = SEAT_HOLDER[cp.seat];
		if (holderNumber === undefined) {
			console.warn(`${deal.name} checkpoint ${i}: seat must be "S" or "N", not`, cp.seat);
			return;
		}
		if (cp.trick === undefined && cp.suitLed === undefined) {
			console.warn(`${deal.name} checkpoint ${i}: needs "trick" or "suitLed"`);
		}
		const hand = holderNumber === 0 ? deal.south_cards : deal.north_cards;
		const cards = (cp.accept || []).concat(cp.play === undefined ? [] : [cp.play]);
		cards.forEach(cn => {
			if (!hand.includes(cn)) {
				console.warn(`${deal.name} checkpoint ${i}: ${cardDisplayName(cn)} (${cn}) is not in ${cp.seat}'s hand`);
			}
		});
	});
}

// Find the checkpoint (and its index) that applies to this play, if any
function findCheckpoint(cardNumber, holderNumber) {
	const checkpoints = Deals[Deals.length - 1].checkpoints || [];
	const trk = Tricks[Tricks.length - 1];
	const trickNumber = Tricks.length;
	const leadSuit = trk.cardArray.length == 0 ? suitFromCardNumber(cardNumber) : trk.leadSuit;
	const earlierTricks = Tricks.slice(0, -1);

	for (let i = 0; i < checkpoints.length; i++) {
		const cp = checkpoints[i];
		if (SEAT_HOLDER[cp.seat] !== holderNumber) continue;
		if (cp.trick !== undefined && cp.trick !== trickNumber) continue;
		if (cp.suitLed !== undefined) {
			const suitLetter = SUIT_LETTERS[cp.suitLed];
			if (leadSuit !== suitLetter) continue;
			if (earlierTricks.some(t => t.leadSuit === suitLetter)) continue;
		}
		return { cp, index: i };
	}
	return null;
}

// Called from playCard before the card is committed.
// Returns true if the card may be played, false if it has been rejected.
function checkKeyPlay(cardNumber, holderNumber) {
	const found = findCheckpoint(cardNumber, holderNumber);
	if (!found) return true;
	const { cp, index } = found;

	if (cp.accept.includes(cardNumber)) {
		if (coachMisses[index] > 0) {
			showToast("Correct play");
		}
		coachMisses[index] = 0;
		return true;
	}

	coachMisses[index] = (coachMisses[index] || 0) + 1;
	shakeCard(cardNumber, holderNumber);

	if (coachMisses[index] == 1) {
		showCoach("Not quite", cp.hint, "Try again", null);
		return false;
	}

	const hand = Players[holderNumber].Suits.flat();   // fullHand is not updated as cards are played
	let correctCard = cp.play;
	if (correctCard === undefined || !hand.includes(correctCard)) {
		correctCard = cp.accept.find(cn => hand.includes(cn));
	}
	coachMisses[index] = 0;
	showCoach("The correct play is " + cardDisplayName(correctCard), cp.explanation, "Continue", function () {
		playCard(correctCard, holderNumber, true);
	});
	return false;
}

function shakeCard(cardNumber, holderNumber) {
	const card = document.querySelector(
		`.playerCard[cardNumber="${cardNumber}"][holderNumber="${holderNumber}"]`
	);
	if (!card) return;
	card.classList.remove("shake");
	void card.offsetWidth;   // restart the animation
	card.classList.add("shake");
	card.addEventListener("animationend", () => card.classList.remove("shake"), { once: true });
}

function showCoach(title, text, buttonLabel, onClose) {
	noClicking = true;
	document.getElementById("coachTitle").innerText = title;
	document.getElementById("coachText").innerText = text || "";
	const button = document.getElementById("coachButton");
	button.innerText = buttonLabel;
	button.onclick = function () {
		hideCoach();
		if (onClose) onClose();
	};
	document.getElementById("coachPanel").classList.remove("hidden");
}

function hideCoach() {
	document.getElementById("coachPanel").classList.add("hidden");
	document.getElementById("coachToast").classList.add("hidden");
	noClicking = false;
}

function showToast(message) {
	const toast = document.getElementById("coachToast");
	toast.innerText = message;
	toast.classList.remove("hidden");
	safeSetTimeout(() => toast.classList.add("hidden"), 1500);
}
