const holes = document.querySelectorAll('.hole');
let scoreCounter = document.getElementById('score')
let timeCounter = document.getElementById('time')
let timer = 30; 
let score = 0;
let mole = null;
let gameInterval = null;
let gameTimerInterval = null;

//functie om een random hole selecteren
function randomHole(){
    const index = Math.floor(Math.random() * holes.length); //een random index genereren met math.random * hoeveelheid holes die er zijn, naar beneden afgerond met math.floor 
    return holes[index]; //hole returnen naar die index 
}

//functie om mole te laten zien in een random hole
function showMole() {
    if (mole) {
        mole.remove(); // verwijdert mole uit het huidige hole
    }
    const hole = randomHole(); // selecteert een random hole
    const moleImage = document.createElement('img');
    moleImage.src = 'mol.png';
    moleImage.alt = 'mole';
    moleImage.classList.add('mole');
    hole.appendChild(moleImage); //plaatst moleImage in hole element
    mole = moleImage; // sla de nieuwe mol op als het huidige mol element
}

//functie om het spel te starten
function startGame(){
    score = 0; //resets score naar 0
    timer = 30; //resets timer naar 30 seconden
    mole = null; //resets mole
    scoreCounter.textContent = score; //update score
    timeCounter.textContent = timer; //update timer
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    gameInterval = setInterval(showMole,700); //na elke 700 milliseconden komt er een mole tevoorschijn
    gameTimerInterval = setInterval(gameTimer,1000); //na elke seconde update de timer
}

//functie voor de timer
function gameTimer(){
    timer--; //verlaagt timer met steeds min 1
    timeCounter.textContent = timer; //gekoppeld aan timer variable om weergave van de timercounter te veranderen
    if(timer=== 0){ //controleert of de timer op de 0 is 
        alert('Game over! Your score is: ' + score); //als timer op 0 is krijg je een alert/bericht dat zegt wat je behaalde score is
        clearInterval(gameInterval); //stopt met het vertonen van moles
        clearInterval(gameTimerInterval); // stopt de timer
        gameInterval = null; //resets de game interval
        gameTimerInterval = null; //resets de timer interval
    }
}

//functie om de mol te slaan
function hitMole(event){
    if(event.target.classList.contains('mole')){ //controleert of het element dat geklikt wordt een mole bevat
        if(gameInterval === null){ //als het game niet gestart is, wordt het gestart als je op een mole klikt
            startGame();
        }
        score ++; //score gaat omhoog met 1 als je een mole slaat
        scoreCounter.textContent = score; //score counter verandert van weergave door de score variable
        event.target.remove(); //verwijdert mole van hole
        mole = null; //resets mole
    }
}

//event listener voor het klikken op mole
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('mole')) {
        hitMole(event); //functie hitMole wordt aangeropen en geeft het door aan de event object
    }
});

//toont de eerste mole bij het laden van de pagina
window.onload = showMole;
