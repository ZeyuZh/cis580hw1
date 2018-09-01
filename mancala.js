
var square = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];// intialize the board
//var square = [0,0,0,0,0,1,0,20,4,4,4,4,4,0]
var turn = 0; //0 player1 bottom, 1 player2 top
var flag = 0; //0 normal case, 1 in left or right
var win = 3; // 0 player1 win, 1 player2 win, 2 tie, 3 playing
var end = 0; //0 not end, 1 end

/** @function displayPebble
  * Displays the certain column
  *
  * @param {int} column - the column which we choosed
  * @param {int} cnt - the number of pebbles in the column
  */
function displayPebble(column, cnt) {

    var i;
    var columnElement = document.getElementById("column-" + column);
    columnElement.innerHTML = '';

    for (i = 0; i < cnt; ++i) {
        var pebble = document.createElement('div');
        pebble.classList.add("pebble");

        columnElement.appendChild(pebble);
    }
    var num = document.createElement('div');
    num.innerHTML = cnt;
    columnElement.appendChild(num);
}

/** @function dropPebble
  * Displays the whole board
  * and pebble currently
  */
function dropPebble() {
    var i;
    for (i = 0; i < 14; ++i) {
        displayPebble(i, square[i]);
    }
}

/** @function distribute
  * Distribute pebbles at current column
  *
  * @param {int} currentCol - the distributed column
  */
function distribute(currentCol)
{
    var cnt = square[currentCol];
    square[currentCol] = 0;

    var i = currentCol + 1;
    while (cnt != 0){

        if (turn == 0 && i == 13) {
            i = 0;
            continue;
        }
        if (turn == 1 && i == 6) {
            ++i;
            continue;
        }

        if (i > 13) {
            i = 0;
        }

        square[i] += 1;
        ++i;
        --cnt;
    }

    if ((turn == 0 && i == 7) || (turn == 1 && i == 14)) {
        flag = 1;
    } else {
        flag = 0;
    }
}

/** @function changeTurn
  * Change the turn
  */
function changeTurn()
{
    if (flag == 0) {
        turn = (turn + 1) % 2;
    }

}

/** @function displayTurn
  * Displays the current player's turn
  * in the user interface.
  */
function displayTurn(){
  document.getElementById("ui").innerHTML = "Turn: Player" + (turn+1);
}

/** @function checkEnds
  * check the game over or not
  */
function checkEnds(){
  var temp = 0;
  var i,k;
  for(i = 0; i < 6; ++i){
    if(square[i] == 0){
      temp++;
    }
  }
  if(temp == 6) {
    end = 1;
  }
  temp = 0;
  for(k = 7; k < 13; ++k){
    if(square[k] == 0){
      temp++;
    }
  }
  if(temp == 6) end = 1;

    if(end == 1) {
        checkScores();
        if(win = 0){
            document.getElementById("ui").innerHTML = "Player1 win! Scores: " + square[6] + "/" + square[13];
        }else if (win = 1) {
            document.getElementById("ui").innerHTML = "Player2 win! Scores: " + square[6] + "/" + square[13];
        }else{
            document.getElementById("ui").innerHTML = "Tie! Scores: " + square[6] + "/" + square[13];
        }
        dropPebble();
    }

}

/** @function checkScores
  * Count the scores when game over
  */
function checkScores(){
  for(var i = 0; i < 6; ++i){
    square[6] += square[i];
    square[i] = 0;
  }
  for(var k = 7; k < 13; ++k){
    square[13] += square[k];
    square[k] = 0;
  }
  if(square[6] > square[13]) win = 0;
  else if (square[6] < square[13]) win = 1;
  else win = 2;
}

/** @function restart
  * restart the game
  */
function restart(){
    square = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
    turn = 0;
    flag = 0;
    end = 0;
    win = 3;
    dropPebble();
    displayTurn();
}

// attach click listeners to all 12 columns
for(var i = 0; i < 14; i++) {
    const col = i;
    if (i == 6 || i == 13)
        continue;
    document.getElementById('column-' + col)
        .addEventListener('click', function(event) {
            event.preventDefault();

            if (square[col] == 0)
                return;

            if (win != 3)
                return;

            if((turn == 0 && col >=0 && col < 6) || (turn == 1 && col > 6 && col < 13)) {
                distribute(col);
                dropPebble();
                changeTurn();
                displayTurn();
                checkEnds();
            }
        });
}

// display board and pebbles at first
window.onload = function() {
    dropPebble();
};
