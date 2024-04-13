var rs = require("readline-sync");

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

let emptyGameGrid = createGrid();
console.log(emptyGameGrid);

console.log("Press any key to start the game.");
rs.keyInPause();

function selectShipSpots(array, numShips) {
  let shipSpots = array
    .sort(() => Math.random() - Math.random())
    .slice(0, numShips);
  return shipSpots;
}

function placeSmallShips(numShips) {
  const shipSpots = selectShipSpots(emptyGameGrid, numShips);

  for (let spot of emptyGameGrid) {
    if (shipSpots.includes(spot)) {
      spot.hasShip = true;
    }
  }
  return emptyGameGrid;
}

let gameReadyGrid = placeSmallShips(2);

console.log(gameReadyGrid);

function getInput() {
  let userInput = rs.question("Enter a location to strike ie 'A2' ");
}
