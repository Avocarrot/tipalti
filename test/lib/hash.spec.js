'use strict';
const test = require('tape');
const { stringify } = require('querystring');
const { TipaltiHash, TipaltiUser } = require('../../index.js');
const MockDate = require('mockdate');

test('new TipaltiHash() should throw AssertionError for key', assert => {
  assert.plan(1);
  try {
    new TipaltiHash();
  } catch (err) {
    assert.equals(err.message, 'TipaltiHash.key is required');
  }
});

test('new TipaltiHash(key) should throw AssertionError for payer', assert => {
  assert.plan(1);
  try {
    new TipaltiHash('key');
  } catch (err) {
    assert.equals(err.message, 'TipaltiHash.payer is required');
  }
});

test('new TipaltiHash.generate() should throw AssertionError for user', assert => {
  assert.plan(2);
  const hash = new TipaltiHash('key', 'payer');
  try {
    hash.generate();
  } catch (err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
  try {
    hash.generate({});
  } catch (err) {
    assert.equals(err.message, 'user must be instance of TipaltiUser');
  }
});

test('new TipaltiHash.generate() should return url instance', assert => {
  assert.plan(1);
  const hash = new TipaltiHash('key', 'payer');
  const user = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');

  MockDate.set('1/1/2000', 120);
  const url = hash.generate(user);

  const actual = stringify(url);
  const expected =
    'ts=946677600&payer=payer&idap=1&email=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&user=john.doe%2Bavocarrot%40mail.com&hashkey=0510c8ddcb27bb259d9cc7f6e1282edd6db80d76e9be0eaa4a0c73a78697bda2';
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
  assert.equals(
    url1,
    'ts=946677600&payer=payer&idap=1&email=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&user=john.doe%2Bavocarrot%40mail.com&hashkey=0510c8ddcb27bb259d9cc7f6e1282edd6db80d76e9be0eaa4a0c73a78697bda2'
  );
  assert.equals(
    url2,
    'ts=946677600&payer=payer&idap=2&email=john.doe%2Bavocarrot%40mail.com&alias=john.doe%2Bavocarrot%40mail.com&user=john.doe%2Bavocarrot%40mail.com&hashkey=0297327b5eda53c37454d1928689f460cffe306c19d2e918edfe015389dd4d24'
  );

  MockDate.reset();
});
