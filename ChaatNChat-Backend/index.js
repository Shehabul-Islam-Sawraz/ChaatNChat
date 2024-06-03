const express = require('express')
const config = require('./config/app')

const app = express()

const port = config.appPort

app.get('/', (req, res) => {
    return res.send('Root Page')
})

app.get('/login', (req, res) => {
    return res.send('Login Screen')
})

app.get('/home', (req, res) => {
    return res.send('Home Screen')
})

app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})