const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

router.get('/', ( req,res ) => {
  res.send('列出所有todo')
})

router.get('/new', ( req,res ) => {
  res.render('new')
})

router.post('/', ( req,res ) => {
  const todo = new Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

router.get('/:id', ( req,res ) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('detail', {todo: todo})
  })
})

router.get('/:id/edit', ( req,res ) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('edit', {todo: todo})
  })
})

router.put('/:id', ( req,res ) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.name = req.body.name
    if (req.body.done) {
      todo.done = true
    } else {
      todo.done = false
    }

    todo.save((err) => {
      if (err) return console.log(err)
      return res.redirect(`/todos/${req.params.id}`)
    })

  })
})

router.delete('/:id/delete', ( req,res ) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
