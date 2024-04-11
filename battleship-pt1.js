let rs = require("readline-sync");

function createGrid() {
  const letters = [..."ABC"];
  let arr = [];

  for (let char of letters) {
    for (let i = 1; i <= 3; i++) {
      arr.push({ row: char, column: i, hasShip: false, hasBeenHit: false });
    }
  }
  return arr;
}
let gameGrid = createGrid();

function shipGenerator() {
  const randomSpot1 = gameGrid[Math.floor(Math.random() * gameGrid.length)];
  const randomSpot2 = gameGrid[Math.floor(Math.random() * gameGrid.length)];

  randomSpot1.hasShip = true;
  randomSpot2.hasShip = true;
  return gameGrid;
}

console.log(shipGenerator());
