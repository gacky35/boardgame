var firstChooseA;
var firstChooseB;
var allyA, allyB;
var selectedNumber, cpuSelectedNumber;
var posx, posy, selectNum;
var link;
var turn;
var chosen;
var board = [];
var piece = [
        "./background.jpg",
        "./1.jpg",
        "./2.jpg",
        "./3.jpg",
        "./4.jpg",
        "./5.jpg"
    ];

var OUT_OF_BOARD = 128;
var EMPTY = 0;
var ONE = 1;
var TWO = 2;
var THREE = 3;
var FOUR = 4;
var FIVE = 5;
var SIX = 6;

const position = [
    {x :1, y :1},
    {x :1, y :2},
    {x :1, y :3},
    {x :1, y :4},
    {x :2, y :1},
    {x :2, y :2},
    {x :2, y :3},
    {x :2, y :4},
    {x :3, y :1},
    {x :3, y :2},
    {x :3, y :3},
    {x :3, y :4},
    {x :4, y :1},
    {x :4, y :2},
    {x :4, y :3},
    {x :4, y :4},
]

const number = [ 
    [ONE, 'one'],
    [TWO, 'two'],
    [THREE, 'three'],
    [FOUR, 'four'],
    [FIVE, 'five']
]

function change(x, y, number) {
    for (var dx = -1, dy = 0, i = 0; i < 4; dx += dy, dy = dx - dy, dx = dy - dx, ++i) {
        if (board[x + dx][y + dy] >= ONE && board[x + dx][y + dy] <= FIVE) {
            board[x + dx][y + dy] += board[x][y];
            if (board[x + dx][y + dy] > FIVE) {
                board[x + dx][y + dy] -= SIX;
            }
            document.getElementById("" + (x + dx) + (y + dy) + "").src = piece[board[x + dx][y + dy]];
        }
    }
}

function judge(board) {
    allyA = 0;
    allyB = 0;
    for ( var i = 1; i <= 4; i++ ) {
        for ( var j = 1; j <= 4; j++ ) {
            if ( board[i][j] == EMPTY ) {
                return false;
            } else if ( board[i][j] == firstChooseA ) {
                allyA += 1;
            } else if ( board[i][j] == firstChooseB ) {
                allyB += 1;
            }
        }
    }
    if ( allyA > allyB ) {
        alert("Winner, Player A!");
    } else if ( allyB > allyA ) {
        alert("Winner, Player B!");
    } else {
        alert("Draw");
    }
    document.getElementById("replay").style.display = "block";
    return true;
}

function selectB() { //playerB(cpu)���u���l��I��(����)
    do {
        firstChooseB = Math.floor(Math.random()*(5-1)+1);
    } while ( firstChooseB == firstChooseA );
}

function selectPositionB() { //playerB(cpu)���u���ꏊ��I��(����)
    do {
        posx = Math.floor(Math.random()*(5-1)+1);
        posy = Math.floor(Math.random()*(5-1)+1);
    } while ( board[posx][posy] != EMPTY );
    selectNum = Math.floor(Math.random()*(5-1)+1);
}

