const fs = require('fs');
const path = require('path');
const HTML5ToPDF = require("html5-to-pdf")

module.exports = buildPdf = async (input, output) => {
  const html5ToPDF = new HTML5ToPDF({
    inputPath: input,
    outputPath: output,
    templatePath: path.join(__dirname, '../../dest'),
    include: [
      path.join(__dirname, '../assets'),
      path.join(__dirname, '../assets/index.css'),
      path.join(__dirname, '../vendors/fontawesome/css/fontawesome-all.css'),
      path.join(__dirname, '../vendors/bootstrap/css/bootstrap.css'),
    ],
  });

  await html5ToPDF.start();
  await html5ToPDF.build();
  await html5ToPDF.close();
  console.log("DONE");
  process.exit(0);
}