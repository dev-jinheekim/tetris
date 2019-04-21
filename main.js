
const background = document.getElementById('background-table');
const board = document.getElementById('board');
const trCount = 18; // y = tr
const tdCount = 10; // x = td
const startingPoint = {
    x: Math.round(tdCount / 2 - 1),
    y: 0
};
const color = ['#fe8a71','#f6cd61', '#c2ded1', '#ffffff', '#00ced1', '#0086ad'];

let blocks = [];
let block = blocks[blocks.length - 1];
let auto = setInterval(function(){ block.moveDownBlock() }, 1000);


class BlockL {

    constructor() {
        this.x = startingPoint.x;
        this.y = startingPoint.y;
        this.cordinate = [];
        this.turn = 0;
        this.color = '##0086ad';
        this.locations = [];
        this.nextLocation = [];
    }

    // x, y 좌표를 기준으로 블럭의 좌표를 생성
    make(x, y) {
        return  [
            [[x, y], [x, y + 1], [x, y + 2], [x + 1, y + 2]],
            [[x, y + 1], [x + 1, y+1], [x + 2, y+1], [x + 2, y]],
            [[x, y], [x + 1, y], [x + 1, y + 1], [x + 1, y + 2]],
            [[x, y], [x + 1, y], [x + 2, y], [x, y + 1]],
        ];
    }

    display() {

        this.cordinate = this.make(this.x, this.y);
        this.locations = this.cordinate[this.turn];

        // 화면 초기화
        board.innerHTML = '';
        createTable('board');
        changeCellColor(board, this.locations, this.color);
    }

    collectX(turn = this.turn){
        let x = [];
        this.cordinate[turn].forEach(location => x.push(location[0])); // x = td
        x.sort(function(a, b) { return a - b});
        return x;
    }

    collectY(turn = this.turn){
        let y = [];
        this.cordinate[turn].forEach(location => y.push(location[1])); // y = tr
        y.sort(function(a, b) { return a - b});
        return y;
    }

    collectXY() {
        let allXY = [];
        for (let i = 0; i < blocks.length - 1; i++) {
            const block = blocks[i];
            allXY = allXY.concat(block.locations);
        }
        return allXY;
    }

    isExistBlock(turn) {

        let isPossible = true;
        this.nextLocation[turn].forEach((nextLocation) => {

            this.collectXY().find((existBlock) => {
                if (existBlock.toString() === nextLocation.toString()) {
                    isPossible = false;
                }
            })
        });

        return isPossible;
    }

    moveDownBlock() {
        let y = this.collectY();
        this.nextLocation = this.make(this.x, this.y + 1);

        if (y.pop() < trCount -1 && this.isExistBlock(this.turn)) {
            this.y += 1;
            this.display();
        } else {
            // TODO: 블럭이 맨위까지 쌓이면 게임 종료하기
            makeNewBlock();
        }
    }

    moveLeftBlock() {
        let x = this.collectX();
        this.nextLocation = this.make(this.x - 1, this.y);

        if (x[0] >= 1 && this.isExistBlock(this.turn)) {
            this.x -= 1;
            this.display();
        }
    }

    moveRightBlock() {
        let x = this.collectX();
        this.nextLocation = this.make(this.x + 1, this.y + 1);

        if (x.pop() < tdCount -1 && this.isExistBlock(this.turn)) {
            this.x += 1;
            this.display();
        }
    }

    nextTurn() {
        if (this.turn < this.cordinate.length - 1) {
            return this.turn + 1
        } else {
            return 0;
        }
    }

    turnBlock() {

        let overTd = this.collectX(this.nextTurn()).find(x => x >= tdCount);
        let overTr = this.collectY(this.nextTurn()).find(y => y >= trCount);
        this.nextLocation = this.make(this.x, this.y);

        if (overTd === undefined && overTr === undefined && this.isExistBlock(this.nextTurn())){
            this.turn = this.nextTurn();
        }
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
        endGame();
    }

});

function makeNewBlock() {
    blocks.push(new BlockL());
    block = blocks[blocks.length-1];
    block.color = color[Math.round(Math.random() * 5)];
    console.log('make color', block.color);
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

function endGame() {
    clearInterval(auto);
}


setGame();
makeNewBlock();