var gameBoard = [0,0,0,0,0,0,0,0,0];
var all = [0,1,2,3,4,5,6,7,8]
var corners = [0,2,6,8];
var oppCorner1 = [0,8];
var oppCorner2 = [2,6];
var edge = [1,3,5,7];
var row1 = [0,1,2];
var row2 = [3,4,5];
var row3 = [6,7,8];
var col1 = [0,3,6];
var col2 = [1,4,7];
var col3 = [2,5,8];
var diag1 = [0,4,8];
var diag2 = [2,4,6];
var center = 4;
var player = 1;
var ai = 2;
var turnNumber = 1;

function playerFirst() {
	document.getElementById("game-board").style.display = 'block';
}

function aiFirst() {
	document.getElementById("game-board").style.display = 'block';
	aiTurn();
}

function playerTurn(obj) {
	if (isEmptySquare(obj)) {
  	obj.innerHTML="o";
		obj.className += " player";
		updateGameBoard(obj.id, player);
		turnNumber++;
		setTimeout(aiTurn, 500);
		var winner = checkWin();
		if (winner == player) {
			alert("I win!");
			clearBoard();
		}
		if (winner == ai) {
			alert("Foils! You win!");
			clearBoard();
		}
	}
}

function isEmptySquare(elem) {
	return ((" " + elem.className + " " ).indexOf( " player " ) < 0) && ((" " + elem.className + " " ).indexOf( " ai " ) < 0);
}

function updateGameBoard(pos, who) {
	var num = pos.charAt(4);
	gameBoard[num] = who;
}

function aiTurn() {
	var pos = findAiPos();
	document.getElementById("pos-"+pos).innerHTML="x";
	document.getElementById("pos-"+pos).className += " ai";
	updateGameBoard("pos-"+pos, ai);
	turnNumber++;
}

function findAiPos() {
	if (turnNumber == 1) {
		alert("turn 1 random corner");
		return randomAvailableSquare(corners);
	}
	var winMove = findWinMove(ai);
	if (winMove != -1) {
		alert("win move");
		return winMove;
	}
	var blockMove = findWinMove(player);
	if (blockMove != -1) {
		alert("block move");
		return blockMove;
	}
	var forkMove = findForkMove(ai);
	if (forkMove != -1) {
		alert("fork move");
		return forkMove;
	}
	var blockForkMove = findBlockForkMove();
	if (blockForkMove != -1) {
		alert("block fork move");
		return blockForkMove;
	}
	if (gameBoard[center] == 0) {
		alert("center move");
		return center;
	}
	var oppositeCorner = findOppositeCorner();
	if (oppositeCorner != -1) {
		alert("opp corner move");
		return oppositeCorner;
	}
	var emptyCorner = randomAvailableSquare(corners)
	if (emptyCorner != -1) {
		alert("empty corner move");
		return emptyCorner;
	}
	alert("random move (last)");
	return randomAvailableSquare(all);
}

function findWinMove(who) {
	if (piecesInLine(who, row1) == 2) {
		return randomAvailableSquare(row1);
	}
	if (piecesInLine(who, row2) == 2) {
		return randomAvailableSquare(row2);
	}
	if (piecesInLine(who, row3) == 2) {
		return randomAvailableSquare(row3);
	}
	if (piecesInLine(who, col1) == 2) {
		return randomAvailableSquare(col1);
	}
	if (piecesInLine(who, col2) == 2) {
		return randomAvailableSquare(col2);
	}
	if (piecesInLine(who, col3) == 2) {
		return randomAvailableSquare(col3);
	}
	if (piecesInLine(who, diag1) == 2) {
		return randomAvailableSquare(diag1);
	}
	if (piecesInLine(who, diag2) == 2) {
		return randomAvailableSquare(diag2);
	}
	return -1;
}

function findForkMove(who) {
	//come back to this
	var intersections = [[row1, col1], [row1, col2], [row1, col3], [row2, col1], [row2, col2], [row2, col3], [row3, col1], [row3, col2], [row3, col3], [row1, diag1], [row1, diag2], [row2, diag1], [row2, diag2], [row3, diag1], [row3, diag2], [col1, diag1], [col1, diag2], [col2, diag1], [col2, diag2], [col3, diag1], [col3, diag2], [diag1, diag2]];
	var fork = -1;
	for (var i = 0; i < intersections.length; i++) {
		fork = forkAt(who, intersections[i][0], intersections[i][1]);
		if (fork != -1) {
			return fork;
		}
	}
	return fork;
}

function forkAt(who, line1, line2) {
	if ((piecesInLine(who, line1) == 1) && (piecesInLine(who, line2) == 1)) {
		var intersectionPoint;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (line1[i] == line2[j]) {
					intersectionPoint = line1[i];
				}
			}
		}
		if (gameBoard[intersectionPoint] == 0) {
			return intersectionPoint;
		}
	}
	return -1;
}

