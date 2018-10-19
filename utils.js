'use strict'

const required = (str) => {
  throw new Error(`Parameter ${str} is required`)
}

module.exports = {
  required
}
