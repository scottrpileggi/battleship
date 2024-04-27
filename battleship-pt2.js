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

  console.log(gameGrid);

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
    let directionArray = ["up", "down", "left", "right"];
    return randomSelector(directionArray);
  };

  const shipPlacer = (ship) => {
    const shipSize = ship.numOfUnits;
    let startingPoint = randomSelector(gameGrid);
    let selectedSpots = [];
    let direction = "up";
    let letterIndex = letters.indexOf(startingPoint.row);

    // If starting space is already occupied by another ship, restart the function and try a different random spot..
    if (startingPoint.hasShip === true) {
      return shipPlacer(ship);
    }

    // Run this code block if the random direction is 'up'...
    if (direction === "up") {
      if (shipSize > letterIndex + 1) {
        return shipPlacer(ship);
      } else {
        for (let i = letterIndex; i > letterIndex - shipSize; i--) {
          selectedSpots.push(`${letters[i]}${startingPoint.column}`);
          console.log(selectedSpots);
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
      ship.spaces = selectedSpots;
      return "done";
    }
  };
  shipPlacer(ships[4]);
  shipPlacer(ships[0]);
  console.log(gameGrid);
  console.log(ships);
};
battleShip();
