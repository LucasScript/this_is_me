const handlebars = require('handlebars');
const fs = require('fs-extra');
const buildPdf = require('./utils/pdf');
const markdownHelper = require('./utils/helpers/markdown');
const templateData = require('./metadata/metadata');

const srcDir = __dirname;
const outputDir = __dirname + '/../dest';

// Clear dest dir
fs.emptyDirSync(outputDir);

// Copy assets
fs.copySync(srcDir + '/assets', outputDir);
fs.copySync(srcDir + '/vendors/bootstrap', outputDir + '/bootstrap');
fs.copySync(srcDir + '/vendors/fontawesome', outputDir + '/fontawesome');
fs.copySync(srcDir + '/vendors/fontawesome/webfonts', outputDir + '/webfonts');

// Build HTML
handlebars.registerHelper('markdown', markdownHelper);
const source = fs.readFileSync(srcDir + '/templates/index.html', 'utf-8');
const template = handlebars.compile(source);
const htmlData = Object.assign(templateData, { pdf: false });
const html = template(htmlData);
fs.writeFileSync(outputDir + '/index.html', html);

// Build PDF
const pdfData = Object.assign(templateData, { pdf: true });
const pdfHtml = template(pdfData);
fs.writeFileSync(outputDir + '/pdfHtml.html', pdfHtml);
buildPdf(outputDir + '/pdfHtml.html', outputDir + '/cv.pdf');