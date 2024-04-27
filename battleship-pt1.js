var rs = require("readline-sync");

const battleShip = () => {
  rs.keyInPause("Press any key to start the game.");

  const createGrid = (size = 3) => {
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

  function selectShipSpots(array, numShips) {
    return array.sort(() => Math.random() - Math.random()).slice(0, numShips);
  }

  function placeSmallShips(numShips) {
    const shipSpots = selectShipSpots(gameGrid, numShips);

    for (let spot of gameGrid) {
      if (shipSpots.includes(spot)) {
        spot.hasShip = true;
      }
    }
    return gameGrid;
  }

  placeSmallShips(2);

  let shipsLeft = 2;

  console.log(gameGrid);

  while (shipsLeft > 0) {
    function getInput() {
      let userInput = rs.question("Enter a location to strike ie 'A2' ");
      return userInput;
    }
    let userInput = getInput();

    for (let spot of gameGrid) {
      if (userInput === `${spot.row}${spot.column}`) {
        // If user hits a ship:
        if (spot.hasShip === true) {
          spot.hasShip = false;
          spot.hasBeenHit = true;
          shipsLeft -= 1;
          if (shipsLeft === 1) {
            console.log(
              `Hit! You have sunk a battleship. ${shipsLeft} ship remaining.`
            );
          } else {
            console.log(
              `Hit! You have sunk a battleship. ${shipsLeft} ships remaining.`
            );
          }

          // If user misses on a new target
        } else if (spot.hasBeenHit === false) {
          console.log("Miss!");
          spot.hasBeenHit = true;

          // If user misses on a target that's has been previously selected:
        } else {
          console.log("Miss! You've already hit this target. try again...");
        }
      }
    }
  }

  let playAgain = rs.keyInYN(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  playAgain ? battleShip() : console.log("Thanks for playing!");
};

battleShip();
