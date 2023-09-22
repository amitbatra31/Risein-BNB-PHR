const imageInput = document.getElementById('imageInput');
const outputCanvas = document.getElementById('outputCanvas');
const outputImage = document.getElementById('outputImageScanned');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  clearPreviousContent(); // Clear previous content before processing new image

  const uploadedImage = event.target.files[0];

  if (uploadedImage) {
    const imageUrl = URL.createObjectURL(uploadedImage);
    const img = new Image();
    img.onload = function () {
      clearCanvas();
      processImage(img);
      URL.revokeObjectURL(imageUrl);
    };
    img.src = imageUrl;
  }
}
function clearCanvas() {
  const ctx = outputCanvas.getContext('2d');
  ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
  outputImage.style.display = 'none';
}
function clearPreviousContent() {
  outputCanvas
    .getContext('2d')
    .clearRect(0, 0, outputCanvas.width, outputCanvas.height);
  outputCanvas.style.display = 'none';
  outputImage.style.display = 'none';
  downloadButton.style.display = 'none';
}
function processImage(img) {
  clearPreviousContent(); // Clear previous content before processing new image

  const ctx = outputCanvas.getContext('2d');
  outputCanvas.width = img.width;
  outputCanvas.height = img.height;
  ctx.filter = 'grayscale(100%) contrast(200%) brightness(150%)';
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Show the scanned image
  //   outputCanvas.style.display = 'block';
  outputImage.src = outputCanvas.toDataURL('image/png');
  // outputImage.style.display = 'block';
  outputImage.style.display = 'none';

  // Show the download button
  downloadButton.style.display = 'block';
  downloadButton.style.display = 'none';
  downloadButton.addEventListener('click', downloadScannedImage);
}

function downloadScannedImage() {
  const scannedImageUrl = outputCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = scannedImageUrl;
  a.download = 'scanned_image.png';
  a.click();
}