for ( const num of number ) { //���̐����z��̊֐�
    document.getElementById(num[1]).onclick = function() {
        if ( !firstChooseA ) { //playerA�������I��łȂ������炱��
            firstChooseA = num[0];
            chosen = num[1];
            document.getElementById("playerA-number").innerText  = num[0];
            document.getElementById("PlayerA").style.display="none";
            document.getElementById("PlayerB").style.display="block";
            document.getElementById(chosen).style.display="none";
            selectB();
        /*} else if ( !firstChooseB ) {
            firstChooseB = num[0];*/
            document.getElementById("playerB-number").innerText  = /*num[0]*/firstChooseB;
            document.getElementById("PlayerB").style.display="none";
            document.getElementById(chosen).style.display="block";
        } else {
            selectedNumber = num[0];
            link = document.getElementById(num[1]).src;
            document.getElementById("number").innerText = selectedNumber;
        }
    }
}
/*
document.getElementById("one").onclick = function() {
    selectedNumber = ONE;
    link = document.getElementById("one").src;
    document.getElementById("number").innerText = selectedNumber;
}

document.getElementById("two").onclick = function() {
    selectedNumber = TWO;
    link = document.getElementById("two").src;
    document.getElementById("number").innerText = selectedNumber;
}

document.getElementById("three").onclick = function() {
    selectedNumber = THREE;
    link = document.getElementById("three").src;
    document.getElementById("number").innerText = selectedNumber;
}

document.getElementById("four").onclick = function() {
    selectedNumber = FOUR;
    link = document.getElementById("four").src;
    document.getElementById("number").innerText = selectedNumber;
}

document.getElementById("five").onclick = function() {
    selectedNumber = FIVE;
    link = document.getElementById("five").src;
    document.getElementById("number").innerText = selectedNumber;
}
*/
/*
for ( var i = 1; i <= 4; i++ ) {
    for ( var j = 1; j <= 4; j++ ) {
    e = document.getElementById("" + i + j + "");
    e.onclick = function() {
        if (selectedNumber >= ONE && selectedNumber <= FIVE && board[i][j] == EMPTY) {
            e.src = link;
            board[i][j] = selectedNumber;
            first();
            change(i, j, board[i][j]);
            judge(board);
            document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
        }
    }
    }
}
*/

function setNumber() {
for ( const item of position ) { //��̕\�̊e�}�X�̊֐�
    document.getElementById("" + item.x + item.y + "").onclick = function() {
        if (selectedNumber >= ONE && selectedNumber <= FIVE && board[item.x][item.y] == EMPTY) {
            this.src = link; //�}�X�ɕ\������摜�̃����N���͂߂�
            board[item.x][item.y] = selectedNumber; //�{�[�h�z��ɕ\�����鐔���i�[
            change(item.x, item.y, board[item.x][item.y]); //���[���ɑ����ă{�[�h�z��̒l��ύX
            if (judge(board)) {
                return 0;
            } //�I������
            selectedNumber = 0;
            document.getElementById("number").innerText = "-";
            document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B"; //�����܂�playerA
            for ( const item of position ) {
                document.getElementById("" + item.x + item.y + "").onclick = null;
            }
            setTimeout(function () {
                selectPositionB();
                link = document.getElementById(number[selectNum-1][1]).src;
                board[posx][posy] = selectNum;
                document.getElementById("" + posx + posy + "").src = link;
                change(posx, posy, selectNum);
                if (judge(board)) {
                    return 0;
                }
                document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
                setNumber();
            }, 2500)
            /*sleep(2500); //���̕ӂ�Ń^�C���A�E�g���X���[�v���Ȃ񂩂�����
            selectPositionB();
            link = document.getElementById(number[selectNum-1][1]).src;
            board[posx][posy] = selectNum;
            document.getElementById("" + posx + posy + "").src = link;
            change(posx, posy, selectNum);
            if (judge(board)) {
                return 0;
            }
            document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B"; //�����܂�playerB*/
        }
    }
}
}
setNumber();
/*
   document.getElementById("11").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[1][1] == EMPTY) {
   this.src = link;
   board[1][1] = selectedNumber;
   first();
   change(1, 1, board[1][1]);
   judge(board);
   document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
   }
   }

   document.getElementById("12").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[1][2] == EMPTY) {
   this.src = link;
   board[1][2] = selectedNumber;
   first();
   change(1, 2, board[1][2]);
   judge(board);
   document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
   }
   }

   document.getElementById("13").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[1][3] == EMPTY) {
   this.src = link;
   board[1][3] = selectedNumber;
   first();
   change(1, 3, board[1][3]);
   judge(board);
   document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
   }
   }

   document.getElementById("14").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[1][4] == EMPTY) {
   this.src = link;
   board[1][4] = selectedNumber;
   first();
   change(1, 4, board[1][4]);
   judge(board);
   document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
   }
   }

   document.getElementById("21").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[2][1] == EMPTY) {
   this.src = link;
   board[2][1] = selectedNumber;
   first();
   change(2, 1, board[2][1]);
   judge(board);
   document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
   }
   }

   document.getElementById("22").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[2][2] == EMPTY) {
   this.src = link;
   board[2][2] = selectedNumber;
   first();
   change(2, 2, board[2][2]);
   judge(board);
   document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
   }
   }

   document.getElementById("23").onclick = function() {
   if (selectedNumber >= ONE && selectedNumber <= FIVE && board[2][3] == EMPTY) {
   this.src = link;
   board[2][3] = selectedNumber;
first();
change(2, 3, board[2][3]);
judge(board);
document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
}
}

document.getElementById("24").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[2][4] == EMPTY) {
        this.src = link;
        board[2][4] = selectedNumber;
        first();
        change(2, 4, board[2][4]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("31").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[3][1] == EMPTY) {
        this.src = link;
        board[3][1] = selectedNumber;
        first();
        change(3, 1, board[3][1]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("32").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[3][2] == EMPTY) {
        this.src = link;
        board[3][2] = selectedNumber;
        first();
        change(3, 2, board[3][2]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("33").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[3][3] == EMPTY) {
        this.src = link;
        board[3][3] = selectedNumber;
        first();
        change(3, 3, board[3][3]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("34").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[3][4] == EMPTY) {
        this.src = link;
        board[3][4] = selectedNumber;
        first();
        change(3, 4, board[3][4]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("41").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[4][1] == EMPTY) {
        this.src = link;
        board[4][1] = selectedNumber;
        first();
        change(4, 1, board[4][1]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("42").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[4][2] == EMPTY) {
        this.src = link;
        board[4][2] = selectedNumber;
        first();
        change(4, 2, board[4][2]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("43").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[4][3] == EMPTY) {
        this.src = link;
        board[4][3] = selectedNumber;
        first();
        change(4, 3, board[4][3]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}

document.getElementById("44").onclick = function() {
    if (selectedNumber >= ONE && selectedNumber <= FIVE && board[4][4] == EMPTY) {
        this.src = link;
        board[4][4] = selectedNumber;
        first();
        change(4, 4, board[4][4]);
        judge(board);
        document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
    }
}
*/


