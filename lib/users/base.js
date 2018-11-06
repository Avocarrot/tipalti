'use strict';
const assert = require('assert');

class TipaltiBaseUser {
  constructor(id) {
    assert(id, 'TipaltiUser.id is required');
    this.id = String(id);
  }

  get query() {
    return { idap: this.id };
  }
}

module.exports = TipaltiBaseUser;
