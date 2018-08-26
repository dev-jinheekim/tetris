
const board = document.getElementById('board');
const trCount = 18; // y
const tdCount = 10; // x
const x = Math.round(tdCount / 2 - 1), y = 0;


class BlockL {

    constructor(x, y, color) {
        this.location = [x,y];
        this.block = [
            [[x, y], [x, y + 1], [x, y + 2], [x + 1, y + 2]],
            [[x, y + 3], [x + 1, y], [x + 2, y], [x + 3, y]],
            [[x, y], [x + 1, y], [x + 1, y + 1], [x + 1, y + 2]],
            [[x, y], [x + 1, y + 1], [x + 1, y + 2], [x, y + 1]],
        ];
        this.turn = 0;
        this.color = 'white';
    }

    display() {
        this.block[this.turn].forEach(location => changeColor(location[0], location[1], this.color));
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

let blockL = new BlockL(x,y,'white');
blockL.display();
