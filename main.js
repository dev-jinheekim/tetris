
const board = document.getElementById('board');
const trCount = 18; // y
const tdCount = 10; // x
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
            [[this.x, this.y + 3], [this.x + 1, this.y], [this.x + 2, this.y], [this.x + 3, this.y]],
            [[this.x, this.y], [this.x + 1, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2]],
            [[this.x, this.y], [this.x + 1, this.y + 1], [this.x + 1, this.y + 2], [this.x, this.y + 1]],
        ];
    }

    display() {
        this.make();
        document.getElementById('board').innerHTML = '';
        createTable('board');
        this.block[this.turn].forEach(location => changeColor(location[0], location[1], this.color));
    }

    checkLocationTr(){
        let y = [];
        this.block[this.turn].forEach(location => y.push(location[0]));
        y.sort(function(a, b) { return a - b});
        return y.pop() < trCount;
    }

    checkLocationTd(){
        let x = [];
        this.block[this.turn].forEach(location => x.push(location[1]));
        x.sort(function(a, b) { return a - b});
        return x.pop() < tdCount || x[0] === 0;
    }

    move(tr, td) {
        if (this.checkLocationTr() && this.checkLocationTd()) {
            this.x += tr;
            this.y += td;
        }
    }

}


// 특정 칸의 색상을 변경
function changeColor(tr, td, color) {

    let x = board.childNodes.item(td);
    let y = x.childNodes.item(tr);
    y.style.backgroundColor = color;

}


createTable('background-table');
createTable('board');

let blockL = new BlockL(startingPoint,'white');
blockL.display();
