'use strict';
const test = require('tape');
const { TipaltiUrl, TipaltiHash, TipaltiUser } = require('../../index.js');
const MockDate = require('mockdate');

const hash = new TipaltiHash('key', 'payer');
const user = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');

test('new TipaltiUrl() should throw AssertionError for key', assert => {
  assert.plan(1);
  try {
    new TipaltiUrl();
  } catch (err) {
    assert.equals(
      err.message,
      'TipalitUrl.hash must be instance of TipaltiHash'
    );
  }
});

test('new TipaltiUrl.get() should throw AssertionError for user', assert => {
  assert.plan(2);
  try {
    let url = new TipaltiUrl(hash);
    url.get();
  } catch (err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
  try {
    let url = new TipaltiUrl(hash);
    url.get({});
  } catch (err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
});

test('new TipaltiUrl.get() should return urls for sandbox', assert => {
  assert.plan(3);

  MockDate.set('1/1/2000', 120);
  const url = new TipaltiUrl(hash);
  const { dashboard, invoices, payments } = url.get(user);

  const query =
    '?ts=946677600&payer=payer&idap=1&email=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&user=john.doe%2Bavocarrot%40mail.com&hashkey=0510c8ddcb27bb259d9cc7f6e1282edd6db80d76e9be0eaa4a0c73a78697bda2';

  assert.equals(
    dashboard,
    'https://ui2.sandbox.tipalti.com/payeedashboard/home' + query
  );
  assert.equals(
    payments,
    'https://ui2.sandbox.tipalti.com/PayeeDashboard/PaymentsHistory' + query
  );
  assert.equals(
    invoices,
    'https://ui2.sandbox.tipalti.com/PayeeDashboard/Invoices' + query
  );
  MockDate.reset();
});

test('new TipaltiUrl.get() should return urls for production', assert => {
  assert.plan(3);

  MockDate.set('1/1/2000', 120);
  const url = new TipaltiUrl(hash, false);
  const { dashboard, invoices, payments } = url.get(user);

  const query =
    '?ts=946677600&payer=payer&idap=1&email=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&user=john.doe%2Bavocarrot%40mail.com&hashkey=0510c8ddcb27bb259d9cc7f6e1282edd6db80d76e9be0eaa4a0c73a78697bda2';
  assert.equals(
    dashboard,
    'https://ui2.tipalti.com/payeedashboard/home' + query
  );
  assert.equals(
    payments,
    'https://ui2.tipalti.com/PayeeDashboard/PaymentsHistory' + query
  );
  assert.equals(
    invoices,
    'https://ui2.tipalti.com/PayeeDashboard/Invoices' + query
  );
  MockDate.reset();
});
