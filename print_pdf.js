const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to A4 dimensions
  await page.setViewport({ width: 1123, height: 794 }); // A4 landscape at 96dpi
  
  await page.goto(`file://${require('path').join(__dirname, 'cheatsheet.html')}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  // Wait for KaTeX to render
  await new Promise(r => setTimeout(r, 4000));
  
  await page.pdf({
    path: require('path').join(__dirname, 'NLP_Midterm_Cheat_Sheet.pdf'),
    width: '297mm',
    height: '210mm',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    },
    preferCSSPageSize: true
  });
  
  console.log('PDF generated successfully');
  await browser.close();
})();
