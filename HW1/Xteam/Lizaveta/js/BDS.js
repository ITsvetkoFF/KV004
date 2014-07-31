function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode);
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
    }

    return null;
}

function numbersOnly(e) {

    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey) {
        e.preventDefault();
        return;
    };

    var chr = getChar(e);

    if (chr == null) {
        e.preventDefault();
        return;
    };

    if (chr < '0' || chr > '9') {
        // console.log(chr > '9');
        e.preventDefault();
        return false;
    }

}

(function () {
    document.getElementById("bds").addEventListener("submit", bDS, false);

    function Vertex(a,b,c) {
        this.x = +a;
        this.y = +b;
        this.step = +c;
    }

    var board = document.getElementById("board");

    var boardSizeField = document.getElementById("board-size");

    var startXField = document.getElementById("start-x");
    var startYField = document.getElementById("start-y");
    var finishXField = document.getElementById("finish-x");
    var finishYField = document.getElementById("finish-y");

    var startButton = document.getElementById('btn');


    var ctx = board.getContext('2d');
    board.width  = 920; 
    board.height = 920; 
    ctx.strokeStyle = "#87E1F3";
    ctx.strokeRect(0, 0, 920, 920); 

    boardSizeField.addEventListener("keypress", numbersOnly, false);
    startXField.addEventListener("keypress", numbersOnly, false);
    startYField.addEventListener("keypress", numbersOnly, false);
    finishXField.addEventListener("keypress", numbersOnly, false);
    finishYField.addEventListener("keypress", numbersOnly, false);

    function bDS(e) {
        
        e.preventDefault();

        startButton.disabled = true;

        var valid = true;

        var boardSize = parseInt(boardSizeField.value);
        var startX = parseInt(startXField.value);
        var startY = parseInt(startYField.value);
        var finishX = parseInt(finishXField.value);
        var finishY = parseInt(finishYField.value);

        boardSizeField.classList.remove('invalid');
        startXField.classList.remove('invalid');
        startYField.classList.remove('invalid');
        finishXField.classList.remove('invalid');
        finishYField.classList.remove('invalid');

        if(!boardSize) {
            boardSizeField.classList.add('invalid');
            valid = false;
        }

        if(!startXField.value.length || startX < 0 || startX >= boardSize) {
            startXField.classList.add('invalid');
            valid = false;
        }

        if(!startYField.value.length || startY < 0 || startY >= boardSize) {
            startYField.classList.add('invalid');
            valid = false;
        }

        if(!finishXField.value.length || finishX < 0 || finishX >= boardSize) {
            finishXField.classList.add('invalid');
            valid = false;
        }

        if(!finishYField.value.length || finishY < 0 || finishY >= boardSize) {
            finishYField.classList.add('invalid');
            valid = false;
        }

        if(!valid) {
            startButton.disabled = false;
            return;
        }

        // time start...

        var timeStart = new Date();
        var timeEnd;

        var start = new Vertex(startX, startY, 0);
        var finish = new Vertex(finishX, finishY, 0);

        var queue = [];
        var visited = [];
        var eightPoints = [];
        var path = [];
        var comeBack = [];
        var x,y;


        for (var i = 0; i < boardSize; i++) {
            visited[i] = [];
            for (var j = 0; j < boardSize; j++) {
                visited[i][j] = -1;
            };
        }

      
        queue[0] = start;
        visited[start.x][start.y] = 0;

       
        while(queue.length!=0) {

            
            
            eightPoints.push(new Vertex(queue[0].x + 1, queue[0].y + 2, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x + 2, queue[0].y + 1, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x + 2, queue[0].y - 1, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x + 1, queue[0].y - 2, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x - 1, queue[0].y - 2, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x - 2, queue[0].y - 1, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x - 2, queue[0].y + 1, queue[0].step+1));
            eightPoints.push(new Vertex(queue[0].x - 1, queue[0].y + 2, queue[0].step+1))


            for(var k = 0; k < 8; k++) {
                if((eightPoints[k].x == finish.x) && (eightPoints[k].y == finish.y)) {

                    visited[eightPoints[k].x][eightPoints[k].y]=eightPoints[k].step;

                    path = [eightPoints[k]];

                    
                    for (var i = 0; i < 8; i++) {
                        comeBack[i] = [];
                    };

                    while(path[0].step != 0) {
                        comeBack[0][0] = path[0].x + 1; 
                        comeBack[0][1] = path[0].y + 2;
                        comeBack[1][0] = path[0].x + 2; 
                        comeBack[1][1] = path[0].y + 1;
                        comeBack[2][0] = path[0].x + 2; 
                        comeBack[2][1] = path[0].y - 1;
                        comeBack[3][0] = path[0].x + 1; 
                        comeBack[3][1] = path[0].y - 2;
                        comeBack[4][0] = path[0].x - 1; 
                        comeBack[4][1] = path[0].y - 2;
                        comeBack[5][0] = path[0].x - 2; 
                        comeBack[5][1] = path[0].y - 1;
                        comeBack[6][0] = path[0].x - 2; 
                        comeBack[6][1] = path[0].y + 1;
                        comeBack[7][0] = path[0].x - 1; 
                        comeBack[7][1] = path[0].y + 2;
                        

                        for(var i = 0; i < 8; i++) {
                            x = comeBack[i][0];
                            y = comeBack[i][1];
                            if((x >= 0) && (y >= 0) && (x < boardSize) && (y < boardSize)&&(visited[x][y] == path[0].step - 1)) {
                                path.unshift(new Vertex (x, y, path[0].step - 1));
                            
                                break;
                            }
                        };



                    }


                    timeEnd = new Date();

                    // time end!



                    // console.log(JSON.stringify(path));
                    // console.log(timeEnd-timeStart);

                    // console.log( path.length - 1 );


                   document.getElementById('result').innerHTML = '<div class="result-block">Steps: ' + (path.length - 1)+'</div>';
                   document.getElementById('time').innerHTML = '<div class="result-block">Time: ' + (timeEnd - timeStart) + " ms </div>";


                    setTimeout(function() {
                        ctx.fillStyle = "#87E1F3";
                        ctx.fillRect(10, 10, 900, 900);
                        var cell = 900/boardSize;
                        for (i = 0; i < boardSize; i+=2) {

                            for (j = 0; j < boardSize; j+=2) {
                                ctx.clearRect(10+i*cell, 10+j*cell, cell, cell);
                                ctx.clearRect(10+(i+1)*cell, 10+(j+1)*cell, cell, cell);
                            }
                        }

                        var i = 0;
                        ctx.fillStyle = "#fa0310";
                        ctx.fillRect(10 + path[path.length-1].x*cell, 10 + path[path.length-1].y*cell, cell, cell);


                        var showPath = setInterval(function() {
                            if(i >= path.length) {
                                clearInterval(showPath);
                                visited = [];
                                eightPoints = [];
                                queue = [];
                                path = [];

                                startButton.disabled = false;

                                return;
                            }

                            // console.log(i);

                            ctx.fillStyle = "#fa0310";
                            ctx.fillRect(10 + path[i].x*cell, 10 + path[i].y*cell, cell, cell);
                            i++;
                        }, 20);


                    }, 0);


        
                    return;

                } else {

                    if( (eightPoints[k].x >= 0) && (eightPoints[k].y >= 0) && (eightPoints[k].x < boardSize) && (eightPoints[k].y < boardSize) && ( visited[eightPoints[k].x][eightPoints[k].y]==-1) ) {
                        
                        queue.push(eightPoints[k]);
                        visited[eightPoints[k].x][eightPoints[k].y]=eightPoints[k].step;
                    }
                }
            
            };

            eightPoints = [];
            queue.shift();
        }
    
    }

    
} ())
