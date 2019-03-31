'use strict'

const path = require('path')
const winston = require('winston')
require('winston-daily-rotate-file')
const moment = require('moment')
const fs = require('fs-extra')

let logger = null;

module.exports = Logger;

function Logger() {
  if (logger instanceof Logger) {
    return logger
  }
  function timeing() {
    return '### ' + moment().format('DD-MM-YYYY - HH:mm:ss') + ' ###'
  }
  const transports = []
  // ... do some stuff based on your configuration for example choice which the
  // winston tranport to use.
  const optsConsoleTransport = {
    colorize: true,
    timestamp: timeing
  }
  // Ensure that directory for logs exist otherwise create it
  fs.ensureDirSync('./logs')
  const consoleTransport = new (winston.transports.Console)(optsConsoleTransport)
  transports.push(consoleTransport)
  const optsFileTransportForError = {
    name: 'error-file-stransport',
    filename: path.join('./logs', 'express-winston' + '-ERROR'),
    level: 'error',
    json: true,
    timestamp: timeing,
    datePattern: '-dd-MM-yyyy.log'
  }
  const fileTransportForError = new (winston.transports.DailyRotateFile)(optsFileTransportForError)
  transports.push(fileTransportForError)
  const optsFileTransportForWarning = {
    name: 'warning-file-transport',
    filename: path.join('./logs', 'express-winston' + '-WARNING'),
    level: 'warn',
    json: true,
    timestamp: timeing,
    datePattern: '-dd-MM-yyyy.log'
  }
  const fileTransportForWarning = new (winston.transports.DailyRotateFile)(optsFileTransportForWarning)
  transports.push(fileTransportForWarning)
  const optsFileTransportForInfo = {
    name: 'info-file-transport',
    filename: path.join('./logs', 'express-winston' + '-INFO'),
    level: 'info',
    json: true,
    timestamp: timeing,
    datePattern: '-dd-MM-yyyy.log'
  }
  const fileTransportForInfo = new (winston.transports.DailyRotateFile)(optsFileTransportForInfo)
  transports.push(fileTransportForInfo)
  return new (winston.Logger)({transports: transports})
}