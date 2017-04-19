'use strict'
const test = require('tape');
const { stringify } = require('querystring');
const { TipaltiHash, TipaltiUser } = require('../../index.js');
const MockDate = require('mockdate');

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
  const hash = new TipaltiHash('key', 'payer');
  try { hash.generate() }
  catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
  try { hash.generate({}) }
  catch(err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
});

test('new TipaltiHash.generate() should return url instance', assert => {
  assert.plan(1);
  const hash = new TipaltiHash('key', 'payer');
  const user = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');

  MockDate.set('1/1/2000', 120);
  const url = hash.generate(user);
 
  const actual   = stringify(url);
  const expected = 'ts=946677600&payer=payer&idap=1&user=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=8648e8695f4d88b587ccaa8bbb8941f0d299a758cd01bb49790e0e8017f5aed9';
  assert.equals(actual, expected);
  MockDate.reset();
});

test('new TipaltiHash.generate() should work for more users', assert => {
  assert.plan(3);
  const hash = new TipaltiHash('key', 'payer');
  const user1 = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');
  const user2 = new TipaltiUser(2, 'john.doe+avocarrot@mail.com');

  MockDate.set('1/1/2000', 120);
  const url1 = stringify(hash.generate(user1));
  const url2 = stringify(hash.generate(user2));

  assert.ok(url1 != url2);
  assert.equals(url1, 'ts=946677600&payer=payer&idap=1&user=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=8648e8695f4d88b587ccaa8bbb8941f0d299a758cd01bb49790e0e8017f5aed9');
  assert.equals(url2, 'ts=946677600&payer=payer&idap=2&user=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=599c4d81d0f2708a8d2c7bca001dcb799168e2794f5788b4b49f2e19a0fbe5bb');
  MockDate.reset();
});
