const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path');

module.exports = function buildPdf(input, output) {
  let html = fs.readFileSync(input, 'utf8');
  let bootstrap = fs.readFileSync(path.join(__dirname, '../vendors/bootstrap/css/bootstrap.css'), 'utf8');
  let fontawesome = fs.readFileSync(path.join(__dirname, '../vendors/fontawesome/css/fontawesome-all.css'), 'utf8');
  let index = fs.readFileSync(path.join(__dirname, '../assets/index.css'), 'utf8');
  const outputDir = __dirname + '/../../dest';

  html = html.replace('@bootstrap@', bootstrap);
  html = html.replace('@fontawesome@', fontawesome);
  html = html.replace('@index@', index);

  fs.writeFileSync(outputDir + '/pdf.html', html);

  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '2.54cm',
  };

  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(output, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve();
    });
  })
}