const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

require('./config/mongoose')
const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'MyCatIsSoCute',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

const port = 3000

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})