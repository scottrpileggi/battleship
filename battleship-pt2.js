var rs = require("readline-sync");

const battleShip = () => {
  rs.keyInPause("Press any key to start the game.");

  const letters = [..."ABCDEFGHIJ"];
  const gridArea = letters.length; // 10 x 10

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
    }
    // Final check to make sure spaces are clear...
    for (let spot of selectedSpots) {
      for (let elem of gameGrid) {
        if (spot === `${elem.row}${elem.column}`) {
          if (elem.hasShip !== null) {
            return shipPlacer(ship);
          }
        }
      }
    }
    // If spots are clear, this code block assigns the ship to its respective spaces on the game board...
    for (let spot of selectedSpots) {
      for (let elem of gameGrid) {
        if (spot === `${elem.row}${elem.column}`) {
          elem.hasShip = ship.name;
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

  while (shipsRemaining > 0) {
    console.log(ships);
    function getInput() {
      let userInput = rs.question("Enter a location to strike ie 'A2' ");
      return userInput;
    }
    let userInput = getInput();

    for (let spot of gameGrid) {
      if (userInput === `${spot.row}${spot.column}`) {
        // run this code block if user tries to hit the same target more than once...
        if (spot.hasShip === null && spot.hasBeenHit === true) {
          console.log("Miss! You've already hit this target. try again...");
          // run this code block if user misses...
        } else if (spot.hasShip === null && spot.hasBeenHit === false) {
          console.log("Miss!");
          spot.hasBeenHit = true;
          // run this code block if user hits a target...
        } else if (spot.hasShip !== null) {
          console.log("Hit!");
          spot.hasShip = null;
          spot.hasBeenHit = true;
          //this code block updates the amount of 'health' a ship has left
          for (let battleShip of ships) {
            if (battleShip.spaces.includes(`${spot.row}${spot.column}`)) {
              battleShip.numOfUnits -= 1;
              //this code block determines if a ship has been sunk, or just damaged...
              if (battleShip.numOfUnits === 0) {
                shipsRemaining -= 1;
                // this bit is just to make the grammar proper when there's only 1 ship remaining
                if (shipsRemaining === 1) {
                  console.log(
                    `Hit! You have sunk a battleship. ${shipsRemaining} ship remaining.`
                  );
                } else {
                  console.log(
                    `Hit! You have sunk a battleship. ${shipsRemaining} ships remaining.`
                  );
                }
              }
            }
          }
        }
      }
    }
  }
  //Final code that runs after the game is over, inviting the user to play again or end the program :)
  let playAgain = rs.keyInYN(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  playAgain ? battleShip() : console.log("Thanks for playing!");
};

battleShip();
