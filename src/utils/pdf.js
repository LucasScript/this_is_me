const fs = require('fs');
const path = require('path');
const HTML5ToPDF = require("html5-to-pdf")

module.exports = buildPdf = async (input, output) => {
  const html5ToPDF = new HTML5ToPDF({
    inputPath: input,
    outputPath: output,
    templatePath: path.join(__dirname, '../../dest'),
    include: [
      path.join(__dirname, '../vendors/bootstrap/css/bootstrap.css'),
      path.join(__dirname, '../vendors/fontawesome/css/fontawesome-all.css'),
      path.join(__dirname, '../assets/favicon.ico'),
      path.join(__dirname, '../assets/index.css'),
    ],
    renderDelay: 5000,
    pdf: {
      format: 'A4',
      // margin: {
      //   top: '4cm',
      //   right: '1cm',
      //   bottom: '1cm',
      //   left: '1cm',
      // },
    },
    scale: 2,
  });

  await html5ToPDF.start();
  await html5ToPDF.build();
  await html5ToPDF.close();
  console.log("DONE");
  process.exit(0);
}