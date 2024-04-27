var rs = require("readline-sync");

const battleShip = () => {
  rs.keyInPause("Press any key to start the game.");

  const letters = [..."ABCDEFGHIJ"];
  const gridArea = 10; // 10 x 10

  const createGrid = (size = gridArea) => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      for (let j = 1; j <= size; j++) {
        arr.push({
          row: letters[i],
          column: j,
          hasShip: null,
          hasBeenHit: false,
        });
      }
    }
    return arr;
  };

  let gameGrid = createGrid();
  let shipsRemaining = 5;

  let ships = [
    { name: "small", numOfUnits: 2, spaces: [] },
    { name: "medium-1", numOfUnits: 3, spaces: [] },
    { name: "medium-2", numOfUnits: 3, spaces: [] },
    { name: "large", numOfUnits: 4, spaces: [] },
    { name: "jumbo", numOfUnits: 5, spaces: [] },
  ];

  function randomSelector(array) {
    return array.sort(() => Math.random() - Math.random()).slice(0, 1)[0];
  }

  const randomDirection = () => {
    return randomSelector(["up", "down", "left", "right"]);
  };

  const shipPlacer = (ship) => {
    const shipSize = ship.numOfUnits;
    let startingPoint = randomSelector(gameGrid);
    let colNum = startingPoint.column;
    let selectedSpots = [];
    let direction = randomDirection();
    let letterIndex = letters.indexOf(startingPoint.row);

    // If starting space is already occupied by another ship, restart the function and try a different random spot..
    if (startingPoint.hasShip !== null) {
      return shipPlacer(ship);
    }

    // Run this code block if the random direction is 'up'...
    if (direction === "up") {
      if (shipSize > letterIndex + 1) {
        return shipPlacer(ship);
      } else {
        for (let i = letterIndex; i > letterIndex - shipSize; i--) {
          selectedSpots.push(`${letters[i]}${colNum}`);
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            if (elem.hasShip !== null) {
              return shipPlacer(ship);
            }
          }
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            elem.hasShip = ship.name;
          }
        }
      }
    }

    // Run this code block if the random direction is 'down'...
    if (direction === "down") {
      if (letterIndex + shipSize > letters.length) {
        return shipPlacer(ship);
      } else {
        for (let i = letterIndex; i < letterIndex + shipSize; i++) {
          selectedSpots.push(`${letters[i]}${colNum}`);
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            if (elem.hasShip !== null) {
              return shipPlacer(ship);
            }
          }
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            elem.hasShip = ship.name;
          }
        }
      }
    }
    // Run this code block if the random direction is 'left'...
    if (direction === "left") {
      if (colNum - shipSize < 0) {
        return shipPlacer(ship);
      } else {
        for (let i = colNum; i > colNum - shipSize; i--) {
          selectedSpots.push(`${startingPoint.row}${i}`);
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            if (elem.hasShip !== null) {
              return shipPlacer(ship);
            }
          }
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            elem.hasShip = ship.name;
          }
        }
      }
    }

    // Run this code block if the random direction is 'right'...
    if (direction === "right") {
      if (colNum + shipSize > gridArea) {
        return shipPlacer(ship);
      } else {
        for (let i = colNum; i < colNum + shipSize; i++) {
          selectedSpots.push(`${startingPoint.row}${i}`);
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            if (elem.hasShip !== null) {
              return shipPlacer(ship);
            }
          }
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            elem.hasShip = ship.name;
          }
        }
      }
    }
    ship.spaces = selectedSpots;
  };
  shipPlacer(ships[4]);
  shipPlacer(ships[3]);
  shipPlacer(ships[2]);
  shipPlacer(ships[1]);
  shipPlacer(ships[0]);
  console.log(ships);
};
battleShip();
