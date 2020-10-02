// creates coloured table containing votingresults
function createTable() {
    let votes = storage.getCacheVotes();
    let options = storage.getCacheOptions();
    let table = document.getElementById('tab');

    // table header
    let header = document.createElement('tr');
    header.appendChild(document.createElement('th'));
    table.appendChild(header);
    for (let key of Object.keys(votes)) {
        let td = document.createElement('td');
        td.innerText = key;
        header.appendChild(td);
    }

    // table body
    for (let y = 0; y < options.length; y++) {
        let row = document.createElement('tr');
        let cell = document.createElement('td');
        cell.innerText = options[y];
        row.appendChild(cell);
        for (let key of Object.keys(votes)) {
            cell = document.createElement('td');
            if (votes[key].includes(y)) {
                cell.classList.add('positive');
            } else {
                cell.classList.add('negative');
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

createTable();