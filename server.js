'use strict'

const express = require('express')
const responseTime = require('response-time')
const responsePoweredBy = require('response-powered-by')
const http = require('http')
const bodyParser = require('body-parser')
const Logger = require('./logger')

module.exports = function createServer() {

    // Create your own logger
    let myLogger = new Logger()

    const app = express()

    app.logger = myLogger

    // Set express server port
    app.set('port', process.env.PORT || 5000)

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(responsePoweredBy("@NodeLogger"))
    app.use(responseTime())

    app.use(function myCustomLogger(req, res, next) {
        console.log('req.query', req.query);
        console.log('req', req.body);
        req.app.logger.info(`
        {
            ip: '${req.ip}', 
            method: '/${req.method}', 
            hostname: '${req.protocol}://${req.hostname}:${req.app.get('port')}${req.path}',
            message: ${JSON.stringify(req.query)}
        }
    `)
        // ... you can define your format to log the http request
        next()
    })

    /**
     * Routes for the application
     */
    app.use('/', require('./routes/routes'))

    app.use(function errorhandler(err, req, res, next) {
        // Your error handler logic
        // ... here you log the error happened in request
        req.app.logger.error(`${req.ip} - /${req.method} ${req.protocol}://${req.hostname}:${req.app.get('port')}${req.path}`)
        // ... you can define your format to log the http request
        res.sendStatus(500)
    })

    // Create http server and attach express app on it
    return http.createServer(app).listen(app.get('port'), '0.0.0.0', () => {
        console.log("Server started at http://localhost:" + app.get('port') + "/")
    })

}