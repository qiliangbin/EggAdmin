'use strict';

const moment = require('moment')

exports.formatTime = (time, format) => {
  return moment(time).format(format)
}