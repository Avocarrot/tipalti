'use strict'
const assert = require('assert');
const TipaltiUser = require('./user');

class TipaltiHash {
  constructor(key, payer) {
    assert(key, 'TipaltiHash.key is required');
    assert(payer, 'TipaltiHash.payer is required');
    this._key   = key;
    this._payer = payer;
  }
  generate(user) {
    assert(user instanceof TipaltiUser, 'user must be instance of TipaltiUser');
  }
}

module.exports = TipaltiHash;
