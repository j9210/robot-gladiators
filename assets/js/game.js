// Game States
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less


// "Fight" Function
var fight = function (enemy) {
    // repeat and execute as long as the enemy robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {
        // Alert users that they are starting the round
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

         // if user pick "skip" confirm and then stop the loop
         if (promptFight === "skip" || promptFight === "SKIP") {
             //confirm a user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight 
            if (confirmSkip) {
                window.alert(playerInfo.name + "has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, layerMoney - 2);
                console.log("playerInfo.money", playerInfo.money);
                break;
             }
        } 
    
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // generate random damage value based on enemy's damage power
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.healthalth - damage);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.nameame + ' still has ' + playerInfo.health + ' health left.');
      }
    }
  };

// function to start a new game
var startGame = function () {
     // reset player stats
     playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
        
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
            
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
    
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
              // ask if user wants to use the store before the next round
              var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

              // if yes, take them to the store() function
              if (storeConfirm) {
              shop();
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }

        // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
        endGame();
    };  
};
};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
    window.alert("The game has now ended. Let's see how you did!");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }

};

var shop = function() {
  // ask player what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  //usin switch statement
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      if (playerInfo.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");

      // increase health and decrease money
      playerInfo.health = playerInfo.health + 20;
      playerInfo.money = playerInfo.money - 7;
    }
    else {
      window.alert("You don't have enough money!");
    }

      break;
    case "UPGRADE":
    case "upgrade":
      if (playerInfo.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");

      // increase attack and decrease money
      playerInfo.attack = playerInfo.attack + 6;
      playerInfo.money = playerInfo.money - 7;
    }
    else {
      window.alert("You don't have enough money!");
    }

      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so funciton will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// function to generate a random numberic value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value
};

//Player Object
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    this.health +=20;
    this.money -= 7;
  }
};

// Enemy Object
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// start the game when the page loads
startGame();
