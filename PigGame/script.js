'use strict'

//getting the elements
const player1El = document.querySelector('.player--0')
const player2El = document.querySelector('.player--1')
const player1ScoreEl = document.getElementById('score--0')
const player2ScoreEl = document.getElementById('score--1')
const player1CurrentScoreEl = document.getElementById('current--0')
const player2CurrentScoreEl = document.getElementById('current--1')

const diceImage = document.querySelector('.dice')
const newGameBtn = document.querySelector('.btn--new')
const rollDiceBtn = document.querySelector('.btn--roll')
const holdScoreBtn = document.querySelector('.btn--hold')

//starting conditions for the project
let scores, currentScore, activePlayer, playing
const startingCOnditions = function(){
    player1ScoreEl.textContent = 0
    player2ScoreEl.textContent = 0
    diceImage.classList.add('hidden')
    
    diceImage.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active'); 

    currentScore = 0
    activePlayer = 0
    scores = [0, 0]
    playing = true
}

startingCOnditions()

//swap player function
const swapPlayers = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0
        activePlayer = activePlayer === 0? 1 : 0
        currentScore = 0
        player1El.classList.toggle('player--active')
        player2El.classList.toggle('player--active')
}

//rolling dice functionality
rollDiceBtn.addEventListener('click', function(){
    if(playing){
        //generate random number between 1 to 6 and store in a dice variable
        const dice = Math.trunc(Math.random() * 6) + 1

        //change the visibility of the dice and set the dice to corresponds to the generated number
        diceImage.classList.remove('hidden')
        diceImage.src = `dice-${dice}.png`

        //create a current score variable and increment with dice generated and also check if it is equal 1 so you can revert current score to 0 and switch players
        if (dice > 1){
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }else{
            swapPlayers()
        }
    }
})

//function to hold score
holdScoreBtn.addEventListener('click', function(){
    if(playing){
        //add curent score of active player to the score 
        scores[activePlayer] += currentScore

        //store the score in the score itself
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        if (scores[activePlayer] >= 100){
            playing = false;
        diceImage.classList.add('hidden');

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
        }else{
             //swap the playes
            swapPlayers()
        }
    }
})

//reset game
newGameBtn.addEventListener('click', startingCOnditions)