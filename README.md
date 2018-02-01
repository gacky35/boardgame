Sorry for poor English.
# Boardgame
* Encampment game
# number.c
* Rule
   * Two-player game
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
   
* ルール
   * 二人対戦型のゲームです。
   * (1, 1) から (5, 5) までどこにでも数字を置くことができます。(ただし、ほかの数字が置いてある場所は除きます。)
   * 数字は 1 から 5 から好きなものを選べます。
   * 最初に置いた数字が、プレイヤーの持つ数字となります。
      * 例えば、(2, 4) に 2 を置いた場合、プレイヤーの持つ数字は 2 となります。
   * プレイヤーがほかの数字の隣に数字を置いたとき、もともとあった数字を、それに新たに置かれた数字を足したものに更新します。
      * 例えば、(2, 5) に置かれた 3 の隣の (2, 4) に 2 を置いた場合、(2, 5) は 5 (= 3 + 2) に更新されます。
   * もしも、更新された数字が 6 以上になったら、画面には更新された数字から 6 を引いた数字が表示されます。
      * 例えば、更新された数字が 7 であった場合、画面に表示されるのは 1 (= 7 - 6) です。更新された数字が 6 なら □ (= 6 - 6) となります。
   * 最後に、すべてのマスが数字で埋まった時、それぞれのプレイヤーが最初に置いた数が、ボード上に何個あるかを比較します。
   * より多く、最初に置いた数字がボード上にあった人が、勝者になります。
   
# board.c
* Rule
   * continue editing ...

