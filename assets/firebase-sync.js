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
    sdk: 'loading',
    user: null,
    online: navigator.onLine,
    persistence: 'unknown',
    message: 'Đang tải dịch vụ đồng bộ...',
    error: null
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
    listeners.forEach(listener => {
      try { listener(snapshot); } catch (error) { console.warn('Lỗi listener Firebase:', error); }
    });
    window.dispatchEvent(new CustomEvent('geely-firebase-state', { detail: snapshot }));
  };

  const setState = patch => {
    Object.assign(state, patch);
    emit();
  };

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
    script.defer = true;
    script.dataset.firebaseSdk = src;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', () => reject(new Error(`Không tải được ${src}`)), { once: true });
    document.head.appendChild(script);
  });

  const initialize = async () => {
    if (initPromise) return initPromise;

    initPromise = (async () => {
      try {
        for (const url of SDK_URLS) await loadScript(url);

        if (!window.firebase) throw new Error('Firebase SDK chưa sẵn sàng.');

        const app = window.firebase.apps?.length
          ? window.firebase.app()
          : window.firebase.initializeApp(FIREBASE_CONFIG);

        auth = app.auth();
        db = app.firestore();

        await auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL);

        try {
          await db.enablePersistence({ synchronizeTabs: true });
          state.persistence = 'enabled';
        } catch (error) {
          state.persistence = error?.code === 'failed-precondition' ? 'another-tab' : 'unsupported';
          console.warn('Không thể bật bộ nhớ Firestore ngoại tuyến:', error);
        }

        auth.onAuthStateChanged(user => {
          setState({
            user: publicUser(user),
            message: user ? 'Đã đăng nhập Firebase.' : 'Chưa đăng nhập.',
            error: null
          });
        });

        setState({ sdk: 'ready', message: 'Firebase đã sẵn sàng.', error: null });
        return true;
      } catch (error) {
        console.error('Không thể khởi tạo Firebase:', error);
        initPromise = null;
        setState({
          sdk: 'error',
          message: 'Không tải được Firebase. Ứng dụng vẫn dùng được ngoại tuyến.',
          error: error?.message || String(error)
        });
        throw error;
      }
    })();

    return initPromise;
  };

  const requireReady = async () => {
    await initialize();
    if (!auth || !db) throw new Error('Firebase chưa sẵn sàng.');
    return { auth, db };
  };

  const requireUser = async () => {
    const services = await requireReady();
    const user = services.auth.currentUser;
    if (!user) throw new Error('Bạn cần đăng nhập Google trước.');
    return { ...services, user };
  };

  const getDocumentRef = async () => {
    const { db: firestore, user } = await requireUser();
    return firestore.doc(`users/${user.uid}/appData/current`);
  };

  const api = {
    version: '1.7.0',
    config: { projectId: FIREBASE_CONFIG.projectId },
    ready: () => initialize(),
    retry: () => initialize(),
    getState: () => ({ ...state }),
    onStateChange(callback) {
      listeners.add(callback);
      callback({ ...state });
      return () => listeners.delete(callback);
    },
    onAuthStateChanged(callback) {
      let unsubscribe = () => {};
      initialize()
        .then(() => { unsubscribe = auth.onAuthStateChanged(user => callback(publicUser(user))); })
        .catch(() => callback(null));
      return () => unsubscribe();
    },
    async signInGoogle() {
      const { auth: firebaseAuth } = await requireReady();
      const provider = new window.firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await firebaseAuth.signInWithPopup(provider);
      return publicUser(result.user);
    },
    async signOut() {
      const { auth: firebaseAuth } = await requireReady();
      await firebaseAuth.signOut();
    },
    async getCloudData() {
      const ref = await getDocumentRef();
      const snapshot = await ref.get();
      return {
        exists: snapshot.exists,
        data: snapshot.exists ? snapshot.data() : null,
        fromCache: snapshot.metadata.fromCache
      };
    },
    async saveCloudData(payload) {
      const { user } = await requireUser();
      const ref = await getDocumentRef();
      const updatedAtMs = Date.now();
      await ref.set({
        schemaVersion: 1,
        data: payload,
        updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
        updatedAtMs,
        updatedBy: {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          device: navigator.userAgent.slice(0, 240)
        }
      });
      return { updatedAtMs };
    },
    async watchCloudData(callback, onError) {
      const ref = await getDocumentRef();
      return ref.onSnapshot({ includeMetadataChanges: true }, snapshot => {
        callback({
          exists: snapshot.exists,
          data: snapshot.exists ? snapshot.data() : null,
          fromCache: snapshot.metadata.fromCache,
          hasPendingWrites: snapshot.metadata.hasPendingWrites
        });
      }, error => {
        console.error('Lỗi theo dõi dữ liệu Firebase:', error);
        if (onError) onError(error);
      });
    }
  };

  window.addEventListener('online', () => setState({ online: true }));
  window.addEventListener('offline', () => setState({ online: false }));

  window.GeelyFirebaseSync = api;
  emit();
  initialize().catch(() => {});
})();
