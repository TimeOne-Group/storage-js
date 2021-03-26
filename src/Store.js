import { AppError, Logger, Severity } from '@timeone-group/error-logger-js';
import LZString from 'lz-string';
import InApp from './Engine/InApp';

class Store {
  constructor(engine) {
    switch (engine) {
      case 'localStorage':
      case 'sessionStorage':
        this.engine = window[engine];
        break;

      case 'InApp':
        this.engine = InApp;
        break;

      default:
        throw new AppError(Severity.ERROR, 'Unknow engine');
    }
  }

  set(key, object) {
    this.engine.setItem(key, LZString.compress(JSON.stringify(object)));
  }

  get(key) {
    const value = this.engine.getItem(key);

    if (value) {
      try {
        return JSON.parse(LZString.decompress(value));
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
