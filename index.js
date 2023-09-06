const fs = require('fs');
const puppeteer = require('puppeteer');

const bukaBrowser = async (nikInput) => {
  const browser = await puppeteer.launch({
    headless: "new"
});
  const page = await browser.newPage();

  try {
    await page.goto('https://cekdptonline.kpu.go.id/');

    await page.waitForSelector('#__BVID__22');
    await page.type('#__BVID__22', nikInput);

    // Klik tombol "Pencarian"
    await page.click('button.btn:nth-child(2)');

    // Menunggu hingga data muncul di halaman
    await page.waitForSelector('.list-item-heading');

    // Mengambil dan menyimpan data dari halaman ke dalam array
    const namaElement = await page.$('.list-item-heading + p:nth-child(3)');
    const tpsElement = await page.$('.list-item-heading + p:nth-child(12)');

    const nik = nikInput
    const nama = await page.evaluate(el => el.textContent, namaElement);

    // Pemisahan data TPS
    const dataTps = await page.evaluate(el => el.textContent, tpsElement);

    const tpsInfo = dataTps.trim().split(',');

    const tpsPatch = tpsInfo[0].trim().split(':'); // Mengambil TPS
    const tps = tpsPatch[1].trim(); // Mengambil No TPS
    const kelDesa = tpsInfo[1].trim(); // Mengambil Kel/Desa
    const kecamatan = tpsInfo[2].trim(); // Mengambil Kecamatan
    const kabupaten = tpsInfo[3].trim(); // Mengambil Kabupaten

    const data = [nik, nama, tps, kelDesa, kecamatan, kabupaten];

    console.log(data);

    // Menyimpan data dalam file JSON
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', jsonData, 'utf8');
    
    console.log('Data berhasil disimpan dalam file data.json');
    
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  } finally {
    console.log('Tutup browser');
    await browser.close();
  }
};

const nikInput = process.argv[2] || ''; // Ambil nilai NIK dari argumen
bukaBrowser(nikInput);
