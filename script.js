window.onload = () => {
    const upload = document.getElementById('upload');
    const preview = document.getElementById('preview');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const resizeButton = document.getElementById('resizeButton');
    const downloadPng = document.getElementById('downloadPng');
    const downloadJpg = document.getElementById('downloadJpg');
    const downloadJpeg = document.getElementById('downloadJpeg');
    let imgElement = null;
    let resizedWidth = 0;
    let resizedHeight = 0;

    upload.onchange = (event) => {
        const file = event.target.files[0];
        imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(file);
        imgElement.onload = () => {
            URL.revokeObjectURL(imgElement.src);
            resizedWidth = imgElement.width;
            resizedHeight = imgElement.height;
        };
        imgElement.style.maxWidth = '100%';
        imgElement.style.height = 'auto';
        preview.innerHTML = '';
        preview.appendChild(imgElement);
    };

    

    document.getElementById('removeImageButton').addEventListener('click', function() {
        if (imgElement) {
            imgElement.remove(); // Removes the image element from the DOM
            imgElement = null; // Resets the variable
            // Reset the input field for uploading files
            const uploadInput = document.getElementById('upload');
            uploadInput.value = '';
    
            // Reset your resize dimensions
            resizedWidth = 0;
            resizedHeight = 0;
        }
    });
    

    resizeButton.onclick = () => {
        if (imgElement) {
            resizedWidth = widthInput.value || imgElement.naturalWidth;
            resizedHeight = heightInput.value || imgElement.naturalHeight;
            imgElement.style.width = resizedWidth + 'px';
            imgElement.style.height = resizedHeight + 'px';
        }
    };

    const downloadImage = (format) => {
        if (!imgElement || !resizedWidth || !resizedHeight) return;
        const scaleWidth = resizedWidth / imgElement.naturalWidth;
        const scaleHeight = resizedHeight / imgElement.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = resizedWidth;
        canvas.height = resizedHeight;
        const ctx = canvas.getContext('2d');
        
        // Draw and scale the image on the canvas
        ctx.drawImage(imgElement, 0, 0, imgElement.naturalWidth, imgElement.naturalHeight, 0, 0, canvas.width, canvas.height);
        
        const dataURL = canvas.toDataURL('image/' + format);
        const link = document.createElement('a');
        link.download = 'resized-image.' + format;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    downloadPng.onclick = () => downloadImage('png');
    downloadJpg.onclick = () => downloadImage('jpeg');
    downloadJpeg.onclick = () => downloadImage('jpeg');
};
