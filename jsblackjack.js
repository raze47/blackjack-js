document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

let blackjackGame = {
    'you': {'scoreSpan': '#player-value', 'div': '#player-box','value': 0},
    'dealer': {'scoreSpan': '#dealer-value', 'div': '#dealer-box','value': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K','Q', 'J','A'],
    'value' : {'2': 2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'Q':10, 'J':10, 'A':[1, 11]},
};

const PLAYER = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const CARDS = blackjackGame['cards'];
const VALUE = blackjackGame['value'];

const HITSOUND = new Audio("swish.m4a");
const AWSOUND = new Audio("aww.mp3");
const WINSOUND = new Audio("cash.mp3");
let WIN;

let win_counter=0, lose_counter=0, draw_counter=0;
//What about dealer?
function blackjackHit(){
  let card =  randomCards();
 
  changeScore(card, PLAYER);
  showCard(card, PLAYER);
}

function blackjackStand(){
    dealerLogic();
   WIN = computeWinner();
}

function dealerLogic(){

  

     while(DEALER['value'] <= 21){
        let card = randomCards();


        if(DEALER['value'] <= 10){
           
            changeScore(card, DEALER);
            showCard(card, DEALER);
        }
        else if(DEALER['value']>10 && DEALER['value']<=13 &&( Math.floor(Math.random()*4) === 1 || Math.floor(Math.random()*4) === 0 || Math.floor(Math.random()*4) === 2)){
            
            changeScore(card, DEALER);
            showCard(card, DEALER);
        }
        else if(DEALER['value']>13 && DEALER['value']<=16 &&( Math.floor(Math.random()*5) === 1 || Math.floor(Math.random()*5) === 0|| Math.floor(Math.random()*5) === 2)){
           
            changeScore(card, DEALER);
            showCard(card, DEALER);
        }
        else if(DEALER['value']>16 && DEALER['value']<=19 &&( Math.floor(Math.random()*6) === 1 || Math.floor(Math.random()*6) === 0|| Math.floor(Math.random()*6) === 2)){
          
            changeScore(card, DEALER);
            showCard(card, DEALER);
        }
        else if(DEALER['value']>=20 && DEALER['value']<=21 &&( Math.floor(Math.random()*7) === 1|| Math.floor(Math.random()*7) === 0|| Math.floor(Math.random()*7) === 2)){
           
            changeScore(card, DEALER);
            showCard(card, DEALER);
        }
        else if(Math.floor(Math.random()*4 === 1)){
            changeScore(card, DEALER);
            showCard(card, DEALER);
            
        
        }
        else{
            console.log("I'm good");
            break;
        }

        
    }
  

    

      
}

function computeWinner(){

    let winner;
    if(PLAYER['value'] <= 21 && DEALER['value'] > 21)
        winner = PLAYER;
    else if(PLAYER['value'] <= 21 && DEALER['value'] <= 21 && PLAYER['value']>DEALER['value'])
        winner = PLAYER;
    else if(PLAYER['value'] > 21 && DEALER['value'] > 21 && PLAYER['value']<DEALER['value'])
        winner = PLAYER;
    else if(PLAYER['value'] <= 21 && DEALER['value'] <= 21 && PLAYER['value']<DEALER['value'])
        winner = DEALER;
    else if(PLAYER['value'] > 21 && DEALER['value'] > 21 && PLAYER['value']>DEALER['value'])
         winner = DEALER;
    else if(PLAYER['value'] > 21 && DEALER['value'] <= 21)
         winner = DEALER;
    else
        winner = "It's a draw!";
    
    if(winner === PLAYER){
        document.querySelector(winner['scoreSpan']).textContent = "Win!";
        document.querySelector(winner['scoreSpan']).style.color = "blue";
        console.log("Player wins!");
        document.querySelector(DEALER['scoreSpan']).textContent = "Lose!";
        document.querySelector(DEALER['scoreSpan']).style.color = "red";
        WINSOUND.play();
    }
    else if(winner === DEALER){
         document.querySelector(winner['scoreSpan']).textContent = "Win!";
         document.querySelector(winner['scoreSpan']).style.color = "blue";
        console.log("Dealer wins!");
        document.querySelector(PLAYER['scoreSpan']).textContent = "Lose!";
        document.querySelector(PLAYER['scoreSpan']).style.color = "red";
        AWSOUND.play();
    }
    else{
        console.log(winner);
    }
    console.log("Player score: "+PLAYER['value']);
    console.log("Dealer score: "+DEALER['value']);
    
    return winner;
}


function randomCards(){
   let card = Math.floor(Math.random()*13);
   return CARDS[card];
}

function changeScore(card_index, activePlayer){

    if(card_index === 'A'){

        if(activePlayer['value'] + VALUE[''+card_index][1] <= 21)
            activePlayer['value'] += VALUE[''+card_index][1];
        else
            activePlayer['value'] += VALUE[''+card_index][0];

    }
    else
        activePlayer['value'] += VALUE[''+card_index];
   
    if(activePlayer['value'] > 21){
        let actual_winner = computeWinner();
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['value'];
    }
}

function showCard(card, activePlayer){
    if(activePlayer['value']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HITSOUND.play();
    }
    else{   
        let cardImage = document.createElement('img');
        cardImage.src = `${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        if(activePlayer === PLAYER){
            document.querySelector(activePlayer['scoreSpan']).textContent = "Lose!";
            document.querySelector(activePlayer['scoreSpan']).style.color = "red";
             AWSOUND.play();

          }
        else{
            document.querySelector(activePlayer['scoreSpan']).textContent = "Lose!";
            document.querySelector(activePlayer['scoreSpan']).style.color = "red";
             WINSOUND.play();
        }
    }
 
}

function blackjackDeal(){
    changeTable();
    let playerImages = document.querySelector(PLAYER['div']).querySelectorAll('img');
    let dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');

    for(let i=0; i<playerImages.length; i++)
      playerImages[i].remove();
    for(let i=0; i<dealerImages.length; i++)
      dealerImages[i].remove(); 

    PLAYER['value'] = 0;
    DEALER['value'] = 0;

    document.querySelector(PLAYER['scoreSpan']).textContent = 0;
    document.querySelector(DEALER['scoreSpan']).textContent = 0;
    document.querySelector(PLAYER['scoreSpan']).style.color = "white";
    document.querySelector(DEALER['scoreSpan']).style.color = "white";
  //  console.clear();
}

function changeTable(){
    if(WIN === PLAYER){ 
        win_counter++;
        document.querySelector("#player-table-score").textContent = win_counter;
    }
    else if(WIN === DEALER){
        lose_counter++;
        document.querySelector("#dealer-table-score").textContent = lose_counter;
    }
    else{
        draw_counter++;
        document.querySelector("#draw-table-score").textContent = draw_counter;
    }
}