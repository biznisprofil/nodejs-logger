'use strict'

const express = require('express')
const routes = express.Router()

routes
  .get('/test', (req, res) => {
    res.sendStatus(200)
  })
  .get('/error', (req, res, next) => {
    next(new Error("Ooops something wong happened ..."))
  })
  .post('/test', (req, res) => {
    res.sendStatus(201)
  })
  .put('/test', (req, res) => {
    res.sendStatus(200)
  })
  .delete('/test', (req, res) => {
    res.sendStatus(200)
  })

module.exports = routes