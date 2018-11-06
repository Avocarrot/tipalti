'use strict';
const assert = require('assert');

class TipaltiUser {
  constructor(id, email, alias, user) {
    assert(id, 'TipaltiUser.id is required');
    this.id = String(id);
    this.email = String(email);
    this.alias = alias ? String(alias) : this.email;
    this.user = user ? String(user) : this.email;
  }
}

module.exports = TipaltiUser;
