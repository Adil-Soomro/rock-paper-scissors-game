
const choices = document.querySelectorAll(".choice");
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("comp-score");
btnMessage = document.querySelector(".message");
const user_select = document.querySelector(".user_select")
const comp_select = document.querySelector(".comp_select")

let compPoint = 0;
let userPoint = 0;

const genCompChoice = () => {
    let options = ["rock", "paper", "scissors"]
    let randIndex = Math.floor(Math.random() * 3);
    return options[randIndex];
};

const UserPointsCondition = () => {
    userScore.innerText = userPoint++;
    return true;
};

const disableGame = () => {
    choices.forEach(choice => {
        choice.style.pointerEvents = "none";
    })
};

const resetGame = () => {
    compPoint = 0;
    userPoint = 0;
    user_select.innerText = "";
    comp_select.innerText = "";
    btnMessage.innerText = "Play Your Move"
    btnMessage.style.backgroundColor = "#e879f9"
    btnMessage.style.outline = "1px solid purple"
    userScore.innerText = userPoint; 
    compScore.innerText = compPoint;
    const resetBtn = document.querySelector(".reset-button");
    if (resetBtn) {
        resetBtn.remove();
    }
    choices.forEach(choice => {
        choice.style.pointerEvents = "auto";
    });


}

const showWinner = (userWin, userChoice, CompChoice) => {
    if (userWin) {
        console.log("You win");
        userPoint += 1;
        userScore.innerText = userPoint;
        btnMessage.innerText = `You Win! Your ${userChoice} beats  ${CompChoice}`;
        btnMessage.style.backgroundColor = "#22c55e";
        btnMessage.style.color = "black";

    } else {
        console.log("you lose")
        compPoint += 1;
        compScore.innerText = compPoint;
        btnMessage.innerText = `You Lost, ${CompChoice} beats your ${userChoice}`;
        btnMessage.style.backgroundColor = "#f43f5e";
        btnMessage.style.color = "#fff";
    }
    if (compPoint === 10) {
        console.log("Game Over: Computer Won!");
        
        const resetBtn = document.createElement("button")
        btnMessage.style.backgroundColor = "rgb(255 147 113)";
        btnMessage.style.color = "black"
        btnMessage.style.outline = "1px solid rgb(245 98 52)"
        btnMessage.innerText = "Game Over: Computer Wins!";
        disableGame();
        resetBtn.innerText = "Play Again!";
        resetBtn.classList.add("reset-button");
        const GameBox = document.querySelector(".game")
        if (GameBox) {
            GameBox.appendChild(resetBtn);
        }
        resetBtn.addEventListener("click", () => {
            resetGame();
        });
    } else if (userPoint === 10) {
        console.log("Game Over: You Won!");
        const resetBtn = document.createElement("button")
        btnMessage.style.backgroundColor = "rgb(89 152 255)";
        btnMessage.style.outline = "1px solid rgb(38 115 242)"
        btnMessage.innerText = "Game Over: You Won!";
        disableGame();
        resetBtn.innerText = "Play Again!";
        resetBtn.classList.add("reset-button");
        const GameBox = document.querySelector(".game")
        if (GameBox) {
            GameBox.appendChild(resetBtn);
        }
        resetBtn.addEventListener("click", () => {
            resetGame();
        });
    }
};


const winning_Condition = () => {
    if (userPoint === 2) {
        console.log("USER POINT you win");
    } else if (compPoint === 2) {
        console.log("COPM POINT comp win");
    }
}



const playgame = (userChoice) => {
    console.log("user Choice", userChoice);
    user_select.innerText = `You Choose : ${userChoice.toUpperCase()}`;
    //generate Computer Choice
    const CompChoice = genCompChoice();
    console.log("Computer Choice", CompChoice);
    comp_select.innerText = `Computer Choose : ${CompChoice.toUpperCase()}`;
    const choices = ["Rock", "Paper", "Scissors"];
    if (userChoice === CompChoice) {
        btnMessage.innerText = `Game is Draw Play Again`;
        btnMessage.style.backgroundColor = "#8b5cf6";
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            //scissors, paper
            userWin = CompChoice === "paper" ? false : true;

        } else if (userChoice === "paper") {
            //rock, scissors
            userWin = CompChoice === "rock" ? true : false;

        } else if (userChoice === "scissors") {
            //rock, paper
            userWin = CompChoice === "paper" ? true : false;
        }
        showWinner(userWin, userChoice, CompChoice);
        winning_Condition();
    }
    console.log("User Points", userPoint);
    console.log("Comp Points", compPoint);
}


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    })

})