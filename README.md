# Poor Man's Pac-Man by Daren Dunaway
Project for CMSI 185

https://darendunaway.github.io/Poor-Man-s-Pacman/

https://codepen.io/DD05/pen/GwVXOR?editors=1011

In this chaser style game based off of the infamous game Pac-Man, your goal is to avoid the ghosts around you. If you feel bombarded by the ghosts, feel free to click your mouse and drop down a scarecrow, a shadow of of your player that draws away the ghosts for five seconds. Once your health decreases below 50, you have the ability to delete half of the enemies by clicking any key on the keyboard. However, with every use of this power your player speed slightly decreases. Try to maintain your health for as long as possible and see how high your score can go!

Game Components:
  - 1 player designed through p5 shapes (follows the current mouse location)
  - Increasing number of enemy ghosts that follow the player (one ghost spawns at the start of the game, then one additional ghost spawns every time the score increases by 15)
  - Health bar that has a max value of 100 and decreases everytime the player contacts and enemy ghost
  - Score that increases as time passes (reliant on the health bar value remaining over zero)
  - Scarecrow that draws enemy ghosts towards its position and away from the player (lasts five seconds)
  - Power-up that deletes half the enemies, but slows player speed slightly
  - 1 button to restart the game
  
Game Controls:
  - Mouse movement and location controls players movement
  - Mouse click adds a scarecrow
  - Key press that deletes half the enemy ghosts
  - Clickable restart game button
