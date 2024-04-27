var rs = require("readline-sync");

const battleShip = () => {
  rs.keyInPause("Press any key to start the game.");

  const letters = [..."ABCDEFGHIJ"];

  const createGrid = (size = 10) => {
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
    { name: "medium", numOfUnits: 3, spaces: [] },
    { name: "medium", numOfUnits: 3, spaces: [] },
    { name: "large", numOfUnits: 4, spaces: [] },
    { name: "jumbo", numOfUnits: 5, spaces: [] },
  ];

  function randomSelector(array) {
    return array.sort(() => Math.random() - Math.random()).slice(0, 1)[0];
  }

  const randomDirection = () => {
    return randomSelector(["up", "down" /* "left", "right" */]);
  };

  const shipPlacer = (ship) => {
    const shipSize = ship.numOfUnits;
    let startingPoint = randomSelector(gameGrid);
    let selectedSpots = [];
    let direction = randomDirection();
    let letterIndex = letters.indexOf(startingPoint.row);

    // If starting space is already occupied by another ship, restart the function and try a different random spot..
    if (startingPoint.hasShip === true) {
      return shipPlacer(ship);
    }

    // Run this code block if the random direction is 'up'...
    if (direction === "up") {
      if (shipSize > letterIndex + 1) {
        /*         console.log(`letter array length: ${letters.length}`);
        console.log(`startingPoint = ${startingPoint.row}`);
        console.log(`letter index: ${letterIndex + 1}`);
        console.log(`ship size: ${shipSize}`);
        console.log(`${startingPoint.row} won't provide enough space`);
        return "done"; */
        return shipPlacer(ship);
      } else {
        for (let i = letterIndex; i > letterIndex - shipSize; i--) {
          selectedSpots.push(`${letters[i]}${startingPoint.column}`);
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            if (elem.hasShip !== null) {
              spot = null;
            }

            if (selectedSpots.includes(null)) {
              return shipPlacer(ship);
            } else {
              for (let spot of selectedSpots) {
                for (let elem of gameGrid) {
                  if (spot === `${elem.row}${elem.column}`) {
                    elem.hasShip = ship.name;
                  }
                }
              }
            }
          }
        }
      }
    }
    // Run this code block if the random direction is 'down'...
    if (direction === "down") {
      if (letterIndex + shipSize > letters.length) {
        /*         console.log(`letter array length: ${letters.length}`);
        console.log(`startingPoint = ${startingPoint.row}`);
        console.log(`letter index: ${letterIndex}`);
        console.log(`ship size: ${shipSize}`);
        console.log(`${startingPoint.row} won't provide enough space`); */
        return shipPlacer(ship);
      } else {
        for (let i = letterIndex; i < letterIndex + shipSize; i++) {
          selectedSpots.push(`${letters[i]}${startingPoint.column}`);
        }
      }
      for (let spot of selectedSpots) {
        for (let elem of gameGrid) {
          if (spot === `${elem.row}${elem.column}`) {
            if (elem.hasShip !== null) {
              spot = null;
            }

            if (selectedSpots.includes(null)) {
              return shipPlacer(ship);
            } else {
              for (let spot of selectedSpots) {
                for (let elem of gameGrid) {
                  if (spot === `${elem.row}${elem.column}`) {
                    elem.hasShip = ship.name;
                  }
                }
              }
            }
          }
        }
      }
    }
    ship.spaces = selectedSpots;
  };
  shipPlacer(ships[4]);
  shipPlacer(ships[3]);
  console.log(gameGrid);
  console.log(ships);
};
battleShip();
