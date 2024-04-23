var rs = require("readline-sync");

const battleShip = () => {
  rs.keyInPause("Press any key to start the game.");

  const createGrid = (size = 10) => {
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
  };

  let gameGrid = createGrid();

  const shipGenerator = (id, str, size) => {
    return { id: id, name: `${str}`, size: size, spotsOccupied: [] };
  };

  let ships = [
    shipGenerator(1, "small", 2),
    shipGenerator(2, "medium-1", 3),
    shipGenerator(3, "medium-2", 3),
    shipGenerator(4, "large", 4),
    shipGenerator(5, "jumbo", 5),
  ];

  let shipsRemaining = 5;

  console.log(ships);

  function randomSelector(array) {
    let randomElem = array
      .sort(() => Math.random() - Math.random())
      .slice(0, 1);
    return randomElem;
  }

  const randomDirection = () => {
    let directionArray = ["up", "down", "left", "right"];
    let randomDirection = randomSelector(directionArray);
    return randomDirection;
  };

  const shipPlacer = (ship) => {
    let startingPoint = randomSelector(gameGrid);
    if (startingPoint.hasShip)
  };

  shipPlacer();
};

battleShip();
