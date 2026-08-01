(() => {
  'use strict';

  const FIREBASE_VERSION = '12.16.0';
  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCPzPGpWp6ZBueswWZnHT1eFoaZSZJV9rw',
    authDomain: 'bao-gia-geely-hai-duong.firebaseapp.com',
    projectId: 'bao-gia-geely-hai-duong',
    storageBucket: 'bao-gia-geely-hai-duong.firebasestorage.app',
    messagingSenderId: '798973505142',
    appId: '1:798973505142:web:3dda21741a8ed430373957'
  };

  const SDK_URLS = [
    `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app-compat.js`,
    `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth-compat.js`,
    `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore-compat.js`
  ];

  const listeners = new Set();
  const state = {
    sdk: 'loading', user: null, online: navigator.onLine,
    persistence: 'unknown', message: 'Đang tải dịch vụ đồng bộ...', error: null
  };
  let auth = null;
  let db = null;
  let initPromise = null;

  const publicUser = user => user ? {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || ''
  } : null;

  const emit = () => {
    const snapshot = { ...state };
    listeners.forEach(listener => { try { listener(snapshot); } catch (error) {} });
    window.dispatchEvent(new CustomEvent('geely-firebase-state', { detail: snapshot }));
  };
  const setState = patch => { Object.assign(state, patch); emit(); };

  const loadScript = src => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-firebase-sdk="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', () => reject(new Error(`Không tải được ${src}`)), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.firebaseSdk = src;
    script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
    script.onerror = () => reject(new Error(`Không tải được ${src}`));
    document.head.appendChild(script);
  });

  const initialize = async () => {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      try {
        for (const url of SDK_URLS) await loadScript(url);
        if (!window.firebase) throw new Error('Firebase SDK chưa sẵn sàng.');
        const app = window.firebase.apps?.length ? window.firebase.app() : window.firebase.initializeApp(FIREBASE_CONFIG);
        auth = app.auth();
        db = app.firestore();
        await auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL);
        try {
          await db.enablePersistence({ synchronizeTabs: true });
          state.persistence = 'enabled';
        } catch (error) {
          state.persistence = error?.code === 'failed-precondition' ? 'another-tab' : 'unsupported';
        }
        auth.onAuthStateChanged(user => setState({
          user: publicUser(user), message: user ? 'Đã đăng nhập Firebase.' : 'Chưa đăng nhập.', error: null
        }));
        setState({ sdk: 'ready', message: 'Firebase đã sẵn sàng.', error: null });
        return true;
      } catch (error) {
        initPromise = null;
        setState({ sdk: 'error', message: 'Không tải được Firebase. Ứng dụng vẫn dùng được ngoại tuyến.', error: error?.message || String(error) });
        throw error;
      }
    })();
    return initPromise;
  };

  const requireUser = async () => {
    await initialize();
    const user = auth?.currentUser;
    if (!user) throw new Error('Bạn cần đăng nhập Google trước.');
    return { user, db };
  };

  const serverMeta = user => ({
    updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
    updatedAtMs: Date.now(),
    updatedBy: { uid: user.uid, email: user.email || '', device: navigator.userAgent.slice(0, 180) }
  });

  const normalizeSnapshot = snapshot => ({
    exists: snapshot.exists,
    id: snapshot.id,
    data: snapshot.exists ? snapshot.data() : null,
    fromCache: snapshot.metadata.fromCache,
    hasPendingWrites: snapshot.metadata.hasPendingWrites
  });

  const getWorkspaceRefs = (firestore, uid) => ({
    settings: firestore.doc(`users/${uid}/settings/main`),
    cars: firestore.collection(`users/${uid}/cars`),
    promotions: firestore.collection(`users/${uid}/promotions`),
    quotations: firestore.collection(`users/${uid}/quotations`),
    legacy: firestore.doc(`users/${uid}/appData/current`)
  });

  const api = {
    version: '2.0.0',
    ready: initialize,
    retry: initialize,
    getState: () => ({ ...state }),
    onStateChange(callback) { listeners.add(callback); callback({ ...state }); return () => listeners.delete(callback); },
    onAuthStateChanged(callback) {
      let unsubscribe = () => {};
      initialize().then(() => { unsubscribe = auth.onAuthStateChanged(user => callback(publicUser(user))); }).catch(() => callback(null));
      return () => unsubscribe();
    },
    async signInGoogle() {
      await initialize();
      const provider = new window.firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await auth.signInWithPopup(provider);
      return publicUser(result.user);
    },
    async signOut() { await initialize(); await auth.signOut(); },

    async getWorkspace() {
      const { user, db: firestore } = await requireUser();
      const refs = getWorkspaceRefs(firestore, user.uid);
      const [settingsSnap, carsSnap, promosSnap, quotesSnap, legacySnap] = await Promise.all([
        refs.settings.get(), refs.cars.get(), refs.promotions.get(), refs.quotations.orderBy('updatedAtMs', 'desc').limit(300).get(), refs.legacy.get()
      ]);
      return {
        settings: settingsSnap.exists ? settingsSnap.data() : null,
        cars: carsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        promotions: promosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        quotations: quotesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        legacy: legacySnap.exists ? legacySnap.data()?.data || null : null,
        empty: !settingsSnap.exists && carsSnap.empty && promosSnap.empty && quotesSnap.empty && !legacySnap.exists
      };
    },

    async bootstrapWorkspace({ settings, cars, promotions, quotations = [] }) {
      const { user, db: firestore } = await requireUser();
      const refs = getWorkspaceRefs(firestore, user.uid);
      const batch = firestore.batch();
      batch.set(refs.settings, { ...settings, ...serverMeta(user), schemaVersion: 4 }, { merge: true });
      (cars || []).forEach(car => batch.set(refs.cars.doc(String(car.id)), { ...car, id: String(car.id), ...serverMeta(user) }, { merge: true }));
      (promotions || []).forEach(promo => batch.set(refs.promotions.doc(String(promo.id)), { ...promo, id: String(promo.id), ...serverMeta(user) }, { merge: true }));
      (quotations || []).forEach(quote => batch.set(refs.quotations.doc(String(quote.id)), { ...quote, id: String(quote.id), ...serverMeta(user) }, { merge: true }));
      await batch.commit();
      return { updatedAtMs: Date.now() };
    },

    async saveSettings(settings) {
      const { user, db: firestore } = await requireUser();
      const ref = getWorkspaceRefs(firestore, user.uid).settings;
      await ref.set({ ...settings, ...serverMeta(user), schemaVersion: 4 }, { merge: true });
      return { updatedAtMs: Date.now() };
    },
    async saveCar(car) {
      const { user, db: firestore } = await requireUser();
      const ref = getWorkspaceRefs(firestore, user.uid).cars.doc(String(car.id));
      const clean = { ...car }; delete clean.image; delete clean.localImage;
      await ref.set({ ...clean, id: String(car.id), ...serverMeta(user) }, { merge: true });
      return { updatedAtMs: Date.now() };
    },
    async deleteCar(id) {
      const { user, db: firestore } = await requireUser();
      await getWorkspaceRefs(firestore, user.uid).cars.doc(String(id)).delete();
    },
    async savePromotion(promo) {
      const { user, db: firestore } = await requireUser();
      await getWorkspaceRefs(firestore, user.uid).promotions.doc(String(promo.id)).set({ ...promo, id: String(promo.id), ...serverMeta(user) }, { merge: true });
      return { updatedAtMs: Date.now() };
    },
    async deletePromotion(id) {
      const { user, db: firestore } = await requireUser();
      await getWorkspaceRefs(firestore, user.uid).promotions.doc(String(id)).delete();
    },
    async saveQuotation(quotation) {
      const { user, db: firestore } = await requireUser();
      await getWorkspaceRefs(firestore, user.uid).quotations.doc(String(quotation.id)).set({ ...quotation, id: String(quotation.id), ...serverMeta(user) }, { merge: true });
      return { updatedAtMs: Date.now() };
    },
    async deleteQuotation(id) {
      const { user, db: firestore } = await requireUser();
      await getWorkspaceRefs(firestore, user.uid).quotations.doc(String(id)).delete();
    },

    async watchWorkspace(callback, onError) {
      const { user, db: firestore } = await requireUser();
      const refs = getWorkspaceRefs(firestore, user.uid);
      const emitCollection = (type, snapshot) => callback({
        type,
        items: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        fromCache: snapshot.metadata.fromCache,
        hasPendingWrites: snapshot.metadata.hasPendingWrites
      });
      const unsubscribers = [
        refs.settings.onSnapshot({ includeMetadataChanges: true }, snap => callback({ type: 'settings', ...normalizeSnapshot(snap) }), onError),
        refs.cars.onSnapshot({ includeMetadataChanges: true }, snap => emitCollection('cars', snap), onError),
        refs.promotions.onSnapshot({ includeMetadataChanges: true }, snap => emitCollection('promotions', snap), onError),
        refs.quotations.orderBy('updatedAtMs', 'desc').limit(300).onSnapshot({ includeMetadataChanges: true }, snap => emitCollection('quotations', snap), onError)
      ];
      return () => unsubscribers.forEach(unsubscribe => unsubscribe?.());
    }
  };

  window.addEventListener('online', () => setState({ online: true }));
  window.addEventListener('offline', () => setState({ online: false }));
  window.GeelyFirebaseSync = api;
  emit();
  initialize().catch(() => {});
})();
