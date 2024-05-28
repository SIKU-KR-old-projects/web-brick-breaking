var temp = 0;
var mousePositionX = 250;
var bricks = [];
var balls = [];
var context;
var canvas;
var radius = 20;
var lenX = 130;
var lenY = 65;
var coin=0;
var mode;
var barLength;
var ballRadius;
var canvasWidth;
var canvasHeight;
var ballspeed;
var o = 0;
var t;
var ba;
var brick3 = new Image();
var brick2 = new Image();
var brick1 = new Image();
brick3.src = "./img/brick3.png";
brick2.src = "./img/brick2.png";
brick1.src = "./img/brick1.png";
var egg1 = new Image();
var audio;

var itemBrick = new Image();
itemBrick.src = "./img/itembrick.png";

var maxscore;
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getCookieAndSet() {
    var eggCookie = getCookie("egg");
    if (eggCookie != null) {
        egg1.src = eggCookie;
    } else {
        egg1.src = '../img/egg1.png';
    }
    var backgroundCookie = getCookie("background");
    console.log(backgroundCookie);
    if (backgroundCookie != null) {
        $('#background').css('background-image', 'url(' + backgroundCookie + ')');
    } else {
        $('#background').css('background-image', 'url(../img/background1.png)');
    }
    audio = new Audio(getCookie('music'));
    audio.loop = true;
    maxscore = getCookie("maxscore");
    if(maxscore == null){
        maxscore = 0;
    }
}

function brick(x, y, lenX,lenY,life, color,row,col,itemB) {
            this.x = x;
            this.y = y;
            this.lenX = 90;
            this.lenY = 50;
            this.life = life;
            this.color = color;
            this.row = row;
            this.col = col;
            this.itemB = itemB;

        }
 function Ball(x, y, radius, dx, dy, item) {
            this.x = x; // x좌표
            this.y = y; // y좌표
            this.radius = radius; // 반지름
            this.dx = dx; // x축 속도
            this.dy = dy; // y축 속도
            this.item = item;
            this.speed = Math.sqrt(this.dx*this.dx+this.dy*this.dy);
        }
 var brickColorArray = ["white","#BDBDBD","#6E6E6E","black"];

 $(document).ready(function(){
        getCookieAndSet();
        audio.play();

        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

        canvasWidth = canvas.width;
        canvasHeight = canvas.height;

      $('#stop').on('click', stopAnimation);

         ba = setInterval(barcheck, 5);
         $("#auto").click(function(){
            autoMode(1);
         });
            function autoMode(what){
            if(what == 1){
                if(o == 0){
                clearInterval(ba);
                t = setInterval(auto, 5);
                ba = setInterval(barcheckAuto, 5);
                o = 1;
                }
                else{
                    clearInterval(ba);
                    clearInterval(t);
                    ba = setInterval(barcheck, 5);
                    o = 0;
                }
            }else if(what == 0){
                
                    clearInterval(ba);
                    clearInterval(t);
                    o = 0;
            }
        };

         $(document).mousemove(function(e){
            if(o == 0){
                mousePositionX = e.pageX-100;
                mousePositionY = e.pageY;
                drawbar();
            }
        });

        $("#start").on("click", function(){
            autoMode(0);
            ballspeed = 6;
            barLength = 200;
            ballRadius = 30;
            stopAnimation();
            context.clearRect(0,0,canvasWidth,canvasHeight);
            bricks.length = 0;
            balls.length = 0;
            creatBrick(1);
            addBall(250,250);
            animate();
            //banimate();
            attak();
            ccc = setInterval(touchdown,10);
            chch = setInterval(checkfin,2100);
            out = setInterval(ballOut, 1000);
            ba = setInterval(barcheck, 1);    
        })
}); 

 Array.matrix = function (m,n,initial) {
    var a, i, j, final = [];
    for(i=0;i<m;i+=1){
        a=[];
        for(j=0;j<n;j+=1){
            a[j] = initial;
        }
        final[i] = a;
        }
        return final;
    };
    var arr = Array.matrix(40,6,0);
    function creatBrick(mode) {
        var itemcount = 0;
        var i;
        var j;
        var color;
            for(i=10;i<40;i++)
        {
            for(j=0;j<6;j++){
               
            var b = Math.floor(Math.random()*(9-mode));
            if (b==4){
                var ttt = Math.floor(Math.random()*(mode+1));
                if(ttt==0){
                    b=1;
                }
            }
            arr[i][j]=b; //(j,i)위치의 벽돌의 존재 여부
    
           
            }
        }
        for(t=0;t<10;t++)
        {
            for(j=0;j<6;j++){
               
            var b = 0;
    
            arr[t][j]=b; //
    
           
            }
    
        }
    
        for(i=39;i>9;i--){
           for(j=0;j<6;j++){
            var tdt = arr[i][j];
            if(tdt==4){
                itemcount++
                if(itemcount>8){
                arr[i][j]=1;
            }
            }
            
           }
    
        }
        console.log(arr);
        fillbrick(arr,mode);
        };
    var fill;
    var count;
    function fillbrick(arr,mode){

    var i;
    var j;
    var color;
    count = 0;
    var aa = 39;

    var check;
    fill = setInterval(function(){
    if(aa>0)
            bricks.length=0;
    for(i=aa;i<40;i++){
        for(j=0;j<6;j++){
                check = arr[i][j];
                switch(check){
                case 1 :
                    var x = (j*130+(20*j)+30);
                    var y = ((count-(39-i))*65+(6*(count-(39-i))));
                    var lenX = 130;
                    var lenY = 65;
                    var life =1;
                    var color = brickColorArray[1];
                    var row = i;
                    var col = j;
                    var itemB = 0;
                    var newBrick = new brick(x,y,lenX,lenY,life,color,row,col,itemB);
                    if(aa>0)
                    {bricks.push(newBrick);}
                    break;
                case 2 :
                    var x = (j*130+(20*j)+30);
                    var y = ((count-(39-i))*65+(6*(count-(39-i))));
                    var lenX = 130;
                    var lenY = 65;
                    var life =2;
                    var color = brickColorArray[2];
                     var row = i;
                    var col = j;
                    var itemB =0;
                    var newBrick = new brick(x,y,lenX,lenY,life,color,row,col,itemB);
                     if(aa>0)
                    {bricks.push(newBrick);}
                    break;
                case 3 :
                    var x = (j*130+(20*j)+30);
                    var y = ((count-(39-i))*65+(6*(count-(39-i))));
                    var lenX = 130;
                    var lenY = 65;
                    var life =3;
                    var color = brickColorArray[3];
                    var row = i;
                    var col = j;
                    var itemB = 0;
                    var newBrick = new brick(x,y,lenX,lenY,life,color,row,col,itemB);
                    if(aa>0)
                    {bricks.push(newBrick);}
                    break;
                case 4 :
                    var x = (j*130+(20*j)+30);
                    var y = ((count-(39-i))*65+(6*(count-(39-i))));
                    var lenX = 130;
                    var lenY = 65;
                    var life =3;
                    var color = brickColorArray[0];
                    var row = i;
                    var col = j;
                    var itemB = 1;
                    var newBrick = new brick(x,y,lenX,lenY,life,color,row,col,itemB);
                    if(aa>0)
                    {bricks.push(newBrick);}
                    break;
                default:
                    break;
                    }
                context.clearRect((j*130+(20*j)+30)-1, ((count-(39-i))*65+(6*(count-(39-i))))-1, 132, 67);
        }
    }
        count++;
        aa--;
        if(aa<=0)
            aa=0;
    },5000-(mode*1000));
};
var chch;
function checkfin(){
    if(count > 29){
     if(bricks.length==0){
            alert("game clear");
            stopAnimation();
            openWindowWithSize('./normal.html', 1315, 750);
        }
    }
};

