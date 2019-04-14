const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

//Variable pour verouiller la planche, initialisée à false
let lockBoard = false




function flipCard() {
    this.classList.toggle('flip');

    if (lockBoard) return;
    //previent un retour positive en cas de click sur la même carte
    if (this === firstCard) return;
    this.classList.add('flip');

    //si la carte est retourné alors elle est consideré comme la première
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //on tombe dans le else
    secondCard = this;
    lockBoard = true;


    checkFormat();
}
//Verification de l'egalité des cartes
function checkFormat() {
     if(firstCard.data.framework === secondCard.data.framework){
         disableCards();
         return;
     }
     unflipCards();

//    let isMacth = firstCard.dataset.name === secondCard.dataset.name;
//    isMacth ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventLister('click', flipCard);
    secondCard.removeEventLister('click', flipCard);
    resetBoard();
}

function unflipCards() {
    // à l'entré la planche est est deverouillé pour permettre de selectionner une carte
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        //La planche est verouillée  pour empecher toutes selections
        resetBoard();
    }, 1500);
}

//Definition d'une fonction pour la gestion de verouillage de la planche
function resetBoard() {
     [hasFlippedCard, lockBoard] = [false, false];
     [firstCard, secondCard] = [null, null];
}

//Pour la disposition alleatoire des cartes
(function shuffle() {
    cards.forEach(card => {
        let ramdomPosition = (Math.floor(Math.random) * 12);
        card.style.order = ramdomPosition;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
