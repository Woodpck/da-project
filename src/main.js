document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      displayCSV(text);
    };

    reader.readAsText(file);
  });

function displayCSV(data) {
  const rows = data.split("\n");
  const table = document.createElement("table");

  rows.slice(0, 40).forEach((row, index) => {
    // Show only the first 5 rows
    const tr = document.createElement("tr");
    const cells = row.split(",");

    cells.forEach((cell) => {
      const cellElement = document.createElement(index === 0 ? "th" : "td");
      cellElement.textContent = cell;
      tr.appendChild(cellElement);
    });

    table.appendChild(tr);
  });

<<<<<<< HEAD
    document.getElementById('fileList').innerHTML = '';
    document.getElementById('fileList').appendChild(tableContainer);
}
=======
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";
  tableContainer.appendChild(table);

  document.getElementById("fileList").innerHTML = "";
  document.getElementById("fileList").appendChild(tableContainer);
}
>>>>>>> cb0a17e605bb6d05127f45f4dac5b8dc84b53852
