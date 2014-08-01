var x1; //начальные координаты
var y1;
var x2; //конечные координаты
var y2;
var x; //текущие координаты
var y;


var dimension=1000; //размер доски по х
var chessField = []; //матрица шахматной доски
for(var i=0; i<dimension; i++) {
    chessField[i]=[];
    for(var j=0; j<dimension;j++){
        chessField[i][j] = -1; // UNVISITED
    }
}

//possibleMoves(0,0) => [{"x":2,"y":1},{"x":1,"y":2}]; 
var possibleMoves = function(xStart,yStart) {
     // 8 steps
    var possiblePoints = [];
    var combinations=[[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]]; 
    var step;
    var x;
    var y;
    for(var i = 0; i < combinations.length; i++) {
        step = combinations[i]; 
        x = xStart+step[0];
        y = yStart+step[1]; 
        if (validate(x,y) == true) {
           possiblePoints.push({"x":x,"y":y});
        }
    }
    return possiblePoints;
}
    
var validate = function(x,y) {
    if possiblePoints = -1 && possiblePoints <= dimension;
}

var ret = possibleMoves(0,0);
document.write(ret);
