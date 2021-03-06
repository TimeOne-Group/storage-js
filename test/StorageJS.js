import { AppError } from '@timeone-group/error-logger-js';
import test from 'ava';
import StorageJS from '../src/index';

const store = new StorageJS();

test('save object', (t) => {
  const object = { id: 'uuid', test: 'ok' };
  store.save(object);
  t.deepEqual(store.find('uuid'), object);
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
