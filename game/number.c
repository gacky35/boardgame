#include<stdio.h>
#define NUMBER 7

void set(int v[NUMBER][NUMBER]){
    int i, j;
    
    for(i=0;i<NUMBER; i++){
        for(j=0;j<NUMBER;j++){
            v[i][j] = 0;
        }
    }
}

void disp(int v[NUMBER][NUMBER]){
    int i, j;
    
    for(i=1;i<NUMBER-1; i++){
        for(j=1;j<NUMBER-1;j++){
            if(v[i][j] > 0){
                printf(" %d", v[i][j]);
            }else if(v[i][j] == 0){
                printf("□");
            }
        }
        putchar('\n');
    }
}

void change(int v[NUMBER][NUMBER], int a, int b){
    
    if(v[a-1][b] != 0){
        v[a-1][b] = v[a-1][b] + v[a][b];
        if(v[a-1][b] >= 6){
            v[a-1][b] -= 6;
        }
    }if(v[a+1][b] != 0){
        v[a+1][b] = v[a+1][b] + v[a][b];
        if(v[a+1][b] >= 6){
            v[a+1][b] -= 6;
        }
    }if(v[a][b-1] != 0){
        v[a][b-1] = v[a][b-1] + v[a][b];
        if(v[a][b-1] >= 6){
            v[a][b-1] -= 6;
        }
    }if(v[a][b+1] != 0){
        v[a][b+1] = v[a][b+1] + v[a][b];
        if(v[a][b+1] >= 6){
            v[a][b+1] -= 6;
        }
    }
}

int judge(int v[NUMBER][NUMBER], int a, int b){
    int i, j;
    int flag = 0;
    int flag1 = 0;
    int flag2 = 0;
    
    for(i=1;i<NUMBER-1;i++){
        for(j=1;j<NUMBER-1;j++){
            if(v[i][j] == 0){
                flag += 1;
            }
        }
    }
    if(flag == 0){
        for(i=1;i<NUMBER-1;i++){
            for(j=1;j<NUMBER-1;j++){
                if(v[i][j] == a){
                    flag1 += 1;
                }else if(v[i][j] == b){
                    flag2 += 1;
                }
            }
        }
    }else{
        return 1;
    } 
    if(flag1 > flag2){
        puts("winner : player1");
        return 0;
    }else if(flag2 > flag1){
        puts("winner : player2");
        return 0;
    }else{
        puts("draw");
        return 0;
    }
}

int attack(int v[NUMBER][NUMBER]){
    int a, b, c;
    int t=0;
    static int n=1;
    int p1, p2;
    static int f=0;
    
    while(t==0){
        puts("position");
        scanf("%d %d", &a, &b);
        if(a<1 || a>NUMBER-2 || b<1 || b>NUMBER-2){
            puts("Out of range");
        }else if(v[a][b] != 0){
            puts("Can't put");
        }else{
            t += 1;
        }
    }
    while(t==1){
        puts("number");
        scanf("%d", &c);
        if(c<1 || c>5){
            puts("Out of range");
        }else if(n==2 && c == p1){
            puts("same number");
        }else{
            if(f==0){
                p1 = c;
                f += 1;
            }else if(f==1){
                p2 = c;
                f += 1;
            }
            v[a][b] = c;
            t += 1;
            n += 1;
        }
    }
    change(v, a, b);
    disp(v);
    return judge(v, p1, p2);
}

int main(void){
    int board[NUMBER][NUMBER];

    set(board);
    disp(board);
    while(attack(board)){
    }
    
    return 0;
}
