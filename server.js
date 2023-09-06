const express = require("express");
const app = express();
const { exec } = require("child_process");

// Tambahkan middleware CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static("pilarpemilu"));

// Endpoint untuk menjalankan skrip
app.get("/run-script", (req, res) => {
    const nikInput = req.query.nik || "";
    // console.log("NIK yang diterima:", nikInput);
    const command = `node index.js "${nikInput}"`;
  
    exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Terjadi kesalahan: ${error}`);
      return res.status(500).send("Terjadi kesalahan saat menjalankan skrip.");
    }
    console.log(`Skrip berhasil dijalankan: ${stdout}`);
    return res.status(200).send("Skrip berhasil dijalankan.");
  });
});

const server = app.listen(4001, () => {
  console.log("Server berjalan pada port 4001");
});
