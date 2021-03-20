var storageLS = new StorageJS();
var storageSS = new StorageJS({ storageEngine: 'sessionStorage' });
var storageIA = new StorageJS({ storageEngine: 'InApp' });

function store1() {
  storageLS.save({ id: 1, test: 'ok' });
  storageSS.save({ id: 1, test: 'ok' });
  storageIA.save({ id: 1, test: 'ok' });
}

function store2() {
  storageLS.save({ id: 2, test: 'ok' });
  storageSS.save({ id: 2, test: 'ok' });
  storageIA.save({ id: 2, test: 'ok' });
}

function delete1() {
  storageLS.delete(1);
  storageSS.delete(1);
  storageIA.delete(1);
}

function delete2() {
  storageLS.delete(2);
  storageSS.delete(2);
  storageIA.delete(2);
}

function showAll() {
  console.log('localStorage', storageLS.findAll());
  console.log('sessionStorage', storageSS.findAll());
  console.log('InApp', storageIA.findAll());
}
