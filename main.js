
const background = document.getElementById('background-table');
const board = document.getElementById('board');
const trCount = 18; // y = tr
const tdCount = 10; // x = td
const startingPoint = {
    x: Math.round(tdCount / 2 - 1),
    y: 0
};
const color = ['#fe8a71','#f6cd61', '#c2ded1', '#ffffff', '#00ced1'];

let blocks = [];
let block = blocks[blocks.length - 1];
let auto = setInterval(function(){ autoDown() }, 1000);


class BlockL {

    constructor() {
        this.x = startingPoint.x;
        this.y = startingPoint.y;
        this.cordinate = [];
        this.order = 0;
        this.color = color[Math.round(Math.random() * 5)];
    }

    // x, y 좌표를 기준으로 블럭의 좌표를 생성
    make() {
        this.cordinate = [
            [[this.x, this.y], [this.x, this.y + 1], [this.x, this.y + 2], [this.x + 1, this.y + 2]],
            [[this.x, this.y + 1], [this.x + 1, this.y+1], [this.x + 2, this.y+1], [this.x + 2, this.y]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 2, this.y], [this.x, this.y + 1]],
        ];
    }

    display() {

        this.make();

        // 화면 초기화
        board.innerHTML = '';
        createTable('board');

        this.cordinate[this.order].forEach(location =>
            changeBordColor(location[0], location[1], this.color)
        );
    }

    collectX(){
        let x = [];
        this.cordinate[this.order].forEach(location => x.push(location[0])); // x = td
        x.sort(function(a, b) { return a - b});
        return x;
    }

    collectY(){
        let y = [];
        this.cordinate[this.order].forEach(location => y.push(location[1])); // y = tr
        y.sort(function(a, b) { return a - b});
        return y;
    }

    collectXY() {

        let allXY = []; // [[1,2],[1,2],[1,2]];

        for (let i  = 1; i < blocks.length; i++) {

            const block = blocks[i];
            console.log('is movement block', block);
            console.log('is movement block', block.order);
            console.log('is movement block', block.cordinate[block.order]);
            allXY.push(block.cordinate[block.order]);

        }
        console.log('all xy', allXY);

        // blocks 에 있는 칸들과 내가 이동하려고 하는 칸이 겹치는지 확인하자

        return 'true';
    }

    moveDown() {
        let y = this.collectY();
        console.log(this.collectXY());
        if (y.pop() < trCount -1) {
            this.y += 1;
            this.display();
        }
    }

    moveLeft() {
        let x = this.collectX();
        if (x[0] >= 1) {
            this.x -= 1;
            this.display();
        }
    }

    moveRight() {
        let x = this.collectX();
        if (x.pop() < tdCount -1) {
            this.x += 1;
            this.display();
        }
    }

    next() {
        if (this.order < this.cordinate.length - 1) {
            return this.order + 1
        } else {
            return 0;
        }
    }

    turn() {
        let overTd = this.collectX(this.next()).find(x => x >= tdCount);
        let overTr = this.collectY(this.next()).find(y => y >= trCount);
        if (overTd === undefined && overTr === undefined){
            this.order = this.next();
        }
        this.display();
    }

}


// 보드칸의 색상을 변경
function changeBordColor(tr, td, color) {

    let x = board.childNodes.item(td);
    let y = x.childNodes.item(tr);
    y.style.backgroundColor = color;

}

// 배경칸의 색상을 변경
function changeBGColor(tr, td, color) {

    let x = background.childNodes.item(td);
    let y = x.childNodes.item(tr);
    y.style.backgroundColor = color;

}

// 키입력 이벤트와 함수 연결
document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (keyName === 'ArrowDown') {
        block.moveDown();
    }

    if (keyName === 'ArrowLeft') {
        block.moveLeft();
    }

    if (keyName === 'ArrowRight') {
        block.moveRight();
    }

    if (keyName === 'ArrowUp') {
        block.turn();
    }

    if (keyName === 'Escape') {
        clearInterval(auto);
    }

});

function autoDown() {

    let y = block.collectY(block.order).pop(); // 가장 작은 y값

    if (y >= trCount - 1) { // 바닥에 닿으면
        makeNewBlock();
    } else {
        block.moveDown();
        y = block.collectY(block.order).pop();
    }
}

function makeNewBlock() {
    blocks.push(new BlockL());
    block = blocks[blocks.length-1];
    // 과거블록 표시해주기
    console.log(1);
    displayDeadBlock();
    console.log(2);
    block.display();
    console.log(3);
}

function displayDeadBlock() {

    console.log('blocks', blocks);

    for (let i = 0; i < blocks.length - 1; i++) {

        const block = blocks[i];
        block.cordinate[block.order].forEach(location => {
            changeBGColor(location[0], location[1], block.color);
        });

    }

}

function setGame() {
    createTable('background-table');
    createTable('board');
}


setGame();
makeNewBlock();