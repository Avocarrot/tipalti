'use strict';
const assert = require('assert');
const BaseUser = require('./base');

class TipaltiUser extends BaseUser {
  constructor(id, email, alias, user) {
    super(id);
    assert(email, 'TipaltiUser.email is required');
    this.email = String(email);
    this.alias = alias ? String(alias) : this.email;
    this.user = user ? String(user) : this.email;
  }
  get query() {
    let query = super.query;
    return Object.assign(query, {
      email: this.email,
      alias: this.alias,
      user: this.user,
    });
  }
}

module.exports = TipaltiUser;
