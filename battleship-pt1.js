var rs = require("readline-sync");

rs.keyInPause("Press any key to start the game.");

function createGrid(size = 3) {
  const letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  let arr = [];
  for (let i = 0; i < size; i++) {
    for (let j = 1; j <= size; j++) {
      arr.push({
        row: letters[i],
        column: j,
        hasShip: false,
        hasBeenHit: false,
      });
    }
  }
  return arr;
}

let gameGrid = createGrid();
console.log(gameGrid);

function selectShipSpots(array, numShips) {
  let shipSpots = array
    .sort(() => Math.random() - Math.random())
    .slice(0, numShips);
  return shipSpots;
}

function placeSmallShips(numShips) {
  const shipSpots = selectShipSpots(gameGrid, numShips);

  for (let spot of gameGrid) {
    if (shipSpots.includes(spot)) {
      spot.hasShip = true;
    }
  }
  return gameGrid;
}

placeSmallShips(2);

let shipsLeft = 2;

console.log(gameGrid);

function getInput() {
  let userInput = rs.question("Enter a location to strike ie 'A2' ");
  return userInput;
}

getInput();

for (let spot of gameGrid) {
  if (getInput() === `${spot.row}${spot.column}`) {
    if (spot.hasShip === true) {
      spot.hasBeenHit === true;
      spot.hasShip === false;
      shipsLeft--;
      console.log(
        `"Hit. You have sunk a battleship. ${shipsLeft} ships remaining."`
      );
      return gameChecker();
    } else if (spot.hasBeenHit === true) {
      console.log("You have already picked this location. Miss!");
      return getInput();
    } else {
      console.log("You have missed!");
      return getInput();
    }
  }
  return getInput();
}

getInput();

function gameChecker() {
  if (shipsLeft > 0) {
    return getInput();
  } else {
    let input = rs.keyInYN(
      "You have destroyed all battleships. Would you like to play again? Y/N"
    );
    if (input) {
      return "Game done.";
    } else {
      return createGrid();
    }
  }
}

getInput();

// console.log(getInput());
