const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('express test')
})

app.listen(3001, () => {
    console.log("http://localhost:3001")
})