const DB = require('pg').Pool
const connect = require('../../database.json').dev;

const db = new DB({...connect})

module.exports = db;