function openWindowWithSize(url, width, height) {
    // 새 창의 속성 설정
    var windowFeatures = 'width=' + width + ',height=' + height + ',left=100,top=100';

    // 새 창 열기
    var newWindow = window.open(url, 'newWindow', windowFeatures);

    // 새 창이 성공적으로 열렸는지 확인
    if (newWindow) {
        // 포커스를 새 창으로 이동
        newWindow.focus();
    } else {
        // 팝업이 차단된 경우
        alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
    }
}

var ccc;
function touchdown(){
for(var i = 0;i<bricks.length;i++){
    if(bricks[i].y>=canvasHeight-20)
            {
            alert("game over");
            stopAnimation();
            }
    }          
};
function stopAnimation(){
    //cancelAnimationFrame(bani);
    cancelAnimationFrame(ani);
    cancelAnimationFrame(att);
    cancelAnimationFrame(fill);
    clearInterval(ccc);
    clearInterval(fill);
    clearInterval(chch);
    clearInterval(out);
    bricks.length = 0;
    balls.length = 0;
    maxscore = getCookie("maxscore");
    if(maxscore == null){
        maxscore = 0;
    }
    if(coin != 0){
        alert("점수: " + coin);
        setCookie("maxscore", coin + parseInt(maxscore), 1);
        maxscore = coin;
    }
    coin = 0;
}
/*
var bani;
function banimate() {
    bricks.forEach(function(brick){
    context.clearRect(brick.x-2, brick.y-2,94, 54);
    context.beginPath();
    //context.fillStyle = brickColorArray[arr[brick.row][brick.col]];
    //context.fillRect(brick.x, brick.y, 90, 50);
    if(arr[brick.row][brick.col]==3){
    context.drawImage(brick3,brick.x,brick.y,90,50);
    }
    else if(arr[brick.row][brick.col]==2){
    context.drawImage(brick2,brick.x,brick.y,90,50);
    }
    else if(arr[brick.row][brick.col]==1){
    context.drawImage(brick1,brick.x,brick.y,90,50);
    }
    context.closePath();
        });
    bani = requestAnimationFrame(banimate);
};
*/
var ani;
function animate() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            drawbar();
            bricks.forEach(function(brick) {
            if(arr[brick.row][brick.col]==3){
                context.drawImage(brick3,brick.x,brick.y,130,65);
            }
            else if(arr[brick.row][brick.col]==2){
                context.drawImage(brick2,brick.x,brick.y,130,65);
            }
            else if(arr[brick.row][brick.col]==1){
                context.drawImage(brick1,brick.x,brick.y,130,65);
            }
            else if(arr[brick.row][brick.col]==4){
                context.drawImage(itemBrick,brick.x,brick.y,130,65);
            }
            });
            balls.forEach(function (ball) {
                ball.x += ball.dx;
                ball.y += ball.dy;
                ball.checkWallCollision(canvasWidth, canvasHeight - 10);
                context.drawImage(egg1,ball.x-ballRadius,ball.y-ballRadius,ballRadius*2,ballRadius*2);

            });
            ani = requestAnimationFrame(animate);
        };
        // 공 객체의 벽 충돌 처리
        Ball.prototype.checkWallCollision = function(canvasWidth, canvasHeight) {
            if (this.x - this.radius <= 0) {
                this.dx = -this.dx;
                this.x = this.radius + 5; 
            }
            if(this.x + this.radius >= canvasWidth){
                this.x = canvasWidth - (this.radius + 5);
                this.dx = -this.dx;
            }
            if (this.y - this.radius <= 0) {
                this.y = this.radius + 5;
                this.dy = -this.dy;
            }
        };
