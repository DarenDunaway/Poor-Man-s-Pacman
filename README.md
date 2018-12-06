# Poor Man's Pac-Man by Daren Dunaway
Project for CMSI 185

https://codepen.io/DD05/pen/zMgaMx?editors=1111

https://darendunaway.github.io/Poor-Man-s-Pacman/

In this chaser style of the infamous game Pacman, your goal is to avoid the ghosts around you. If you feel bombarded by the ghosts, feel free to click your mouse and drop down a scarecrow, a shadow of of your player that draws away the ghosts for five seconds. Try to maintain your health bar for as long as possible and see how high your score can go!

Game Components:
  - 1 player designed through p5 shapes (follows the current mouse location)
  - Increasing number of enemy ghosts that follow the player (one ghost spawns at the start of the game, then one additional ghost spawns every time the score increases by 15)
  - Health bar that has a max value of 100 and decreases everytime the player contacts and enemy ghost
  - Score that increases as time passes (reliant on the health bar value remaining over zero)
  - Scarecrow that draws enemy ghosts towards its position and away from the player (lasts five seconds)
  
Game Controls:
  - Mouse movement and location controls players movement
  - Mouse click adds a scarecrow
