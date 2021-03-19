import { AppError, Logger, Severity } from '@timeone-group/error-logger-js';
import pako from 'pako';
import Privacy from './Engine/Privacy';

class Store {
  constructor(engine) {
    switch (engine) {
      case 'localStorage':
      case 'sessionStorage':
        this.engine = window[engine];
        break;

      case 'Privacy':
        this.engine = Privacy;
        break;

      default:
        throw new AppError(Severity.ERROR, 'Unknow engine');
    }
  }

  set(key, object) {
    this.engine.setItem(
      key,
      Array.from(pako.deflate(JSON.stringify(object))).join(',')
    );
  }

  get(key) {
    const value = this.engine.getItem(key);

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
    return this.engine.removeItem(key);
  }
}

export default Store;
