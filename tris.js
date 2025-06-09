let actualPlayer = "X";
let grid = [];

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
    let cells = document.querySelectorAll(".grid-item");
    cells[r * 3 + c].innerText = actualPlayer;

    console.log("vittoria?", checkVictory(), actualPlayer);
    //check victory
    if (checkVictory()) {
      let bannerContainer = document.getElementById("banner");
      bannerContainer.innerHTML = `<div id="winner-banner">Ha vinto il giocatore: X</div>`;

      // reset starting player
      actualPlayer = "X";
      // grid clean
      grid = [];

      setTimeout(() => {
        bannerContainer.innerHTML = ``;

        for (let i = 0; i < cells.length; i++) {
          cells[i].innerText = "";
        }
      }, 3000);
    }

    //change player
    actualPlayer == "X" ? (actualPlayer = "O") : (actualPlayer = "X");
  }
}

function checkVictory() {
  // console.log(grid, actualPlayer);

  for (let i = 0; i < 3; i++) {
    // console.log(grid[i][0], grid[i][1], grid[i][2]);

    if (
      // check vertical and horizontal cells
      (grid[i][0] !== null &&
        grid[i][0] === grid[i][1] &&
        grid[i][0] === grid[i][2]) ||
      (grid[0][i] !== null &&
        grid[0][i] === grid[1][i] &&
        grid[0][i] === grid[2][i]) ||
      // check oblique cells
      (grid[1][1] !== null &&
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2]) ||
      (grid[1][1] !== null &&
        grid[2][0] === grid[1][1] &&
        grid[1][1] === grid[0][2])
    ) {
      return true;
    }
  }
  return false;
}
