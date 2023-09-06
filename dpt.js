const puppeteer = require("puppeteer");
const log = console.log;
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : 'Volbeat';
const searchTermENV = process.env.SEARCHTXT ?? 'Volbeat';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp"
    });
    const page = await browser.newPage();
    await page.goto('https://cekdptonline.kpu.go.id/');
    await page.waitForSelector('#__BVID__22');
    await page.type('#__BVID__22', searchTermCLI);

    await page.click('button.btn:nth-child(2)')

    // Menunggu hingga data muncul di halaman
    await page.waitForSelector('.list-item-heading');
    
    // Mengambil dan mencetak data dari halaman
    const dataElements = await page.$$('.list-item-heading + p');
    for (const element of dataElements) {
        const text = await page.evaluate(el => el.textContent, element);
        log(text);
    }
    
    await browser.close();
})();
