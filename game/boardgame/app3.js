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
    {x :2, y :1},
    {x :2, y :2},
    {x :2, y :3},
    {x :3, y :1},
    {x :3, y :2},
    {x :3, y :3},
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
    for ( var i = 1; i <= 3; i++ ) {
        for ( var j = 1; j <= 3; j++ ) {
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
    if ( !firstChooseA ) {
        firstChooseA = Math.floor(Math.random()*(5-1)+1);
    } else {
        do {
            firstChooseB = Math.floor(Math.random()*(5-1)+1);
        } while ( firstChooseB == firstChooseA );
    }
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

function chooseNumber() {
     if ( !firstChooseA ) { //playerA�������I��łȂ������炱��
            //firstChooseA = num[0];
            //chosen = num[1];
            document.getElementById("playerA-number").innerText  = firstChooseA;
            document.getElementById("PlayerA").style.display="none";
            document.getElementById("PlayerB").style.display="block";
           // document.getElementById(chosen).style.display="none";
            selectB();
        /*} else if ( !firstChooseB ) {
            firstChooseB = num[0];*/
            document.getElementById("playerB-number").innerText  = /*num[0]*/firstChooseB;
            document.getElementById("PlayerB").style.display="none";
            //document.getElementById(chosen).style.display="block";
        } else {
            /*selectedNumber = num[0];
            link = document.getElementById(num[1]).src;
            document.getElementById("number").innerText = selectedNumber;
        */}

}

function putNumber() {
    selectPositionB();
    link = document.getElementById(number[selectNum-1][1]).src;
    board[posx][posy] = selectNum;
    document.getElementById("" + posx + posy + "").src = link;
    change(posx, posy, selectNum);
    if (judge(board)) {
        return false;
    }
    document.getElementById("current-player-name").innerText = (turn = !turn) ? "Player A" : "Player B";
}

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
        }
    }
}
}
//setNumber();

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

    for ( var i = 1; i <= 3; i++ ) {
        for ( var j = 1; j <= 3; j++ ) {
            board[i][j] = EMPTY;
            document.getElementById("" + i + j + "").src = piece[EMPTY];
        }
    }

    chooseNumber();
    while(true) {
        setTimeout(putNumber(), 2500);
    }
}

document.getElementById("replay").onclick = function() {
    show();
    //setNum();
}

alert("�V�ѕ�\n1. ���̐����������Ă���\�̒����玩���̐������N���b�N���đI������D\n2�D���̕\�̒������̕\�̒��ɒu�������������N���b�N����, \n��̕\�̒u�������ꏊ���N���b�N����D�ȍ~�͂��̑�����J��Ԃ��D\n3�D���̃Q�[���ł͒u����������ׂ��������ɉ��Z���邱�ƂŔՖʂ��ς���Ă����D\n4�D�Ⴆ��2���u���Ă��鉡�����3��u���ƁC2��5�ɂȂ�Ƃ������`�ł���D\n5�D���̎��ύX��̐���6�ȏ�ɂȂ����ꍇ�́C���̐�����6�������������\�������D\n6�D5�̉���4��u���Ɩ{���Ȃ�9�ɂȂ�Ƃ���3�ɂȂ�Ƃ������v�̂ł���D\n7�D�܂��ύX��̐���6�ɂȂ����ꍇ��0�ɕύX����邽�߁C�󔒃}�X�ƂȂ�D\n8�D�}�X�����ׂĖ��܂������ɍŏ��ɑI�񂾐��������������҂ƂȂ�D");
show();
