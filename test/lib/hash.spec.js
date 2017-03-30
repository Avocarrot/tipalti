'use strict'
const test = require('tape');
const { format, Url } = require('url');
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
  assert.plan(2);
  const hash = new TipaltiHash('key', 'payer');
  const user = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');

  MockDate.set('1/1/2000', 120);
  const url = hash.generate(user);
  assert.ok(url instanceof Url);

  const actual   = format(url);
  const expected = '?ts=946677600&payer=payer&idap=1&user=&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=31432a446a1733b7e36070015ea28490b7ebad4e64017d5ae33e3ced219cb577';
  assert.equals(actual, expected);
  MockDate.reset();
});

test('new TipaltiHash.generate() should work for more users', assert => {
  assert.plan(3);
  const hash = new TipaltiHash('key', 'payer');
  const user1 = new TipaltiUser(1, 'john.doe+avocarrot@mail.com');
  const user2 = new TipaltiUser(2, 'john.doe+avocarrot@mail.com');

  MockDate.set('1/1/2000', 120);
  const url1 = format(hash.generate(user1));
  const url2 = format(hash.generate(user2));

  assert.ok(url1 != url2);
  assert.equals(url1, '?ts=946677600&payer=payer&idap=1&user=&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=31432a446a1733b7e36070015ea28490b7ebad4e64017d5ae33e3ced219cb577');
  assert.equals(url2, '?ts=946677600&payer=payer&idap=2&user=&alias=john.doe%2Bavocarrot%40mail.com&email=john.doe%2Bavocarrot%40mail.com&hashkey=dbb9117e49e06785ae9cd8607907f2ad7cb21a2c94118afc4c83f7a923eb2b74');
  MockDate.reset();
});
