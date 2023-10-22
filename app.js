let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0; 

let h2 = document.querySelector("h2");
let scoreDisplay = document.querySelector("#score");
let startButton = document.querySelector("#startButton");


let correctSound = new Audio('correct.mp3');
let wrongSound = new Audio('wrong.mp3');
let startSound = new Audio('start.mp3'); 

function updateHighestScore() {
    if (level > highestScore) {
        highestScore = level;
        localStorage.setItem("highestScore", highestScore);
        scoreDisplay.innerText = `Highest Score: ${highestScore * 100}`;
    }
}

function startGame() {
    started = true;
    startButton.style.display = 'none'; 
    startSound.play();
    setTimeout(() => {
        levelUp();
         
        scoreDisplay.innerText = `Level ${level}`;
    }, 3000); 
}

startButton.addEventListener("click", startGame);

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 1000);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 500);
}

function playCorrectSound() {
    correctSound.play();
}

function playWrongSound() {
    wrongSound.play();
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            playCorrectSound(); 
            updateHighestScore(); 
            setTimeout(() => {
                levelUp();
            }, 1000); 
        }
    } else {
        playWrongSound(); 
        h2.innerHTML = `Game over! Your score was <b>${level * 100}</b>. Press the Start button to play again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 1500); 
        reset();
    }
}

function btnPress() {
    if (started) {
        let btn = this;
        userFlash(btn);

        userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        checkAns(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startButton.style.display = 'block'; 
}
