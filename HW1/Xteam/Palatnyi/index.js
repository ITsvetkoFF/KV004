
var matrix = new Array();
var matSize;
var stroke;
var A = {};
var B = {};
var stepOption = [];
var queue = [];
var visitedCoordinates = [];
//---------------Добавляем елемент option  в DOM---------------------------------------
var selectTags = document.getElementsByName('coordinates');

function addOption(){
    var i;
    var j;
    for(i=0; i<selectTags.length; i++){
        for(j = 1; j<=1000;j++){
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
   for(var i = 0 ;i<matSize;i++){
       this.stroke = new Array();
       for(var j = 0 ;j<matSize;j++){
         var coordinates = {
             x: i,
             y: j,
             wasVisited: -1
          };
           stroke.push(coordinates);
       }
       matrix.push(stroke);
   }
}

//function showMatrix(){
//    for(var i = 0 ; i<matrix.length;i++){
//        var index = matrix[i];
//        for(var j = 0; j<index.length; j++){
//          //  document.writeln(matrix[i][j].x +""+ matrix[i][j].y ;
//        }
//    }
//
//}
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

function validate(X,Y){
    var length = visitedCoordinates.length;
    for(var i = 0; i < length; i++){
        if(parseInt(visitedCoordinates[i]['x']) == parseInt(X) && parseInt(visitedCoordinates[i]['y']) == parseInt(Y)){
            return false;
        }
    }
    return true;
}

var getDirection = function(){
    var x;
    var y;
    queue.push(A);
    for(var i = 0; i<queue.length; i++){
        for(var j=0 ;j<stepOption.length;j++){
            x = parseInt(queue[i]['x'])+ parseInt(stepOption[j]['x']);
            y = parseInt(queue[i]['y']) + parseInt(stepOption[j]['y']);
          if(x>=0 && x<=matSize && y>=0 && y<=matSize) {
              var isValidated = validate(x,y);
            if(isValidated==true){
            if(this.B['x'] == x && this.B['y'] == y){
                alert('Position found!');
                return;
            }else{
                var cord ={
                    x:x,
                    y:y
                }
                queue.push(cord);
                visitedCoordinates.push(cord);
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
    this.queue = new Array();
    this.matrix = new Array();

}









