#include<stdio.h>
#define NUMBER 7

void rule(void){
    printf("rule 初手はそれぞれ角に●、▲、◆のいずれかを置く。\n");
    printf("以降は自身が置いた駒の隣に、異なる記号を置いていく。\n");
    printf("自分の駒と相手の駒が隣り合ったときに、バトルが始まる。\n");
    printf("●は▲に勝ち、▲は◆に勝ち、◆は●に勝つ。\n");
    printf("相手の駒に勝った場合は、相手の駒が自身の駒となる。\n");
    printf("先に相手の初手の位置の駒を自身の物にした者が勝者となる。\n");
    printf("すべてのマスが埋まった時に、駒数が多かった場合も勝者となる。\n");
    printf("ポジションの選択はX行目のY番目で入力する。\n");
    puts("");
    puts("Game Start !!");
    puts("");
}

void set_board(int v[NUMBER][NUMBER])
{
    int i, j;
    for(i=0;i<NUMBER;i++){
        for(j=0;j<NUMBER;j++){
            v[i][j] = 10;
        }
    }
}

void disp_board(int v[NUMBER][NUMBER])
{
    int i, j;
    printf("   1 2 3 4 5\n");
    for(i=1;i<6;i++){
        printf("%2d", i);
        for(j=1;j<6;j++){
            if(v[i][j] == 10 || v[i][j] == 0){
                printf("□");
            }else if(v[i][j] == 1){
                printf("〇");
            }else if(v[i][j] == 2){
                printf("△");
            }else if(v[i][j] == 3){
                printf("◇");
            }else if(v[i][j] == -1){
                printf("●");
            }else if(v[i][j] == -2){
                printf("▲");
            }else if(v[i][j] == -3){
                printf("◆");
            }
        }
        putchar('\n');
    }
    putchar('\n');
}

int check(int v[NUMBER][NUMBER], int a, int b){
    int c1=0;
    int c2=0;
    int c3=0;
    int c4=0;
    int c5=0;
    int c6=0;
    int s=0;
    
    if(a-1 == 0 || a+1 == 6 || b-1 == 0 || b+1 == 6){
        s += 1;
    }if(v[a+1][b] == 1){
        c1 += 1;
    }if(v[a-1][b] == 1){
        c1 += 1;
    }if(v[a][b+1] == 1){
        c1 += 1;
    }if(v[a][b-1] == 1){
        c1 += 1;
    }if(v[a+1][b] == 2){
        c2 += 1;
    }if(v[a-1][b] == 2){
        c2 += 1;
    }if(v[a][b+1] == 2){
        c2 += 1;
    }if(v[a][b-1] == 2){
        c2 += 1;
    }if(v[a+1][b] == 3){
        c3 += 1;
    }if(v[a-1][b] == 3){
        c3 += 1;
    }if(v[a][b+1] == 3){
        c3 += 1;
    }if(v[a][b-1] == 3){
        c3 += 1;
    }if(v[a+1][b] == -1){
        c4 += 1;
    }if(v[a-1][b] == -1){
        c4 += 1;
    }if(v[a][b+1] == -1){
        c4 += 1;
    }if(v[a][b-1] == -1){
        c4 += 1;
    }if(v[a+1][b] == -2){
        c5 += 1;
    }if(v[a-1][b] == -2){
        c5 += 1;
    }if(v[a][b+1] == -2){
        c5 += 1;
    }if(v[a][b-1] == -2){
        c5 += 1;
    }if(v[a+1][b] == -3){
        c6 += 1;
    }if(v[a-1][b] == -3){
        c6 += 1;
    }if(v[a][b+1] == -3){
        c6 += 1;
    }if(v[a][b-1] == -3){
        c6 += 1;
    }if(c1 > 0 && c2 > 0 && c3 >0){
        return 1;
    }else if(c4 > 0 && c5 > 0 && c6 >0){
        return 2;
    }else{
        return 0;
    }
}

int judge(int v[NUMBER][NUMBER])
{
    int flag=0;
    int flag1=0;
    int flag2=0;
    int i, j;
    
    for(i=1;i<NUMBER-1;i++){
        for(j=1;j<NUMBER-1;j++){
            if(check(v, i, j) == 1 || check(v, i, j) == 2){
            }else if(v[i][j] == 10){
                flag += 1;
            }else if(v[i][j] < 0){
                flag2 += 1;
            }else if(v[i][j] > 0){
                flag1 += 1;
            }
        }
    }
    if(v[1][NUMBER-2] > 0 && v[1][NUMBER-2] != 10){
        puts("won by player_1");
        puts("player_1 gets player_2's first place");
        return 0;
    }else if(v[NUMBER-2][1] < 0 && v[NUMBER-2][1] != 10){
        puts("won by player_2");
        puts("player_2 gets player_1's first place");
        return 0;
    }else if(flag == 0 && flag1 > flag2){
        puts("won by player_1");
        puts("player_1 gets more area.");
        return 0;
    }else if(flag == 0 && flag2 > flag1){
        puts("won by player_2");
        puts("player_2 gets more area.");
        return 0;
    }else{
        return 1;
    }
}