function findBlockForkMove() {
	var pos = findForkMove(player);
	var intersectingLines = [row1, row2, row3, col1, col2, col3, diag1, diag2]
	for (var i = 0; i < intersectingLines.length; i++) {
		for (var j = 0; j < 3; j++) {
			if (intersectingLines[i][j] == pos) {
				if (piecesInLine(player, intersectingLines[i]) == 1) {
					return blockForkAt(pos, intersectingLines[i]);
				}
			}
		}
	}
	return pos;
}

function blockForkAt(forkPos, line) {
	for (var i = 0; i < 3; i++) {
		if ((gameBoard[line[i]] == 0) && (line[i] != forkPos)) {
			return line[i];
		}
	}
	return -1;
}

function findOppositeCorner() {
	if ((gameBoard[oppCorner1[1]] != 0) && (gameBoard[oppCorner1[0]] == 0)) {
		return oppCorner1[0];
	}
	if ((gameBoard[oppCorner1[0]] != 0) && (gameBoard[oppCorner1[1]] == 0)) {
		return oppCorner1[1];
	}
	if ((gameBoard[oppCorner2[1]] != 0) && (gameBoard[oppCorner2[0]] == 0)) {
		return oppCorner2[0];
	}
	if ((gameBoard[oppCorner2[0]] != 0) && (gameBoard[oppCorner2[1]] == 0)) {
		return oppCorner2[1];
	}
	return -1;
}	

function randomAvailableSquare(set) {
	var emptySquares = new Array();
	var emptyIndex = 0;
	for (var i = 0; i<set.length; i++) {
		if (gameBoard[set[i]] == 0) {
			emptySquares[emptyIndex] = set[i];
			emptyIndex++;
		}
	}
	return emptySquares[Math.floor(Math.random()*emptySquares.length)];
}

function checkWin() {
	var winnerHor = checkHor();
	var winnerVer = checkVer();
	var winnerDiag = checkDiag();
	if (winnerHor != 0)
		return winnerHor;
	if (winnerVer != 0)
		return winnerVer;
	if (winnerDiag != 0)
		return winnerDiag;
	return 0;
}

function otherPlayer(who) {
	var other;
	if (who == ai) {
		other = player;
	} else {
		other = ai;
	}
	return other;
}

function piecesInLine (who, line) {
	var other = otherPlayer(who);
	if ((gameBoard[line[0]] == other) || (gameBoard[line[1]] == other) || (gameBoard[line[2]] == other)) {
		return -1;
	}
	var pieces = 0;
	if (gameBoard[line[0]] == who) {
		pieces++;
	}
	if (gameBoard[line[1]] == who) {
		pieces++;
	}
	if (gameBoard[line[2]] == who) {
		pieces++;
	}
	return pieces;
}

function checkHor() {
	if (piecesInLine(player, row1) == 3) {
		return player;
	}
	if (piecesInLine(ai, row1) == 3) {
		return ai;
	}
	if (piecesInLine(player, row2) == 3) {
		return player;
	}
	if (piecesInLine(ai, row2) == 3) {
		return ai;
	}
	if (piecesInLine(player, row3) == 3) {
		return player;
	}
	if (piecesInLine(ai, row3) == 3) {
		return ai;
	}
	return 0;
}

function checkVer() {
	if (piecesInLine(player, col1) == 3) {
		return player;
	}
	if (piecesInLine(ai, col1) == 3) {
		return ai;
	}
	if (piecesInLine(player, col2) == 3) {
		return player;
	}
	if (piecesInLine(ai, col2) == 3) {
		return ai;
	}
	if (piecesInLine(player, col3) == 3) {
		return player;
	}
	if (piecesInLine(ai, col3) == 3) {
		return ai;
	}
	return 0;
}

function checkDiag() {
	if (piecesInLine(player, diag1) == 3) {
		return player;
	}
	if (piecesInLine(ai, diag1) == 3) {
		return ai;
	}
	if (piecesInLine(player, diag2) == 3) {
		return player;
	}
	if (piecesInLine(ai, diag2) == 3) {
		return ai;
	}
	return 0;
}

function clearBoard() {
	//getElementByID for cross-browser support
	document.getElementById("pos-0").innerHTML="";
	document.getElementById("pos-0").className="pos row-0 col-0";
	document.getElementById("pos-1").innerHTML="";
	document.getElementById("pos-1").className="pos row-0 col-1";
	document.getElementById("pos-2").innerHTML="";
	document.getElementById("pos-2").className="pos row-0 col-2";
	document.getElementById("pos-3").innerHTML="";
	document.getElementById("pos-3").className="pos row-1 col-0";
	document.getElementById("pos-4").innerHTML="";
	document.getElementById("pos-4").className="pos row-1 col-1";
	document.getElementById("pos-5").innerHTML="";
	document.getElementById("pos-5").className="pos row-1 col-2";
	document.getElementById("pos-6").innerHTML="";
	document.getElementById("pos-6").className="pos row-2 col-0";
	document.getElementById("pos-7").innerHTML="";
	document.getElementById("pos-7").className="pos row-2 col-1";
	document.getElementById("pos-8").innerHTML="";
	document.getElementById("pos-8").className="pos row-2 col-2";
	gameBoard = [0,0,0,0,0,0,0,0,0];
}
