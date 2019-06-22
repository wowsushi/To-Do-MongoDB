const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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
  res.send('hello')
})

app.get('/todos', ( req,res ) => {
  res.send('列出所有todo')
})

app.get('/todos/new', ( req,res ) => {
  res.send('新增這個todo')
})

app.get('/todos/:id', ( req,res ) => {
  res.send('顯示這個todo')
})

app.post('/todos', ( req,res ) => {
  res.send('建立這個todo')
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
