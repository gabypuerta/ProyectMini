const hangmanImage= document.querySelector(".hangman-b img");
const displayWor= document.querySelector(".word-display");
const guessedText= document.querySelector(".guesses-words b");
const displayDiv= document.querySelector(".display");
const responsedisplay= document.querySelector(".game-modal");
const responseplayagain= document.querySelector(".Play-Again");


let choosenletter, rightguess=[] ,maxWrongletter=0 ;
const maxWrong = 6;


//Iniciar el juego nuevamente 
const resetGame=()=>{
  rightguess=[];
  maxWrongletter=0;
  hangmanImage.scr =`Imágenes/hangman-${maxWrongletter}.svg`;
  guessedText.innerText= `${maxWrongletter}/${maxWrong}`;
  displayDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  displayWor.innerHTML = choosenletter.split("").map(()=> '<li class="letter"></li>').join("");
  responsedisplay.classList.remove("show");
  

}


 //Obtener una palabra de las que estan en la lista de selectword.js//
const getselecwords=() => {
  const{word}= Randomword[Math.floor(Math.random() * Randomword.length)];
  console.log(word);
  choosenletter = word;
  resetGame();
  
}

const GameOver=(isVictory)=>{

  // Display de resultado de juego
  setTimeout(()=>{
    const modalText= isVictory? `You found the word:`: `The correct word was:`
    responsedisplay.querySelector("h5").innerText=`${isVictory? 'VICTORY :) ': 'You lost :('}`;
    responsedisplay.querySelector("p").innerHTML=`${modalText}<b>${choosenletter}<b>`;
    responsedisplay.classList.add("show");

  },300 )
}

// Ver si la letra seleccionada forma parte de la palabra//
const startgame= (button, clickedletter)=>{
  if (choosenletter.includes(clickedletter)){
    [...choosenletter].forEach((letter,index)=>{
      if (letter == clickedletter){
        rightguess.push(letter);
        displayWor.querySelectorAll("li")[index].innerText = letter;
        displayWor.querySelectorAll("li")[index].classList.add("guessed");
      }
    });


  }else{
    maxWrongletter++;
    hangmanImage.scr =`Imágenes/hangman-${maxWrongletter}.svg`;
  }
  button.disabled= true;
  guessedText.innerText= `${maxWrongletter}/${maxWrong}`;

  //Juego finalizado//
  if (maxWrongletter === maxWrong) return GameOver(false);
  if (rightguess.length === choosenletter.length) return GameOver(true);
}


//Buttons de las letras del juego//
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText= String.fromCharCode(i)
  displayDiv.appendChild(button);
  button.addEventListener("click", e=> startgame(e.target, String.fromCharCode(i)));

}


getselecwords();
responseplayagain.addEventListener("click",getselecwords);