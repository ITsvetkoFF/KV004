function blackboard (sSelector){
//1 data section
	var board = this;
	var step = 0;
	
	board.init(sSelector);
	board.searchButton 		= board.find('.b-search-button');
	board.width 			= board.find('.b-dimension__param_width');
	board.height			= board.find('.b-dimension__param_height');
	board.startPointX		= board.find('.b-point__coord_startX');
	board.startPointY		= board.find('.b-point__coord_startY');
	board.finishPointX		= board.find('.b-point__coord_finishX');
	board.finishPointY		= board.find('.b-point__coord_finishY');
	board.duration			= board.find('.b-duration__label_time');
	board.stepQuantity		= board.find('.b-duration__label_step');
	
	board.width.focus();                   
//2 logic section
	
	//checkinput
	board.check = function(event){
		event.preventDefault();
		var re = /\d{1,3}/;
		var error = !(board.width.val().match(re));
		if ( !error ) {
			board.width.toggleClass('error', error);
		} else {
			board.width.focus();
			board.width.select();
			board.width.toggleClass('error', error);
		}
	}
	
	//init blackboard`
	board.pointInit = function(width, height){
		// initializ array of available points of board obj
		board.availablePoints = new Array(width);
		for (var indexCoordX = 0; indexCoordX < width; indexCoordX++ ){
			board.availablePoints[indexCoordX] = new Array(height);
		}
		for ( indexCoordX = 0; indexCoordX < width; indexCoordX++ ){
			for ( var indexCoordY = 0; indexCoordY < height; indexCoordY++ ) {
				board.availablePoints[indexCoordX][indexCoordY] = [-1, -1, -1];
			}
		}
		
	}
	//===========================================
board.nextMoveLast = function(boardCurrentX, boardCurrentY, boardTargetX, boardTargetY, aHorseNextMove, width, height, context){
	//board.nextMove = function(boardCurrentX, boardCurrentY, boardTargetX, boardTargetY, aHorseNextMove, 1000, 1000){
	var horseMoveQueue	= [];
	var xIndexNextPoint = 0;
	var yIndexNextPoint = 0;
	var xIndexNextPointQueue = 0;
	var yIndexNextPointQueue = 0;
	var scale = 5;
	
	
	
	
	if ( (boardCurrentX == boardTargetX) && ( boardCurrentY == boardTargetY) ){
		board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, boardTargetX, boardTargetY];
		console.log('Same point');
		return (true);
	}
	
	board.availablePoints[boardCurrentX][boardCurrentY] = [boardCurrentX,boardCurrentY,0];
	horseMoveQueue.push([boardCurrentX, boardCurrentY, step]);
	
	while ( horseMoveQueue.length != 0 ){
		xIndexNextPointQueue = horseMoveQueue[0][0];
		yIndexNextPointQueue = horseMoveQueue[0][1];
		//step = board.availablePoints[horseMoveQueue[0][0]][horseMoveQueue[0][1]];
		step = horseMoveQueue[0][2];
		step ++;
		for ( var i = 0; i < 8; i++ ) {
			xIndexNextPoint = xIndexNextPointQueue + aHorseNextMove[i][0];
			yIndexNextPoint = yIndexNextPointQueue + aHorseNextMove[i][1];
			
			if ( ( xIndexNextPoint >= 0 ) && ( yIndexNextPoint >= 0 ) ){
				if ( ( xIndexNextPoint < width ) && ( yIndexNextPoint < height )  ) {	
					if ( (xIndexNextPoint == boardTargetX) && (yIndexNextPoint == boardTargetY) ){
						board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, xIndexNextPointQueue, yIndexNextPointQueue];
						context.fillRect(xIndexNextPoint*scale, yIndexNextPoint*scale, 5, 5);
						return true;
					}
					else if( board.availablePoints[xIndexNextPoint][yIndexNextPoint][0] == -1 ) {
						//console.log(xIndexNextPoint, yIndexNextPoint, step, 'good');
						board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, xIndexNextPointQueue, yIndexNextPointQueue];
						horseMoveQueue.push([xIndexNextPoint, yIndexNextPoint, step]);
						
						//context.fillRect(xIndexNextPoint*scale, yIndexNextPoint*scale, 2, 2);
						
					}
				}	
			} 
		}
		horseMoveQueue.shift();
	}
	return false;
}
	
	
	
	//==========================================

	//nextMove function
	board.nextMove = function(boardCurrentX, boardCurrentY, boardTargetX, boardTargetY, aHorseNextMove, width, height, context){
	//board.nextMove = function(boardCurrentX, boardCurrentY, boardTargetX, boardTargetY, aHorseNextMove, 1000, 1000){
		var horseMoveQueue	= [];
		var xIndexNextPoint = 0;
		var yIndexNextPoint = 0;
		var xIndexNextPointQueue = 0;
		var yIndexNextPointQueue = 0;
		var scale = 5;
		var distance = 0;
		var distance_cicle = [];
		var distanceX = 0;
		var distanceY = 0;
		var mainDistance = 0;


		if ( (boardCurrentX == boardTargetX) && ( boardCurrentY == boardTargetY) ){
			board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, boardTargetX, boardTargetY];
			console.log('Same point');
			return (true);
		}
		
		board.availablePoints[boardCurrentX][boardCurrentY] = [boardCurrentX,boardCurrentY,0];
		distanceX = (boardTargetX - boardCurrentX);
		distanceY = (boardTargetY - boardCurrentY);
		distance = distanceX*distanceX + distanceY*distanceY;
		mainDistance = distance;
		horseMoveQueue.push([boardCurrentX, boardCurrentY, step]);
		
		while ( horseMoveQueue.length != 0 ){
			xIndexNextPointQueue = horseMoveQueue[0][0];
			yIndexNextPointQueue = horseMoveQueue[0][1];
			//step = board.availablePoints[horseMoveQueue[0][0]][horseMoveQueue[0][1]];
			step = horseMoveQueue[0][2];
			step ++;
			
				var min = 0;
				var x = 0;
				var y = 0;
				var chooseDistance = new Array(8);
				xIndexNextPoint = xIndexNextPointQueue + aHorseNextMove[0][0];
				yIndexNextPoint = yIndexNextPointQueue + aHorseNextMove[0][1];
				
				distanceX = (boardTargetX - xIndexNextPoint);
				distanceY = (boardTargetY - yIndexNextPoint);
				minDistance = (distanceX*distanceX + distanceY*distanceY);
				
				for(var j = 0; j < 8; j++){
					x = xIndexNextPointQueue + aHorseNextMove[j][0];
					y = yIndexNextPointQueue + aHorseNextMove[j][1];
					
					distanceX = (boardTargetX - x);
					distanceY = (boardTargetY - y);
					chooseDistance[j] = distanceX*distanceX + distanceY*distanceY;
					if (chooseDistance[j] < minDistance){
						minDistance = chooseDistance[j];
						min = j;
						xIndexNextPoint = x; 
						yIndexNextPoint = y;
						}
				}
				
				if (minDistance < 21){
					var res1 = board.nextMoveLast(xIndexNextPointQueue, yIndexNextPointQueue, boardTargetX, boardTargetY, aHorseNextMove, width, height, context);
					if (res1) {
						return true;
					} else {
						return false;
					}
					
				} 
				
				if (minDistance - distance == 0){
					board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, xIndexNextPointQueue, yIndexNextPointQueue];
					context.fillRect(xIndexNextPoint*scale, yIndexNextPoint*scale, 5, 5);
					return true;
				} else if ( ( xIndexNextPoint >= 0 ) && ( yIndexNextPoint >= 0 ) && ( xIndexNextPoint < width ) && ( yIndexNextPoint < height ) && ( board.availablePoints[xIndexNextPoint][yIndexNextPoint][0] == -1 )){
								distance = minDistance;
								console.log(xIndexNextPoint, yIndexNextPoint, step, 'good');
								board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, xIndexNextPointQueue, yIndexNextPointQueue];
								horseMoveQueue.push([xIndexNextPoint, yIndexNextPoint, step]);
								context.fillRect(xIndexNextPoint*scale, yIndexNextPoint*scale, 2, 2);
							}
			horseMoveQueue.shift();
		}
		return false;
	}
	
	//composeWay(board.finishPointX, board.finishPointY)
	board.composeWay = function(boardTargetX, boardTargetY, context, step){
		var way = [];
		var nextCoordX = 0;
		var nextCoordY = 0;
		var scale = 5;
		var coordX = boardTargetX;
		var coordY = boardTargetY;
		var log = '';
		way.push([coordX, coordY]);
		context.beginPath();
		context.moveTo(boardTargetX, boardTargetY);
		step = board.availablePoints[coordX][coordY][0];
		board.stepQuantity.attr('value',('total steps = ' + step));
		for (var i = step; i>0; i-- ){
			nextCoordX = board.availablePoints[coordX][coordY][1];
			nextCoordY = board.availablePoints[coordX][coordY][2];
			way.push([nextCoordX, nextCoordY]);
			context.fillRect(nextCoordX*scale, nextCoordY*scale, 4,4);
			
			log = log + nextCoordX + ' ' + nextCoordY + '  ';
			coordX = nextCoordX;
			coordY = nextCoordY;
		}
		//context.stroke();
		
		console.log(log);
		return way;
	}
	
	/* //showWay
	board.showWay = function (boardFoundedWay, canWidth, canHeight){
		var b_canvas = document.getElementById('b-way');
		var scale = 5;
		var arrayQuantity = boardFoundedWay.length;
		b_canvas.width = canWidth * scale;
		b_canvas.height = canHeight * scale; 
		
		
		var context = b_canvas.getContext("2d");
		for(var i = 0; i < arrayQuantity; i++) {
			context.fillRect(boardFoundedWay[i][0]*scale, boardFoundedWay[i][1]*scale, 2, 2);
		}
	} */
	
	// widesearch
	board.wideSearch = function(event){
		var nextMove = [ [1,  2], [2,  1], [2, -1], [1, -2], [-1,-2], [-2,-1], [-2, 1], [-1, 2] ];
		var boardWidth = Number(board.width.val());
		var boardHeight = Number(board.height.val());
	
		var b_canvas = document.getElementById('b-way');
		var scale = 5;
		b_canvas.width = boardWidth * scale;
		b_canvas.height = boardHeight * scale; 
		var context1 = b_canvas.getContext("2d");
		step = 0;
		
		board.pointInit( boardWidth, boardHeight );
	
		var start = new Date;
		var res = false;
		res = board.nextMove(Number(board.startPointX.val()), Number(board.startPointY.val()), Number(board.finishPointX.val()), Number(board.finishPointY.val() ), nextMove, boardWidth, boardHeight,context1);
//			console.log('Q-ty of Steps to achieve the target = ', step); 
		if (res) {
			console.log('Q-ty of Steps to achieve the target = ', step);
		} else {
			console.log('fail');
	 	}
		
		var stop = new Date;
		var duration = stop - start;
		board.duration.attr('value',('total time = ' + duration + 'ms'));
		
		//board.composeWay( Number(board.finishPointX.val()), Number(board.finishPointY.val()), context1, step );
		
		//board.showWay(foundedWay, boardWidth, boardHeight);
		
	}
	
//3 events section
	
	board.width.bind("blur", board.check);
	board.searchButton.bind('click', board.wideSearch);
 		
	/* board.height		
	board.startPointX
	board.startPointY
	board.finishPointX
	board.finishPointY
	 */
	
}

blackboard.prototype = new Component();