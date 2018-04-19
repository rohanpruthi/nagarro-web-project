const express = require('express')
const path = require('path')

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api').route)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(7000, () => console.log('Server started at http://localhost:7000'))