int skip(int v[NUMBER][NUMBER], int a, int b, int n){
    int flag = 0;
    int t;
    int i, j;
    
    for(i=1;i<NUMBER-1;i++){
        for(j=1;j<NUMBER-1;j++){
            if (v[i][j] == 10){
                if (n == 1){
                    if(!((!((v[i-1][j] > 0 && v[i-1][j] <= 3) || (v[i+1][j] > 0 && v[i+1][j] <= 3)
                     || (v[i][j-1] > 0 && v[i][j-1] <= 3) || (v[i][j+1] > 0 && v[i][j+1] <= 3))) || (check(v, i, j) == 1))){
                        flag += 1;
                    }
                }else if (n == 2){
                    if(!((v[i-1][j] >= 0 && v[i+1][j] >= 0 && v[i][j-1] >= 0 && v[i][j+1] >= 0) || (check(v, i, j) == 2))){
                        flag += 1;
                    }
                }
            }
        }
    }
    if(flag == 0){
        t = 1;
        return t;
    }else{
        t = 0;
        return t;
    }
}

int finish_roop_1(int v[NUMBER][NUMBER], int a, int b){
    if(v[a][b] == 1 || v[a][b] == 2){
        if(v[a][b] + v[a-1][b] == -1 || v[a][b] + v[a+1][b] == -1 
        || v[a][b] + v[a][b-1] == -1 || v[a][b] + v[a][b+1] == -1){
            return 1;
        }else{
            return 0;
        }
    }else if(v[a][b] == 3){
                if(v[a][b] + v[a-1][b] == 2 || v[a][b] + v[a+1][b] == 2 
                || v[a][b] + v[a][b-1] == 2 || v[a][b] + v[a][b+1] == 2){
                    return 1;
                }else{
                    return 0;
                }
    }
}

int finish_roop_2(int v[NUMBER][NUMBER], int a, int b){
    if(v[a][b] == -1 || v[a][b] == -2){
        if(v[a][b] + v[a-1][b] == 1 || v[a][b] + v[a+1][b] == 1 
        || v[a][b] + v[a][b-1] == 1 || v[a][b] + v[a][b+1] == 1){
            return 1;
        }else{
            return 0;
        }
    }else if(v[a][b] == -3){
        if(v[a][b] + v[a-1][b] == -2 || v[a][b] + v[a+1][b] == -2 
        || v[a][b] + v[a][b-1] == -2 || v[a][b] + v[a][b+1] == -2){
            return 1;
        }else{
            return 0;
        }
    }
}

int battle_contents(int v[NUMBER][NUMBER], int a, int b, int t){
    
    if(t==1 && (v[a-1][b] < 0 || v[a+1][b] < 0 || v[a][b-1] < 0 || v[a][b+1] < 0)){
        if(v[a][b] + v[a-1][b] == 2 || v[a][b] + v[a-1][b] == -1){
            v[a-1][b] = -v[a-1][b];
            battle_contents(v, a - 1, b, t);
        }
        if(v[a][b] + v[a+1][b] == 2 || v[a][b] + v[a+1][b] == -1){
            v[a+1][b] = -v[a+1][b];
            battle_contents(v, a + 1, b, t);
        }
        if(v[a][b] + v[a][b-1] == 2 || v[a][b] + v[a][b-1] == -1){
            v[a][b-1] = -v[a][b-1];
            battle_contents(v, a, b - 1, t);
        }
        if(v[a][b] + v[a][b+1] == 2 || v[a][b] + v[a][b+1] == -1){
            v[a][b+1] = -v[a][b+1];
            battle_contents(v, a, b + 1, t);
        }
    }else if(t==2 && (v[a-1][b] > 0 || v[a+1][b] > 0 || v[a][b-1] > 0 || v[a][b+1] > 0)){
        if(v[a][b] + v[a-1][b] == -2 || v[a][b] + v[a-1][b] == 1){
            v[a-1][b] = -v[a-1][b];
            battle_contents(v, a - 1, b, t);
        }
        if(v[a][b] + v[a+1][b] == -2 || v[a][b] + v[a+1][b] == 1){
            v[a+1][b] = -v[a+1][b];
            battle_contents(v, a + 1, b, t);
        }
        if(v[a][b] + v[a][b-1] == -2 || v[a][b] + v[a][b-1] == 1){
            v[a][b-1] = -v[a][b-1];
            battle_contents(v, a, b - 1, t);
        }
        if(v[a][b] + v[a][b+1] == -2 || v[a][b] + v[a][b+1] == 1){
            v[a][b+1] = -v[a][b+1];
            battle_contents(v, a, b + 1, t);
        }
    }
}

