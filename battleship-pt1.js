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
  for (let i = 0; i < 2; i++) {
    randomSpot.hasBeenHit = true;
  }
  return gameGrid;
}

const randomSpot = gameGrid[Math.floor(Math.random() * gameGrid.length)];
console.log(shipGenerator());
