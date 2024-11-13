document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const generateVisual = document.getElementById('generateVisual');
    const uploadView = document.getElementById('uploadView');
    const chartView = document.getElementById('chartView');
    const tabs = document.querySelectorAll('.tab');
    const chartTypePanel = document.getElementById('chartTypePanel');
    const editDetailsPanel = document.getElementById('editDetailsPanel');
    const pageTitle = document.getElementById('pageTitle');
    const backButton = document.getElementById('backButton');

    let currentView = 'upload';
    const views = {
        upload: {
            title: 'NEW PROJECT',
            element: uploadView
        },
        chart: {
            title: 'CREATE NEW VISUAL',
            element: chartView
        }
    };

    // switch function
    function switchView(viewName) {
        Object.values(views).forEach(view => {
            view.element.style.display = 'none';
        });
        
        views[viewName].element.style.display = 'block';
        pageTitle.textContent = views[viewName].title;
        currentView = viewName;
        backButton.style.display = viewName === 'upload' ? 'none' : 'flex';
    }

    // upload functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#6366f1';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#e5e7eb';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#e5e7eb';
        handleFiles(e.dataTransfer.files);
    });

    backButton.addEventListener('click', () => {
        switchView('upload');
    });

    generateVisual.addEventListener('click', () => {
        switchView('chart');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (tab.textContent === 'CHART TYPE') {
                chartTypePanel.style.display = 'block';
                editDetailsPanel.style.display = 'none';
            } else {
                chartTypePanel.style.display = 'none';
                editDetailsPanel.style.display = 'block';
            }
        });
    });

    const sidebarItems = document.querySelectorAll('.menu-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            switchView('upload');
        });
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <div>
                    <span>${fileSize} MB</span>
                    <span style="margin-left: 20px; color: #6b7280;">Just now</span>
                </div>
            `;
            document.querySelector('.file-list').appendChild(fileItem);
        });
    }
    switchView('upload');
});
