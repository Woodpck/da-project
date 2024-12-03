document.getElementById('fileInput').addEventListener('change', function(event) {
    const fileInput = event.target;
    const deleteButton = document.getElementById('deleteButton');
    
    // Show the delete button after file is uploaded
    if (fileInput.files.length > 0) {
      deleteButton.style.display = 'inline-block';
    }
  });
  