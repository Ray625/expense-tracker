const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

require('./config/mongoose')
const Record = require('./models/record')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})