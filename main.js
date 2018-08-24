
const block = document.getElementById('block');
const trCount = 18; // y
const tdCount = 10; // x
const x = Math.round(tdCount/2-1), y = 0;
let blockL = [
    [x, y],
    [x, y+1],
    [x, y+2],
    [x+1, y+2]
];



// 테트리스 배경화면 생성
function createRow() {
    return document.createElement('TR');
}

function createCol() {
    return document.createElement('TD');
}

function createTable(target) {

    let table = document.getElementById(target);

    for (let i = 0; i < trCount; i++) {

        let tr = createRow();

        for (let j = 0; j < tdCount; j++) {

            let td = createCol();
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

}


// 특정 칸의 색상을 변경
function changeColor(tr, td, color) {

    let x = block.childNodes.item(td);
    let y = x.childNodes.item(tr);
    y.style.backgroundColor = color;

}


// 블럭 생성
function createBlock(block, color) {

    for (let i = 0; i < blockL.length; i++) {
        changeColor(block[i][0], block[i][1], color);
    }

}


// 블럭을 1칸 아래로 이동
function moveBlockDown(block) {

    let checkLocation = block.map(location => location[1]);
    checkLocation.sort(function(a, b) { return a - b});

    console.log(checkLocation);
    if (checkLocation.pop() < trCount-1) {
        for (let i = 0; i < block.length; i++) {
            block[i][1] = block[i][1] + 1;
        }
    }

}

// 블럭을 1칸 왼쪽으로 이동
function moveBlockLeft(block) {

    let checkLocation = block.map(location => location[0]);
    checkLocation.sort(function(a, b) { return a - b});
    console.log(checkLocation);

    if (checkLocation[0] >= 1) {
        for (let i = 0; i < block.length; i++) {
            block[i][0] = block[i][0] - 1;
        }
    }

}

// 블럭을 1칸 오른쪽으로 이동
function moveBlockRight(block) {

    let checkLocation = block.map(location => location[0]);
    checkLocation.sort(function(a, b) { return a - b});
    console.log(checkLocation);

    if (checkLocation.pop() < tdCount-1) {
        for (let i = 0; i < block.length; i++) {
            block[i][0] = block[i][0] + 1;
        }
    }

}


// 키입력 이벤트와 함수 연결
document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (keyName === 'ArrowDown') {
        console.log('down');
        moveBlockDown(blockL);
        document.getElementById('block').innerHTML = '';
        createTable('block');
        createBlock(blockL, 'red');
    }

    if (keyName === 'ArrowLeft') {
        console.log('left');
        moveBlockLeft(blockL);
        document.getElementById('block').innerHTML = '';
        createTable('block');
        createBlock(blockL, 'yellow');
    }

    if (keyName === 'ArrowRight') {
        console.log('right');
        moveBlockRight(blockL);
        document.getElementById('block').innerHTML = '';
        createTable('block');
        createBlock(blockL, 'orange');
    }

});


createTable('board');
createTable('block');
createBlock(blockL, 'white');
