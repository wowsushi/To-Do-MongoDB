const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, ( req,res ) => {
  Todo.find()
  .sort({ name: 'asc' })
  .exec((error, todos) => {
    if (error) return console.log(error)
    return res.render('index', {todos: todos})
  })
})

module.exports = router
