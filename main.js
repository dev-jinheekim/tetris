
var block = document.getElementById('block');
var rowCount = 18;
var colCount = 10;
var x = 0, y = Math.round(colCount/2-1);
var blockL = [
        [x, y],
        [x+1, y],
        [x+2, y],
        [x+2, y+1]
    ];


// 테트리스 배경화면 생성
function createRow() {
    return document.createElement('TR');
}

function createCol() {
    return document.createElement('TD');
}

function createTable(target) {

    var table = document.getElementById(target);

    for (var i = 0; i < rowCount; i++) {

        var tr = createRow();

        for (var j = 0; j < colCount; j++) {

            var td = createCol();
            tr.appendChild(td);

        }

        table.appendChild(tr);
    }
}


// 특정 칸의 색상을 변경
function changeColor(row, col, color) {

    var x = block.childNodes.item(row);
    var y = x.childNodes.item(col);
    y.style.backgroundColor = color;

}

// 블럭 생성
function createBlock(block, color) {

    for (var i = 0; i < blockL.length; i++) {
        changeColor(block[i][0], block[i][1], color);
    }

}

// 블럭을 1칸 아래로 이동
function moveBlock(block) {

    for (var i = 0; i < block.length; i++) {

        block[i][0] = block[i][0] + 1;

    }
}



createTable('board');
createTable('block');


createBlock(blockL, 'white');


setTimeout(
    function(){
        document.getElementById('block').innerHTML = '';
        createTable('block');
        moveBlock(blockL);
        createBlock(blockL, 'red');
    }, 1000
);

setTimeout(
    function(){
        document.getElementById('block').innerHTML = '';
        createTable('block');
        moveBlock(blockL);
        createBlock(blockL, 'yellow');
    }, 2000
);

