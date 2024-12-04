document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const generateVisual = document.getElementById("generateVisual");
  const uploadView = document.getElementById("uploadView");
  const chartView = document.getElementById("chartView");
  const tabs = document.querySelectorAll(".tab");
  const chartTypePanel = document.getElementById("chartTypePanel");
  const editDetailsPanel = document.getElementById("editDetailsPanel");
  const pageTitle = document.getElementById("pageTitle");
  const backButton = document.getElementById("backButton");

  const uploadBtn = document.getElementById("uploadBtn");
  const sidebarFilesSection = document.querySelector(
    ".menu-item.sub-menu-item"
  ); // "example.csv" section


  document.getElementById("optionBarChart").addEventListener("click", () => {
    console.log("barchart clicked");
    barChart();
  });

  document.getElementById("optionLineChart").addEventListener("click", () => {
    console.log("linechart clicked");
    lineChart();
  });

  document.getElementById("optionScatterPlot").addEventListener("click", () => {
    console.log("scatter plot clicked");
    scatterPlot();
  });
  // Cleaning
  // document
  //   .getElementById("removeDuplicatesBtn")
  //   .addEventListener("click", async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/clean-duplicates", {
  //         method: "POST",
  //       });
  //       const result = await response.json();

  //       if (response.ok) {
  //         alert(result.message); // Notify success
  //       } else {
  //         alert(`Error: ${result.error}`);
  //       }
  //     } catch (error) {
  //       console.error("Error removing duplicates:", error);
  //       alert("Failed to remove duplicates. Please try again later.");
  //     }
  //   });

  // document
  //   .getElementById("fillMissingValuesBtn")
  //   .addEventListener("click", async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/fill-missing", {
  //         method: "POST",
  //       });
  //       const result = await response.json();

  //       if (response.ok) {
  //         alert(result.message); // Notify success
  //       } else {
  //         alert(`Error: ${result.error}`);
  //       }
  //     } catch (error) {
  //       console.error("Error filling missing values:", error);
  //       alert("Failed to fill missing values. Please try again later.");
  //     }
  //   });

  // document
  //   .getElementById("dropNaNRowsBtn")
  //   .addEventListener("click", async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/drop-nan-rows", {
  //         method: "POST",
  //       });
  //       const result = await response.json();

  //       if (response.ok) {
  //         alert(result.message);
  //       } else {
  //         alert(`Error: ${result.error}`);
  //       }
  //     } catch (error) {
  //       console.error("Error dropping NaN rows:", error);
  //       alert(
  //         "Failed to drop rows with all NaN values. Please try again later."
  //       );
  //     }
  //   });

  //File stuff
  // for displaying files
  async function fetchFiles() {
    try {

      const response = await fetch("http://127.0.0.1:5000/files");
      const files = await response.json();
      console.log(files); // Print the files in the console

      const fileList = document.getElementById("file-list");
      fileList.innerHTML = "";

      files.forEach((file) => {
        const subMenuItem = document.createElement("div");
        subMenuItem.className = "menu-item sub-menu-container";
        subMenuItem.innerHTML = `<span> ${file} </span>`;
        subMenuItem.addEventListener("click", () => displayFileContent(file));
        fileList.appendChild(subMenuItem);
      });
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }

  async function displayFileContent(fileName) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/uploads/${fileName}`);
      console.log(response);
      const text = await response.text();
      displayCSV(text);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  }

  fetchFiles();

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


    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    tableContainer.appendChild(table);

    document.getElementById("fileList").innerHTML = "";
    document.getElementById("fileList").appendChild(tableContainer);
  }

  let currentView = "upload";
  let uploadedFiles = []; // Track uploaded files

  const views = {
    upload: {
      title: "NEW PROJECT",
      element: uploadView,
    },
    chart: {
      title: "CREATE NEW VISUAL",
      element: chartView,
    },
  };

  // switch function
  function switchView(viewName) {
    Object.values(views).forEach((view) => {
      view.element.style.display = "none";
    });

    views[viewName].element.style.display = "block";
    pageTitle.textContent = views[viewName].title;
    currentView = viewName;
    backButton.style.display = viewName === "upload" ? "none" : "flex";
  }

  // File validation function
  function isValidCSV(file) {
    const validTypes = ["text/csv", "application/vnd.ms-excel"];
    return (
      validTypes.includes(file.type) || file.name.toLowerCase().endsWith(".csv")
    );
  }

  document.getElementById("uploadBtn").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });

  document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
      // Handle the file selection here
      const file = event.target.files[0];
      if (file) {
        console.log("File selected:", file.name);
      }
    });

  // upload functionality
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#6366f1";
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#e5e7eb";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#e5e7eb";
    handleFiles(e.dataTransfer.files);
  });

  //   fileInput.addEventListener("change", (e) => {
  //     handleFiles(e.target.files);
  //   });

  fileInput.addEventListener("change", function (event) {
    const files = event.target.files;

    Array.from(files).forEach((file) => {
      // Pag vavalidate ng file
      if (isValidCSV(file)) {
        console.log("File selected:", file.name);

        // Update the sidebar para sa displaying ng uploaded file
        const sidebarFilesSection = document.querySelector(
          ".sub-menu-item.sub-menu-container"
        ); // Target "example.csv" section
        const fileItem = document.createElement("div");
        fileItem.className = "menu-item ";
        fileItem.innerHTML = `<span>${file.name}</span>`;
        sidebarFilesSection.appendChild(fileItem);
      } else {
        alert(`Invalid file type: ${file.name}. Please upload a CSV file.`);
      }
    });
  });

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.textContent.includes("Upload")) {
        fileInput.click();
      }
    });
  });

  function handleFiles(files) {
    const fileList = document.querySelector(".file-list");
    fileList.innerHTML = "";
    uploadedFiles = [];

    Array.from(files).forEach((file) => {
      if (isValidCSV(file)) {
        const fileSize = (file.size / (1024 * 1024)).toFixed(2);
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        fileItem.innerHTML = `
                    <span>${file.name}</span>
                    <div>
                        <span>${fileSize} MB</span>
                        <span style="margin-left: 20px; color: #6b7280;">Just now</span>
                    </div>
                `;
        fileList.appendChild(fileItem);
        uploadedFiles.push(file);
      } else {
        alert(`Invalid file type: ${file.name}. Please upload CSV files only.`);
      }
    });

    //generateVisual.disabled = uploadedFiles.length === 0;
    //generateVisual.style.opacity = uploadedFiles.length > 0 ? "1" : "0.5";

  }

  backButton.addEventListener("click", () => {
    switchView("upload");
  });

  generateVisual.addEventListener("click", () => {
    //if (uploadedFiles.length > 0) {
      switchView("chart");
   // }

  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.textContent === "CHART TYPE") {
        chartTypePanel.style.display = "block";
        editDetailsPanel.style.display = "none";
      } else {
        chartTypePanel.style.display = "none";
        editDetailsPanel.style.display = "block";
      }
    });
  });

  const sidebarItems = document.querySelectorAll(".menu-item");
  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      switchView("upload");
    });
  });

  switchView("upload");
});

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");
  sidebar.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    toggleBtn.textContent = "☰";
  } else {
    toggleBtn.textContent = "×";
  }
}

// Handle file selection and display the file in the file list
const uploadBtn = document.getElementById("uploadCsvBtn");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

// Trigger file input click when upload button is clicked
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});



// Handle file input change event
// fileInput.addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const fileItem = document.createElement("div");
//     fileItem.classList.add("file-item");
//     fileItem.innerHTML = `<span>${file.name}</span><div><span>${(
//       file.size / 1024
//     ).toFixed(2)} KB</span></div>`;
//     fileList.appendChild(fileItem);
//   }
// });
