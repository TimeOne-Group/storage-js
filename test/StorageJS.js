import test from 'ava';
import { AppError } from '@timeone-group/error-logger-js';
import delay from 'await-delay';
import StorageJS from '../src/index';

const store = new StorageJS();

test('save object', (t) => {
  const object = { id: 'uuid', test: 'ok' };
  store.save(object);
  t.deepEqual(store.find('uuid'), object);
});

test('delete object', (t) => {
  store.save({ id: 'deleted', test: 'ok' });
  store.delete('deleted');
  t.deepEqual(store.find('deleted'), {});
});

test('object has no id', (t) => {
  const error = t.throws(
    () => {
      store.save({ test: 'ok' });
    },
    { instanceOf: AppError }
  );
  t.is(error.message, 'Object must have an id property');
});

test('expired object', async (t) => {
  store.save({ id: 'expired', test: 'ok' }, { ttl: 2 });
  await delay(3000);
  t.deepEqual(store.find('expired'), {});
});

test('expired object default TTL', async (t) => {
  const storeTTL2 = new StorageJS({ defaultTTL: 2 });
  storeTTL2.save({ id: 'expiredTTL2', test: 'ok' });
  await delay(3000);
  t.deepEqual(storeTTL2.find('expiredTTL2'), {});
});

test('not expired object', async (t) => {
  const object = { id: 'notexpired', test: 'ok' };
  store.save(object, { ttl: 15 });
  await delay(3000);
  t.deepEqual(store.find('notexpired'), object);
});

test('not expired object default TTL', async (t) => {
  const object = { id: 'notexpiredTTL5', test: 'ok' };
  const storeTTL5 = new StorageJS({ defaultTTL: 15 });
  storeTTL5.save(object);
  await delay(3000);
  t.deepEqual(storeTTL5.find('notexpiredTTL5'), object);
});

test('find all', (t) => {
  const storeFindAll = new StorageJS({ prefix: 'findall' });
  storeFindAll.save({ id: 1, test: 'ok' });
  storeFindAll.save({ id: 2, test: 'ok' });
  storeFindAll.save({ id: 3, test: 'ok' });
  storeFindAll.save({ id: 4, test: 'ok' });
  storeFindAll.delete(3);
  t.deepEqual(storeFindAll.findAll(), [
    {
      id: 1,
      test: 'ok',
    },
    {
      id: 2,
      test: 'ok',
    },
    {
      id: 4,
      test: 'ok',
    },
  ]);
});
