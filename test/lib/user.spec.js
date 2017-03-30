const test = require('tape');
const { TipaltiUser } = require('../../index.js')

test('new TipaltiUser() should throw AssertionError for id', assert => {
  assert.plan(1);
  try { new TipaltiUser() }
  catch (err) {
    assert.equals(err.message, 'TipaltiUser.id is required');
  }
});

test('new TipaltiUser(id) should throw AssertionError for email', assert => {
  assert.plan(1);
  try { new TipaltiUser(1) }
  catch (err) {
    assert.equals(err.message, 'TipaltiUser.email is required');
  }
});

test('new TipaltiUser(id, email) should add email to alias', assert => {
  assert.plan(3);
  const user = new TipaltiUser(1, 'john.doe@mail.com');
  assert.equals(user.id, '1');
  assert.equals(user.email, 'john.doe@mail.com');
  assert.equals(user.alias, 'john.doe@mail.com');
});
