// for displaying files
async function fetchFiles() {
    try {
        const response = await fetch('http://127.0.0.1:5000/files');
        const files = await response.json();
        console.log(files); // Print the files in the console 

        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';

        files.forEach(file => {
            const subMenuItem = document.createElement('div');
            subMenuItem.className = 'menu-item sub-menu-container';
            subMenuItem.innerHTML = `<span> ${file} </span>`;
            subMenuItem.addEventListener('click', () => displayFileContent(file));
            fileList.appendChild(subMenuItem);
        })
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

async function displayFileContent(fileName) {
    try {
        const response = await fetch(`/uploads/${fileName}`);
        const text = await response.text();
        displayCSV(text);
    } catch (error) {
        console.error('Error fetching file content:', error);
    }
}

function displayCSV(data) {
    const rows = data.split('\n');
    const table = document.createElement('table');

    rows.slice(0, 5).forEach((row, index) => {  // Show only the first 5 rows
        const tr = document.createElement('tr');
        const cells = row.split(',');

        cells.forEach(cell => {
            const cellElement = document.createElement(index === 0 ? 'th' : 'td');
            cellElement.textContent = cell;
            tr.appendChild(cellElement);
        });

        table.appendChild(tr);
    });

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    tableContainer.appendChild(table);

    document.getElementById('file-list').appendChild(tableContainer);
}

