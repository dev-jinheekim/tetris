
var board = document.getElementById('table');
var rowCount = 18;
var colCount = 10;
var x = 0, y = Math.round(colCount/2-1);
var blockL = [];


function createRow() {
    return document.createElement('TR');
}

function createCol() {
    return document.createElement('TD');
}


// 특정 칸의 색상을 변경
function changeColor(row, col, color) {

    var x = board.childNodes.item(row);
    var y = x.childNodes.item(col);
    y.style.backgroundColor = color;

}

// L 블럭 생성
function createBlockL(x, y, color) {

    blockL = [
        [x, y],
        [x+1, y],
        [x+2, y],
        [x+2, y+1]
    ];

    for (i = 0; i < blockL.length; i++) {

        changeColor(blockL[i][0], blockL[i][1], color);

    }

}

// 특정 초 마다 1 칸씩 아래로 블럭을 이동
function moveBlock() {


    for (i = 0; i < blockL.length; i++) {

        blockL[i][0] = blockL[i][0] + 1;

    }


    for (i = 0; i < blockL.length; i++) {

        changeColor(blockL[i][0], blockL[i][1], 'red');

    }


}


for (i = 0; i < rowCount; i++) {

    var tr = createRow();

    for (j = 0; j < colCount; j++) {

        var td = createCol();
        tr.appendChild(td);

    }

    table.appendChild(tr);
}


createBlockL(0, 4, 'white');