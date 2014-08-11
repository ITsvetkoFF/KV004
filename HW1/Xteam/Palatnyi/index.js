
var matrix = new Array();
var matSize;
var stroke;
var A = {};
var B = {};
var stepOption = [];
var queue = [];
var visitedCoordinates = [];
var chess = document.getElementById("chess");
var path = chess.getContext("2d");
//---------------Добавляем елемент option  в DOM---------------------------------------
var selectTags = document.getElementsByName('coordinates');

function addOption(){
    var i;
    var j;
    for(i=0; i<selectTags.length; i++){
        for(j = 0; j<=1000;j++){
            var opt = document.createElement('option');
            opt.innerHTML = j
            selectTags[i].appendChild(opt);
        }
    }
}
addOption();

function setMatrixSize(){
    var size = document.getElementById('matrix');
    matSize = size.value;
    return matSize;
}

//---------------------------------------------------------
//----------получение координат А и В----------
function getValues(){
    var i;
    A.x = selectTags[0].value;
    A.y = selectTags[1].value;
    B.x = selectTags[2].value;
    B.y = selectTags[3].value;

   if(this.A.x == this.B.x && this.A.y == this.B.y){
       alert('Position found');
   }
}

//------------------------------------------------------------
//---------------Заполнение матрици координат-
function fillMatrix(){
    matSize = setMatrixSize();
   for(var i = 0 ;i<=matSize;i++){
       this.stroke = new Array();
       for(var j = 0 ;j<=matSize;j++){
         var coordinates = {
             x: i,
             y: j,
             wasVisited: false
          };
           stroke.push(coordinates);
       }
       matrix.push(stroke);
   }
}

//----------------заносим вариант хода коня в масиив---

function optionsOfstep(){
    var one =   {x:-1,y:-2};
    var two =   {x:1,y:-2};
    var three = {x:-2,y:-1};
    var four =  {x:-2,y:1};
    var five =  {x:-1,y:2};
    var six =   {x:1,y:2};
    var seven = {x:2,y:1};
    var eight = {x:2,y:-1};

    stepOption.push(one)
    stepOption.push(two)
    stepOption.push(three)
    stepOption.push(four)
    stepOption.push(five)
    stepOption.push(six)
    stepOption.push(seven)
    stepOption.push(eight)

}
optionsOfstep();

//----------перебираем возможные варианты ходов коня на каждой точке каждой точке-------

function drawPath(route) {
    for (var i = 0; i < route.length - 1; i++) {
            path.beginPath()
            path.moveTo(route[i].x * 5 - 2.5, route[i].y * 5 - 2.5);
            path.lineWidth = 3;

            path.lineTo(route[i+1].x * 5 - 2.5, route[i+1].y * 5 - 2.5);
            path.strokeStyle = "black";
            path.stroke();
//            if (arrPath[i+1].x > 0 && arrPath[i+1].y > 0) {
//                console.log("+ " + i);
//        }
    }
}

function routeToPointA(X,Y){
	var route = [];
	var x;
	var y;
	while(true){
	x = matrix[X][Y]['x'];
	y = matrix[X][Y]['y'];
	X = x;
	Y = y;
		if(x == A.x && y == A.y){
			alert('Point fount with ' + route.length + ' steps')
			return route;
		}
		route.push(matrix[X][Y]);
	}
}

var getDirection = function(){
    var x;
    var y;
    queue.push(A);
    for(var i = 0; i<queue.length; i++){
        for(var j=0 ;j<stepOption.length;j++){
            x = parseInt(queue[i]['x'])+ parseInt(stepOption[j]['x']);
            y = parseInt(queue[i]['y']) + parseInt(stepOption[j]['y']);
          if(x>=0 && x<=matSize && y>=0 && y<=matSize ) {
            if(matrix[x][y]['wasVisited'] == false){
            if(this.B['x'] == x && this.B['y'] == y){
                drawPath(routeToPointA((x -parseInt(stepOption[j]['x'])),y - parseInt(stepOption[j]['y'])));
                return;
            }else{
				matrix[x][y]['wasVisited'] = true;
				matrix[x][y]['x'] = (x - parseInt(stepOption[j]['x']));
				matrix[x][y]['y'] = (y - parseInt(stepOption[j]['y']));
                var cord = {
                    x:x,
                    y:y
                }
                queue.push(cord);

                }
             }
          }
       }
    }
 }

document.getElementById('send').onclick = function(){
    getValues();
    fillMatrix();
    getDirection();
}









