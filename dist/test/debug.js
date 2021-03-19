var storageLS = new StorageJS();
var storageSS = new StorageJS({ storageEngine: 'sessionStorage' });
var storageP = new StorageJS({ storageEngine: 'Privacy' });

function store1() {
  storageLS.save({ id: 1, test: 'ok' });
  storageSS.save({ id: 1, test: 'ok' });
  storageP.save({ id: 1, test: 'ok' });
}

function store2() {
  storageLS.save({ id: 2, test: 'ok' });
  storageSS.save({ id: 2, test: 'ok' });
  storageP.save({ id: 2, test: 'ok' });
}

function delete1() {
  storageLS.delete(1);
  storageSS.delete(1);
  storageP.delete(1);
}

function delete2() {
  storageLS.delete(2);
  storageSS.delete(2);
  storageP.delete(2);
}

function showAll() {
  console.log('localStorage', storageLS.findAll());
  console.log('sessionStorage', storageSS.findAll());
  console.log('Privacy', storageP.findAll());
}
