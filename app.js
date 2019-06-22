const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Todo = require('./models/todo')

app.get('/', ( req,res ) => {
  Todo.find((error, todos) => {
    if (error) return console.log(error)
    return res.render('index', {todos: todos})
  })
})

app.get('/todos', ( req,res ) => {
  res.send('列出所有todo')
})

app.get('/todos/new', ( req,res ) => {
  res.render('new')
})

app.post('/todos', ( req,res ) => {
  const todo = new Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

app.get('/todos/:id', ( req,res ) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('detail', {todo: todo})
  })

})

app.get('/todos/:id/edit', ( req,res ) => {
  res.send('修改這個todo')
})

app.post('/todos/:id', ( req,res ) => {
  res.send('修改todo')
})

app.post('/todos/:id/delete', ( req,res ) => {
  res.send('刪除這個todo')
})

app.listen(port, console.log('running'))
