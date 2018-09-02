
const board = document.getElementById('board');
const trCount = 18; // y = tr
const tdCount = 10; // x = td
const startingPoint = [Math.round(tdCount / 2 - 1), 0];


class BlockL {

    constructor(location, color) {
        this.x = location[0];
        this.y = location[1];
        this.block = [];
        this.turn = 0;
        this.color = color;
    }

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
        document.getElementById('board').innerHTML = '';
        createTable('board');
        this.block[this.turn].forEach(location => changeColor(location[0], location[1], this.color));
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
        let y = this.collectY(this.turn);
        if (y.pop() < trCount -1) {
            this.y += 1;
        }
    }

    moveLeft() {
        let x = this.collectX(this.turn);
        if (x[0] >= 1) {
            this.x -= 1;
        }
    }

    moveRight() {
        let x = this.collectX(this.turn);
        if (x.pop() < tdCount -1) {
            this.x += 1;
        }
    }

    next() {
        if (this.turn < this.block.length - 1) {
            return this.turn + 1
        } else {
            return 0;
        }
    }

    transform() {
        let overTd = this.collectX(this.next()).find(x => x >= tdCount);
        let overTr = this.collectY(this.next()).find(y => y >= trCount);
        if (overTd === undefined && overTr === undefined){
            this.turn = this.next();
        }
    }

}


// 특정 칸의 색상을 변경
function changeColor(tr, td, color) {

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
        blockL.display();
    }

    if (keyName === 'ArrowLeft') {
        console.log(keyName);
        blockL.moveLeft();
        blockL.display();
    }

    if (keyName === 'ArrowRight') {
        console.log(keyName);
        blockL.moveRight();
        blockL.display();
    }

    if (keyName === 'ArrowUp') {
        console.log(keyName);
        blockL.transform();
        blockL.display();
    }

});


createTable('background-table');
createTable('board');

let blockL = new BlockL(startingPoint,'white');
blockL.display();
