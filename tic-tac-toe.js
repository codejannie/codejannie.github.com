var gameBoard = [0,0,0,0,0,0,0,0,0];

function playerFirst() {
	document.getElementById("game-board").style.display = 'block';
}

function aiFirst() {
	document.getElementById("game-board").style.display = 'block';
}

function playerTurn(obj) {
	if (isEmptySquare(obj)) {
  	obj.innerHTML="o";
		obj.className += " player";
		updateGameBoard(obj.id, 1);
		setTimeout(aiTurn, 500);
		var winner = checkWin();
		if (winner == 1) {
			alert("I win!");
			clearBoard();
		}
		if (winner == 2) {
			alert("Foils! You win!");
			clearBoard();
		}
	}
}

function isEmptySquare(elem) {
	return ((" " + elem.className + " " ).indexOf( " player " ) < 0) && ((" " + elem.className + " " ).indexOf( " ai " ) < 0);
}

function updateGameBoard(pos, player) {
	var num = pos.charAt(4);
	gameBoard[num] = player;
}

function aiTurn() {
	var pos = findAiPos();
	document.getElementById("pos-"+pos).innerHTML="x";
	document.getElementById("pos-"+pos).className += " ai";
	updateGameBoard(pos, 2);
}

function findAiPos() {
	return 0;
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

function checkHor() {
	if ((gameBoard[0] == gameBoard[1]) && (gameBoard[1] == gameBoard[2]) && (gameBoard[0] != 0 )) {
		return gameBoard[0];
	}
	if ((gameBoard[3] == gameBoard[4]) && (gameBoard[4] == gameBoard[5]) && (gameBoard[3] != 0 )) {
		return gameBoard[3];
	}
	if ((gameBoard[6] == gameBoard[7]) && (gameBoard[7] == gameBoard[8]) && (gameBoard[6] != 0 )) {
		return gameBoard[6];
	}
	return 0;
}

function checkVer() {
	if ((gameBoard[0] == gameBoard[3]) && (gameBoard[3] == gameBoard[6]) && (gameBoard[0] != 0 )) {
		return gameBoard[0];
	}
	if ((gameBoard[1] == gameBoard[4]) && (gameBoard[4] == gameBoard[7]) && (gameBoard[1] != 0 )) {
		return gameBoard[1];
	}
	if ((gameBoard[2] == gameBoard[5]) && (gameBoard[5] == gameBoard[8]) && (gameBoard[2] != 0 )) {
		return gameBoard[2];
	}
	return 0;
}

function checkDiag() {
	if ((gameBoard[0] == gameBoard[4]) && (gameBoard[4] == gameBoard[8]) && (gameBoard[0] != 0 )) {
		return gameBoard[0];
	}
	if ((gameBoard[2] == gameBoard[4]) && (gameBoard[4] == gameBoard[6]) && (gameBoard[2] != 0 )) {
		return gameBoard[2];
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
