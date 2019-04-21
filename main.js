
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
        this.turn = 0;
        this.color = color[Math.round(Math.random() * 5)];
        this.locations = [];
    }

    // x, y 좌표를 기준으로 블럭의 좌표를 생성
    make() {
        this.cordinate = [
            [[this.x, this.y], [this.x, this.y + 1], [this.x, this.y + 2], [this.x + 1, this.y + 2]],
            [[this.x, this.y + 1], [this.x + 1, this.y+1], [this.x + 2, this.y+1], [this.x + 2, this.y]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 2, this.y], [this.x, this.y + 1]],
        ];
        this.locations = this.cordinate[this.turn];
    }

    display() {

        this.make();
        // 화면 초기화
        board.innerHTML = '';
        createTable('board');
        changeCellColor(board, this.locations, this.color);
    }

    collectX(){
        let x = [];
        this.locations.forEach(location => x.push(location[0])); // x = td
        x.sort(function(a, b) { return a - b});
        console.log(x);
        return x;
    }

    collectY(){
        let y = [];
        this.locations.forEach(location => y.push(location[1])); // y = tr
        y.sort(function(a, b) { return a - b});
        return y;
    }

    collectXY() {

        let allXY = [];

        for (let i  = 1; i < blocks.length; i++) {
            const block = blocks[i];
            allXY.push(block.locations);
        }

        console.log('all xy', allXY);
        return allXY;
    }

    isPossibleMove() {

        // TODO : 이동하려는 곳에 블럭이 있는지 확인하기
        return true;
    }


    moveDownBlock() {
        let y = this.collectY();
        console.log(this.collectXY());
        if (y.pop() < trCount -1) {
            this.y += 1;
            this.display();
        }
    }

    moveLeftBlock() {
        let x = this.collectX();
        if (x[0] >= 1) {
            this.x -= 1;
            this.display();
        }
    }

    moveRightBlock() {
        let x = this.collectX();
        if (x.pop() < tdCount -1) {
            this.x += 1;
            this.display();
        }
    }

    next() {
        if (this.turn < this.cordinate.length - 1) {
            console.log('next', this.turn + 1);
            return this.turn + 1
        } else {
            console.log('next', 0);
            return 0;
        }
    }

    turnBlock() {
        let overTd = this.collectX(this.next()).find(x => x >= tdCount);
        let overTr = this.collectY(this.next()).find(y => y >= trCount);
        if (overTd === undefined && overTr === undefined){
            this.turn = this.next();
        }
        // TODO : this.isPossibleMove();
        this.locations = this.cordinate[this.turn];
        this.display();
    }
}


function changeCellColor(element, locations, color) {

    locations.forEach((location) => {
        let x = element.childNodes.item(location[1]); // x = td
        let y = x.childNodes.item(location[0]); // y = tr
        y.style.backgroundColor = color;
    });

}

// 키입력 이벤트와 함수 연결
document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (keyName === 'ArrowDown') {
        block.moveDownBlock();
    }

    if (keyName === 'ArrowLeft') {
        block.moveLeftBlock();
    }

    if (keyName === 'ArrowRight') {
        block.moveRightBlock();
    }

    if (keyName === 'ArrowUp') {
        block.turnBlock();
    }

    if (keyName === 'Escape') {
        clearInterval(auto);
    }

});

function autoDown() {

    let y = block.collectY(block.turn).pop(); // 가장 작은 y값

    if (y >= trCount - 1) { // 바닥에 닿으면
        makeNewBlock();
    } else {
        block.moveDownBlock();
        y = block.collectY(block.turn).pop();
    }
}

function makeNewBlock() {
    blocks.push(new BlockL());
    block = blocks[blocks.length-1];
    displayDeadBlock();
    block.display();
}

function displayDeadBlock() {
    for (let i = 0; i < blocks.length - 1; i++) {
        const block = blocks[i];
        changeCellColor(background, block.locations, block.color);
    }
}

function setGame() {
    createTable('background-table');
    createTable('board');
}


setGame();
makeNewBlock();