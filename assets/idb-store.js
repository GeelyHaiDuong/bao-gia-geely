(() => {
  'use strict';

  const DB_NAME = 'geely_bao_gia_v18';
  const DB_VERSION = 1;
  const IMAGE_STORE = 'carImages';
  const QUOTE_STORE = 'quotations';
  let dbPromise = null;

  const open = () => {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error || new Error('Không mở được IndexedDB.'));
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE, { keyPath: 'carId' });
        if (!db.objectStoreNames.contains(QUOTE_STORE)) {
          const store = db.createObjectStore(QUOTE_STORE, { keyPath: 'id' });
          store.createIndex('updatedAtMs', 'updatedAtMs');
        }
      };
      request.onsuccess = () => resolve(request.result);
    });
    return dbPromise;
  };

  const transaction = async (storeName, mode, action) => {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      let request;
      try { request = action(store); } catch (error) { reject(error); return; }
      tx.oncomplete = () => resolve(request?.result);
      tx.onerror = () => reject(tx.error || request?.error || new Error('Lỗi IndexedDB.'));
      tx.onabort = () => reject(tx.error || new Error('Giao dịch IndexedDB bị hủy.'));
    });
  };

  const dataUrlToBlob = dataUrl => {
    const [header, payload] = String(dataUrl || '').split(',');
    if (!header || !payload) throw new Error('Dữ liệu ảnh không hợp lệ.');
    const mime = /data:([^;]+)/.exec(header)?.[1] || 'image/jpeg';
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  };

  const blobToDataUrl = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Không đọc được ảnh.'));
    reader.readAsDataURL(blob);
  });

  const api = {
    version: '1.9.0',
    async saveCarImage(carId, source) {
      if (!carId) throw new Error('Thiếu mã xe.');
      let blob = source;
      if (typeof source === 'string') blob = dataUrlToBlob(source);
      if (!(blob instanceof Blob)) throw new Error('Ảnh không hợp lệ.');
      await transaction(IMAGE_STORE, 'readwrite', store => store.put({ carId, blob, updatedAtMs: Date.now() }));
      return true;
    },
    async getCarImage(carId) {
      if (!carId) return '';
      const record = await transaction(IMAGE_STORE, 'readonly', store => store.get(carId));
      return record?.blob ? blobToDataUrl(record.blob) : '';
    },
    async deleteCarImage(carId) {
      if (!carId) return;
      await transaction(IMAGE_STORE, 'readwrite', store => store.delete(carId));
    },
    async listCarImageIds() {
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(IMAGE_STORE, 'readonly');
        const request = tx.objectStore(IMAGE_STORE).getAllKeys();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    },
    async saveQuotation(quotation) {
      if (!quotation?.id) throw new Error('Báo giá chưa có mã.');
      await transaction(QUOTE_STORE, 'readwrite', store => store.put({ ...quotation, updatedAtMs: quotation.updatedAtMs || Date.now() }));
    },
    async deleteQuotation(id) {
      await transaction(QUOTE_STORE, 'readwrite', store => store.delete(id));
    },
    async listQuotations() {
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(QUOTE_STORE, 'readonly');
        const request = tx.objectStore(QUOTE_STORE).getAll();
        request.onsuccess = () => resolve((request.result || []).sort((a, b) => (b.updatedAtMs || 0) - (a.updatedAtMs || 0)));
        request.onerror = () => reject(request.error);
      });
    },
    async clearAll() {
      await transaction(IMAGE_STORE, 'readwrite', store => store.clear());
      await transaction(QUOTE_STORE, 'readwrite', store => store.clear());
    }
  };

  window.GeelyIDB = api;
})();