function barcheckAuto(){
            var m = mousePositionX;
            if (m >= canvasWidth - barLength/2) {
                m = canvasWidth - barLength/2;
            } else if (m <= barLength/2) {
                m = barLength/2;
            }
            for (var p = 0; p < balls.length; p++) {
                if (balls[p].x >= m - barLength/2-20 && balls[p].x <= m + barLength/2+20 &&
                    balls[p].y + balls[p].radius >= canvasHeight - 15 &&
                    balls[p].y + balls[p].radius <= canvasHeight) {
                    var ball = balls[p];
                    ball.y = canvasHeight - (ball.radius + 20);

                    var maxDx = 4.5;
                    var normalizedDist = Math.random();
                    ball.dx = normalizedDist * maxDx;
                    if(Math.abs(ball.dx)<0.5)
                        ball.dx = ball.dx + 0.3;
                    if(Math.random() > 0.5)
                        ball.dx = -ball.dx;
                    ball.dy = -Math.sqrt(Math.abs(ball.speed * ball.speed - ball.dx * ball.dx));

                    ball.y = canvasHeight - (ball.radius + 15);
                    console.log("Speed:", ball.speed);
                    console.log("dx:", ball.dx);
                    console.log("dy:", ball.dy);
                }
            }
         };
      
function barcheck() {
            var m = mousePositionX;
            if (m >= canvasWidth - barLength/2) {
                m = canvasWidth - barLength/2;
            } else if (m <= barLength/2) {
                m = barLength/2;
            }
            for (var p = 0; p < balls.length; p++) {
            if (balls[p].x >= m - barLength/2-20 && balls[p].x <= m + barLength/2+20 &&
                    balls[p].y + balls[p].radius >= canvasHeight - 15 &&
                    balls[p].y + balls[p].radius <= canvasHeight) {
                    var ball = balls[p];
                    var distFromCenter = ball.x - m;
                    var maxDist = barLength/2+20;//바 길이임
                    var normalizedDist = distFromCenter / maxDist;

                    var maxDx = 4.5;
                    ball.dx = normalizedDist * maxDx;
                    ball.dy = -Math.sqrt(Math.abs(ball.speed * ball.speed - ball.dx * ball.dx));

                    ball.y = canvasHeight - (ball.radius + 20);

                    console.log("Speed:", ball.speed);
                    console.log("dx:", ball.dx);
                    console.log("dy:", ball.dy);
                }
            }
        };
