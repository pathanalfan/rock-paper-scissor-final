let score = JSON.parse(localStorage.getItem('score')) || {
  Wins:0,
  Losses:0,
  Ties:0,
} ;

updateScoreElement();

/*if (!score) {
score={
  Wins:0,
  Losses:0,
  Ties:0,
}
}*/


let isAutoPlaying = false;
let intervalID;
//const autoPlay = () => {
//};

function autoPlay(){
  if(!isAutoPlaying){
     intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playgame(playerMove);
  
    }, 1000);
    isAutoPlaying = true;

  }else{
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playgame('rock');
  });

  document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playgame('paper');
  });

  document.querySelector('.js-scissors-button')
  .addEventListener('click', ()=>{
    playgame('scissors');
  });

document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r') {
    playgame('rock');
  }else if (event.key === 'p') {
    playgame('paper');
  }else if (event.key === 's') {
    playgame('scissors');
  }
});

function playgame (playerMove) {
const computerMove = pickComputerMove();

let result = '';
if (playerMove === 'scissors') {
  if(computerMove === 'scissors') 
  {
    result = 'Tie.';
  }
  else if(computerMove === 'rock')
  {
    result = 'You lose.';
  }

  else if(computerMove === 'paper')
  {
    result = 'You Win!';
  }

} else if(playerMove==='paper'){
    if(computerMove === 'paper') 
    {
      result = 'Tie.';
    }
    else if(computerMove === 'scissors')
    {
      result = 'You lose.';
    }

    else if(computerMove === 'rock')
    {
      result = 'You Win!';
    }
} else if (playerMove==='rock') {
      if(computerMove === 'rock') 
      {
        result = 'Tie.';
      }
      else if(computerMove === 'paper')
      {
        result = 'You lose.';
      }

      else if(computerMove === 'scissors')
      {
        result = 'You Win!';
      }
  }

  if (result === 'You Win!') {
    score.Wins+=1;

  } else if (result==='You lose.') {
    score.Losses +=1;
  } else if(result === 'Tie.') {
    score.Ties +=1;
  }

  localStorage.setItem('score', JSON.stringify (score));

  updateScoreElement();          

  document.querySelector('.js-results').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = ` you
<img class="move-icon" src="images/${playerMove}-emoji.png">
<img class="move-icon" src="images/${computerMove}-emoji.png">
computer`;

}
function updateScoreElement() {
document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;

    
}

function pickComputerMove() {
const randomNumber = Math.random();
let computerMove = '';

if(randomNumber >= 0 && randomNumber < 1/3 ) 
{
  computerMove = 'rock';
}
else if (randomNumber > 1/3 && randomNumber < 2/3) 
{
  computerMove = 'paper';
}
else if (randomNumber > 2/3 && randomNumber < 1)
{
  computerMove = 'scissors';
}

return computerMove;
}