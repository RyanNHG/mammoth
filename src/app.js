'use strict'

let express = require('express')
let app = express()
let path = require('path')

app.set('port', process.env.PORT || 4000)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(app.get('port'), () => console.info(`Mammoth running at http://localhost:${app.get('port')}`))