var att;
function attak(){    
            for(var j = 0; j < balls.length; j++) {
                for(var i = 0; i < bricks.length; i++) {
                    if (arr[bricks[i].row][bricks[i].col] > 0) {
                        var ball = balls[j];
                        var brick = bricks[i];
                        var radius = ball.radius;

                        if (brick.y - 2 <= ball.y + ballRadius && ball.y + ballRadius <= brick.y + 2 &&
                            ball.x + ballRadius >= brick.x - 2 && ball.x - ballRadius <= brick.x + lenX + 2) {
                            ball.dy = -ball.dy;
                            ball.y = brick.y - ballRadius - 5;
                            if(arr[brick.row][brick.col]==4){
                            arr[brick.row][brick.col]=0;
                            }
                            else
                             arr[brick.row][brick.col]--;
                        } else if (brick.y + lenY - 2 <= ball.y - ballRadius && ball.y - ballRadius <= brick.y + lenY + 2 &&
                            ball.x + ballRadius >= brick.x - 2 && ball.x - ballRadius <= brick.x + lenX + 2) {
                            ball.dy = -ball.dy;
                            ball.y = brick.y + lenY + ballRadius + 5;
                           if(arr[brick.row][brick.col]==4){
                            arr[brick.row][brick.col]=0;
                            }
                            else
                             arr[brick.row][brick.col]--;
                        } else if (brick.x - 2 <= ball.x + ballRadius && ball.x + ballRadius <= brick.x + 2 &&
                            ball.y + ballRadius >= brick.y - 2 && ball.y - ballRadius <= brick.y + lenY + 2) {
                            ball.dx = -ball.dx;
                            ball.x = brick.x - ballRadius - 5;
                            if(arr[brick.row][brick.col]==4){
                            arr[brick.row][brick.col]=0;
                            }
                            else
                             arr[brick.row][brick.col]--;
                        } else if (brick.x + lenX - 2 <= ball.x - ballRadius && ball.x - ballRadius <= brick.x + lenX + 2 &&
                            ball.y + ballRadius >= brick.y - 2 && ball.y - ballRadius <= brick.y + lenY + 2) {
                            ball.dx = -ball.dx;
                            ball.x = brick.x + lenX + ballRadius + 5;
                            if(arr[brick.row][brick.col]==4){
                            arr[brick.row][brick.col]=0;
                            }
                            else
                             arr[brick.row][brick.col]--;
                        } else if (brick.x - 2 <= ball.x && ball.x <= brick.x + lenX + 2 &&
                            brick.y - 2 <= ball.y && ball.y <= brick.y + lenY + 2) {
                            ball.dy = -ball.dy;
                           if(arr[brick.row][brick.col]==4){
                            arr[brick.row][brick.col]=0;
                            }
                            else
                             arr[brick.row][brick.col]--;
                        }

                        if (arr[brick.row][brick.col] <= 0) {
                            context.clearRect(brick.x, brick.y, 90, 50);
                            bricks.splice(i, 1);
                            coin++;
                            console.log(coin);
                             if(brick.itemB==1){
                                bclick(mousePositionX,canvasHeight-30);
                             }
                            i--;
                        }
                    }
                }
            }   
            att = requestAnimationFrame(attak);

        };

 function auto(){
            var close = 0;
            for(var p = 0; p < balls.length; p++){
                if(balls[p].y >= close && balls[p].y < canvasHeight)
                    close = balls[p].y
            }
            for(var p = 0; p < balls.length; p++){
                if(balls[p].y == close){
                    mousePositionX = balls[p].x;
                }
            }

         };

function bclick(x,y){
       addBall(x, y);
};

var out;

function ballOut(){
    var count = 0;
    for(var i = 0; i < balls.length; i++){
        if(balls[i].y < canvasHeight)
            count++;
    }
    if (count == 0) {
        alert("Game Over");
        stopAnimation();
    }
}

function drawbar () {
    context.clearRect(0,canvasHeight-10,canvasWidth,canvasHeight);
    if(mousePositionX>=canvasWidth-barLength/2)
        mousePositionX=canvasWidth-barLength/2;
    else if(mousePositionX<=barLength/2)
        mousePositionX=barLength/2;
     context.fillStyle = "black";
     context.fillRect(mousePositionX-barLength/2, canvasHeight-10, barLength, 10);
     };

function addBall(a, b) {
            var x = a;
            var y = b;
            var dx = ballspeed - parseInt(Math.random()*2+1);
            var dy = ballspeed - parseInt(Math.random()*2+1);
            if(Math.random() > 0.5)
                dx = -dx;
            if(Math.random() > 0.5)
                dy = -dy;
            var item = 0;
            var newBall = new Ball(x, y, ballRadius-20, dx, dy, item);
            balls.push(newBall); // 배열에 공 객체 추가
};
