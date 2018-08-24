
var block = document.getElementById('block');
var trCount = 18;
var tdCount = 10;
var x = 0, y = Math.round(tdCount/2-1);
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

    for (var i = 0; i < trCount; i++) {

        var tr = createRow();

        for (var j = 0; j < tdCount; j++) {

            var td = createCol();
            tr.appendChild(td);

        }

        table.appendChild(tr);
    }
}


// 특정 칸의 색상을 변경
function changeColor(tr, td, color) {

    var x = block.childNodes.item(tr);
    var y = x.childNodes.item(td);
    y.style.backgroundColor = color;

}

// 블럭 생성
function createBlock(block, color) {

    for (var i = 0; i < blockL.length; i++) {
        changeColor(block[i][0], block[i][1], color);
    }

}

// 블럭을 1칸 아래로 이동
function moveBlockDown(block) {

    for (var i = 0; i < block.length; i++) {
        block[i][0] = block[i][0] + 1;
    }
}


// 블럭을 1칸 왼쪽으로 이동
function moveBlockLeft(block) {

    for (var i = 0; i < block.length; i++) {
        block[i][1] = block[i][1] - 1;
    }
}


// 블럭을 1칸 오른쪽으로 이동
function moveBlockRight(block) {

    for (var i = 0; i < block.length; i++) {
        block[i][1] = block[i][1] + 1;
    }
}



createTable('board');
createTable('block');


createBlock(blockL, 'white');


setTimeout(
    function(){
        document.getElementById('block').innerHTML = '';
        createTable('block');
        moveBlockDown(blockL);
        createBlock(blockL, 'red');
    }, 1000
);

setTimeout(
    function(){
        document.getElementById('block').innerHTML = '';
        createTable('block');
        moveBlockDown(blockL);
        createBlock(blockL, 'yellow');
    }, 2000
);

setTimeout(
    function(){
        document.getElementById('block').innerHTML = '';
        createTable('block');
        moveBlockLeft(blockL);
        createBlock(blockL, 'yellow');
    }, 3000
);

setTimeout(
    function(){
        document.getElementById('block').innerHTML = '';
        createTable('block');
        moveBlockRight(blockL);
        createBlock(blockL, 'yellow');
    }, 4000
);

