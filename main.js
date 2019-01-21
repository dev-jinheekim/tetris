
const board = document.getElementById('board');
const trCount = 18; // y = tr
const tdCount = 10; // x = td
const startingPoint = {
    x: Math.round(tdCount / 2 - 1),
    y: 0
};

class BlockL {

    constructor(color) {
        this.x = startingPoint.x;
        this.y = startingPoint.y;
        this.block = [];
        this.order = 0;
        this.color = color;
    }

    // x, y 좌표를 기준으로 블럭의 좌표를 생성
    make() {
        this.block = [
            [[this.x, this.y], [this.x, this.y + 1], [this.x, this.y + 2], [this.x + 1, this.y + 2]],
            [[this.x, this.y + 1], [this.x + 1, this.y+1], [this.x + 2, this.y+1], [this.x + 2, this.y]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 2, this.y], [this.x, this.y + 1]],
        ];
    }

    display() {

        this.make();

        // 화면 초기화
        document.getElementById('board').innerHTML = '';
        createTable('board');

        this.block[this.order].forEach(location =>
            changeBGColor(location[0], location[1], this.color)
        );
    }

    collectX(turn){
        let x = [];
        this.block[turn].forEach(location => x.push(location[0])); // x = td
        x.sort(function(a, b) { return a - b});
        return x;
    }

    collectY(turn){
        let y = [];
        this.block[turn].forEach(location => y.push(location[1])); // y = tr
        y.sort(function(a, b) { return a - b});
        return y;
    }

    moveDown() {
        let y = this.collectY(this.order);
        if (y.pop() < trCount -1) {
            this.y += 1;
            this.display();
        }
    }

    moveLeft() {
        let x = this.collectX(this.order);
        if (x[0] >= 1) {
            this.x -= 1;
            this.display();
        }
    }

    moveRight() {
        let x = this.collectX(this.order);
        if (x.pop() < tdCount -1) {
            this.x += 1;
            this.display();
        }
    }

    next() {
        if (this.order < this.block.length - 1) {
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


// 특정 칸의 색상을 변경
function changeBGColor(tr, td, color) {

    let x = board.childNodes.item(td);
    let y = x.childNodes.item(tr);
    y.style.backgroundColor = color;

}

// 키입력 이벤트와 함수 연결
document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (keyName === 'ArrowDown') {
        console.log(keyName);
        blockL.moveDown();
    }

    if (keyName === 'ArrowLeft') {
        console.log(keyName);
        blockL.moveLeft();
    }

    if (keyName === 'ArrowRight') {
        console.log(keyName);
        blockL.moveRight();
    }

    if (keyName === 'ArrowUp') {
        console.log(keyName);
        blockL.turn();
    }

});


function autoDown(block) {

    let auto = setInterval(function(){ down() }, 1000);
    let y = block.collectY(block.order).pop();

    function down() {
        if (y >= trCount - 1) {
            clearInterval(auto);
        } else {
            block.moveDown();
            y = block.collectY(block.order).pop();
        }
    }
}


createTable('background-table');
createTable('board');

let blockL = new BlockL('white');

blockL.display();
autoDown(blockL);


