'use strict'
const test = require('tape');
const { TipaltiHash } = require('../../index.js');

test('new TipaltiHash() should throw AssertionError for key', assert => {
  assert.plan(1);
  try { new TipaltiHash() }
  catch(err) {
    assert.equals(err.message, 'TipaltiHash.key is required');
  }
});

test('new TipaltiHash(key) should throw AssertionError for payer', assert => {
  assert.plan(1);
  try { new TipaltiHash('key') }
  catch(err) {
    assert.equals(err.message, 'TipaltiHash.payer is required');
  }
});

test('new TipaltiHash.generate() should throw AssertionError for user', assert => {
  assert.plan(2);
  const url = new TipaltiHash('key', 'payer');
  try { url.generate() }
  catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
  try { url.generate({}) }
  catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
});
