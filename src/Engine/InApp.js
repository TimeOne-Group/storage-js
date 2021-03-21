const store = {};

const InApp = {
  setItem: (key, value) => {
    store[key] = value;
    return true;
  },
  getItem: (key) => store[key],
  removeItem: (key) => {
    delete store[key];
    return true;
  },
};

export default InApp;
