'use strict'
const assert = require('assert');

class TipaltiUser {
  constructor(id, email, alias) {
    assert(id, 'TipaltiUser.id is required');
    assert(email, 'TipaltiUser.email is required');
    this.id    = String(id);
    this.email = String(email);
    this.alias = String(alias || this.email);
  }
}

module.exports = TipaltiUser;
