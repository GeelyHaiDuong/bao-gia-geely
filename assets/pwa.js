(() => {
  const installButton = document.getElementById('pwa-install-button');
  const offlineBadge = document.getElementById('pwa-offline-badge');
  const updateBanner = document.getElementById('pwa-update-banner');
  const updateButton = document.getElementById('pwa-update-button');
  let deferredPrompt = null;
  let registration = null;

  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

  const updateNetworkBadge = () => {
    offlineBadge.hidden = navigator.onLine;
  };

  window.addEventListener('online', updateNetworkBadge);
  window.addEventListener('offline', updateNetworkBadge);
  updateNetworkBadge();

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    if (!isStandalone()) installButton.hidden = false;
  });

  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      installButton.hidden = true;
      return;
    }

    if (isIOS() && !isStandalone()) {
      alert('Trên iPhone: mở bằng Safari → bấm Chia sẻ → chọn “Thêm vào Màn hình chính”.');
    }
  });

  if (isIOS() && !isStandalone()) {
    installButton.hidden = false;
    installButton.textContent = 'Cài trên iPhone';
  }

  window.addEventListener('appinstalled', () => {
    installButton.hidden = true;
  });

  const showUpdate = worker => {
    updateBanner.hidden = false;
    updateButton.onclick = () => worker.postMessage('SKIP_WAITING');
  };

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./service-worker.js').then(reg => {
      registration = reg;
      if (reg.waiting) showUpdate(reg.waiting);

      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate(worker);
        });
      });
    }).catch(error => console.warn('Không thể đăng ký PWA:', error));

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      location.reload();
    });
  }
})();
