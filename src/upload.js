document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
document
  .getElementById("removeDuplicatesBtn")
  .addEventListener("click", async () => {
    if (
      confirm(
        "Are you sure you want to remove duplicates from the uploaded file?"
      )
    ) {
      try {
        const response = await fetch("http://127.0.0.1:5000/clean-duplicates", {
          method: "POST",
        });
        const result = await response.json();

        if (response.ok) {
          alert(result.message); // Notify the user of success
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error removing duplicates:", error);
        alert("Failed to remove duplicates. Please try again later.");
      }
    }
  });
