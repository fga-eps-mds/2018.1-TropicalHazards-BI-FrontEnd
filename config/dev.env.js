/* eslint-disable */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: '"localhost"',
  API_HOST: '"http://localhost:8000"',
})
