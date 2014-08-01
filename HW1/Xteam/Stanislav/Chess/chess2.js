var xStart, yStart,
	xEnd, yEnd,
	deskSize;

var desk = [[]];
var moveStack = [];

//Constants
var EMPTY_VALUE = -1;
var GOAL = 1;
var VISITED = 0;
var OBSTICLE = -3;

// var MAX_SEARCH_TRIES = 1000000000;

//draw variables
var ctx;

function readValues(){
	deskSize = parseInt(document.getElementsByName("InputNumber")[0].value);
	xStart = parseInt(document.getElementsByName("InputStartX")[0].value);
	yStart = parseInt(document.getElementsByName("InputStartY")[0].value);
	xEnd = parseInt(document.getElementsByName("InputFinishX")[0].value);
	yEnd = parseInt(document.getElementsByName("InputFinishY")[0].value);
	numberOfMoves = parseInt(document.getElementsByName("NumberOfMoves")[0].value);
}

function init(){
	moveStack = [];
	initDesk();	
}

function initDesk(){
	desk = [[]];
	for (i = 0; i < deskSize; i++) {
		desk[i] = new Array(deskSize);
		for (j = 0; j < deskSize; j++) {
			desk[i][j] = EMPTY_VALUE;
		};
	};
}

function Node(x, y, parent){
	this.x = x;
	this.y = y;
	this.parent = parent;
}

Node.prototype.toString = function(){
	return "{"+this.x+";"+this.y+"}"; 
}



function ChessPiece(){
}

ChessPiece.prototype.possibleMoves = function(parent) {
	var moves = [];
	var possible = [];
	moves.push(new Node(parent.x - 2, parent.y - 1, parent));
	moves.push(new Node(parent.x - 2, parent.y + 1, parent));
	moves.push(new Node(parent.x - 1, parent.y - 2, parent));
	moves.push(new Node(parent.x - 1, parent.y + 2, parent));
	moves.push(new Node(parent.x + 1, parent.y - 2, parent));
	moves.push(new Node(parent.x + 1, parent.y + 2, parent));
	moves.push(new Node(parent.x + 2, parent.y - 1, parent));
	moves.push(new Node(parent.x + 2, parent.y + 1, parent));
	for (var i = 0; i < moves.length; i++) {
		if(moves[i].x < 0 || moves[i].x >= deskSize
			|| moves[i].y < 0 || moves[i].y >= deskSize){
			// console.log(moves[i]+"is outside");
			continue;
		} else{
			var deskValue = desk[moves[i].x, moves[i].y];
			if (deskValue != VISITED && deskValue != OBSTICLE){
				possible.push(moves[i]);
			}
		}
	};
	return possible;
};



function search(){
	var lastNode;
	var chessPiece = new ChessPiece();
	moveStack.push(new Node(parent.xStart, parent.yStart));
	var searchTry = 0;
	while(moveStack.length > 0 /*&& searchTry < MAX_SEARCH_TRIES*/){
		searchTry++;
		var currentNode = moveStack.shift();
		desk[currentNode.x, currentNode.y] = VISITED;
		if (currentNode.x == xEnd && currentNode.y == yEnd){
			lastNode = currentNode;
			break;
		} else{
			var moves = chessPiece.possibleMoves(currentNode);
			// console.log("Possible Moves: "+moves);
			for (var i = 0; i < moves.length; i++) {
				moveStack.push(moves[i]);
			};
		};
		// console.log("Moves: "+moveStack.length);
	}
	// console.log("Last Node" + lastNode);

	if(lastNode == undefined){
		return [];
	} else{
		return getPathFromParent(lastNode);
	}
}

function getPathFromParent(node){
	var moves = [];
	while(node.parent != undefined){
		moves.push(node);
		node = node.parent;
	}
	moves.reverse();
	return moves;
}
//Canvas--------------------------------------------------------------
window.onload = function() {
    ctx = document.getElementById("canvas").getContext("2d");
}

function style() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
}

function drawPath() {
	ctx.beginPath();
	ctx.moveTo(xStart,yStart);
	for (var i = 0; i < moves.length; i++) {
		ctx.lineTo(Node.x,Node.y);
	};
	// ctx.lineTo(xEnd,yEnd);
	ctx.stroke();
	ctx.closePath();
}
//Canvas---------------------------------------------------------------

function start(){
	var startTime = Date.now();
	readValues();
	init();
	var path = search();
	console.log("Path: "+path);
	var endTime = Date.now();
	var totalTime = endTime - startTime;
	console.log ("Time took: "+totalTime+" seconds");
	style();
	drawPath();
}
