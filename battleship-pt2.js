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

  const shipGenerator = (str, size) => {
    return [{ name: `${str}`, size: size, spotsOccupied: [] }];
  };

  let shipsRemaining = 5;
  let ship1 = shipGenerator("small", 2);
  let ship2 = shipGenerator("medium-1", 3);
  let ship3 = shipGenerator("medium-2", 3);
  let ship4 = shipGenerator("large", 4);
  let ship5 = shipGenerator("jumbo", 5);

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
};

battleShip();
