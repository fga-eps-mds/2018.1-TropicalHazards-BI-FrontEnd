/* eslint-disable */
'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  METABASE_HOST: '"http://localhost:3000"'

})
