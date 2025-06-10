let cells = document.querySelectorAll(".grid-item");
let bannerContainer = document.getElementById("banner");
let xScore = document.getElementById("X-score");
let oScore = document.getElementById("O-score");

let actualPlayer = "X";
let grid = [];
let stepCount = 0;

let score = {
  X: 0,
  O: 0,
};

function removeBanner() {
  bannerContainer.innerHTML = ``;
  bannerContainer.classList.remove("d-show-banner");
  bannerContainer.classList.add("d-none-banner");
}

function showBanner(winningOption) {
  bannerContainer.innerHTML = winningOption
    ? `<div id="winner-banner">Ha vinto il giocatore: ${actualPlayer}</div>`
    : `<div id="winner-banner">Pareggio</div>`;
  bannerContainer.classList.remove("d-none-banner");
  bannerContainer.classList.add("d-show-banner");
}

function addItem(r, c) {
  // create grid if its empty
  if (grid.length === 0) {
    grid = Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => null)
    );
  }

  // check if the cell is empty
  if (grid[r][c] === null) {
    //assign sign to cell
    grid[r][c] = actualPlayer;

    // print sign in the HTML
    cells[r * 3 + c].innerText = actualPlayer;

    console.log("vittoria?", checkVictory(), actualPlayer);
    // check victory
    const isActualPlayerWinning = checkVictory();
    stepCount++;

    // reset values
    if (isActualPlayerWinning || (!isActualPlayerWinning && stepCount == 9)) {
      if (isActualPlayerWinning) {
        score[actualPlayer] = score[actualPlayer] + 1;
      }
      showBanner(isActualPlayerWinning);

      xScore.innerText = score["X"];
      oScore.innerText = score["O"];

      setTimeout(() => {
        removeBanner();

        for (let i = 0; i < cells.length; i++) {
          cells[i].innerText = "";
          cells[i].classList.remove("bg-green");
        }
      }, 3000);

      // reset starting player
      actualPlayer = "X";
      // grid clean
      grid = [];
      // reset stepCounter
      stepCount = 0;

      return;
    }
  }

  //change player
  actualPlayer == "X" ? (actualPlayer = "O") : (actualPlayer = "X");
}

function checkVictory() {
  // console.log(grid, actualPlayer);
  for (let i = 0; i < 3; i++) {
    // console.log(grid[i][0], grid[i][1], grid[i][2]);

    // check vertical and horizontal cells
    const verticalCondition =
      grid[i][0] !== null &&
      grid[i][0] === grid[i][1] &&
      grid[i][0] === grid[i][2];

    const horizontalCondition =
      grid[0][i] !== null &&
      grid[0][i] === grid[1][i] &&
      grid[0][i] === grid[2][i];

    // check oblique cells
    const obliqueConditionLeft =
      grid[1][1] !== null &&
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2];

    const obliqueConditionRight =
      grid[1][1] !== null &&
      grid[2][0] === grid[1][1] &&
      grid[1][1] === grid[0][2];

    if (horizontalCondition) {
      cells[0 * 3 + i].classList.add("bg-green");
      cells[1 * 3 + i].classList.add("bg-green");
      cells[2 * 3 + i].classList.add("bg-green");
      return true;
    }

    if (verticalCondition) {
      cells[i * 3 + 0].classList.add("bg-green");
      cells[i * 3 + 1].classList.add("bg-green");
      cells[i * 3 + 2].classList.add("bg-green");
      return true;
    }

    if (obliqueConditionLeft) {
      cells[1 * 3 + 1].classList.add("bg-green");
      cells[0 * 3 + 0].classList.add("bg-green");
      cells[2 * 3 + 2].classList.add("bg-green");
      return true;
    }

    if (obliqueConditionRight) {
      cells[1 * 3 + 1].classList.add("bg-green");
      cells[2 * 3 + 0].classList.add("bg-green");
      cells[0 * 3 + 2].classList.add("bg-green");
      return true;
    }
  }
  return false;
}
