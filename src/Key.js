class Key {
  constructor(prefix) {
    this.prefix = prefix;
  }

  get(id) {
    return `${this.prefix}_${id}`;
  }

  getIndex() {
    return this.get('INDEX');
  }
}

export default Key;
