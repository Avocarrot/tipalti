'use strict';
const assert = require('assert');
const crypto = require('crypto');
const { stringify } = require('querystring');
const TipaltiBaseUser = require('./users/base');

class TipaltiHash {
  constructor(key, payer) {
    assert(key, 'TipaltiHash.key is required');
    assert(payer, 'TipaltiHash.payer is required');
    this._key = Buffer.from(key, 'utf-8');
    this._payer = String(payer);
  }
  get _hmac() {
    return crypto.createHmac('sha256', this._key);
  }
  generate(user) {
    assert(
      user instanceof TipaltiBaseUser,
      'user must be instance of TipaltiUser'
    );
    let query = Object.assign(
      {
        ts: Math.round(Date.now() / 1000),
        payer: this._payer,
      },
      user.query
    );
    query.hashkey = this._hmac
      .update(Buffer.from(stringify(query), 'utf-8'))
      .digest('hex');
    return query;
  }
}

module.exports = TipaltiHash;
