import pako from 'pako';

class Store {
  constructor(engine) {
    this.engine = engine;
  }

  set(key, object) {
    window[this.engine].setItem(key, pako.deflate(JSON.stringify(object)));
  }

  get(key) {
    const value = window[this.engine].getItem(key);

    if (value) {
      const compressed = new Uint8Array(value.split(','));
      return JSON.parse(
        pako.inflate(compressed, {
          to: 'string',
        })
      );
    }

    return null;
  }

  delete(key) {
    return window[this.engine].removeItem(key);
  }
}

export default Store;
