var rs = require("readline-sync");

function createGrid(size) {
  const letters = [..."ABCABCDEFGHIJKLMNOPQRSTUVWXYZ"];
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

let gameGrid = createGrid(3);

function selectShipSpots(array, numShips) {
  let shipSpots = array
    .sort(() => Math.random() - Math.random())
    .slice(0, numShips);
  return shipSpots;
}

function placeShips() {
  const shipSpots = selectShipSpots(gameGrid, 2);

  for (let spot of gameGrid) {
    if (shipSpots.includes(spot)) {
      spot.hasShip = true;
    }
  }
  return gameGrid;
}

finalgameGrid = placeShips();

console.log(selectShipSpots(gameGrid, 2));

console.log(finalgameGrid);
