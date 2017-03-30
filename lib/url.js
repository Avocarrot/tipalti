'use strict'
const assert = require('assert');
const TipaltiUser = require('./user');

class TipaltiUrl {
  constructor(key, payer) {
    assert(key, 'TipaltiUrl.key is required');
    assert(payer, 'TipaltiUrl.payer is required');
    this._key   = key;
    this._payer = payer;
  }
  generate(user) {
    assert(user instanceof TipaltiUser, 'user must be instance of TipaltiUser');
  }
}

module.exports = TipaltiUrl;