function show() {
    document.getElementById("PlayerA").style.display = "block"
    firstChooseA = 0;
    firstChooseB = 0;
    selectedNumber = 0;
    document.getElementById("playerA-number").innerText  = "-";
    document.getElementById("playerB-number").innerText  = "-";
    document.getElementById("number").innerText  = "-";
    turn = true;
    document.getElementById("current-player-name").innerText = (turn) ? "Player A" : "Player B";
    document.getElementById("replay").style.display = "none";

   
    for ( var i = 0; i <= 5; i++ ) {
        board[i] = [];
        for ( var j = 0; j <= 5; j++ ) {
            board[i][j] = OUT_OF_BOARD;
        }
    }

    for ( var i = 1; i <= 4; i++ ) {
        for ( var j = 1; j <= 4; j++ ) {
            board[i][j] = EMPTY;
            document.getElementById("" + i + j + "").src = piece[EMPTY];
        }
    }
}

document.getElementById("replay").onclick = function() {
    show();
    setNum();
}

alert("�V�ѕ�\n1. ���̐����������Ă���\�̒����玩���̐������N���b�N���đI������D\n2�D���̕\�̒������̕\�̒��ɒu�������������N���b�N����, \n��̕\�̒u�������ꏊ���N���b�N����D�ȍ~�͂��̑�����J��Ԃ��D\n3�D���̃Q�[���ł͒u����������ׂ��������ɉ��Z���邱�ƂŔՖʂ��ς���Ă����D\n4�D�Ⴆ��2���u���Ă��鉡�����3��u���ƁC2��5�ɂȂ�Ƃ������`�ł���D\n5�D���̎��ύX��̐���6�ȏ�ɂȂ����ꍇ�́C���̐�����6�������������\�������D\n6�D5�̉���4��u���Ɩ{���Ȃ�9�ɂȂ�Ƃ���3�ɂȂ�Ƃ������v�̂ł���D\n7�D�܂��ύX��̐���6�ɂȂ����ꍇ��0�ɕύX����邽�߁C�󔒃}�X�ƂȂ�D\n8�D�}�X�����ׂĖ��܂������ɍŏ��ɑI�񂾐��������������҂ƂȂ�D");
show();
