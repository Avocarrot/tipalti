'use strict'
const assert = require('assert');
const TipaltiHash = require('./hash');
const TipaltiUser = require('./user');
const { format, parse } = require('url');

const PRODUCTION_URL = {
  dashboard: 'https://ui2.tipalti.com/payeedashboard/home',
  payments:  'https://ui2.tipalti.com/PayeeDashboard/PaymentsHistory',
  invoices:  'https://ui2.tipalti.com/PayeeDashboard/Invoices'
};
const SANDBOX_URL = {
  dashboard: 'https://ui2.sandbox.tipalti.com/payeedashboard/home',
  payments:  'https://ui2.sandbox.tipalti.com/PayeeDashboard/PaymentsHistory',
  invoices:  'https://ui2.sandbox.tipalti.com/PayeeDashboard/Invoices',
};

class TipaltiUrl {
  constructor(hash, mock = true) {
    assert(hash instanceof TipaltiHash, 'TipalitUrl.hash must be instance of TipaltiHash');
    this._hash = hash;
    this.url = (mock) ? SANDBOX_URL : PRODUCTION_URL;
  }
  get(user) {
    assert(user instanceof TipaltiUser, 'user must be instance of TipaltiUser');
    let dashboard = parse(this.url.dashboard);
    let payments  = parse(this.url.payments);
    let invoices  = parse(this.url.invoices);
    dashboard.query = payments.query = invoices.query = this._hash.generate(user);
    return {
      dashboard: format(dashboard),
      payments:  format(payments),
      invoices:  format(invoices),
    };
  }
}

module.exports = TipaltiUrl;
