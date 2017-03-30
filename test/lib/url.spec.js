'use strict'
const test = require('tape');
const { TipaltiUrl } = require('../../index.js');

test('new TipaltiUrl() should throw AssertionError for key', assert => {
  assert.plan(1);
  try { new TipaltiUrl() }
  catch(err) {
    assert.equals(err.message, 'TipaltiUrl.key is required');
  }
});

test('new TipaltiUrl(key) should throw AssertionError for payer', assert => {
  assert.plan(1);
  try { new TipaltiUrl('key') }
  catch(err) {
    assert.equals(err.message, 'TipaltiUrl.payer is required');
  }
});

test('new TipaltiUrl.generate() should throw AssertionError for user', assert => {
  assert.plan(2);
  const url = new TipaltiUrl('key', 'payer');
  try { url.generate() }
  catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
  try { url.generate({}) }
  catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
});
