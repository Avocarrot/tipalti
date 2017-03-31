'use strict'
const test = require('tape');
const { TipaltiUrl, TipaltiHash, TipaltiUser } = require('../../index.js');
const MockDate = require('mockdate');

const hash = new TipaltiHash('key', 'payer');
const user = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');

test('new TipaltiUrl() should throw AssertionError for key', assert => {
  assert.plan(1);
  try { new TipaltiUrl() }
  catch(err) {
    assert.equals(err.message, 'TipalitUrl.hash must be instance of TipaltiHash');
  }
});

test('new TipaltiUrl.get() should throw AssertionError for user', assert => {
  assert.plan(2);
  try {
    let url = new TipaltiUrl(hash);
    url.get();
  } catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
  try {
    let url = new TipaltiUrl(hash);
    url.get({})
  } catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
});

test('new TipaltiUrl.get() should return urls for sandbox', assert => {
  assert.plan(3);

  MockDate.set('1/1/2000', 120);
  const url = new TipaltiUrl(hash);
  const { dashboard, invoices, payments } = url.get(user);

  const query = '?ts=946677600&payer=payer&idap=1&user=&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=31432a446a1733b7e36070015ea28490b7ebad4e64017d5ae33e3ced219cb577';
  assert.equals(dashboard, 'https://ui2.sandbox.tipalti.com/payeedashboard/home' + query);
  assert.equals(payments,  'http://int.payrad.com/Payees/PaymentList.aspx' + query);
  assert.equals(invoices,  'http://int.payrad.com/Payees/PayeeInvoiceList.aspx' + query);
  MockDate.reset();
});

test('new TipaltiUrl.get() should return urls for production', assert => {
  assert.plan(3);

  MockDate.set('1/1/2000', 120);
  const url = new TipaltiUrl(hash, false);
  const { dashboard, invoices, payments } = url.get(user);
 
  const query = '?ts=946677600&payer=payer&idap=1&user=&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=31432a446a1733b7e36070015ea28490b7ebad4e64017d5ae33e3ced219cb577';
  assert.equals(dashboard, 'https://ui2.tipalti.com/payeedashboard/home' + query);
  assert.equals(payments,  'https://ui.tipalti.com/Payees/PaymentList.aspx' + query);
  assert.equals(invoices,  'https://ui.tipalti.com/Payees/PayeeInvoiceList.aspx' + query);
  MockDate.reset();
});
