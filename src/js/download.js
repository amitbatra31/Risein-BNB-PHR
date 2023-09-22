const downloadMedicalRecord = document.getElementById("downloadmedicalrecord");
downloadMedicalRecord.addEventListener("click", () => {
  window.jsPDF = window.jspdf.jsPDF;
  const content = document.getElementById("records");
  // Ensure jsPDF is loaded
  if (typeof jsPDF !== "undefined") {
    // Capture the content as an image using html2canvas
    html2canvas(content).then(canvas => {
      const imageData = canvas.toDataURL("image/png");
      console.log("id", imageData);
      const pdf = new jsPDF();
      pdf.addImage(imageData, "PNG", 10, 10, 190, 0);

      // Download the PDF
      pdf.save("diagnosis.pdf");
    });
  } else {
    console.error("jsPDF library is not loaded.");
  }
});