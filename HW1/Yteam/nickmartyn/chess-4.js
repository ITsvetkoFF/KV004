function start(){
    var x1 = parseInt(document.getElementById("startX").value); //начальные координаты
    var y1 = parseInt(document.getElementById("startY").value);
    var x2 = parseInt(document.getElementById("finalX").value);
    var y2 = parseInt(document.getElementById("finalY").value);
    

var x; //текущие координаты
var y;
var possiblePoints = [];
var nextPoint = [];
var path = [];
var visitedPoints = [];
var timer = Date.now(); //new


var dimension = 1000; //размер доски по х
var chessField = []; //матрица шахматной доски
for(var i=0; i<dimension; i++) {
    chessField[i]=[];
    for(var j=0; j<dimension;j++){
        chessField[i][j] = -1; // UNVISITED
    }
}


function possibleMoves(xStart,yStart) {
    
    nextPoint.x = x1;
    nextPoint.y = y1;
    possiblePoints.push(nextPoint);               //добавляем в очередь начальные координаты
        
    while (!(possiblePoints === 0)) {             //пока очередь не пуста
        nextPoint = possiblePoints.shift();       //извлекаем первый элемент очереди
        visitedPoints.push(nextPoint);            //
        
        if (nextPoint.x === x2 && nextPoint.y === y2) { //проверка, дошли или нет
            console.log("Точка найдена " + nextPoint.x, nextPoint.y);
            return nextPoint;
        }
    
     // 8 steps
    var combinations=[[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]]; 
    var step;
    for (var i = 0; i < combinations.length; i++) {
        
        step = combinations[i]; 
        x = nextPoint.x+step[0];
        y = nextPoint.y+step[1]; 
        //console.log(x, y);
        if (validate(x,y) === true) {
            possiblePoints.push({"x":x,"y":y,"xParent":nextPoint.x, "yParent":nextPoint.y});
            chessField[x][y] = 1;
        }
        
    }
    }
    
};
  
var validate = function(x,y) {
    if (x < dimension && x > 0 && y < dimension && y > 0) {
        if (chessField[x][y] === -1){
            return true;
        };   
    };
};

possibleMoves(x1,y1);

//console.log("Точка найдена " + nextPoint.x, nextPoint.y);

//ищем путь
function searchPath(){
    var current;
    possiblePoints.push(nextPoint);
    path.push(nextPoint);
    current = nextPoint;
    
    
    for (var i = visitedPoints.length - 1; i>=0; i--) {
        
        
        if    ( visitedPoints[i].x === current.xParent && visitedPoints[i].y === current.yParent) {
            path.push(visitedPoints[i]);
            current = visitedPoints[i];
            //console.log(visitedPoints[i]);
            
            
        }
        
        
    }
    
    return path;
    
};        
        
searchPath(); 


timer = (Date.now() - timer)/1000;
document.getElementById("time").innerHTML = "Время выполнения вычислений: " + timer + " секунд";
console.log("Время выполнения вычислений: " + timer + " секунд");



showPath();

//показываем путь
function showPath(){
    console.log("Количество шагов: " + (path.length - 1));
    console.log("Маршрут коня из координат " + x1, y1 + ":");
    for (var i = path.length -1; i>=0; i--) {
        console.log(path[i].x, path[i].y)
    }
};

document.getElementById("countOfMoves").innerHTML = "Количество шагов: " + (path.length - 1);
//document.getElementById("time").innerHTML = "Время выполнения вычислений: " + timer + " секунд";

}