void battle_contents2(int v[NUMBER][NUMBER], int a, int b, int t){
    int c, d;
    c = a;
    d = b;
    while(finish_roop_1(v, c, d)){
        battle_contents(v, c, d, t);
    }
}

void battle_contents3(int v[NUMBER][NUMBER], int a, int b, int t){
    int c, d;
    c = a;
    d = b;
    while(finish_roop_2(v, c, d)){
        battle_contents(v, c, d, t);
    }
}

void battle(int v[NUMBER][NUMBER], int a, int b, int c){
    static int t;
    if(c > 0){
        t=1;
        battle_contents2(v, a, b, t);
    }else if(c < 0){
        t=2;
        battle_contents3(v, a, b, t);
    }
}

void player_1(int v[NUMBER][NUMBER]){
    static int a, b;
    static int c;
    int t = 0;
    int n = 1;
    
    t = skip(v, a, b, n);
    puts("player1");
    if(t == 1){
        printf("You can't put anywhere, skip your turn\n");
    }else{
        for(t;t == 0;){
            printf("Please choose place : ");   scanf("%d %d", &a, &b);
            if(a < 1 || a > 5 || b < 1 || b > 5){
                printf("Out of the range ! Please select the place again.\n");
            }else if(v[a][b] != 10 || (!((v[a-1][b] > 0 && v[a-1][b] <= 3) || (v[a+1][b] > 0 && v[a+1][b] <= 3)
            || (v[a][b-1] > 0 && v[a][b-1] <= 3) || (v[a][b+1] > 0 && v[a][b+1] <= 3))) || (check(v, a, b) == 1)){
                printf("Can't put !! Please put on another place.\n");
            }else{
                t += 1;
            }
        }
        t = 0;
        for(t;t == 0;){
            printf("1...〇\n2...△\n3...◇\nPlease choose any mark : ");
            scanf("%d", &c);
            if(c > 3 || c <= 0){
                printf("Out of the range ! Please select the number from 1 to 3.\n");
            }else if(v[a-1][b] == c || v[a+1][b] == c || v[a][b-1] == c || v[a][b+1] == c){
                printf("Can't put !! Please choose another mark.\n");
            }else{
                v[a][b] = c;
                t += 1;
            }
        }
        battle(v, a, b, c);
        disp_board(v);
    }
}

void player_2(int v[NUMBER][NUMBER]){
    static int a, b;
    static int c;
    int t = 0;
    int n = 2;
    
    t = skip(v, a, b, n);
    puts("player2");
    if(t == 1){
        printf("You can't put anywhere, skip your turn\n");
    }else{
        for(t;t == 0;){
            printf("Please choose place : ");   scanf("%d %d", &a, &b);
            if(a < 1 || a > 5 || b < 1 || b > 5){
                printf("Out of the range ! Please select the place again.\n");
            }if((v[a-1][b] >= 0 && v[a+1][b] >= 0 && v[a][b-1] >= 0 && v[a][b+1] >= 0) || v[a][b] != 10 || (check(v, a, b) == 2)){
                printf("Can't put !! Please put on another place.\n");
            }else{
                t += 1;
            }
        }
        t = 0;
        for(t;t == 0;){
            printf("1...●\n2...▲\n3...◆\nPlease choose any mark : ");
            scanf("%d", &c);
            c = -c;
            if(c >= 0 || c < -3){
                printf("Out of the range ! Please select the number from 1 to 3.\n");
            }else if(v[a-1][b] == c || v[a+1][b] == c || v[a][b-1] == c || v[a][b+1] == c){
                printf("Can't put !! Please choose another mark.\n");
            }else{
                v[a][b] = c;
                t += 1;
            }
        }
        battle(v, a, b, c);
        disp_board(v);
    }
}

void attack(int v[NUMBER][NUMBER])
{
    static int c = 0;
    int a;
    static int t = 0;
    
    if(c == 1){
        printf("player2\n1...●\n2...▲\n3...◆\n");
        printf("Please choose number : ");  scanf("%d", &a);
        a = -a;
        v[1][NUMBER-2] = a;
        c += 1;
        disp_board(v);
    }else if(c == 0){
        printf("player1\n1...〇\n2...△\n3...◇\n");
        printf("Please choose number : ");  scanf("%d", &a);
        v[NUMBER-2][1] = a;
        c += 1;
        disp_board(v);
    }else if(t % 2 == 0){
        player_1(v);
        t += 1;
    }else if(t % 2 == 1){
        player_2(v);
        t += 1;
    }
}

int main(void)
{
    int v[NUMBER][NUMBER];
    int i, j;

    rule();
    set_board(v);
    disp_board(v);
    while(judge(v)){
        attack(v);
    }
    
    return 0;
}
