
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


