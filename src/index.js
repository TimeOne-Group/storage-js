import 'core-js/es/array/from';
import 'core-js/es/set';
import { AppError, Severity } from '@timeone-group/error-logger-js';
import Key from './Key';
import Store from './Store';

const DEFAULT_STORAGE = 'localStorage';
const DEFAULT_PREFIX = 'storage-js';

class StorageJS {
  constructor({ storageEngine, defaultTTL, prefix } = {}) {
    this.store = new Store(storageEngine || DEFAULT_STORAGE);
    this.defaultTTL = defaultTTL || 0;
    this.key = new Key(prefix || DEFAULT_PREFIX);
  }

  save(object, { ttl } = {}) {
    if (!object.id) {
      throw new AppError(Severity.ERROR, 'Object must have an id property');
    }

    const savedObject = {
      object,
    };

    const now = new Date().getTime();
    if (ttl) {
      savedObject.ttl = now + ttl * 1000;
    } else if (this.defaultTTL > 0) {
      savedObject.ttl = now + this.defaultTTL * 1000;
    }

    this.store.set(this.key.get(object.id), savedObject);
    this.addToIndex(object.id);
  }

  find(id) {
    const savedObject = this.store.get(this.key.get(id));
    if (
      savedObject &&
      (!savedObject.ttl || new Date().getTime() <= savedObject.ttl)
    ) {
      return savedObject.object;
    }

    return {};
  }

  findAll() {
    return Array.from(this.loadIndex())
      .map((id) => this.find(id))
      .filter((object) => !!object);
  }

  delete(id) {
    this.removeToIndex(id);
    return this.store.delete(this.key.get(id));
  }

  loadIndex() {
    const index = this.store.get(this.key.getIndex());
    if (index) {
      return new Set(index);
    }
    return new Set();
  }

  addToIndex(id) {
    const index = this.loadIndex();
    index.add(id);
    this.store.set(this.key.getIndex(), [...index]);
  }

  removeToIndex(id) {
    const index = this.loadIndex();
    index.delete(id);
    this.store.set(this.key.getIndex(), [...index]);
  }

  resetIndex() {
    this.store.delete(this.key.getIndex());
  }
}

export default StorageJS;
