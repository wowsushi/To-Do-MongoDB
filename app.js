const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(session({
  secret: 'dijwfjsogioiswg',
  resave: 'false',
  saveUninitialized: 'false'
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Todo = require('./models/todo')

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auths'))

app.listen(port, console.log('running'))
