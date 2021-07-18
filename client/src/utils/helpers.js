export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
  // open connection to the database `shop-shop` with the version of 1
  const request = window.indexedDB.open('shop_shop', 1);

  // create variables to hold reference to the database, transaction (tx), and object store
  let db, tx, store;
  request.onupgradeneeded = function(e) {

  db = request.result;
  tx = db.transaction(storeName, 'readwrite');
  store = tx.objectStore(storeName);

  db.onerror = function(e) {
    console.log('error', e);
  };

  switch (method) {
    case 'put':
      store.put(object);
      resolve(object);
      break;
    case 'get':
      const all = store.getAll();
      all.onsuccess = function() {
        resolve(all.result);
      };
      break;
    case 'delete':
      store.delete(object._id);
      break
    default:
      console.log('No valid method');
      break;
  }

  tx.oncomplete = function() {
    db.close();
  };
  db.createObjectStore('products', { keyPath: '_id'});
  db.createObjectStore('categories', { keyPath: '_id'});
  db.createObjectStore('cart', { keyPath: '_id'});
  };

  request.onerror = function(e) {
    console.log('There was an error!')
  };

  });
}