import pako from 'pako';
import { AppError, Severity } from '@timeone-group/error-logger-js';

const DEFAULT_STORAGE = 'localStorage';
const DEFAULT_PREFIX = 'storage-js';

class StorageJS {
  constructor({ storageEngine, defaultTTL, prefix } = {}) {
    this.storageEngine = storageEngine || DEFAULT_STORAGE;
    this.defaultTTL = defaultTTL || 0;
    this.prefix = prefix || DEFAULT_PREFIX;
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
      savedObject.ttl = now + ttl;
    } else if (this.defaultTTL > 0) {
      savedObject.ttl = now + this.defaultTTL;
    }

    window[this.storageEngine].setItem(
      this.buildKey(object.id),
      pako.deflate(JSON.stringify(savedObject))
    );
  }

  find(id) {
    const value = window[this.storageEngine].getItem(this.buildKey(id));

    if (value) {
      const compressed = new Uint8Array(value.split(','));
      const savedObject = JSON.parse(
        pako.inflate(compressed, {
          to: 'string',
        })
      );

      if (!savedObject.ttl || new Date().getTime() <= savedObject.ttl) {
        return savedObject.object;
      }
    }

    return {};
  }

  delete(id) {
    return window[this.storageEngine].removeItem(this.buildKey(id));
  }

  buildKey(key) {
    return `${this.prefix}_${key}`;
  }
}

export default StorageJS;
