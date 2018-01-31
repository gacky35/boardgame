Sorry for poor English.
# Boardgame
* encampment game
# number.c
* Rule
   * two-player game
   * You can put anywhere on the board from (1, 1) to (5, 5). (Except where other numbers are placed)
   * You can choose numbers from 1 to 5.
   * First placed number is each of your number.
     * ex) If you placed 2 on (2, 4) first, your number is 2.
   * When the numbers which you put are adjacent to each other, update the numbers from the original to the ones have been added now.
     * ex) If you placed 2 on (2, 4) next to 3 on (2, 5), (2, 5) updates to 5 (= 3 + 2).
   * If Updated numbers become over 6, display the number which minus 6 from it.
     * ex) If the number updated to 7 display 1 (= 7 - 6). The another one updated to 6 diplay □ (= 6 - 6).
   * At last, when all of trout are buried, compare how many of the numbers which both player placed first in the stage. 
   * The player who getting more trout is the winner.
   
# board.c
* Rule
   * continue editing ...

