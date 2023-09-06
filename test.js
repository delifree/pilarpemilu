const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 3200;
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hallo World')
})

app.listen(port, () => {
    console.log('Server sudah berjalan di local port : ${port}')
})