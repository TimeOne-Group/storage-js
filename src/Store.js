import { Logger } from '@timeone-group/error-logger-js';
import pako from 'pako';

class Store {
  constructor(engine) {
    this.engine = engine;
  }

  set(key, object) {
    window[this.engine].setItem(
      key,
      Array.from(pako.deflate(JSON.stringify(object))).join(',')
    );
  }

  get(key) {
    const value = window[this.engine].getItem(key);

    if (value) {
      try {
        const compressed = new Uint8Array(value.split(','));
        return JSON.parse(
          pako.inflate(compressed, {
            to: 'string',
          })
        );
      } catch (e) {
        Logger.catchError(e);
        return null;
      }
    }

    return null;
  }

  delete(key) {
    return window[this.engine].removeItem(key);
  }
}

export default Store;
