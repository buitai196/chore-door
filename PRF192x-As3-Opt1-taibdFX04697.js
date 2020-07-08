var doorImage1 = document.querySelector('#door1');
var doorImage2 = document.getElementById('door2');
var doorImage3 = document.getElementById('door3');
var startButton = document.getElementById('start');
var botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
var beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
var spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
var numClosedDoors = 3;
var openDoor1;
var openDoor2;
var openDoor3;
var closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
var currentlyPlaying = true;
var currStreak=document.getElementById("current-streak");
var bestStreak=document.getElementById("best-streak");

let isBot = (door) => {
  if (door.src === "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg") {
    return true;
  } else {
    return false;
  }
}
let isClicked = (x) => {
  if (x.src === "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"){
    return false;
  } else {
    return true;
  }

}

playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door) === true) {
    gameOver();
  }

}

randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random()*numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }

}

doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying === true) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}
doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying === true) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}
doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying === true) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  } 
}

startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = "Good Luck";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

startButton.onclick = () => {
  startRound();
}

gameOver = (str) => {
  var numcurrStreak = parseFloat(currStreak.innerText);
  var numbestStreak = parseFloat(bestStreak.innerText);
  if (str === "win") {
    startButton.innerHTML = "You win! Play again?";
    numcurrStreak = numcurrStreak + 1;
    currStreak.innerText = numcurrStreak;
  } else {
    startButton.innerHTML = "Game over! Play again?";
    if (numcurrStreak > numbestStreak ) {
      bestStreak.innerText = numcurrStreak;  
    }
    currStreak.innerText = "0";
  };
  currentlyPlaying = false;
}

startRound();
//randomChoreDoorGenerator();
