const _ = require('lodash');

const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const string = (length = 10) => _.sampleSize(char, length).join('');

module.exports = {
  string
}