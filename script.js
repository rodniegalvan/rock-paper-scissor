const choices = ["rock", "paper", "scissors"];
let currentPlayer = 1;
let player1Choice = null;
let player2Choice = null;
let player1Wins = 0;
let player2Wins = 0;

const player2Div = document.querySelector("#player2");
player2Div.style.display = "none";
function updateStarRating(playerWins, playerId) {
    const starRatingElement = document.getElementById(playerId);
  
    // Remove all gold stars first
    starRatingElement.querySelectorAll('.gold').forEach((star) => {
      star.classList.remove('gold');
    });
  
    // Get the stars inside the starRatingElement
    const stars = starRatingElement.querySelectorAll('.star-rating span');
  
    // Add gold class to stars based on playerWins
    for (let i = 0; i < playerWins; i++) {
      stars[i].classList.add('gold');
    }
  }
  
  
  
  

function togglePlayer() {
  const player2Div = document.querySelector("#player2");
  player2Div.style.display = "none";
  const currentPlayerElement = document.querySelector(
    `#player${currentPlayer}`
  );
  const otherPlayerElement = document.querySelector(
    `#player${currentPlayer === 1 ? 2 : 1}`
  );

  // Hide Player 2's rock-paper-scissors div when it's Player 1's turn
  player2Div.style.display = currentPlayer === 1 ? "none" : "block";

  // Hide Player 1's rock-paper-scissors div when it's Player 2's turn
  const player1Div = document.querySelector("#player1");
  player1Div.style.display = currentPlayer === 2 ? "none" : "block";
}

function determineWinner(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) {
    return "It's a tie!";
  } else if (
    (player1Choice === "rock" && player2Choice === "scissors") ||
    (player1Choice === "paper" && player2Choice === "rock") ||
    (player1Choice === "scissors" && player2Choice === "paper")
  ) {
    return "Player 1 wins!";
  } else {
    return "Player 2 wins!";
  }
}

// Function to reset the game
function resetGame() {
  currentPlayer = 1;
  player1Choice = null;
  player2Choice = null;
  player1Wins = 0;
  player2Wins = 0;
  // Reset UI elements
  document.getElementById("winner").textContent = "Waiting for choices...";

    // Remove gold star ratings
    document.querySelectorAll('.star-rating span').forEach((star) => {
        star.classList.remove('gold');
      });
      
  // Enable choice buttons
  document.querySelectorAll(".choice").forEach((btn) => {
    btn.disabled = false;
  });

  const player1Div = document.querySelector("#player1");
  player1Div.style.display = "block";
  const player2Div = document.querySelector("#player2");
  player2Div.style.display = "none";
}

// Event listener for the retry button
document.getElementById("retryButton").addEventListener("click", resetGame);

// Event listeners for both players' choices
document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");

    if (currentPlayer === 1 && !player1Choice) {
      player1Choice = playerChoice;
      currentPlayer = 2;
    } else if (currentPlayer === 2 && !player2Choice) {
      player2Choice = playerChoice;
      currentPlayer = 1;
    }

    if (player1Choice && player2Choice) {
      const result = determineWinner(player1Choice, player2Choice);
      document.getElementById("winner").textContent = result;

      if (result === "Player 1 wins!") {
        player1Wins++;

        updateStarRating(player1Wins, "player1Wins");
      } else if (result === "Player 2 wins!") {
        player2Wins++;
        updateStarRating(player2Wins, "player2Wins");
      }

      if (player1Wins === 3 || player2Wins === 3) {
        document.getElementById("winner").textContent =
          player1Wins === 3
            ? "Player 1 wins the game!"
            : "Player 2 wins the game!";
        // Disable further choices
        document.querySelectorAll(".choice").forEach((btn) => {
          btn.disabled = true;
        });
      }
      // Reset the game
      player1Choice = null;
      player2Choice = null;
    }
    togglePlayer();
  });
});
