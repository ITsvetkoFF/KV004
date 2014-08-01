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

	//nextMove function
	board.nextMove = function(boardCurrentX, boardCurrentY, boardTargetX, boardTargetY, aHorseNextMove, width, height){
		var horseMoveQueue	= [];
		var xIndexNextPoint = 0;
		var yIndexNextPoint = 0;
		var xIndexNextPointQueue = 0;
		var yIndexNextPointQueue = 0;

		if ( (boardCurrentX == boardTargetX) && ( boardCurrentY == boardTargetY) ){
			board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, boardTargetX, boardTargetY];
			return ("same");
		}
		
		board.availablePoints[boardCurrentX][boardCurrentY] = [boardCurrentX,boardCurrentY,0];
		horseMoveQueue.push([boardCurrentX, boardCurrentY, step]);

		var i;
		while ( horseMoveQueue.length != 0 ){
			xIndexNextPointQueue = horseMoveQueue[0][0];
			yIndexNextPointQueue = horseMoveQueue[0][1];
			step = horseMoveQueue[0][2];
			step = step + 1;
			for ( i = 0; i < 8; i++ ) {
				xIndexNextPoint = xIndexNextPointQueue + aHorseNextMove[i][0];
				yIndexNextPoint = yIndexNextPointQueue + aHorseNextMove[i][1];
				
				if ( ( xIndexNextPoint >= 0 ) && ( yIndexNextPoint >= 0 ) ){
					if ( ( xIndexNextPoint < width ) && ( yIndexNextPoint < height )  ) {	
						if ( (xIndexNextPoint == boardTargetX) && (yIndexNextPoint == boardTargetY) ){
							board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, xIndexNextPointQueue, yIndexNextPointQueue];
							return true;
						}
						else if( board.availablePoints[xIndexNextPoint][yIndexNextPoint][0] == -1 ) {
							//console.log(xIndexNextPoint, yIndexNextPoint, step, 'good');
							board.availablePoints[xIndexNextPoint][yIndexNextPoint] = [step, xIndexNextPointQueue, yIndexNextPointQueue];
							horseMoveQueue.push([xIndexNextPoint, yIndexNextPoint, step]);							
						}
					}	
				} 
			}
			horseMoveQueue.shift();
		}
		return false;
	}
	
	//composeWay(board.finishPointX, board.finishPointY)
	board.composeWay = function(boardTargetX, boardTargetY){
		var way = [];
		var nextCoordX = 0;
		var nextCoordY = 0;
		var coordX = boardTargetX;
		var coordY = boardTargetY;
		var log = coordX + ' ' + coordY + '  ';
		way.push([coordX, coordY]);
		step = board.availablePoints[coordX][coordY][0];
		board.stepQuantity.attr('value',('total steps = ' + step));
		var i; 
		for (i = step; i>0; i-- ){
			nextCoordX = board.availablePoints[coordX][coordY][1];
			nextCoordY = board.availablePoints[coordX][coordY][2];
			way.push([nextCoordX, nextCoordY]);			
			log = log + nextCoordX + ' ' + nextCoordY + '  ';
			coordX = nextCoordX;
			coordY = nextCoordY;
		}
		console.log(log);
		return way;
	}
	
	//showWay
	board.showWay = function (boardFoundedWay, canWidth, canHeight){
		var b_canvas = document.getElementById('b-way');
		var scale = 5;
		var arrayQuantity = boardFoundedWay.length;
		b_canvas.width = canWidth * scale;
		b_canvas.height = canHeight * scale; 
		var context = b_canvas.getContext("2d");
		var i;
		for(i = 0; i < arrayQuantity; i++) {
			context.fillRect(boardFoundedWay[i][0]*scale, boardFoundedWay[i][1]*scale, 2, 2);
		}
	} 
	
	// widesearch
	board.wideSearch = function(event){
		var nextMove = [ [1,  2], [2,  1], [2, -1], [1, -2], [-1,-2], [-2,-1], [-2, 1], [-1, 2] ];
		var boardWidth = Number(board.width.val());
		var boardHeight = Number(board.height.val());
		step = 0;
		
		board.pointInit( boardWidth, boardHeight );
	
	
		var b_canvas = document.getElementById('b-way');
		var scale = 5;
		var context1 = b_canvas.getContext("2d");
		
		var start = new Date;
		var res = false;
		res = board.nextMove(Number(board.startPointX.val()), Number(board.startPointY.val()), Number(board.finishPointX.val()), Number(board.finishPointY.val() ), nextMove, boardWidth, boardHeight);
		
		if (res == false) {
			board.stepQuantity.attr('value',('Failure'));
			return false;
		} else if (res == 'same') {
			board.stepQuantity.attr('value',('same point'));
			return true;
		}
		
		var foundedWay = board.composeWay( Number(board.finishPointX.val()), Number(board.finishPointY.val()) );
		
		var stop = new Date;
		var duration = stop - start;
		board.duration.attr('value',('total time = ' + duration + 'ms'));
		

		board.showWay(foundedWay, boardWidth, boardHeight);
		
	}
	
//3 events section
	board.width.bind("blur", board.check);
	board.searchButton.bind('click', board.wideSearch);
	
}

blackboard.prototype = new Component();