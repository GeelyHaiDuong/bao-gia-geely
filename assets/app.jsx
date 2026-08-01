// @ts-nocheck
const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useMemo, useEffect, useRef } = React;

        const ENGINE_TYPES = {
          gasoline: 'Xăng',
          hybrid: 'Hybrid',
          phev: 'PHEV',
          ev: 'Thuần điện'
        };

        const CAR_COLOR_LIBRARY = {
          ex2: [
            { id: 'aurora-green', name: 'Xanh Bạc Hà', imagePath: './assets/cars/Ex2/ex2-aurora-green.png' },
            { id: 'beige', name: 'Kem Vani', imagePath: './assets/cars/Ex2/ex2-beige.png' },
            { id: 'commet-grey', name: 'Xám Than Tre', imagePath: './assets/cars/Ex2/ex2-commet-grey.png' },
            { id: 'moon-white', name: 'Trắng Sữa', imagePath: './assets/cars/Ex2/ex2-moon-white.png' },
            { id: 'star-silver', name: 'Bạc Ánh Sao', imagePath: './assets/cars/Ex2/ex2-star-silver.png' }
          ],
          ex5: [
            { id: 'black', name: 'Đen', imagePath: './assets/cars/EX5/ex5-black.png' },
            { id: 'green', name: 'Xanh Lá', imagePath: './assets/cars/EX5/ex5-green.png' },
            { id: 'grey', name: 'Xám', imagePath: './assets/cars/EX5/ex5-grey.png' },
            { id: 'silver', name: 'Bạc', imagePath: './assets/cars/EX5/ex5-silver.png' },
            { id: 'white', name: 'Trắng', imagePath: './assets/cars/EX5/ex5-white.png' }
          ],
          ex5_emi: [
            { id: 'black', name: 'Đen', imagePath: './assets/cars/EX5 EMi/ex5-black.png' },
            { id: 'blue', name: 'Xanh Dương', imagePath: './assets/cars/EX5 EMi/ex5-blue.png' },
            { id: 'green', name: 'Xanh Lá', imagePath: './assets/cars/EX5 EMi/ex5-green.png' },
            { id: 'grey', name: 'Xám', imagePath: './assets/cars/EX5 EMi/ex5-grey.png' },
            { id: 'silver', name: 'Bạc', imagePath: './assets/cars/EX5 EMi/ex5-silver.png' },
            { id: 'white', name: 'Trắng', imagePath: './assets/cars/EX5 EMi/ex5-white.png' }
          ],
          coolray: [
            { id: 'green', name: 'Xanh', imagePath: './assets/cars/Coolray/coolray-new-green.png' },
            { id: 'black', name: 'Đen', imagePath: './assets/cars/Coolray/den.png' },
            { id: 'red', name: 'Đỏ', imagePath: './assets/cars/Coolray/do.png' },
            { id: 'white', name: 'Trắng', imagePath: './assets/cars/Coolray/trang.png' },
            { id: 'grey', name: 'Xám', imagePath: './assets/cars/Coolray/xam.png' }
          ],
          monjaro: [
            { id: 'black', name: 'Đen', imagePath: './assets/cars/Monjaro/monjaro-black.png' },
            { id: 'blue', name: 'Xanh Dương', imagePath: './assets/cars/Monjaro/monjaro-blue.png' },
            { id: 'grey', name: 'Xám', imagePath: './assets/cars/Monjaro/monjaro-grey.png' },
            { id: 'silver', name: 'Bạc', imagePath: './assets/cars/Monjaro/monjaro-sliver.png' },
            { id: 'white', name: 'Trắng', imagePath: './assets/cars/Monjaro/monjaro-white.png' },
            { id: 'xam-lomo', name: 'Xám Lomo', imagePath: './assets/cars/Monjaro/monjaro-xam-lomo.png' },
            { id: 'green', name: 'Xanh Lá', imagePath: './assets/cars/Monjaro/monjaro-xanh-la.png' }
          ],
          okavango: [
            { id: 'black', name: 'Đen', imagePath: './assets/cars/Okavango/CHernyy.png' },
            { id: 'crystal-white', name: 'Trắng Pha Lê', imagePath: './assets/cars/Okavango/Kristalno_belyy.png' }
          ]
        };

        const cloneColorSet = key => (CAR_COLOR_LIBRARY[key] || []).map(color => ({ ...color }));

        const DEFAULT_CAR_MODELS = [
          { id: 'ex2_pro', name: 'Geely EX2 Pro', price: 459000000, seats: 5, engineType: 'ev', colorGroup: 'ex2', defaultColorId: 'moon-white', colors: cloneColorSet('ex2'), imagePath: './assets/cars/Ex2/ex2-moon-white.png' },
          { id: 'ex2_max', name: 'Geely EX2 Max', price: 499000000, seats: 5, engineType: 'ev', colorGroup: 'ex2', defaultColorId: 'moon-white', colors: cloneColorSet('ex2'), imagePath: './assets/cars/Ex2/ex2-moon-white.png' },
          { id: 'ex5_pro', name: 'Geely EX5 Pro', price: 839000000, seats: 5, engineType: 'ev', colorGroup: 'ex5', defaultColorId: 'white', colors: cloneColorSet('ex5'), imagePath: './assets/cars/EX5/ex5-white.png' },
          { id: 'ex5_max', name: 'Geely EX5 Max', price: 889000000, seats: 5, engineType: 'ev', colorGroup: 'ex5', defaultColorId: 'white', colors: cloneColorSet('ex5'), imagePath: './assets/cars/EX5/ex5-white.png' },
          { id: 'ex5_emi_pro', name: 'Geely EX5 EM-i Pro', price: 789000000, seats: 5, engineType: 'phev', colorGroup: 'ex5_emi', defaultColorId: 'white', colors: cloneColorSet('ex5_emi'), imagePath: './assets/cars/EX5 EMi/ex5-white.png' },
          { id: 'ex5_emi_max', name: 'Geely EX5 EM-i Max', price: 909000000, seats: 5, engineType: 'phev', colorGroup: 'ex5_emi', defaultColorId: 'white', colors: cloneColorSet('ex5_emi'), imagePath: './assets/cars/EX5 EMi/ex5-white.png' },
          { id: 'monjaro_premium', name: 'Geely Monjaro Premium', price: 1149000000, seats: 5, engineType: 'gasoline', colorGroup: 'monjaro', defaultColorId: 'white', colors: cloneColorSet('monjaro'), imagePath: './assets/cars/Monjaro/monjaro-white.png' },
          { id: 'monjaro_flagship', name: 'Geely Monjaro Flagship', price: 1199000000, seats: 5, engineType: 'gasoline', colorGroup: 'monjaro', defaultColorId: 'white', colors: cloneColorSet('monjaro'), imagePath: './assets/cars/Monjaro/monjaro-white.png' },
          { id: 'coolray_exec_26', name: 'Geely Coolray New 2026 Executive', price: 499000000, seats: 5, engineType: 'gasoline', colorGroup: 'coolray', defaultColorId: 'white', colors: cloneColorSet('coolray'), imagePath: './assets/cars/Coolray/trang.png' },
          { id: 'coolray_prem_26', name: 'Geely Coolray New 2026 Premium', price: 549000000, seats: 5, engineType: 'gasoline', colorGroup: 'coolray', defaultColorId: 'white', colors: cloneColorSet('coolray'), imagePath: './assets/cars/Coolray/trang.png' },
          { id: 'coolray_flag_26', name: 'Geely Coolray New 2026 Flagship', price: 599000000, seats: 5, engineType: 'gasoline', colorGroup: 'coolray', defaultColorId: 'white', colors: cloneColorSet('coolray'), imagePath: './assets/cars/Coolray/trang.png' },
          { id: 'okavango_exec', name: 'Geely Okavango Executive', price: 739000000, seats: 7, engineType: 'hybrid', colorGroup: 'okavango', defaultColorId: 'crystal-white', colors: cloneColorSet('okavango'), imagePath: './assets/cars/Okavango/Kristalno_belyy.png' },
          { id: 'okavango_prem', name: 'Geely Okavango Premium', price: 799000000, seats: 7, engineType: 'hybrid', colorGroup: 'okavango', defaultColorId: 'crystal-white', colors: cloneColorSet('okavango'), imagePath: './assets/cars/Okavango/Kristalno_belyy.png' },
        ];

        const DEFAULT_PROMOTIONS = [
          { id: 'p1', name: '01 sạc cầm tay', value: 0, type: 'gift', deductFromPrice: false },
          { id: 'p2', name: '01 gói cứu hộ miễn phí 5 năm', value: 0, type: 'service', deductFromPrice: false },
          { id: 'p3', name: '01 gói bảo dưỡng miễn phí 5 năm', value: 0, type: 'maintenance', deductFromPrice: false },
          { id: 'p4', name: '10 triệu tiền mặt', value: 10000000, type: 'cash', deductFromPrice: true },
          { id: 'p5', name: '06 năm bảo dưỡng miễn phí', value: 0, type: 'maintenance', deductFromPrice: false },
          { id: 'p6', name: '01 năm bảo hiểm thân vỏ', value: 0, type: 'insurance', deductFromPrice: false },
          { id: 'p7', name: '06 năm cứu hộ miễn phí', value: 0, type: 'service', deductFromPrice: false },
          { id: 'p8', name: '01 bộ thảm sàn chính hãng', value: 0, type: 'accessory', deductFromPrice: false },
          { id: 'p9', name: '01 bộ sạc 7 kW', value: 5000000, type: 'gift', deductFromPrice: false },
        ];

        const DEFAULT_REGISTRATION_FEES = {
          effectiveDate: '2026-08-01',
          inspectionFee: 340000,
          roadFeeMonthlyWhite: 130000,
          roadFeeMonthlyYellow: 180000,
          civilInsurance5Seats: 480700,
          civilInsurance7Seats: 873400,
          locations: [
            { id: 'HN', name: 'Hà Nội', plateFee: 14000000, effectiveDate: '2026-08-01', taxRates: { gasoline: 0.12, hybrid: 0.12, phev: 0.12, ev: 0 } },
            { id: 'HCM', name: 'TP. Hồ Chí Minh', plateFee: 20000000, effectiveDate: '2026-08-01', taxRates: { gasoline: 0.10, hybrid: 0.10, phev: 0.10, ev: 0 } },
            { id: 'TINH_12', name: 'Tỉnh/Thành áp dụng 12%', plateFee: 1000000, effectiveDate: '2026-08-01', taxRates: { gasoline: 0.12, hybrid: 0.12, phev: 0.12, ev: 0 } },
            { id: 'TINH_10', name: 'Tỉnh/Thành áp dụng 10%', plateFee: 1000000, effectiveDate: '2026-08-01', taxRates: { gasoline: 0.10, hybrid: 0.10, phev: 0.10, ev: 0 } },
          ]
        };

        const normalizeTaxRates = rates => Object.fromEntries(Object.keys(ENGINE_TYPES).map(type => [
          type,
          Math.max(0, Number(rates?.[type]) || 0)
        ]));

        const normalizeRegistrationLocation = location => ({
          id: String(location?.id || `area_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),
          name: String(location?.name || 'Khu vực mới'),
          plateFee: parseMoney(location?.plateFee),
          effectiveDate: String(location?.effectiveDate || DEFAULT_REGISTRATION_FEES.effectiveDate),
          taxRates: normalizeTaxRates(location?.taxRates)
        });

        const normalizeRegistrationFees = data => {
          const source = data && typeof data === 'object' ? data : {};
          const locations = Array.isArray(source.locations) && source.locations.length
            ? source.locations.map(normalizeRegistrationLocation)
            : DEFAULT_REGISTRATION_FEES.locations.map(normalizeRegistrationLocation);
          return {
            effectiveDate: String(source.effectiveDate || DEFAULT_REGISTRATION_FEES.effectiveDate),
            inspectionFee: parseMoney(source.inspectionFee ?? DEFAULT_REGISTRATION_FEES.inspectionFee),
            roadFeeMonthlyWhite: parseMoney(source.roadFeeMonthlyWhite ?? DEFAULT_REGISTRATION_FEES.roadFeeMonthlyWhite),
            roadFeeMonthlyYellow: parseMoney(source.roadFeeMonthlyYellow ?? DEFAULT_REGISTRATION_FEES.roadFeeMonthlyYellow),
            civilInsurance5Seats: parseMoney(source.civilInsurance5Seats ?? DEFAULT_REGISTRATION_FEES.civilInsurance5Seats),
            civilInsurance7Seats: parseMoney(source.civilInsurance7Seats ?? DEFAULT_REGISTRATION_FEES.civilInsurance7Seats),
            locations
          };
        };

        const PROMOTION_TYPES = {
          cash: 'Giảm tiền mặt', registration: 'Hỗ trợ trước bạ', gift: 'Quà tặng',
          accessory: 'Phụ kiện', insurance: 'Bảo hiểm', maintenance: 'Bảo dưỡng', service: 'Dịch vụ'
        };
        const DEFAULT_CAR_IMAGE_PATHS = Object.fromEntries(DEFAULT_CAR_MODELS.map(item => [item.id, item.imagePath]));
        const DEFAULT_CAR_ENGINE_TYPES = Object.fromEntries(DEFAULT_CAR_MODELS.map(item => [item.id, item.engineType]));
        const DEFAULT_CAR_COLOR_GROUPS = Object.fromEntries(DEFAULT_CAR_MODELS.map(item => [item.id, item.colorGroup || '']));
        const DEFAULT_CAR_DEFAULT_COLORS = Object.fromEntries(DEFAULT_CAR_MODELS.map(item => [item.id, item.defaultColorId || '']));
        const DEFAULT_CAR_COLORS = Object.fromEntries(DEFAULT_CAR_MODELS.map(item => [item.id, item.colors || []]));
        const DEFAULT_PROMOTION_META = Object.fromEntries(DEFAULT_PROMOTIONS.map(item => [item.id, {
          type: item.type, deductFromPrice: item.deductFromPrice
        }]));

        const slugifyColorId = (value, fallback = 'color') => {
          const normalized = String(value || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
            .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          return normalized || fallback;
        };

        const normalizeCarColor = (color, index = 0) => ({
          id: String(color?.id || slugifyColorId(color?.name, `color-${index + 1}`)),
          name: String(color?.name || `Màu ${index + 1}`),
          imagePath: String(color?.imagePath || '')
        });

        const normalizeCar = car => {
          const id = String(car?.id || `car_${Date.now()}`);
          const engineType = String(car?.engineType || DEFAULT_CAR_ENGINE_TYPES[id] || 'gasoline');
          const fallbackColors = (DEFAULT_CAR_COLORS[id] || []).map(normalizeCarColor);
          const providedColors = Array.isArray(car?.colors) && car.colors.length
            ? car.colors.map(normalizeCarColor)
            : fallbackColors;
          const uniqueColors = providedColors.filter((color, index, list) => list.findIndex(item => item.id === color.id) === index);
          const requestedDefault = String(car?.defaultColorId || DEFAULT_CAR_DEFAULT_COLORS[id] || '');
          const defaultColorId = uniqueColors.some(color => color.id === requestedDefault)
            ? requestedDefault
            : (uniqueColors[0]?.id || '');
          const defaultColorImage = uniqueColors.find(color => color.id === defaultColorId)?.imagePath || '';
          return {
            id,
            name: String(car?.name || ''),
            price: Number(car?.price) || 0,
            seats: Number(car?.seats) || 5,
            engineType: ENGINE_TYPES[engineType] ? engineType : 'gasoline',
            colorGroup: String(car?.colorGroup || DEFAULT_CAR_COLOR_GROUPS[id] || ''),
            colors: uniqueColors,
            defaultColorId,
            imagePath: String(car?.imagePath || defaultColorImage || DEFAULT_CAR_IMAGE_PATHS[id] || ''),
            image: String(car?.image || '')
          };
        };
        const normalizePromotion = promo => {
          const id = String(promo?.id || `promo_${Date.now()}`);
          const defaultMeta = DEFAULT_PROMOTION_META[id];
          const fallbackDeduct = defaultMeta ? defaultMeta.deductFromPrice : ((Number(promo?.value) || 0) > 0);
          return {
            id,
            name: String(promo?.name || ''),
            value: Number(promo?.value) || 0,
            type: String(promo?.type || defaultMeta?.type || (fallbackDeduct ? 'cash' : 'gift')),
            deductFromPrice: promo?.deductFromPrice !== undefined ? Boolean(promo.deductFromPrice) : Boolean(fallbackDeduct)
          };
        };

        const createQuoteId = () => {
          const now = new Date();
          const date = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
          const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
          return `BG-HD-${date}-${suffix}`;
        };

        const getSavedData = (key, defaultData) => {
          try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : defaultData;
          } catch (error) {
            console.warn(`Không thể đọc dữ liệu ${key}:`, error);
            return defaultData;
          }
        };

        const saveData = (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
          } catch (error) {
            console.warn(`Không thể lưu dữ liệu ${key}:`, error);
            return false;
          }
        };

        const parseMoney = (value) => {
          const digits = String(value ?? '').replace(/\D/g, '');
          return digits ? Number(digits) : 0;
        };

        const formatNumber = (value) => {
          return new Intl.NumberFormat('vi-VN').format(parseMoney(value));
        };

        const formatVND = (amount) => {
          const numericAmount = Number(amount);
          const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(safeAmount);
        };


        const EXPORT_PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <rect width="1200" height="800" fill="#f1f5f9"/>
    <path d="M215 505c18-73 68-123 148-145l85-23c38-71 99-108 184-108h115c88 0 159 44 211 132l76 26c48 17 78 54 78 99v41H1060c-10 70-69 124-142 124s-132-54-142-124H431c-10 70-69 124-142 124s-132-54-142-124H95v-31c0-55 42-99 120-111zm74 70a54 54 0 1 0 0-108 54 54 0 0 0 0 108zm629 0a54 54 0 1 0 0-108 54 54 0 0 0 0 108zM490 337h381c-36-45-78-67-126-67H633c-64 0-112 22-143 67z" fill="#cbd5e1"/>
    <text x="600" y="710" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#64748b">ẢNH XE KHÔNG HỖ TRỢ XUẤT TỪ LINK NGOÀI</text>
  </svg>
`);

const blobToDataURL = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể chuyển ảnh sang dữ liệu cục bộ.'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsDataURL(blob);
});

const waitForImageReady = async (image) => {
    if (!image) return;
    if (!image.complete) {
        await new Promise(resolve => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
        });
    }
    if (typeof image.decode === 'function') {
        try { await image.decode(); } catch (error) {}
    }
};

const prepareImagesForExport = async (element) => {
    const restoreItems = [];
    let usedPlaceholder = false;
    const images = Array.from(element.querySelectorAll('img'));

    for (const image of images) {
        const originalSrc = image.getAttribute('src') || '';
        const originalCrossOrigin = image.getAttribute('crossorigin');
        if (!originalSrc) continue;

        let absoluteUrl;
        try {
            absoluteUrl = new URL(originalSrc, window.location.href);
        } catch (error) {
            continue;
        }

        const isLocalData = ['data:', 'blob:'].includes(absoluteUrl.protocol);
        const isSameOrigin = absoluteUrl.origin === window.location.origin;

        if (isLocalData || isSameOrigin) {
            await waitForImageReady(image);
            continue;
        }

        restoreItems.push({ image, originalSrc, originalCrossOrigin });

        try {
            const response = await fetch(absoluteUrl.href, {
                mode: 'cors',
                credentials: 'omit',
                cache: 'no-store'
            });
            if (!response.ok || response.type === 'opaque') {
                throw new Error(`HTTP ${response.status || 'CORS'}`);
            }
            const blob = await response.blob();
            const localDataUrl = await blobToDataURL(blob);
            image.removeAttribute('crossorigin');
            image.src = localDataUrl;
            await waitForImageReady(image);
        } catch (error) {
            console.warn('Ảnh link ngoài không cho phép xuất canvas:', absoluteUrl.href, error);
            usedPlaceholder = true;
            image.removeAttribute('crossorigin');
            image.src = EXPORT_PLACEHOLDER_IMAGE;
            await waitForImageReady(image);
        }
    }

    return {
        usedPlaceholder,
        restore: () => {
            restoreItems.forEach(({ image, originalSrc, originalCrossOrigin }) => {
                image.src = originalSrc;
                if (originalCrossOrigin === null) image.removeAttribute('crossorigin');
                else image.setAttribute('crossorigin', originalCrossOrigin);
            });
        }
    };
};


const waitForExportCanvases = async (element, timeoutMs = 6000) => {
    const canvases = Array.from(element.querySelectorAll('canvas[data-export-canvas]'));
    await Promise.all(canvases.map(canvas => {
        if (canvas.dataset.exportState === 'ready') return Promise.resolve();
        return new Promise(resolve => {
            let finished = false;
            const complete = () => {
                if (finished) return;
                finished = true;
                clearTimeout(timer);
                canvas.removeEventListener('export-canvas-ready', complete);
                resolve();
            };
            const timer = window.setTimeout(complete, timeoutMs);
            canvas.addEventListener('export-canvas-ready', complete, { once: true });
        });
    }));
};

const canvasToJpegBlob = (canvas, quality = 0.92) => new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Trình duyệt không thể tạo tệp ảnh.'));
    }, 'image/jpeg', quality);
});

const safeFilePart = (value) => String(value || 'KhachHang')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'KhachHang';
const normalizePhoneForZalo = (phone) => {
          const digits = String(phone || '').replace(/\D/g, '');
          if (!digits) return '0961018288';
          if (digits.startsWith('84')) return `0${digits.slice(2)}`;
          return digits;
        };

        const QrCodeImage = ({ value, className = '' }) => {
          const [src, setSrc] = useState('');

          useEffect(() => {
            try {
              if (window.GeelyQR && value) {
                setSrc(window.GeelyQR.toDataURL(value, 256));
              } else {
                setSrc('');
              }
            } catch (error) {
              console.warn('Không thể tạo QR:', error);
              setSrc('');
            }
          }, [value]);

          if (!src) {
            return (
              <div className={`${className} bg-slate-100 text-slate-400 flex items-center justify-center text-[8px] font-bold text-center`}>
                QR ZALO
              </div>
            );
          }

          return <img src={src} alt="Zalo QR" className={className} />;
        };


        const CAR_CANVAS_WIDTH = 1400;
        const CAR_CANVAS_HEIGHT = 512;

        const getCarImageContentBounds = (image) => {
          const naturalWidth = image.naturalWidth || image.width || 1;
          const naturalHeight = image.naturalHeight || image.height || 1;
          const maxScanSide = 1000;
          const scanScale = Math.min(1, maxScanSide / Math.max(naturalWidth, naturalHeight));
          const scanWidth = Math.max(1, Math.round(naturalWidth * scanScale));
          const scanHeight = Math.max(1, Math.round(naturalHeight * scanScale));

          try {
            const scratch = document.createElement('canvas');
            scratch.width = scanWidth;
            scratch.height = scanHeight;
            const context = scratch.getContext('2d', { willReadFrequently: true });
            if (!context) throw new Error('Không tạo được canvas quét ảnh.');

            context.clearRect(0, 0, scanWidth, scanHeight);
            context.drawImage(image, 0, 0, scanWidth, scanHeight);
            const pixels = context.getImageData(0, 0, scanWidth, scanHeight).data;
            const step = Math.max(1, Math.floor(Math.max(scanWidth, scanHeight) / 700));

            let minX = scanWidth;
            let minY = scanHeight;
            let maxX = -1;
            let maxY = -1;
            let visiblePixels = 0;

            for (let y = 0; y < scanHeight; y += step) {
              for (let x = 0; x < scanWidth; x += step) {
                const index = (y * scanWidth + x) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3];
                const isTransparent = alpha < 18;
                const isNearWhite = red > 247 && green > 247 && blue > 247;

                if (!isTransparent && !isNearWhite) {
                  visiblePixels += 1;
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }

            if (visiblePixels < 20 || maxX <= minX || maxY <= minY) {
              return { sx: 0, sy: 0, sw: naturalWidth, sh: naturalHeight };
            }

            const marginX = Math.max(4, Math.round((maxX - minX) * 0.05));
            const marginY = Math.max(4, Math.round((maxY - minY) * 0.08));
            minX = Math.max(0, minX - marginX);
            minY = Math.max(0, minY - marginY);
            maxX = Math.min(scanWidth - 1, maxX + marginX);
            maxY = Math.min(scanHeight - 1, maxY + marginY);

            return {
              sx: minX / scanScale,
              sy: minY / scanScale,
              sw: Math.max(1, (maxX - minX + 1) / scanScale),
              sh: Math.max(1, (maxY - minY + 1) / scanScale)
            };
          } catch (error) {
            console.warn('Không thể tự căn viền ảnh xe, dùng toàn bộ ảnh:', error);
            return { sx: 0, sy: 0, sw: naturalWidth, sh: naturalHeight };
          }
        };

        const drawCarImageWithoutDistortion = (canvas, image) => {
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Trình duyệt không hỗ trợ canvas ảnh xe.');

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';

          const { sx, sy, sw, sh } = getCarImageContentBounds(image);
          const paddingX = 72;
          const paddingY = 34;
          const availableWidth = canvas.width - paddingX * 2;
          const availableHeight = canvas.height - paddingY * 2;
          const scale = Math.min(availableWidth / sw, availableHeight / sh);
          const drawWidth = Math.max(1, Math.round(sw * scale));
          const drawHeight = Math.max(1, Math.round(sh * scale));
          const drawX = Math.round((canvas.width - drawWidth) / 2);
          const drawY = Math.round((canvas.height - drawHeight) / 2);

          context.drawImage(image, sx, sy, sw, sh, drawX, drawY, drawWidth, drawHeight);
        };

        const CarImageCanvas = ({ src, alt = 'Ảnh xe' }) => {
          const canvasRef = useRef(null);

          useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return undefined;
            let cancelled = false;
            canvas.dataset.exportState = 'loading';

            const markReady = () => {
              if (cancelled) return;
              canvas.dataset.exportState = 'ready';
              canvas.dispatchEvent(new Event('export-canvas-ready'));
            };

            const drawFallback = () => {
              const context = canvas.getContext('2d');
              if (context) {
                context.fillStyle = '#f1f5f9';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = '#cbd5e1';
                context.font = '700 32px Arial, sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('CHƯA CÓ ẢNH XE', canvas.width / 2, canvas.height / 2);
              }
              markReady();
            };

            if (!src) {
              drawFallback();
              return () => { cancelled = true; };
            }

            const image = new Image();
            if (/^https?:/i.test(src)) image.crossOrigin = 'anonymous';
            image.onload = () => {
              if (cancelled) return;
              try {
                drawCarImageWithoutDistortion(canvas, image);
              } catch (error) {
                console.error('Không thể căn ảnh xe:', error);
                drawFallback();
                return;
              }
              markReady();
            };
            image.onerror = () => {
              console.warn('Không thể tải ảnh xe vào canvas xuất báo giá.');
              drawFallback();
            };
            image.src = src;

            return () => { cancelled = true; };
          }, [src]);

          return (
            <canvas
              ref={canvasRef}
              width={CAR_CANVAS_WIDTH}
              height={CAR_CANVAS_HEIGHT}
              data-export-canvas="car-image"
              aria-label={alt}
              role="img"
              className="block w-full h-full"
              style={{ width: '100%', height: '100%' }}
            />
          );
        };

        const GeelyLogo = ({ className = "w-24 h-auto", color = "currentColor" }) => (
          <svg viewBox="0 0 200 100" className={className} xmlns="http://www.w3.org/2000/svg" fill={color}>
            <path d="M 12 18 Q 40 12 68 12 L 68 28 L 8 28 Q 8 22 12 18 Z" />
            <path d="M 71 12 Q 100 10 129 12 L 129 28 L 71 28 Z" />
            <path d="M 132 12 Q 160 12 188 18 Q 192 22 192 28 L 132 28 Z" />
            <path d="M 9 31 L 68 31 L 68 54 Q 40 48 18 39 Q 10 36 9 31 Z" />
            <path d="M 71 31 L 129 31 L 129 55 Q 100 62 71 55 Z" />
            <path d="M 132 31 L 191 31 Q 190 36 182 39 Q 160 48 132 54 Z" />
            <text x="100" y="88" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="900" letterSpacing="6" textAnchor="middle">GEELY</text>
          </svg>
        );

        const CarSilhouette = ({ className }) => (
          <svg className={className} viewBox="0 0 240 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M222.5 45.3C218.8 41.5 197.4 32.8 178.6 30.2C159.8 27.6 132.5 24 105 24C78.4 24 63.8 29.5 56.5 35.8C52 39.7 41.2 46.1 30.5 48.2C16 51 5 57 5 65C5 67 6.5 69.5 10 70.8V75C10 83.3 16.7 90 25 90C33.3 90 40 83.3 40 75C40 73.2 39.7 71.5 39 70H181C180.3 71.5 180 73.2 180 75C180 83.3 186.7 90 195 90C203.3 90 210 83.3 210 75C210 71.2 208.6 67.8 206.3 65.2C216.5 64 235 60.5 235 52C235 48.5 228 47 222.5 45.3ZM25 80C22.2 80 20 77.8 20 75C20 72.2 22.2 70 25 70C27.8 70 30 72.2 30 75C30 77.8 27.8 80 25 80ZM195 80C192.2 80 190 77.8 190 75C190 72.2 192.2 70 195 70C197.8 70 200 72.2 200 75C200 77.8 197.8 80 195 80ZM183.4 46.2C172.5 44 145 42 120 42C95 42 74.8 44 65.5 46.2C64.6 46.4 63 46 64.2 44.5C70.5 36.8 92.5 33 120 33C148 33 168.2 38.5 174.5 42.5C175.7 43.3 175.5 45 174 45.8L183.4 46.2Z" />
          </svg>
        );


        const buildCloudPayload = ({ cars, promotions, salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees }) => ({
          cars: (Array.isArray(cars) ? cars : []).map(car => ({
            id: String(car.id || `car_${Date.now()}`),
            name: String(car.name || ''),
            price: parseMoney(car.price),
            seats: Number(car.seats) || 5,
            engineType: ENGINE_TYPES[car.engineType] ? car.engineType : 'gasoline'
          })),
          promotions: (Array.isArray(promotions) ? promotions : []).map(promo => ({
            id: String(promo.id || `promo_${Date.now()}`),
            name: String(promo.name || ''),
            value: parseMoney(promo.value)
          })),
          salesInfo: {
            name: String(salesInfo?.name || ''),
            phone: String(salesInfo?.phone || '')
          },
          serviceFeeAmount: parseMoney(serviceFeeAmount),
          physicalInsuranceRate: Number(physicalInsuranceRate) || 0,
          registrationFees: normalizeRegistrationFees(registrationFees)
        });

        const serializeCloudPayload = payload => JSON.stringify(payload || {});

        const formatSyncTime = value => {
          if (!value) return '';
          try {
            return new Date(Number(value)).toLocaleString('vi-VN');
          } catch (error) {
            return '';
          }
        };

        function GeelyQuotationApp() {
          const [cars, setCars] = useState(() => (getSavedData('geely_cars_v8', DEFAULT_CAR_MODELS) || []).map(normalizeCar));
          const [promotions, setPromotions] = useState(() => (getSavedData('geely_promotions_v2', DEFAULT_PROMOTIONS) || []).map(normalizePromotion));
          const [salesInfo, setSalesInfo] = useState(() => getSavedData('geely_sales_info', { name: '', phone: '' }));
          const [serviceFeeAmount, setServiceFeeAmount] = useState(() => parseMoney(getSavedData('geely_service_fee', 2500000))); 
          const [physicalInsuranceRate, setPhysicalInsuranceRate] = useState(() => Number(getSavedData('geely_phys_ins_rate', 1.2)) || 0);
          const [registrationFees, setRegistrationFees] = useState(() => normalizeRegistrationFees(getSavedData('geely_registration_fees_v1', DEFAULT_REGISTRATION_FEES)));

          const [carImageMap, setCarImageMap] = useState({});
          const [quotations, setQuotations] = useState([]);
          const [currentQuoteId, setCurrentQuoteId] = useState(() => createQuoteId());
          const [quoteStatus, setQuoteStatus] = useState('draft');
          const [quoteNotes, setQuoteNotes] = useState('');
          const [historySearch, setHistorySearch] = useState('');


          const [firebaseState, setFirebaseState] = useState(() => (
            window.GeelyFirebaseSync?.getState?.() || {
              sdk: 'loading', user: null, online: navigator.onLine,
              message: 'Đang tải dịch vụ đồng bộ...', error: null
            }
          ));
          const [syncUser, setSyncUser] = useState(null);
          const [syncStatus, setSyncStatus] = useState({
            code: 'signed_out',
            message: 'Đăng nhập Google để đồng bộ dữ liệu.',
            updatedAtMs: 0
          });
          const latestDataRef = useRef({});
          const pendingWorkspaceRef = useRef(null);
          const syncReadyRef = useRef(false);
          const syncApplyingRef = useRef(false);
          const syncUnsubscribeRef = useRef(null);
          const syncWriteTimerRef = useRef(null);
          const settingsHashRef = useRef('');
          const cloudCarsHashRef = useRef('');
          const cloudPromosHashRef = useRef('');

          useEffect(() => { saveData('geely_cars_v8', cars.map(({ image, ...car }) => car)); }, [cars]);
          useEffect(() => { saveData('geely_promotions_v2', promotions); }, [promotions]);
          useEffect(() => { saveData('geely_sales_info', salesInfo); }, [salesInfo]);
          useEffect(() => { saveData('geely_service_fee', serviceFeeAmount); }, [serviceFeeAmount]);
          useEffect(() => { saveData('geely_phys_ins_rate', physicalInsuranceRate); }, [physicalInsuranceRate]);
          useEffect(() => { saveData('geely_registration_fees_v1', registrationFees); }, [registrationFees]);

          useEffect(() => {
            let cancelled = false;
            (async () => {
              if (!window.GeelyIDB) return;
              const map = {};
              const migratedCars = [];
              for (const item of cars) {
                try {
                  if (item.image && item.image.startsWith('data:image/')) {
                    await window.GeelyIDB.saveCarImage(item.id, item.image);
                    migratedCars.push(item.id);
                  }
                  const localImage = await window.GeelyIDB.getCarImage(item.id);
                  if (localImage) map[item.id] = localImage;
                } catch (error) { console.warn('Không đọc được ảnh IndexedDB:', error); }
              }
              if (!cancelled) {
                setCarImageMap(map);
                if (migratedCars.length) setCars(current => current.map(({ image, ...car }) => car));
              }
              try {
                const localQuotes = await window.GeelyIDB.listQuotations();
                if (!cancelled && localQuotes.length) setQuotations(localQuotes);
              } catch (error) { console.warn('Không đọc được lịch sử báo giá:', error); }
            })();
            return () => { cancelled = true; };
          }, []);

          useEffect(() => {
            latestDataRef.current = {
              cars, promotions, salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees, quotations
            };
          }, [cars, promotions, salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees, quotations]);

          const [customerName, setCustomerName] = useState('');
          const [customerPhone, setCustomerPhone] = useState('');
          const [carColor, setCarColor] = useState('');
          const [selectedColorId, setSelectedColorId] = useState(() => cars[0]?.defaultColorId || cars[0]?.colors?.[0]?.id || '');

          const [selectedCarId, setSelectedCarId] = useState(cars[0]?.id || '');
          const [selectedLocationId, setSelectedLocationId] = useState(registrationFees.locations[0]?.id || '');
          const [selectedPromoIds, setSelectedPromoIds] = useState([]); 
          const [discount, setDiscount] = useState(''); 
          const [includePhysicalInsurance, setIncludePhysicalInsurance] = useState(true);
          const [includeServiceFee, setIncludeServiceFee] = useState(true);
          
          const [plateColor, setPlateColor] = useState('white'); 
          const [roadFeeYears, setRoadFeeYears] = useState(1);
          const [tndsOption, setTndsOption] = useState('auto');

          const [activeTab, setActiveTab] = useState(() => {
            try {
              const requestedTab = new URLSearchParams(window.location.search).get('tab');
              return ['input', 'loan', 'preview', 'history', 'settings'].includes(requestedTab) ? requestedTab : 'input';
            } catch (error) {
              return 'input';
            }
          }); 
          const [toastMessage, setToastMessage] = useState('');

          const [newCarName, setNewCarName] = useState('');
          const [newCarPrice, setNewCarPrice] = useState('');
          const [newCarSeats, setNewCarSeats] = useState(5);
          const [newCarEngineType, setNewCarEngineType] = useState('gasoline');
          const [newCarImage, setNewCarImage] = useState('');
          const [newCarImagePath, setNewCarImagePath] = useState('');
          const [newCarColors, setNewCarColors] = useState([]);
          const [newCarDefaultColorId, setNewCarDefaultColorId] = useState('');
          const [editingCarId, setEditingCarId] = useState(null);
          const [isProcessingCarImage, setIsProcessingCarImage] = useState(false);
          
          const [newPromoName, setNewPromoName] = useState('');
          const [newPromoValue, setNewPromoValue] = useState('');
          const [newPromoType, setNewPromoType] = useState('gift');
          const [newPromoDeduct, setNewPromoDeduct] = useState(false);

          const [editingLocationId, setEditingLocationId] = useState(null);
          const [newLocationName, setNewLocationName] = useState('');
          const [newLocationPlateFee, setNewLocationPlateFee] = useState('');
          const [newLocationEffectiveDate, setNewLocationEffectiveDate] = useState(registrationFees.effectiveDate);
          const [newLocationTaxRates, setNewLocationTaxRates] = useState({ gasoline: 0, hybrid: 0, phev: 0, ev: 0 });

          const [loanParams, setLoanParams] = useState({
            loanInputMode: 'percent',
            loanAmount: 0,
            downPaymentPercent: 20,
            loanTermYears: 5,
            fixedInterestRate: 8.0,
            fixedTermMonths: 12,
            floatingInterestRate: 11.5
          });
          const [isExporting, setIsExporting] = useState(false); 

          const [previewScale, setPreviewScale] = useState(1);
          const [quoteHeight, setQuoteHeight] = useState(0);
          const previewContainerRef = useRef(null);
          const captureRef = useRef(null);

          useEffect(() => {
            if (activeTab !== 'preview' || !previewContainerRef.current) return;

            const container = previewContainerRef.current;
            const updateScale = () => {
              const availableWidth = Math.max(container.clientWidth, 1);
              setPreviewScale(Math.min(1, availableWidth / 800));
            };

            updateScale();

            if (window.ResizeObserver) {
              const observer = new ResizeObserver(updateScale);
              observer.observe(container);
              return () => observer.disconnect();
            }

            window.addEventListener('resize', updateScale);
            return () => window.removeEventListener('resize', updateScale);
          }, [activeTab]);

          useEffect(() => {
            if (activeTab !== 'preview' || !captureRef.current) return;

            const element = captureRef.current;
            const updateHeight = () => setQuoteHeight(element.offsetHeight);

            updateHeight();

            if (window.ResizeObserver) {
              const observer = new ResizeObserver(updateHeight);
              observer.observe(element);
              return () => observer.disconnect();
            }

            const timeoutId = setTimeout(updateHeight, 200);
            return () => clearTimeout(timeoutId);
          }, [activeTab]);

          const quoteData = useMemo(() => {
            const today = new Date();
            const dateStr = today.toLocaleDateString('vi-VN');
            const validDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
            return { date: dateStr, validUntil: validDate, code: currentQuoteId };
          }, [currentQuoteId]);

          const car = useMemo(() => cars.find(c => c.id === selectedCarId) || cars[0], [selectedCarId, cars]);
          const selectedCarColor = useMemo(() => {
            if (!car || selectedColorId === '__local__') return null;
            return (car.colors || []).find(color => color.id === selectedColorId)
              || (car.colors || []).find(color => color.id === car.defaultColorId)
              || car.colors?.[0]
              || null;
          }, [car, selectedColorId]);
          const resolvedCarImage = car
            ? (selectedColorId === '__local__'
              ? (carImageMap[car.id] || car.imagePath || car.image || '')
              : (selectedCarColor?.imagePath || car.imagePath || carImageMap[car.id] || car.image || ''))
            : '';
          const location = useMemo(() => registrationFees.locations.find(l => l.id === selectedLocationId) || registrationFees.locations[0], [selectedLocationId, registrationFees.locations]);

          useEffect(() => {
            if (!car) return;
            if (selectedColorId === '__local__' && carImageMap[car.id]) {
              if (!carColor) setCarColor('Ảnh riêng');
              return;
            }
            const colors = Array.isArray(car.colors) ? car.colors : [];
            const current = colors.find(color => color.id === selectedColorId);
            const fallback = colors.find(color => color.id === car.defaultColorId) || colors[0];
            const next = current || fallback;
            if (next) {
              if (selectedColorId !== next.id) setSelectedColorId(next.id);
              if (carColor !== next.name) setCarColor(next.name);
            } else if (selectedColorId) {
              setSelectedColorId('');
            }
          }, [car?.id, car?.defaultColorId, car?.colors, selectedColorId, carImageMap]);

          const handleCarSelection = carId => {
            const nextCar = cars.find(item => item.id === carId);
            setSelectedCarId(carId);
            const nextColor = nextCar?.colors?.find(color => color.id === nextCar.defaultColorId) || nextCar?.colors?.[0];
            setSelectedColorId(nextColor?.id || (carImageMap[carId] ? '__local__' : ''));
            setCarColor(nextColor?.name || (carImageMap[carId] ? 'Ảnh riêng' : ''));
          };

          const handleColorSelection = colorId => {
            setSelectedColorId(colorId);
            if (colorId === '__local__') {
              setCarColor('Ảnh riêng');
              return;
            }
            const color = car?.colors?.find(item => item.id === colorId);
            setCarColor(color?.name || '');
          };

          useEffect(() => {
            if (!registrationFees.locations.length) return;
            if (!registrationFees.locations.some(item => item.id === selectedLocationId)) {
              setSelectedLocationId(registrationFees.locations[0].id);
            }
          }, [registrationFees.locations, selectedLocationId]);

          const calculations = useMemo(() => {
            if (!car || !location) return null;
            const price = parseMoney(car.price);
            const engineType = ENGINE_TYPES[car.engineType] ? car.engineType : 'gasoline';
            const taxRate = Math.max(0, Number(location.taxRates?.[engineType]) || 0);
            const taxFee = price * taxRate;
            const plateFee = parseMoney(location.plateFee);
            const inspectionFee = parseMoney(registrationFees.inspectionFee);
            const roadFeePerMonth = plateColor === 'white'
              ? parseMoney(registrationFees.roadFeeMonthlyWhite)
              : parseMoney(registrationFees.roadFeeMonthlyYellow);
            const roadFee = roadFeePerMonth * 12 * roadFeeYears;

            let civilInsurance = 0;
            if (tndsOption === 'auto') {
              civilInsurance = car.seats <= 5 ? parseMoney(registrationFees.civilInsurance5Seats) : parseMoney(registrationFees.civilInsurance7Seats);
            } else if (tndsOption === '5_seats') {
              civilInsurance = parseMoney(registrationFees.civilInsurance5Seats);
            } else {
              civilInsurance = parseMoney(registrationFees.civilInsurance7Seats);
            }
            
            const physicalInsuranceFee = includePhysicalInsurance ? price * (physicalInsuranceRate / 100) : 0;
            const serviceFee = includeServiceFee ? parseMoney(serviceFeeAmount) : 0;
            
            const selectedPromotions = selectedPromoIds.map(id => promotions.find(promo => promo.id === id)).filter(Boolean);
            const promoValue = selectedPromotions
              .filter(promo => promo.deductFromPrice)
              .reduce((sum, promo) => sum + parseMoney(promo.value), 0);
            const giftPromotions = selectedPromotions.filter(promo => !promo.deductFromPrice);
            const manualDiscount = parseMoney(discount);
            const discountAmount = promoValue + manualDiscount;

            const totalRollingCost = taxFee + plateFee + inspectionFee + roadFee + civilInsurance + physicalInsuranceFee + serviceFee;
            const finalAmount = price - discountAmount + totalRollingCost;

            return {
              price, taxRate, taxFee, plateFee, inspectionFee, roadFeePerMonth, roadFee, civilInsurance,
              engineType, effectiveDate: location.effectiveDate || registrationFees.effectiveDate,
              physicalInsuranceFee, serviceFee, discountAmount, promoValue, giftPromotions, selectedPromotions, totalRollingCost, finalAmount, roadFeeYears
            };
          }, [car, location, registrationFees, discount, includePhysicalInsurance, includeServiceFee, selectedPromoIds, promotions, plateColor, roadFeeYears, tndsOption, serviceFeeAmount, physicalInsuranceRate]);

          const normalizedLoanParams = useMemo(() => {
            const loanInputMode = loanParams.loanInputMode === 'amount' ? 'amount' : 'percent';
            const requestedLoanAmount = parseMoney(loanParams.loanAmount);
            const downPaymentPercent = Math.min(100, Math.max(0, Number(loanParams.downPaymentPercent) || 0));
            const loanTermYears = Math.min(8, Math.max(1, Number(loanParams.loanTermYears) || 1));
            const months = loanTermYears * 12;
            const fixedTermMonths = Math.min(months, Math.max(0, Number(loanParams.fixedTermMonths) || 0));
            const fixedInterestRate = Math.max(0, Number(loanParams.fixedInterestRate) || 0);
            const floatingInterestRate = Math.max(0, Number(loanParams.floatingInterestRate) || 0);
            return {
              loanInputMode,
              requestedLoanAmount,
              downPaymentPercent,
              loanTermYears,
              months,
              fixedTermMonths,
              fixedInterestRate,
              floatingInterestRate
            };
          }, [
            loanParams.loanInputMode,
            loanParams.loanAmount,
            loanParams.downPaymentPercent,
            loanParams.loanTermYears,
            loanParams.fixedTermMonths,
            loanParams.fixedInterestRate,
            loanParams.floatingInterestRate
          ]);

          const loanCalculations = useMemo(() => {
            if (!calculations) return null;

            const {
              loanInputMode,
              requestedLoanAmount,
              downPaymentPercent,
              months,
              fixedTermMonths,
              fixedInterestRate,
              floatingInterestRate
            } = normalizedLoanParams;

            const maxLoanAmount = Math.max(0, calculations.price);
            const percentBasedLoanAmount = maxLoanAmount * (1 - downPaymentPercent / 100);
            const loanAmount = loanInputMode === 'amount'
              ? Math.min(maxLoanAmount, Math.max(0, requestedLoanAmount))
              : Math.min(maxLoanAmount, Math.max(0, percentBasedLoanAmount));
            const loanPercent = maxLoanAmount > 0 ? loanAmount / maxLoanAmount * 100 : 0;
            const effectiveDownPaymentPercent = Math.max(0, 100 - loanPercent);
            const upfrontPayment = Math.max(0, calculations.finalAmount - loanAmount);
            const monthlyPrincipal = months > 0 ? loanAmount / months : 0;
            const schedule = [];
            let totalInterest = 0;
            let totalPrincipal = 0;

            for (let month = 1; month <= months; month += 1) {
              const openingBalance = Math.max(0, loanAmount - monthlyPrincipal * (month - 1));
              const annualRate = fixedTermMonths > 0 && month <= fixedTermMonths
                ? fixedInterestRate
                : floatingInterestRate;
              const interest = openingBalance * annualRate / 100 / 12;
              const principalPayment = month === months ? openingBalance : Math.min(monthlyPrincipal, openingBalance);
              const totalPayment = principalPayment + interest;
              const closingBalance = Math.max(0, openingBalance - principalPayment);

              totalInterest += interest;
              totalPrincipal += principalPayment;
              schedule.push({
                month,
                openingBalance,
                principalPayment,
                interest,
                totalPayment,
                closingBalance,
                annualRate,
                rateType: fixedTermMonths > 0 && month <= fixedTermMonths ? 'Ưu đãi' : 'Thả nổi'
              });
            }

            const firstMonth = schedule[0] || null;
            const lastPreferredMonth = fixedTermMonths > 0 ? schedule[fixedTermMonths - 1] || null : null;
            const firstFloatingMonth = fixedTermMonths < months ? schedule[fixedTermMonths] || null : null;
            const finalMonth = schedule[schedule.length - 1] || null;
            const totalBankPayment = totalPrincipal + totalInterest;
            const averageMonthlyPayment = months > 0 ? totalBankPayment / months : 0;

            return {
              loanInputMode,
              requestedLoanAmount,
              maxLoanAmount,
              loanAmount,
              loanPercent,
              effectiveDownPaymentPercent,
              loanAmountWasClamped: loanInputMode === 'amount' && requestedLoanAmount > maxLoanAmount,
              upfrontPayment,
              monthlyPrincipal,
              months,
              fixedTermMonths,
              schedule,
              firstMonth,
              lastPreferredMonth,
              firstFloatingMonth,
              finalMonth,
              totalInterest,
              totalPrincipal,
              totalBankPayment,
              averageMonthlyPayment,
              firstMonthInterest: firstMonth?.interest || 0,
              firstMonthTotal: firstMonth?.totalPayment || 0,
              firstFloatingMonthInterest: firstFloatingMonth?.interest || 0,
              firstFloatingMonthTotal: firstFloatingMonth?.totalPayment || 0
            };
          }, [
            calculations?.price,
            calculations?.finalAmount,
            normalizedLoanParams.loanInputMode,
            normalizedLoanParams.requestedLoanAmount,
            normalizedLoanParams.downPaymentPercent,
            normalizedLoanParams.months,
            normalizedLoanParams.fixedTermMonths,
            normalizedLoanParams.fixedInterestRate,
            normalizedLoanParams.floatingInterestRate
          ]);

          const updateLoanParam = (key, rawValue) => {
            const value = Number(rawValue);
            setLoanParams(current => ({
              ...current,
              [key]: Number.isFinite(value) ? value : 0
            }));
          };

          const updateLoanAmount = rawValue => {
            const isEmpty = String(rawValue ?? '').trim() === '';
            setLoanParams(current => ({
              ...current,
              loanInputMode: 'amount',
              loanAmount: isEmpty ? '' : parseMoney(rawValue)
            }));
          };

          const normalizeLoanAmountField = () => {
            if (!calculations) return;
            const enteredAmount = parseMoney(loanParams.loanAmount);
            const maximum = Math.max(0, calculations.price);
            const normalizedAmount = Math.min(maximum, enteredAmount);
            setLoanParams(current => ({
              ...current,
              loanInputMode: 'amount',
              loanAmount: normalizedAmount
            }));
            if (enteredAmount > maximum) showToast(`Số tiền vay tối đa theo giá xe là ${formatVND(maximum)}.`);
          };

          const updateDownPaymentPercent = rawValue => {
            const value = Math.min(100, Math.max(0, Number(rawValue) || 0));
            setLoanParams(current => ({
              ...current,
              loanInputMode: 'percent',
              downPaymentPercent: value
            }));
          };

          const updateLoanTermYears = rawValue => {
            const years = Math.min(8, Math.max(1, Number(rawValue) || 1));
            setLoanParams(current => ({
              ...current,
              loanTermYears: years,
              fixedTermMonths: Math.min(Number(current.fixedTermMonths) || 0, years * 12)
            }));
          };

          const updateLoanRate = (key, rawValue) => {
            setLoanParams(current => ({ ...current, [key]: rawValue }));
          };

          const normalizeLoanRateField = key => {
            setLoanParams(current => ({
              ...current,
              [key]: Math.max(0, Number(current[key]) || 0)
            }));
          };

          const showToast = (message) => { setToastMessage(message); setTimeout(() => setToastMessage(''), 3000); };


          const getSyncKey = uid => `geely_sync_initialized_v2_${uid || 'unknown'}`;
          const setSyncInitialized = uid => { if (uid) saveData(getSyncKey(uid), true); };

          const settingsPayload = () => ({
            salesInfo: { name: String(salesInfo?.name || ''), phone: String(salesInfo?.phone || '') },
            serviceFeeAmount: parseMoney(serviceFeeAmount),
            physicalInsuranceRate: Number(physicalInsuranceRate) || 0,
            registrationFees: normalizeRegistrationFees(registrationFees)
          });
          const cloudCar = item => ({
            id: String(item.id), name: String(item.name || ''), price: parseMoney(item.price),
            seats: Number(item.seats) || 5,
            engineType: ENGINE_TYPES[item.engineType] ? item.engineType : 'gasoline',
            colorGroup: String(item.colorGroup || ''),
            colors: (item.colors || []).map(normalizeCarColor),
            defaultColorId: String(item.defaultColorId || ''),
            imagePath: String(item.imagePath || '')
          });
          const cloudPromo = item => ({
            id: String(item.id), name: String(item.name || ''), value: parseMoney(item.value),
            type: String(item.type || 'gift'), deductFromPrice: Boolean(item.deductFromPrice)
          });

          const applyWorkspace = workspace => {
            if (!workspace) return;
            syncApplyingRef.current = true;
            if (workspace.settings) {
              if (workspace.settings.salesInfo) setSalesInfo({
                name: String(workspace.settings.salesInfo.name || ''),
                phone: String(workspace.settings.salesInfo.phone || '')
              });
              if (workspace.settings.serviceFeeAmount !== undefined) setServiceFeeAmount(parseMoney(workspace.settings.serviceFeeAmount));
              if (workspace.settings.physicalInsuranceRate !== undefined) setPhysicalInsuranceRate(Number(workspace.settings.physicalInsuranceRate) || 0);
              if (workspace.settings.registrationFees) setRegistrationFees(normalizeRegistrationFees(workspace.settings.registrationFees));
            }
            const cloudCars = workspace.cars?.length ? workspace.cars : workspace.legacy?.cars;
            if (Array.isArray(cloudCars) && cloudCars.length) {
              const nextCars = cloudCars.map(normalizeCar).map(item => ({ ...item, image: '' }));
              setCars(nextCars);
              if (!nextCars.some(item => item.id === selectedCarId)) setSelectedCarId(nextCars[0]?.id || '');
            }
            const cloudPromos = workspace.promotions?.length ? workspace.promotions : workspace.legacy?.promotions;
            if (Array.isArray(cloudPromos)) setPromotions(cloudPromos.map(normalizePromotion));
            if (Array.isArray(workspace.quotations)) {
              setQuotations(workspace.quotations);
              workspace.quotations.forEach(item => window.GeelyIDB?.saveQuotation(item).catch(() => {}));
            }
            if (workspace.legacy && !workspace.settings) {
              if (workspace.legacy.salesInfo) setSalesInfo(workspace.legacy.salesInfo);
              if (workspace.legacy.serviceFeeAmount !== undefined) setServiceFeeAmount(parseMoney(workspace.legacy.serviceFeeAmount));
              if (workspace.legacy.physicalInsuranceRate !== undefined) setPhysicalInsuranceRate(Number(workspace.legacy.physicalInsuranceRate) || 0);
              if (workspace.legacy.registrationFees) setRegistrationFees(normalizeRegistrationFees(workspace.legacy.registrationFees));
            }
            window.setTimeout(() => { syncApplyingRef.current = false; }, 600);
          };

          const describeFirebaseError = error => {
            const code = error?.code || '';
            if (code.includes('unauthorized-domain')) return 'Tên miền GitHub chưa được cấp quyền trong Firebase Authentication.';
            if (code.includes('popup-blocked')) return 'Trình duyệt đã chặn cửa sổ đăng nhập. Hãy mở bằng Chrome hoặc Safari.';
            if (code.includes('popup-closed-by-user')) return 'Bạn đã đóng cửa sổ đăng nhập Google.';
            if (code.includes('permission-denied')) return 'Firestore từ chối truy cập. Hãy cập nhật Security Rules cho cấu trúc V2.0.';
            if (!navigator.onLine) return 'Thiết bị đang ngoại tuyến. Dữ liệu cục bộ vẫn được giữ.';
            return error?.message || 'Không thể kết nối Firebase.';
          };

          const handleFirebaseSignIn = async () => {
            try {
              setSyncStatus({ code: 'working', message: 'Đang mở đăng nhập Google...', updatedAtMs: 0 });
              await window.GeelyFirebaseSync.signInGoogle();
            } catch (error) {
              const message = describeFirebaseError(error);
              setSyncStatus({ code: 'error', message, updatedAtMs: 0 }); showToast(message);
            }
          };
          const handleFirebaseSignOut = async () => {
            try { await window.GeelyFirebaseSync.signOut(); showToast('Đã đăng xuất tài khoản đồng bộ.'); }
            catch (error) { showToast(describeFirebaseError(error)); }
          };

          const handleUploadCurrentToCloud = async () => {
            if (!syncUser) return showToast('Vui lòng đăng nhập Google.');
            try {
              setSyncStatus({ code: 'working', message: 'Đang đưa dữ liệu lên Firebase...', updatedAtMs: 0 });
              await window.GeelyFirebaseSync.bootstrapWorkspace({
                settings: settingsPayload(), cars: cars.map(cloudCar), promotions: promotions.map(cloudPromo), quotations
              });
              syncReadyRef.current = true; setSyncInitialized(syncUser.uid);
              setSyncStatus({ code: navigator.onLine ? 'synced' : 'queued', message: 'Đã bật đồng bộ từng mục.', updatedAtMs: Date.now() });
              showToast('Đã đồng bộ dữ liệu lên Firebase.');
            } catch (error) { const message = describeFirebaseError(error); setSyncStatus({ code: 'error', message, updatedAtMs: 0 }); showToast(message); }
          };

          const handleDownloadCloudToDevice = () => {
            if (!pendingWorkspaceRef.current) return showToast('Chưa tìm thấy dữ liệu trên Firebase.');
            applyWorkspace(pendingWorkspaceRef.current);
            syncReadyRef.current = true; setSyncInitialized(syncUser?.uid);
            setSyncStatus({ code: 'synced', message: 'Đã tải dữ liệu Firebase về thiết bị.', updatedAtMs: Date.now() });
            showToast('Đã tải dữ liệu; ảnh cục bộ vẫn được giữ theo mã xe.');
          };

          const handleSyncNow = async () => {
            if (!syncUser || !syncReadyRef.current) return showToast('Hãy hoàn tất lựa chọn dữ liệu ban đầu trước.');
            try {
              await window.GeelyFirebaseSync.saveSettings(settingsPayload());
              await Promise.all(cars.map(item => window.GeelyFirebaseSync.saveCar(cloudCar(item))));
              await Promise.all(promotions.map(item => window.GeelyFirebaseSync.savePromotion(cloudPromo(item))));
              setSyncStatus({ code: 'synced', message: 'Đã đồng bộ thủ công.', updatedAtMs: Date.now() });
              showToast('Đồng bộ hoàn tất.');
            } catch (error) { showToast(describeFirebaseError(error)); }
          };

          useEffect(() => {
            const service = window.GeelyFirebaseSync;
            if (!service) return undefined;
            const unsubscribeState = service.onStateChange(nextState => setFirebaseState(nextState));
            const unsubscribeAuth = service.onAuthStateChanged(user => setSyncUser(user));
            return () => { unsubscribeState?.(); unsubscribeAuth?.(); };
          }, []);

          useEffect(() => {
            syncUnsubscribeRef.current?.(); syncUnsubscribeRef.current = null;
            syncReadyRef.current = false; pendingWorkspaceRef.current = null;
            if (!syncUser) {
              setSyncStatus({ code: 'signed_out', message: 'Đăng nhập Google để đồng bộ dữ liệu.', updatedAtMs: 0 });
              return undefined;
            }
            let cancelled = false;
            setSyncStatus({ code: 'working', message: 'Đang kiểm tra dữ liệu Firebase...', updatedAtMs: 0 });
            (async () => {
              try {
                const workspace = await window.GeelyFirebaseSync.getWorkspace();
                if (cancelled) return;
                pendingWorkspaceRef.current = workspace;
                const initialized = Boolean(getSavedData(getSyncKey(syncUser.uid), false));
                if (workspace.empty) {
                  setSyncStatus({ code: 'cloud_empty', message: 'Tài khoản chưa có dữ liệu V2.0.', updatedAtMs: 0 });
                } else if (!initialized) {
                  setSyncStatus({ code: 'choice_needed', message: 'Hãy chọn dữ liệu ban đầu dùng làm bản chính.', updatedAtMs: 0 });
                } else {
                  applyWorkspace(workspace); syncReadyRef.current = true;
                  setSyncStatus({ code: 'synced', message: 'Dữ liệu đã đồng bộ theo từng mục.', updatedAtMs: Date.now() });
                }
                const unsubscribe = await window.GeelyFirebaseSync.watchWorkspace(event => {
                  if (cancelled || !syncReadyRef.current || event.hasPendingWrites) return;
                  syncApplyingRef.current = true;
                  if (event.type === 'settings' && event.data) {
                    const data = event.data;
                    if (data.salesInfo) setSalesInfo(data.salesInfo);
                    if (data.serviceFeeAmount !== undefined) setServiceFeeAmount(parseMoney(data.serviceFeeAmount));
                    if (data.physicalInsuranceRate !== undefined) setPhysicalInsuranceRate(Number(data.physicalInsuranceRate) || 0);
                    if (data.registrationFees) setRegistrationFees(normalizeRegistrationFees(data.registrationFees));
                  } else if (event.type === 'cars') {
                    const next = event.items.map(normalizeCar);
                    setCars(next);
                    cloudCarsHashRef.current = JSON.stringify(next.map(cloudCar));
                  } else if (event.type === 'promotions') {
                    const next = event.items.map(normalizePromotion);
                    setPromotions(next);
                    cloudPromosHashRef.current = JSON.stringify(next.map(cloudPromo));
                  } else if (event.type === 'quotations') {
                    setQuotations(event.items);
                    event.items.forEach(item => window.GeelyIDB?.saveQuotation(item).catch(() => {}));
                  }
                  window.setTimeout(() => { syncApplyingRef.current = false; }, 400);
                  setSyncStatus({ code: event.fromCache && !navigator.onLine ? 'offline' : 'synced', message: 'Dữ liệu đã đồng bộ.', updatedAtMs: Date.now() });
                }, error => setSyncStatus({ code: 'error', message: describeFirebaseError(error), updatedAtMs: 0 }));
                if (cancelled) unsubscribe?.(); else syncUnsubscribeRef.current = unsubscribe;
              } catch (error) {
                if (!cancelled) setSyncStatus({ code: 'error', message: describeFirebaseError(error), updatedAtMs: 0 });
              }
            })();
            return () => { cancelled = true; syncUnsubscribeRef.current?.(); syncUnsubscribeRef.current = null; };
          }, [syncUser?.uid]);

          useEffect(() => {
            if (!syncUser || !syncReadyRef.current || syncApplyingRef.current) return undefined;
            if (syncWriteTimerRef.current) clearTimeout(syncWriteTimerRef.current);
            const payload = settingsPayload();
            const hash = JSON.stringify(payload);
            if (hash === settingsHashRef.current) return undefined;
            syncWriteTimerRef.current = window.setTimeout(async () => {
              try {
                await window.GeelyFirebaseSync.saveSettings(payload);
                settingsHashRef.current = hash;
                setSyncStatus({ code: navigator.onLine ? 'synced' : 'queued', message: navigator.onLine ? 'Cài đặt đã đồng bộ.' : 'Thay đổi đang chờ gửi.', updatedAtMs: Date.now() });
              } catch (error) { setSyncStatus({ code: 'error', message: describeFirebaseError(error), updatedAtMs: 0 }); }
            }, 1200);
            return () => { if (syncWriteTimerRef.current) clearTimeout(syncWriteTimerRef.current); };
          }, [salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees, syncUser?.uid]);

          const handleDiscountChange = (e) => {
            const value = parseMoney(e.target.value);
            setDiscount(value ? formatNumber(value) : '');
          };
          
          const formatNumberInput = (e, setter) => {
            const value = parseMoney(e.target.value);
            setter(value ? formatNumber(value) : '');
          };

          const formatPercentValue = value => {
            const percent = Math.max(0, Number(value) || 0) * 100;
            return Number(percent.toFixed(3));
          };

          const updateRegistrationFee = (field, value) => {
            setRegistrationFees(current => normalizeRegistrationFees({ ...current, [field]: value }));
          };

          const resetLocationEditor = () => {
            setEditingLocationId(null);
            setNewLocationName('');
            setNewLocationPlateFee('');
            setNewLocationEffectiveDate(registrationFees.effectiveDate || '');
            setNewLocationTaxRates({ gasoline: 0, hybrid: 0, phev: 0, ev: 0 });
          };

          const handleStartEditLocation = area => {
            setEditingLocationId(area.id);
            setNewLocationName(area.name || '');
            setNewLocationPlateFee(formatNumber(area.plateFee));
            setNewLocationEffectiveDate(area.effectiveDate || registrationFees.effectiveDate || '');
            setNewLocationTaxRates(normalizeTaxRates(area.taxRates));
            window.setTimeout(() => document.getElementById('registration-area-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
          };

          const handleSaveLocation = () => {
            if (!newLocationName.trim()) return showToast('Hãy nhập tên khu vực đăng ký.');
            const id = editingLocationId || `area_${Date.now()}`;
            const area = normalizeRegistrationLocation({
              id,
              name: newLocationName.trim(),
              plateFee: parseMoney(newLocationPlateFee),
              effectiveDate: newLocationEffectiveDate || registrationFees.effectiveDate,
              taxRates: newLocationTaxRates
            });
            setRegistrationFees(current => normalizeRegistrationFees({
              ...current,
              locations: editingLocationId
                ? current.locations.map(item => item.id === id ? area : item)
                : [...current.locations, area]
            }));
            if (!selectedLocationId) setSelectedLocationId(id);
            resetLocationEditor();
            showToast(editingLocationId ? 'Đã cập nhật khu vực đăng ký.' : 'Đã thêm khu vực đăng ký.');
          };

          const handleDeleteLocation = id => {
            if (registrationFees.locations.length <= 1) return showToast('Phải giữ ít nhất một khu vực đăng ký.');
            if (!window.confirm('Xóa khu vực đăng ký này?')) return;
            const nextLocations = registrationFees.locations.filter(item => item.id !== id);
            setRegistrationFees(current => normalizeRegistrationFees({ ...current, locations: nextLocations }));
            if (selectedLocationId === id) setSelectedLocationId(nextLocations[0]?.id || '');
            if (editingLocationId === id) resetLocationEditor();
            showToast('Đã xóa khu vực đăng ký.');
          };

          const handleRestoreDefaultFees = () => {
            if (!window.confirm('Khôi phục toàn bộ bảng phí đăng ký về dữ liệu mặc định của ứng dụng?')) return;
            const defaults = normalizeRegistrationFees(DEFAULT_REGISTRATION_FEES);
            setRegistrationFees(defaults);
            setSelectedLocationId(defaults.locations[0]?.id || '');
            resetLocationEditor();
            showToast('Đã khôi phục bảng phí mặc định.');
          };

          const handleExportExcel = () => {
            if (!loanCalculations || !calculations) return;

            const rows = [
              ['LỊCH TRẢ NỢ DƯ NỢ GIẢM DẦN'],
              ['Khách hàng', customerName || 'Khách hàng'],
              ['Dòng xe', car?.name || ''],
              ['Cách xác định khoản vay', loanCalculations.loanInputMode === 'amount' ? 'Nhập số tiền vay chính xác' : 'Tính theo tỷ lệ trả trước'],
              ['Số tiền vay', Math.round(loanCalculations.loanAmount)],
              ['Tỷ lệ vay trên giá xe', `${loanCalculations.loanPercent.toFixed(2)}%`],
              ['Tỷ lệ vốn tự có', `${loanCalculations.effectiveDownPaymentPercent.toFixed(2)}%`],
              ['Vốn cần chuẩn bị và chi phí lăn bánh', Math.round(loanCalculations.upfrontPayment)],
              ['Thời gian vay', `${loanCalculations.months} tháng`],
              ['Thời gian ưu đãi', `${loanCalculations.fixedTermMonths} tháng`],
              ['Lãi suất ưu đãi', `${normalizedLoanParams.fixedInterestRate}%/năm`],
              ['Lãi suất thả nổi dự kiến', `${normalizedLoanParams.floatingInterestRate}%/năm`],
              ['Tổng tiền lãi dự kiến', Math.round(loanCalculations.totalInterest)],
              ['Tổng trả ngân hàng dự kiến', Math.round(loanCalculations.totalBankPayment)],
              [],
              ['Tháng', 'Dư nợ đầu kỳ', 'Gốc phải trả', 'Lãi phải trả', 'Tổng gốc + lãi', 'Dư nợ cuối kỳ', 'Lãi suất %/năm', 'Giai đoạn']
            ];

            loanCalculations.schedule.forEach(item => {
              rows.push([
                item.month,
                Math.round(item.openingBalance),
                Math.round(item.principalPayment),
                Math.round(item.interest),
                Math.round(item.totalPayment),
                Math.round(item.closingBalance),
                item.annualRate,
                item.rateType
              ]);
            });

            const escapeCsv = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
            const csvContent = '\uFEFF' + rows.map(row => row.map(escapeCsv).join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `LichTraNo_DuNoGiamDan_${customerName || 'KhachHang'}.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            showToast('Đã tải lịch trả nợ dư nợ giảm dần.');
          };

          const resetCarEditor = () => {
            setEditingCarId(null);
            setNewCarName('');
            setNewCarPrice('');
            setNewCarSeats(5);
            setNewCarEngineType('gasoline');
            setNewCarImage('');
            setNewCarImagePath('');
            setNewCarColors([]);
            setNewCarDefaultColorId('');
          };

          const addEditorColor = () => {
            const id = `color-${Date.now().toString(36)}`;
            setNewCarColors(current => [...current, { id, name: '', imagePath: '' }]);
            if (!newCarDefaultColorId) setNewCarDefaultColorId(id);
          };

          const loadDefaultEditorColors = () => {
            const group = DEFAULT_CAR_COLOR_GROUPS[editingCarId];
            if (!group || !CAR_COLOR_LIBRARY[group]) return showToast('Dòng xe này chưa có thư viện màu mặc định.');
            const colors = cloneColorSet(group);
            const defaultId = DEFAULT_CAR_DEFAULT_COLORS[editingCarId] || colors[0]?.id || '';
            setNewCarColors(colors);
            setNewCarDefaultColorId(defaultId);
            setNewCarImagePath(colors.find(color => color.id === defaultId)?.imagePath || colors[0]?.imagePath || '');
            showToast('Đã nạp thư viện màu chuẩn từ GitHub.');
          };

          const updateEditorColor = (index, field, value) => {
            setNewCarColors(current => current.map((color, colorIndex) => colorIndex === index ? { ...color, [field]: value } : color));
          };

          const removeEditorColor = index => {
            setNewCarColors(current => {
              const removed = current[index];
              const next = current.filter((_, colorIndex) => colorIndex !== index);
              if (removed?.id === newCarDefaultColorId) setNewCarDefaultColorId(next[0]?.id || '');
              return next;
            });
          };

          const optimizeCarImage = (file) => new Promise((resolve, reject) => {
            if (!file || !file.type?.startsWith('image/')) {
              reject(new Error('Tệp được chọn không phải hình ảnh.'));
              return;
            }

            if (file.size > 15 * 1024 * 1024) {
              reject(new Error('Ảnh vượt quá 15 MB.'));
              return;
            }

            const reader = new FileReader();
            reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh.'));
            reader.onload = () => {
              const image = new Image();
              image.onerror = () => reject(new Error('Định dạng ảnh không được hỗ trợ.'));
              image.onload = () => {
                const maxWidth = 1200;
                const maxHeight = 800;
                const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
                const width = Math.max(1, Math.round(image.width * scale));
                const height = Math.max(1, Math.round(image.height * scale));

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext('2d');
                if (!context) {
                  reject(new Error('Trình duyệt không hỗ trợ xử lý ảnh.'));
                  return;
                }

                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = 'high';
                context.drawImage(image, 0, 0, width, height);

                resolve(canvas.toDataURL('image/jpeg', 0.78));
              };
              image.src = reader.result;
            };
            reader.readAsDataURL(file);
          });

          const handleCarImageFileChange = async (event) => {
            const input = event.target;
            const file = input.files?.[0];
            input.value = '';
            if (!file) return;

            setIsProcessingCarImage(true);
            try {
              const optimizedImage = await optimizeCarImage(file);
              setNewCarImage(optimizedImage);
              showToast('Đã xử lý và thêm ảnh xe!');
            } catch (error) {
              console.error(error);
              showToast(error.message || 'Không thể xử lý ảnh xe.');
            } finally {
              setIsProcessingCarImage(false);
            }
          };

          const handleStartEditCar = (carToEdit) => {
            setEditingCarId(carToEdit.id);
            setNewCarName(carToEdit.name || '');
            setNewCarPrice(formatNumber(carToEdit.price));
            setNewCarSeats(Number(carToEdit.seats) || 5);
            setNewCarEngineType(ENGINE_TYPES[carToEdit.engineType] ? carToEdit.engineType : 'gasoline');
            setNewCarImage(carImageMap[carToEdit.id] || '');
            setNewCarImagePath(carToEdit.imagePath || '');
            setNewCarColors((carToEdit.colors || []).map(color => ({ ...color })));
            setNewCarDefaultColorId(carToEdit.defaultColorId || carToEdit.colors?.[0]?.id || '');

            setTimeout(() => {
              document.getElementById('car-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
          };

          const handleSaveCar = async () => {
            if (!newCarName.trim() || !newCarPrice) return showToast('Nhập tên và giá xe!');
            const price = parseMoney(newCarPrice);
            if (!Number.isFinite(price) || price <= 0) return showToast('Giá xe không hợp lệ!');
            const id = editingCarId || ('car_' + Date.now());
            const normalizedColors = newCarColors
              .map((color, index) => normalizeCarColor({
                ...color,
                id: color.id || slugifyColorId(color.name, `color-${index + 1}`)
              }, index))
              .filter(color => color.name.trim() && color.imagePath.trim());
            const uniqueColors = normalizedColors.filter((color, index, list) => list.findIndex(item => item.id === color.id) === index);
            const defaultColorId = uniqueColors.some(color => color.id === newCarDefaultColorId)
              ? newCarDefaultColorId
              : (uniqueColors[0]?.id || '');
            const defaultColorImage = uniqueColors.find(color => color.id === defaultColorId)?.imagePath || '';
            const carData = {
              id, name: newCarName.trim(), price, seats: Number(newCarSeats) || 5,
              engineType: ENGINE_TYPES[newCarEngineType] ? newCarEngineType : 'gasoline',
              colors: uniqueColors,
              defaultColorId,
              imagePath: defaultColorImage || newCarImagePath.trim()
            };
            try {
              if (newCarImage?.startsWith('data:image/')) {
                await window.GeelyIDB?.saveCarImage(id, newCarImage);
                setCarImageMap(current => ({ ...current, [id]: newCarImage }));
              } else if (!newCarImage && editingCarId && carImageMap[id]) {
                await window.GeelyIDB?.deleteCarImage(id);
                setCarImageMap(current => { const next = { ...current }; delete next[id]; return next; });
              }
              setCars(currentCars => editingCarId
                ? currentCars.map(item => item.id === id ? { ...item, ...carData, image: '' } : item)
                : [...currentCars, carData]);
              if (syncUser && syncReadyRef.current) await window.GeelyFirebaseSync.saveCar(cloudCar(carData));
              showToast(editingCarId ? 'Đã cập nhật thông tin xe!' : 'Thêm xe thành công!');
              resetCarEditor();
            } catch (error) { showToast(error?.message || 'Không thể lưu xe.'); }
          };

          const handleDeleteCar = async (id) => {
            if(cars.length <= 1) return showToast('Phải giữ ít nhất 1 xe!');
            const updated = cars.filter(c => c.id !== id);
            setCars(updated);
            if (selectedCarId === id) setSelectedCarId(updated[0].id);
            if (editingCarId === id) resetCarEditor();
            await window.GeelyIDB?.deleteCarImage(id).catch(() => {});
            setCarImageMap(current => { const next = { ...current }; delete next[id]; return next; });
            if (syncUser && syncReadyRef.current) window.GeelyFirebaseSync.deleteCar(id).catch(() => {});
            showToast('Đã xóa xe!');
          };

          const handleAddPromo = async () => {
            if (!newPromoName.trim()) return showToast('Nhập tên khuyến mãi!');
            const promo = normalizePromotion({
              id: 'promo_' + Date.now(), name: newPromoName.trim(), value: parseMoney(newPromoValue),
              type: newPromoType, deductFromPrice: newPromoDeduct
            });
            setPromotions(current => [...current, promo]);
            setNewPromoName(''); setNewPromoValue(''); setNewPromoType('gift'); setNewPromoDeduct(false);
            if (syncUser && syncReadyRef.current) await window.GeelyFirebaseSync.savePromotion(cloudPromo(promo)).catch(() => {});
            showToast('Thêm khuyến mãi thành công!');
          };
          
          const handleDeletePromo = async (id) => {
            setPromotions(current => current.filter(p => p.id !== id));
            setSelectedPromoIds(current => current.filter(promoId => promoId !== id));
            if (syncUser && syncReadyRef.current) await window.GeelyFirebaseSync.deletePromotion(id).catch(() => {});
          };

          const handleExportImage = async () => {
            if (!calculations || !car) return showToast('Chưa có dữ liệu báo giá.');
            setIsExporting(true);
            showToast('Đang tạo ảnh Zalo đầy đủ...');

            const loadCanvasImage = source => new Promise((resolve, reject) => {
              if (!source) return reject(new Error('Thiếu nguồn ảnh.'));
              const image = new Image();
              if (/^https?:/i.test(source)) image.crossOrigin = 'anonymous';
              image.onload = () => resolve(image);
              image.onerror = () => reject(new Error('Không tải được ảnh.'));
              image.src = source;
            });
            const roundedRect = (ctx, x, y, width, height, radius, fill, stroke) => {
              const r = Math.min(radius, width / 2, height / 2);
              ctx.beginPath();
              ctx.moveTo(x + r, y);
              ctx.arcTo(x + width, y, x + width, y + height, r);
              ctx.arcTo(x + width, y + height, x, y + height, r);
              ctx.arcTo(x, y + height, x, y, r);
              ctx.arcTo(x, y, x + width, y, r);
              ctx.closePath();
              if (fill) { ctx.fillStyle = fill; ctx.fill(); }
              if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
            };
            const fontString = options => `${options.weight || 600} ${options.size || 28}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`;
            const drawText = (ctx, text, x, y, options = {}) => {
              ctx.save();
              ctx.font = fontString(options);
              ctx.fillStyle = options.color || '#0f172a';
              ctx.textAlign = options.align || 'left';
              ctx.textBaseline = options.baseline || 'alphabetic';
              ctx.fillText(String(text ?? ''), x, y, options.maxWidth || undefined);
              ctx.restore();
            };
            const wrapLines = (ctx, text, maxWidth, options = {}) => {
              ctx.save();
              ctx.font = fontString(options);
              const paragraphs = String(text ?? '').split(/\n/);
              const lines = [];
              paragraphs.forEach((paragraph, paragraphIndex) => {
                const words = paragraph.split(/\s+/).filter(Boolean);
                let line = '';
                words.forEach(word => {
                  const test = line ? `${line} ${word}` : word;
                  if (ctx.measureText(test).width > maxWidth && line) {
                    lines.push(line);
                    line = word;
                  } else line = test;
                });
                if (line) lines.push(line);
                if (!words.length) lines.push('');
                if (paragraphIndex < paragraphs.length - 1) lines.push('');
              });
              ctx.restore();
              return lines;
            };
            const drawWrapped = (ctx, text, x, y, maxWidth, lineHeight, options = {}) => {
              const lines = wrapLines(ctx, text, maxWidth, options);
              ctx.save();
              ctx.font = fontString(options);
              ctx.fillStyle = options.color || '#334155';
              ctx.textAlign = options.align || 'left';
              ctx.textBaseline = 'top';
              lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
              ctx.restore();
              return y + lines.length * lineHeight;
            };
            const drawContainedImage = (ctx, image, x, y, width, height) => {
              try {
                const { sx, sy, sw, sh } = getCarImageContentBounds(image);
                const scale = Math.min(width / sw, height / sh);
                const drawWidth = sw * scale;
                const drawHeight = sh * scale;
                ctx.drawImage(image, sx, sy, sw, sh, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
              } catch (error) {
                const iw = image.naturalWidth || image.width || 1;
                const ih = image.naturalHeight || image.height || 1;
                const scale = Math.min(width / iw, height / ih);
                const drawWidth = iw * scale;
                const drawHeight = ih * scale;
                ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
              }
            };
            const drawSectionHeader = (ctx, title, y, rightText = '') => {
              roundedRect(ctx, 50, y, 980, 58, 10, '#eef2f7', '#d7dee8');
              drawText(ctx, title, 72, y + 38, { size: 21, weight: 900, color: '#172033' });
              if (rightText) drawText(ctx, rightText, 1008, y + 37, { size: 15, weight: 700, color: '#64748b', align: 'right', maxWidth: 360 });
              return y + 58;
            };
            const drawTableRow = (ctx, label, value, y, options = {}) => {
              const lineHeight = 26;
              const labelLines = wrapLines(ctx, label, 650, { size: options.size || 20, weight: options.bold ? 800 : 600 });
              const height = Math.max(options.minHeight || 58, labelLines.length * lineHeight + 24);
              if (options.fill) { ctx.fillStyle = options.fill; ctx.fillRect(50, y, 980, height); }
              ctx.strokeStyle = options.border || '#e2e8f0'; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(50, y + height); ctx.lineTo(1030, y + height); ctx.stroke();
              drawWrapped(ctx, label, 72, y + 14, 650, lineHeight, { size: options.size || 20, weight: options.bold ? 800 : 600, color: options.labelColor || '#334155' });
              drawText(ctx, value, 1008, y + Math.min(height - 18, 38), { size: options.valueSize || 21, weight: options.valueWeight || 800, color: options.valueColor || '#0f172a', align: 'right', maxWidth: 300 });
              return y + height;
            };
            const drawBulletBlock = (ctx, heading, items, y, options = {}) => {
              if (!items.length) return y;
              const lineHeight = 25;
              const lines = [];
              items.forEach(item => wrapLines(ctx, `• ${item}`, 890, { size: 18, weight: 600 }).forEach(line => lines.push(line)));
              const height = 56 + lines.length * lineHeight + 16;
              roundedRect(ctx, 50, y, 980, height, 12, options.fill || '#f8fafc', options.border || '#e2e8f0');
              drawText(ctx, heading, 72, y + 35, { size: 19, weight: 900, color: options.headingColor || '#0f2d64' });
              let lineY = y + 55;
              lines.forEach(line => { drawText(ctx, line, 78, lineY, { size: 18, weight: 600, color: '#475569', baseline: 'top', maxWidth: 900 }); lineY += lineHeight; });
              return y + height + 12;
            };

            try {
              if (document.fonts?.ready) await document.fonts.ready;
              const directItems = calculations.selectedPromotions.filter(item => item.deductFromPrice).map(item => item.name);
              if (parseMoney(discount) > 0) directItems.push(`Giảm tiền mặt bổ sung: ${formatVND(parseMoney(discount))}`);
              const giftItems = calculations.giftPromotions.map(item => `${item.name}${item.value > 0 ? ` (giá trị ${formatVND(item.value)})` : ''}`);
              const feeRows = [
                [`Lệ phí trước bạ (${formatPercentValue(calculations.taxRate)}% · ${ENGINE_TYPES[calculations.engineType]})`, formatVND(calculations.taxFee)],
                ['Phí cấp biển số', formatVND(calculations.plateFee)],
                ['Phí đăng kiểm', formatVND(calculations.inspectionFee)],
                [`Phí bảo trì đường bộ (${calculations.roadFeeYears} năm)`, formatVND(calculations.roadFee)],
                ['Bảo hiểm TNDS (bắt buộc)', formatVND(calculations.civilInsurance)]
              ];
              if (includePhysicalInsurance) feeRows.push([`Bảo hiểm vật chất (${physicalInsuranceRate}%)`, formatVND(calculations.physicalInsuranceFee)]);
              if (includeServiceFee) feeRows.push(['Phí dịch vụ đăng ký', formatVND(calculations.serviceFee)]);

              const estimatedHeight = 2250 + (directItems.length + giftItems.length) * 38 + (loanCalculations?.loanAmount > 0 ? 330 : 0);
              const canvas = document.createElement('canvas');
              canvas.width = 1080;
              canvas.height = Math.max(2350, estimatedHeight);
              const ctx = canvas.getContext('2d');
              if (!ctx) throw new Error('Trình duyệt không hỗ trợ canvas.');
              ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);

              let y = 0;
              // Header
              ctx.fillStyle = '#0f2d64'; ctx.fillRect(0, 0, 1080, 160);
              drawText(ctx, 'GEELY', 55, 76, { size: 49, weight: 900, color: '#ffffff' });
              drawText(ctx, 'HẢI DƯƠNG · ĐẠI LÝ 3S CHÍNH HÃNG', 55, 119, { size: 22, weight: 800, color: '#dbeafe' });
              drawText(ctx, `Mã: ${currentQuoteId}`, 1025, 58, { size: 21, weight: 800, color: '#ffffff', align: 'right' });
              drawText(ctx, `Ngày lập: ${quoteData.date}`, 1025, 94, { size: 18, weight: 600, color: '#dbeafe', align: 'right' });
              drawText(ctx, `Hiệu lực đến: ${quoteData.validUntil}`, 1025, 126, { size: 18, weight: 700, color: '#fecaca', align: 'right' });
              y = 195;
              drawText(ctx, 'BÁO GIÁ LĂN BÁNH XE Ô TÔ', 540, y, { size: 35, weight: 900, color: '#172033', align: 'center' });
              y += 38;

              // Customer and car information
              const cardY = y + 22;
              roundedRect(ctx, 50, cardY, 475, 150, 18, '#f8fafc', '#d7dee8');
              drawText(ctx, 'THÔNG TIN KHÁCH HÀNG', 72, cardY + 35, { size: 16, weight: 900, color: '#64748b' });
              drawWrapped(ctx, customerName || 'Khách hàng cá nhân/Doanh nghiệp', 72, cardY + 55, 425, 29, { size: 23, weight: 900, color: '#172033' });
              if (customerPhone) drawText(ctx, `SĐT: ${customerPhone}`, 72, cardY + 130, { size: 18, weight: 650, color: '#475569' });
              roundedRect(ctx, 555, cardY, 475, 150, 18, '#f8fbff', '#bfdbfe');
              drawText(ctx, 'THÔNG TIN DÒNG XE', 577, cardY + 35, { size: 16, weight: 900, color: '#2563eb' });
              drawWrapped(ctx, car.name, 577, cardY + 55, 425, 29, { size: 22, weight: 900, color: '#173a85' });
              drawText(ctx, `Động cơ: ${ENGINE_TYPES[car.engineType] || 'Xăng'}`, 577, cardY + 113, { size: 17, weight: 650, color: '#475569' });
              drawText(ctx, `Màu sắc: ${carColor || 'Chưa chọn'}`, 577, cardY + 138, { size: 17, weight: 650, color: '#475569' });
              y = cardY + 180;

              // Car image
              roundedRect(ctx, 50, y, 980, 410, 22, '#f1f5f9', '#d7dee8');
              let carImageDrawn = false;
              try {
                const image = await loadCanvasImage(resolvedCarImage);
                ctx.fillStyle = '#ffffff'; ctx.fillRect(72, y + 18, 936, 374);
                drawContainedImage(ctx, image, 92, y + 35, 896, 335);
                carImageDrawn = true;
              } catch (error) {}
              if (!carImageDrawn) drawText(ctx, 'CHƯA CÓ ẢNH XE', 540, y + 215, { size: 33, weight: 800, color: '#cbd5e1', align: 'center' });
              roundedRect(ctx, 755, y + 24, 245, 94, 14, 'rgba(255,255,255,.96)', '#d7dee8');
              drawText(ctx, 'GIÁ NIÊM YẾT', 878, y + 57, { size: 15, weight: 900, color: '#64748b', align: 'center' });
              drawText(ctx, formatVND(calculations.price), 878, y + 94, { size: 25, weight: 900, color: '#173a85', align: 'center', maxWidth: 220 });
              y += 440;

              // Vehicle value section
              y = drawSectionHeader(ctx, '1. CHI TIẾT GIÁ TRỊ XE', y);
              y = drawTableRow(ctx, 'Giá xe niêm yết', formatVND(calculations.price), y);
              if (calculations.discountAmount > 0) {
                y = drawTableRow(ctx, 'Giảm giá trực tiếp', `-${formatVND(calculations.discountAmount)}`, y, { fill: '#fff1f2', labelColor: '#be123c', valueColor: '#be123c', bold: true });
                y = drawBulletBlock(ctx, 'CHI TIẾT GIẢM GIÁ', directItems, y, { fill: '#fff7f7', border: '#fecdd3', headingColor: '#be123c' });
              }
              if (giftItems.length) y = drawBulletBlock(ctx, 'QUÀ TẶNG & QUYỀN LỢI', giftItems, y, { fill: '#f0fdf4', border: '#bbf7d0', headingColor: '#15803d' });
              y = drawTableRow(ctx, 'Giá xe dự kiến sau giảm trừ', formatVND(calculations.price - calculations.discountAmount), y, { fill: '#eff6ff', labelColor: '#173a85', valueColor: '#173a85', bold: true, valueSize: 24, minHeight: 68 });
              y += 18;

              // Registration fees
              const effectiveLabel = calculations.effectiveDate ? `Áp dụng ${new Date(`${calculations.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN')}` : '';
              y = drawSectionHeader(ctx, `2. CHI PHÍ ĐĂNG KÝ · ${location.name}`, y, effectiveLabel);
              feeRows.forEach(([label, value]) => { y = drawTableRow(ctx, label, value, y); });
              y += 22;

              // Grand total
              roundedRect(ctx, 50, y, 980, 125, 20, '#17243b', null);
              drawText(ctx, 'TỔNG THANH TOÁN THỰC TẾ', 78, y + 49, { size: 21, weight: 900, color: '#ffffff' });
              drawText(ctx, formatVND(calculations.finalAmount), 1002, y + 82, { size: 38, weight: 900, color: '#fde047', align: 'right', maxWidth: 540 });
              y += 150;

              // Loan summary
              if (loanCalculations?.loanAmount > 0) {
                y = drawSectionHeader(ctx, '3. PHƯƠNG ÁN VAY NGÂN HÀNG · DƯ NỢ GIẢM DẦN', y);
                const loanBoxHeight = 270;
                roundedRect(ctx, 50, y, 980, loanBoxHeight, 16, '#fffbeb', '#fde68a');
                const leftX = 76, rightX = 570;
                const lineGap = 39;
                let loanY = y + 42;
                drawText(ctx, 'Số tiền vay', leftX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, formatVND(loanCalculations.loanAmount), 490, loanY, { size: 21, weight: 900, color: '#b45309', align: 'right' });
                drawText(ctx, 'Vốn khách cần chuẩn bị', rightX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, formatVND(loanCalculations.upfrontPayment), 1004, loanY, { size: 21, weight: 900, color: '#b45309', align: 'right' });
                loanY += lineGap;
                drawText(ctx, 'Thời gian vay', leftX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, `${normalizedLoanParams.loanTermYears} năm (${loanCalculations.months} tháng)`, 490, loanY, { size: 19, weight: 850, color: '#172033', align: 'right' });
                drawText(ctx, 'Gốc cố định/tháng', rightX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, formatVND(loanCalculations.monthlyPrincipal), 1004, loanY, { size: 19, weight: 850, color: '#172033', align: 'right' });
                loanY += lineGap;
                drawText(ctx, 'Lãi suất ưu đãi', leftX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, `${normalizedLoanParams.fixedInterestRate}%/năm · ${loanCalculations.fixedTermMonths} tháng`, 490, loanY, { size: 19, weight: 850, color: '#172033', align: 'right' });
                drawText(ctx, 'Lãi suất thả nổi', rightX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, `${normalizedLoanParams.floatingInterestRate}%/năm`, 1004, loanY, { size: 19, weight: 850, color: '#172033', align: 'right' });
                loanY += lineGap;
                drawText(ctx, 'Gốc + lãi tháng đầu', leftX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, formatVND(loanCalculations.firstMonthTotal), 490, loanY, { size: 19, weight: 900, color: '#15803d', align: 'right' });
                drawText(ctx, 'Tổng lãi dự kiến', rightX, loanY, { size: 18, weight: 700, color: '#64748b' });
                drawText(ctx, formatVND(loanCalculations.totalInterest), 1004, loanY, { size: 19, weight: 900, color: '#be123c', align: 'right' });
                loanY += lineGap;
                if (loanCalculations.firstFloatingMonth) {
                  drawText(ctx, `Tháng ${loanCalculations.firstFloatingMonth.month} bắt đầu thả nổi`, leftX, loanY, { size: 17, weight: 700, color: '#64748b' });
                  drawText(ctx, formatVND(loanCalculations.firstFloatingMonth.totalPayment), 490, loanY, { size: 18, weight: 850, color: '#c2410c', align: 'right' });
                }
                drawText(ctx, 'Tổng trả ngân hàng', rightX, loanY, { size: 17, weight: 700, color: '#64748b' });
                drawText(ctx, formatVND(loanCalculations.totalBankPayment), 1004, loanY, { size: 18, weight: 850, color: '#172033', align: 'right' });
                y += loanBoxHeight + 25;
              }

              // Notes and sales contact
              ctx.strokeStyle = '#17243b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(1030, y); ctx.stroke();
              y += 30;
              const noteText = '* Chi phí thuế, phí mang tính tham khảo và có thể thay đổi theo quy định tại thời điểm xuất hóa đơn, đăng ký xe.\n* Báo giá không thay thế Hợp đồng mua bán chính thức. Khoản vay phụ thuộc phê duyệt của ngân hàng.';
              drawWrapped(ctx, noteText, 55, y, 650, 25, { size: 16, weight: 550, color: '#64748b' });
              roundedRect(ctx, 730, y - 5, 300, 190, 16, '#f8fafc', '#d7dee8');
              drawText(ctx, 'ĐẠI DIỆN BÁN HÀNG', 880, y + 25, { size: 15, weight: 900, color: '#64748b', align: 'center' });
              drawText(ctx, salesInfo.name || 'NGUYỄN HOÀNG TÙNG', 880, y + 58, { size: 21, weight: 900, color: '#172033', align: 'center', maxWidth: 260 });
              drawText(ctx, salesInfo.phone || '0961 018 288', 835, y + 88, { size: 20, weight: 900, color: '#2563eb', align: 'center', maxWidth: 170 });
              try {
                const qrDataUrl = window.GeelyQR?.toDataURL?.(`https://zalo.me/${normalizePhoneForZalo(salesInfo.phone)}`, 220);
                const qrImage = await loadCanvasImage(qrDataUrl);
                ctx.drawImage(qrImage, 930, y + 72, 82, 82);
                drawText(ctx, 'QUÉT ZALO', 971, y + 173, { size: 12, weight: 900, color: '#0f2d64', align: 'center' });
              } catch (error) {}
              y += 205;

              // Crop unused canvas area.
              const finalHeight = Math.min(canvas.height, Math.max(1200, Math.ceil(y + 25)));
              const finalCanvas = document.createElement('canvas');
              finalCanvas.width = canvas.width; finalCanvas.height = finalHeight;
              finalCanvas.getContext('2d').drawImage(canvas, 0, 0, canvas.width, finalHeight, 0, 0, canvas.width, finalHeight);

              const blob = await canvasToJpegBlob(finalCanvas, 0.93);
              const fileName = `BaoGia_Zalo_DayDu_${safeFilePart(customerName)}_${Date.now()}.jpg`;
              let shared = false;
              if (navigator.share && typeof File !== 'undefined') {
                try {
                  const file = new File([blob], fileName, { type: 'image/jpeg' });
                  if (!navigator.canShare || navigator.canShare({ files: [file] })) {
                    await navigator.share({ files: [file], title: 'Báo giá Geely đầy đủ', text: `Báo giá ${car.name}` });
                    shared = true;
                  }
                } catch (error) {
                  if (error?.name === 'AbortError') return showToast('Bạn đã đóng bảng chia sẻ.');
                }
              }
              if (!shared) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url; link.download = fileName; link.rel = 'noopener';
                document.body.appendChild(link); link.click(); link.remove();
                window.setTimeout(() => URL.revokeObjectURL(url), 15000);
              }
              showToast(shared ? 'Đã mở bảng chia sẻ ảnh Zalo đầy đủ!' : 'Đã tải ảnh Zalo đầy đủ!');
            } catch (error) {
              console.error('Lỗi tạo ảnh Zalo:', error);
              showToast(`Không thể tạo ảnh Zalo: ${error?.message || 'lỗi không xác định'}`);
            } finally {
              setIsExporting(false);
            }
          };

          const buildQuotationRecord = () => {
            const existing = quotations.find(item => item.id === currentQuoteId);
            return {
              id: currentQuoteId,
              createdAtMs: existing?.createdAtMs || Date.now(),
              updatedAtMs: Date.now(),
              status: quoteStatus,
              notes: quoteNotes,
              customerName, customerPhone, carColor,
              selectedColorId,
              selectedColorName: carColor,
              selectedColorImagePath: selectedCarColor?.imagePath || (selectedColorId === '__local__' ? '' : resolvedCarImage),
              carId: selectedCarId,
              carName: car?.name || '',
              carEngineType: car?.engineType || 'gasoline',
              selectedLocationId,
              registrationFeeSnapshot: calculations && location ? {
                locationName: location.name,
                taxRate: calculations.taxRate,
                plateFee: calculations.plateFee,
                inspectionFee: calculations.inspectionFee,
                roadFeePerMonth: calculations.roadFeePerMonth,
                civilInsurance: calculations.civilInsurance,
                effectiveDate: calculations.effectiveDate
              } : null,
              selectedPromoIds,
              discount: parseMoney(discount), includePhysicalInsurance, includeServiceFee,
              plateColor, roadFeeYears, tndsOption,
              loanParams: { ...loanParams },
              totalAmount: calculations?.finalAmount || 0,
              upfrontPayment: loanCalculations?.upfrontPayment || 0
            };
          };

          const handleSaveQuotation = async () => {
            if (!customerName.trim() && !customerPhone.trim()) return showToast('Hãy nhập tên hoặc số điện thoại khách hàng.');
            const record = buildQuotationRecord();
            setQuotations(current => [record, ...current.filter(item => item.id !== record.id)]);
            await window.GeelyIDB?.saveQuotation(record).catch(() => {});
            if (syncUser && syncReadyRef.current) {
              try { await window.GeelyFirebaseSync.saveQuotation(record); }
              catch (error) { showToast('Đã lưu trên máy, nhưng chưa đồng bộ Firebase.'); return; }
            }
            showToast('Đã lưu báo giá vào lịch sử.');
          };

          const handleLoadQuotation = record => {
            setCurrentQuoteId(record.id || createQuoteId());
            setQuoteStatus(record.status || 'draft');
            setQuoteNotes(record.notes || '');
            setCustomerName(record.customerName || '');
            setCustomerPhone(record.customerPhone || '');
            const recordCar = cars.find(item => item.id === record.carId);
            if (recordCar) {
              setSelectedCarId(recordCar.id);
              const matchingColor = recordCar.colors?.find(color => color.id === record.selectedColorId)
                || recordCar.colors?.find(color => color.name === (record.selectedColorName || record.carColor));
              const nextColorId = matchingColor?.id || recordCar.defaultColorId || recordCar.colors?.[0]?.id || (carImageMap[recordCar.id] ? '__local__' : '');
              setSelectedColorId(nextColorId);
              setCarColor(matchingColor?.name || record.selectedColorName || record.carColor || (nextColorId === '__local__' ? 'Ảnh riêng' : ''));
            } else {
              setCarColor(record.selectedColorName || record.carColor || '');
            }
            const preferredLocationId = record.selectedLocationId;
            setSelectedLocationId(registrationFees.locations.some(item => item.id === preferredLocationId) ? preferredLocationId : (registrationFees.locations[0]?.id || ''));
            setSelectedPromoIds(Array.isArray(record.selectedPromoIds) ? record.selectedPromoIds : []);
            setDiscount(record.discount ? formatNumber(record.discount) : '');
            setIncludePhysicalInsurance(record.includePhysicalInsurance !== false);
            setIncludeServiceFee(record.includeServiceFee !== false);
            setPlateColor(record.plateColor || 'white');
            setRoadFeeYears(Number(record.roadFeeYears) || 1);
            setTndsOption(record.tndsOption || 'auto');
            if (record.loanParams) setLoanParams(current => ({ ...current, ...record.loanParams }));
            setActiveTab('preview');
            showToast('Đã mở lại báo giá.');
          };

          const handleDeleteQuotation = async id => {
            if (!window.confirm('Xóa báo giá này khỏi lịch sử?')) return;
            setQuotations(current => current.filter(item => item.id !== id));
            await window.GeelyIDB?.deleteQuotation(id).catch(() => {});
            if (syncUser && syncReadyRef.current) await window.GeelyFirebaseSync.deleteQuotation(id).catch(() => {});
            showToast('Đã xóa báo giá.');
          };

          const handleNewQuotation = () => {
            setCurrentQuoteId(createQuoteId());
            setCustomerName(''); setCustomerPhone(''); setCarColor('');
            setSelectedPromoIds([]); setDiscount(''); setQuoteNotes(''); setQuoteStatus('draft');
            setActiveTab('input');
          };

          const handlePrintA4 = async () => {
            const element = captureRef.current;
            if (!element) return showToast('Hãy mở tab Báo Giá trước.');
            await waitForExportCanvases(element);
            if (document.fonts?.ready) await document.fonts.ready;

            const clone = element.cloneNode(true);
            const sourceCanvases = Array.from(element.querySelectorAll('canvas'));
            const clonedCanvases = Array.from(clone.querySelectorAll('canvas'));
            clonedCanvases.forEach((canvas, index) => {
              const image = document.createElement('img');
              try { image.src = sourceCanvases[index]?.toDataURL('image/png') || ''; } catch (error) {}
              image.style.width = '100%'; image.style.height = '100%'; image.style.objectFit = 'contain';
              canvas.replaceWith(image);
            });
            clone.classList.add('print-a4-compact');
            clone.style.transform = 'none';
            clone.style.transformOrigin = 'top left';
            clone.style.width = '800px';
            clone.style.maxWidth = 'none';
            clone.style.boxShadow = 'none';
            clone.style.border = '0';
            clone.style.margin = '0';

            const printWindow = window.open('', '_blank');
            if (!printWindow) return showToast('Trình duyệt đã chặn cửa sổ in.');
            const appCssUrl = new URL('./assets/app.css', window.location.href).href;
            const exportCssUrl = new URL('./assets/export-compat.css', window.location.href).href;
            const safeTitle = String(currentQuoteId || 'BaoGiaGeely').replace(/[<>"']/g, '');
            printWindow.document.write(`<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safeTitle}</title>
<link rel="stylesheet" href="${appCssUrl}"><link rel="stylesheet" href="${exportCssUrl}">
<style>
@page{size:A4 portrait;margin:5mm}
html,body{margin:0!important;padding:0!important;background:#fff!important;width:100%;height:287mm;min-height:0!important;overflow:hidden!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
#print-page{position:relative;width:200mm;height:287mm;margin:0 auto;overflow:hidden;background:#fff}
#print-stage{position:absolute;left:0;top:0;transform-origin:top left}
.print-a4-compact{width:800px!important;padding:18px 26px!important;box-sizing:border-box!important;background:#fff!important}
.print-a4-compact .mb-8{margin-bottom:12px!important}.print-a4-compact .mb-5{margin-bottom:9px!important}.print-a4-compact .mt-12{margin-top:14px!important}.print-a4-compact .mt-4{margin-top:8px!important}
.print-a4-compact .p-5{padding:12px!important}.print-a4-compact .p-4{padding:9px!important}.print-a4-compact .p-3{padding:7px!important}.print-a4-compact .p-2\\.5{padding:6px!important}
.print-a4-compact .pb-5{padding-bottom:10px!important}.print-a4-compact .pt-6{padding-top:10px!important}.print-a4-compact .space-y-1\\.5>:not([hidden])~:not([hidden]){margin-top:3px!important}
.print-a4-compact .h-64{height:170px!important}.print-a4-compact .text-3xl{font-size:23px!important;line-height:1.15!important}.print-a4-compact .text-2xl{font-size:19px!important;line-height:1.15!important}.print-a4-compact .text-xl{font-size:17px!important}.print-a4-compact .text-lg{font-size:15px!important}
.print-a4-compact table{margin-bottom:10px!important;font-size:12px!important;line-height:1.25!important}.print-a4-compact table td{padding-top:5px!important;padding-bottom:5px!important}
.print-a4-compact .rounded-xl{border-radius:8px!important}.print-a4-compact .shadow-lg,.print-a4-compact .shadow-md,.print-a4-compact .shadow-inner{box-shadow:none!important}
@media print{#print-page{break-after:avoid!important;page-break-after:avoid!important}button{display:none!important}}
</style></head>
<body><div id="print-page"><div id="print-stage">${clone.outerHTML}</div></div>
<script>
(async function(){
  const waitImages=()=>Promise.all(Array.from(document.images).map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.onload=resolve;img.onerror=resolve})));
  if(document.fonts&&document.fonts.ready){try{await document.fonts.ready}catch(e){}}
  await waitImages();
  await new Promise(resolve=>setTimeout(resolve,250));
  const page=document.getElementById('print-page');
  const stage=document.getElementById('print-stage');
  const content=document.getElementById('quote-capture-area');
  const pageWidth=page.clientWidth;
  const pageHeight=page.clientHeight;
  const contentWidth=Math.max(1,content.scrollWidth,content.offsetWidth);
  const contentHeight=Math.max(1,content.scrollHeight,content.offsetHeight);
  const scale=Math.min(1,pageWidth/contentWidth,pageHeight/contentHeight);
  stage.style.width=contentWidth+'px';
  stage.style.height=contentHeight+'px';
  stage.style.transform='scale('+scale+')';
  stage.style.left=Math.max(0,(pageWidth-contentWidth*scale)/2)+'px';
  stage.style.top='0px';
  document.title='${safeTitle}';
  setTimeout(()=>window.print(),350);
})();
window.onafterprint=()=>setTimeout(()=>window.close(),150);
<\/script></body></html>`);
            printWindow.document.close();
            showToast('Đã tạo bản A4 thu gọn trong một trang.');
          };

          const renderInputForm = () => (
            <div className="space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tên khách hàng</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="VD: Anh Tuấn" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại</label>
                  <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="VD: 090xxxxxxx" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Dòng xe Geely</label>
                    <select value={selectedCarId} onChange={(e) => handleCarSelection(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-900 text-sm">
                    {cars.map(c => <option key={c.id} value={c.id}>{c.name} - {formatVND(c.price)}</option>)}
                    </select>
                </div>
                <div className="col-span-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Màu sắc</label>
                    {(car?.colors?.length || carImageMap[car?.id]) ? (
                      <select value={selectedColorId} onChange={(e) => handleColorSelection(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold">
                        {(car?.colors || []).map(color => <option key={color.id} value={color.id}>{color.name}</option>)}
                        {carImageMap[car?.id] && <option value="__local__">Ảnh riêng trên máy</option>}
                      </select>
                    ) : (
                      <input type="text" value={carColor} onChange={(e) => setCarColor(e.target.value)} placeholder="VD: Trắng" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                    )}
                </div>
              </div>

              {car?.colors?.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Chọn nhanh màu xe</label>
                  <div className="car-color-quick-grid">
                    {car.colors.map(color => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => handleColorSelection(color.id)}
                        className={`car-color-quick-card rounded-xl border-2 p-1.5 bg-white ${selectedColorId === color.id ? 'border-blue-600 shadow-md' : 'border-gray-200'}`}
                        title={color.name}
                      >
                        <div className="car-color-quick-image rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center">
                          <img src={color.imagePath} alt={`${car.name} ${color.name}`} className="w-full h-full object-contain p-1" onError={e => { e.currentTarget.style.opacity = '0.15'; }} />
                        </div>
                        <div className={`car-color-quick-label mt-1 text-[10px] font-bold ${selectedColorId === color.id ? 'text-blue-700' : 'text-gray-600'}`}>{color.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nơi đăng ký</label>
                <select value={selectedLocationId} onChange={(e) => setSelectedLocationId(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  {registrationFees.locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
                {car && location && calculations && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900">
                    <div className="flex items-center justify-between gap-3"><span>Loại động cơ</span><b>{ENGINE_TYPES[calculations.engineType]}</b></div>
                    <div className="flex items-center justify-between gap-3 mt-1"><span>Trước bạ tự động</span><b>{formatPercentValue(calculations.taxRate)}%</b></div>
                    <div className="flex items-center justify-between gap-3 mt-1"><span>Phí biển số</span><b>{formatVND(calculations.plateFee)}</b></div>
                    <div className="flex items-center justify-between gap-3 mt-1"><span>Ngày áp dụng</span><b>{calculations.effectiveDate ? new Date(`${calculations.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN') : 'Chưa đặt'}</b></div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Loại Biển (Phí ĐB)</label>
                  <select value={plateColor} onChange={(e) => setPlateColor(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium">
                    <option value="white">Trắng ({formatVND(registrationFees.roadFeeMonthlyWhite)}/tháng)</option>
                    <option value="yellow">Vàng ({formatVND(registrationFees.roadFeeMonthlyYellow)}/tháng)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Thời gian nộp ĐB</label>
                  <select value={roadFeeYears} onChange={(e) => setRoadFeeYears(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium">
                    <option value={1}>1 năm</option><option value={2}>2 năm</option><option value={3}>3 năm</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Khuyến mãi (Chọn nhiều)</label>
                {promotions.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 p-3 bg-red-50 border border-red-100 rounded-lg max-h-48 overflow-y-auto">
                    {promotions.map(p => (
                      <label key={p.id} className="flex items-start space-x-3 cursor-pointer p-2 hover:bg-white rounded border border-transparent hover:border-red-200">
                        <input type="checkbox" checked={selectedPromoIds.includes(p.id)} onChange={(e) => { e.target.checked ? setSelectedPromoIds([...selectedPromoIds, p.id]) : setSelectedPromoIds(selectedPromoIds.filter(id => id !== p.id)) }} className="mt-1 w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm font-medium text-gray-800"><b>{PROMOTION_TYPES[p.type] || 'Khuyến mãi'}:</b> {p.name} {p.deductFromPrice && p.value > 0 ? `(-${formatVND(p.value)})` : (p.value > 0 ? `(Giá trị ${formatVND(p.value)})` : '')}</span>
                      </label>
                    ))}
                  </div>
                )}
                <label className="block text-sm font-semibold text-gray-700 mt-3 mb-1">Giảm giá tiền mặt thêm (VNĐ)</label>
                <input type="text" value={discount} onChange={handleDiscountChange} placeholder="Để trống để điền số tiền giảm..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-700" />
              </div>
              
              <div className="pt-2 space-y-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer flex-1">
                    <input type="checkbox" checked={includePhysicalInsurance} onChange={(e) => setIncludePhysicalInsurance(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
                    <span className="text-sm font-medium text-gray-700">Kèm BH vật chất</span>
                  </label>
                  {includePhysicalInsurance && (
                    <div className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                      <input type="number" step="0.1" value={physicalInsuranceRate} onChange={(e) => setPhysicalInsuranceRate(Number(e.target.value))} className="w-14 bg-transparent text-sm text-center outline-none font-bold text-blue-600" />
                      <span className="text-xs font-semibold text-gray-500">%</span>
                    </div>
                  )}
                </div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={includeServiceFee} onChange={(e) => setIncludeServiceFee(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm font-medium text-gray-700">Kèm Phí dịch vụ đăng ký</span>
                </label>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Trạng thái báo giá</label>
                    <select value={quoteStatus} onChange={e => setQuoteStatus(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                      <option value="draft">Bản nháp</option><option value="sent">Đã gửi khách</option><option value="followup">Đang theo dõi</option><option value="test_drive">Hẹn lái thử</option><option value="deposited">Đã đặt cọc</option><option value="lost">Không thành công</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Mã báo giá</label>
                    <div className="px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-black text-blue-800 truncate">{currentQuoteId}</div>
                  </div>
                </div>
                <textarea value={quoteNotes} onChange={e => setQuoteNotes(e.target.value)} placeholder="Ghi chú chăm sóc khách hàng..." className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm min-h-20"></textarea>
              </div>
            </div>
          );

          const renderBankLoan = () => {
            if (!loanCalculations) return null;

            const preferredOptions = [0, 6, 12, 24, 36].filter(month => month <= normalizedLoanParams.months);
            const firstMonth = loanCalculations.firstMonth;
            const lastPreferredMonth = loanCalculations.lastPreferredMonth;
            const firstFloatingMonth = loanCalculations.firstFloatingMonth;
            const finalMonth = loanCalculations.finalMonth;
            const loanAmountInputValue = normalizedLoanParams.loanInputMode === 'amount'
              ? (loanParams.loanAmount === '' ? '' : formatNumber(loanParams.loanAmount))
              : formatNumber(Math.round(loanCalculations.loanAmount));

            const PaymentCard = ({ title, item, tone = 'blue', note = '' }) => {
              if (!item) return null;
              const tones = {
                blue: 'bg-blue-50 border-blue-200 text-blue-700',
                green: 'bg-green-50 border-green-200 text-green-700',
                orange: 'bg-orange-50 border-orange-200 text-orange-700',
                slate: 'bg-slate-50 border-slate-200 text-slate-700'
              };
              return (
                <div className={`border rounded-xl p-3 ${tones[tone] || tones.blue}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase">{title}</p>
                      <p className="text-[11px] opacity-75 mt-0.5">Lãi suất {item.annualRate}%/năm · Dư nợ đầu kỳ {formatVND(item.openingBalance)}</p>
                    </div>
                    <span className="text-xs font-bold whitespace-nowrap">Tháng {item.month}</span>
                  </div>
                  <p className="text-2xl font-black mt-2">{formatVND(item.totalPayment)}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <span>Gốc: <b>{formatVND(item.principalPayment)}</b></span>
                    <span>Lãi: <b>{formatVND(item.interest)}</b></span>
                  </div>
                  {note && <p className="text-[10px] mt-2 opacity-75 italic">{note}</p>}
                </div>
              );
            };

            return (
              <div className="space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Phương án tài chính</h3>
                    <p className="text-xs text-gray-500 mt-1">Phương pháp duy nhất: gốc cố định, lãi tính trên dư nợ giảm dần.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase whitespace-nowrap">Dư nợ giảm dần</span>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <label className="block text-sm font-black text-blue-950">Số tiền khách muốn vay</label>
                        <p className="text-[10px] text-blue-700 mt-0.5">Nhập chính xác số tiền để tránh khoản vay bị lẻ khi chọn theo phần trăm.</p>
                      </div>
                      <span className={`shrink-0 px-2 py-1 rounded-full text-[9px] font-black uppercase ${normalizedLoanParams.loanInputMode === 'amount' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200'}`}>
                        {normalizedLoanParams.loanInputMode === 'amount' ? 'Đang ưu tiên số tiền' : 'Đang tính theo %'}
                      </span>
                    </div>
                    <div className="flex items-center bg-white border-2 border-blue-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={loanAmountInputValue}
                        onChange={(e) => updateLoanAmount(e.target.value)}
                        onBlur={normalizeLoanAmountField}
                        placeholder="Ví dụ: 350.000.000"
                        className="w-full px-3 py-3 outline-none text-lg font-black text-blue-900 bg-transparent"
                      />
                      <span className="px-3 py-3 bg-blue-100 text-blue-700 font-black border-l border-blue-200">VNĐ</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                      <div className="rounded-lg bg-white border border-blue-100 px-2.5 py-2">
                        <span className="text-gray-500 block">Tỷ lệ vay tương đương</span>
                        <b className="text-blue-700">{loanCalculations.loanPercent.toFixed(2)}% giá xe</b>
                      </div>
                      <div className="rounded-lg bg-white border border-blue-100 px-2.5 py-2">
                        <span className="text-gray-500 block">Tỷ lệ vốn tự có</span>
                        <b className="text-blue-700">{loanCalculations.effectiveDownPaymentPercent.toFixed(2)}%</b>
                      </div>
                    </div>
                    {loanCalculations.loanAmountWasClamped && <p className="text-[10px] text-red-600 font-semibold mt-2">Số tiền nhập vượt giá xe và đang được giới hạn ở {formatVND(loanCalculations.maxLoanAmount)}.</p>}
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Điều chỉnh nhanh theo tỷ lệ trả trước</span>
                      <span className="text-sm font-bold text-blue-600">{loanCalculations.effectiveDownPaymentPercent.toFixed(1)}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={loanCalculations.effectiveDownPaymentPercent} onChange={(e) => updateDownPaymentPercent(e.target.value)} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                    <p className="text-[10px] text-gray-500 mt-1">Khi kéo thanh này, ứng dụng chuyển sang tính theo tỷ lệ. Chỉ cần nhập lại số tiền phía trên để ưu tiên khoản vay chính xác.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Thời gian vay</label>
                      <select value={normalizedLoanParams.loanTermYears} onChange={(e) => updateLoanTermYears(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(y => <option key={y} value={y}>{y} năm ({y * 12} tháng)</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Thời gian ưu đãi</label>
                      <select value={normalizedLoanParams.fixedTermMonths} onChange={(e) => updateLoanParam('fixedTermMonths', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium">
                        {preferredOptions.map(month => <option key={month} value={month}>{month === 0 ? 'Không ưu đãi' : `${month} tháng`}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Lãi suất ưu đãi (%/năm)</label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <input
                          type="number"
                          inputMode="decimal"
                          min="0"
                          max="100"
                          step="0.1"
                          disabled={normalizedLoanParams.fixedTermMonths === 0}
                          value={loanParams.fixedInterestRate}
                          onChange={(e) => updateLoanRate('fixedInterestRate', e.target.value)}
                          onBlur={() => normalizeLoanRateField('fixedInterestRate')}
                          className="w-full px-3 py-2 outline-none text-sm font-medium text-blue-600 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                        <span className="px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Lãi thả nổi dự kiến (%/năm)</label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <input
                          type="number"
                          inputMode="decimal"
                          min="0"
                          max="100"
                          step="0.1"
                          value={loanParams.floatingInterestRate}
                          onChange={(e) => updateLoanRate('floatingInterestRate', e.target.value)}
                          onBlur={() => normalizeLoanRateField('floatingInterestRate')}
                          className="w-full px-3 py-2 outline-none text-sm font-medium text-orange-600"
                        />
                        <span className="px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm">%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Kết quả bên dưới cập nhật ngay khi thay đổi tỷ lệ trả trước, kỳ hạn, thời gian ưu đãi hoặc lãi suất.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-xs font-semibold text-blue-900">Vốn khách cần chuẩn bị + chi phí lăn bánh</p>
                    <p className="text-xl font-black text-blue-700 mt-1">{formatVND(loanCalculations.upfrontPayment)}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <p className="text-xs font-semibold text-slate-700">Số tiền vay ngân hàng</p>
                    <p className="text-xl font-black text-slate-900 mt-1">{formatVND(loanCalculations.loanAmount)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-gray-50 border"><span className="text-gray-500 block text-xs">Gốc cố định mỗi tháng</span><b>{formatVND(loanCalculations.monthlyPrincipal)}</b></div>
                  <div className="p-3 rounded-lg bg-gray-50 border"><span className="text-gray-500 block text-xs">Tổng tiền lãi dự kiến</span><b className="text-orange-600">{formatVND(loanCalculations.totalInterest)}</b></div>
                  <div className="p-3 rounded-lg bg-gray-50 border"><span className="text-gray-500 block text-xs">Tổng trả ngân hàng</span><b>{formatVND(loanCalculations.totalBankPayment)}</b></div>
                  <div className="p-3 rounded-lg bg-gray-50 border"><span className="text-gray-500 block text-xs">Bình quân mỗi tháng</span><b>{formatVND(loanCalculations.averageMonthlyPayment)}</b></div>
                </div>

                <div className="space-y-3">
                  <PaymentCard title="Kỳ thanh toán đầu tiên" item={firstMonth} tone="green" />
                  {lastPreferredMonth && lastPreferredMonth.month !== firstMonth?.month && (
                    <PaymentCard title="Kỳ cuối thời gian ưu đãi" item={lastPreferredMonth} tone="blue" />
                  )}
                  {firstFloatingMonth && (
                    <PaymentCard title="Kỳ đầu lãi suất thả nổi" item={firstFloatingMonth} tone="orange" note="Lãi suất thả nổi là mức dự kiến và có thể thay đổi theo chính sách ngân hàng." />
                  )}
                  {finalMonth && finalMonth.month !== firstMonth?.month && finalMonth.month !== lastPreferredMonth?.month && finalMonth.month !== firstFloatingMonth?.month && (
                    <PaymentCard title="Kỳ thanh toán cuối cùng" item={finalMonth} tone="slate" />
                  )}
                </div>

                <button onClick={handleExportExcel} className="w-full mt-2 py-3 bg-green-100 text-green-700 border-2 border-green-600 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white transition-colors">
                  Tải lịch trả nợ dư nợ giảm dần (CSV)
                </button>
              </div>
            );
          }

          const renderSettings = () => (
            <div className="space-y-4 pb-20">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-black text-gray-800">☁️ Đồng Bộ Firebase</h3>
                    <p className="text-xs text-gray-500 mt-1">Đồng bộ riêng từng xe, khuyến mãi, cài đặt và lịch sử báo giá.</p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full ${
                    ['synced'].includes(syncStatus.code) ? 'bg-green-100 text-green-700' :
                    ['pending', 'queued', 'working'].includes(syncStatus.code) ? 'bg-yellow-100 text-yellow-700' :
                    ['error'].includes(syncStatus.code) ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {syncStatus.code === 'synced' ? 'ĐÃ ĐỒNG BỘ' :
                     syncStatus.code === 'offline' ? 'NGOẠI TUYẾN' :
                     ['pending', 'queued'].includes(syncStatus.code) ? 'ĐANG CHỜ' :
                     syncStatus.code === 'working' ? 'ĐANG XỬ LÝ' :
                     syncStatus.code === 'error' ? 'CÓ LỖI' :
                     syncUser ? 'CHƯA THIẾT LẬP' : 'CHƯA ĐĂNG NHẬP'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3">
                  <p className="text-sm font-semibold text-slate-700">{syncStatus.message || firebaseState.message}</p>
                  {syncStatus.updatedAtMs > 0 && (
                    <p className="text-[11px] text-slate-500 mt-1">Cập nhật gần nhất: {formatSyncTime(syncStatus.updatedAtMs)}</p>
                  )}
                  {!firebaseState.online && <p className="text-[11px] font-bold text-orange-600 mt-1">Thiết bị đang không có mạng.</p>}
                  {firebaseState.sdk === 'error' && (
                    <p className="text-[11px] text-red-600 mt-1">{firebaseState.error || 'Không tải được thư viện Firebase.'}</p>
                  )}
                </div>

                {!syncUser ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleFirebaseSignIn}
                      disabled={firebaseState.sdk === 'loading'}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-sm disabled:opacity-50"
                    >
                      {firebaseState.sdk === 'loading' ? 'Đang tải Firebase...' : 'Đăng nhập bằng Google'}
                    </button>
                    {firebaseState.sdk === 'error' && (
                      <button type="button" onClick={() => window.GeelyFirebaseSync?.retry?.().catch(() => {})} className="w-full py-2.5 bg-white text-blue-700 border-2 border-blue-500 rounded-xl font-bold text-sm">Thử tải lại Firebase</button>
                    )}
                    <p className="text-[11px] text-gray-500 text-center">Hãy đăng nhập cùng một tài khoản Google trên điện thoại và máy tính.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                      <div className="min-w-0">
                        <p className="font-bold text-blue-900 truncate">{syncUser.displayName || 'Tài khoản Google'}</p>
                        <p className="text-xs text-blue-700 truncate">{syncUser.email}</p>
                      </div>
                      <button type="button" onClick={handleFirebaseSignOut} className="shrink-0 px-3 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold text-xs">Đăng xuất</button>
                    </div>

                    {syncStatus.code === 'choice_needed' && (
                      <div className="space-y-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-xs font-bold text-yellow-900">Hai nơi đang có dữ liệu. Hãy chọn bản chính cho lần thiết lập đầu tiên:</p>
                        <button type="button" onClick={handleUploadCurrentToCloud} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm">Đưa dữ liệu thiết bị này lên Firebase</button>
                        <button type="button" onClick={handleDownloadCloudToDevice} className="w-full py-2.5 bg-white text-yellow-800 border-2 border-yellow-500 rounded-lg font-bold text-sm">Tải dữ liệu Firebase về thiết bị này</button>
                      </div>
                    )}

                    {syncStatus.code === 'cloud_empty' && (
                      <button type="button" onClick={handleUploadCurrentToCloud} className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm">Đưa dữ liệu hiện tại lên Firebase</button>
                    )}

                    {!['choice_needed', 'cloud_empty'].includes(syncStatus.code) && (
                      <button type="button" onClick={handleSyncNow} className="w-full py-2.5 bg-green-50 text-green-700 border-2 border-green-500 rounded-xl font-bold text-sm">Đồng bộ ngay</button>
                    )}
                  </div>
                )}

                <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-xl text-[11px] text-orange-800 leading-relaxed">
                  <b>Ảnh chuẩn được đồng bộ bằng đường dẫn GitHub.</b> Ảnh bạn chọn từ thiết bị được lưu riêng trong IndexedDB và sẽ ưu tiên hiển thị trên thiết bị đó.
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">👨‍💼 Thông Tin Bán Hàng (In trên Báo giá)</h3>
                <input type="text" placeholder="Tên (VD: Tuấn Geely)" value={salesInfo.name} onChange={e => setSalesInfo({...salesInfo, name: e.target.value})} className="w-full px-3 py-2 mb-2 bg-gray-50 border rounded-lg text-sm" />
                <input type="tel" placeholder="Số điện thoại" value={salesInfo.phone} onChange={e => setSalesInfo({...salesInfo, phone: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">🛠 Cài Đặt Phí Dịch Vụ Đăng Ký</h3>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                   <input type="text" inputMode="numeric" value={formatNumber(serviceFeeAmount)} onChange={e => setServiceFeeAmount(parseMoney(e.target.value))} className="w-full px-3 py-2 outline-none text-sm font-medium text-blue-600 bg-transparent" />
                   <span className="px-3 text-gray-500 font-semibold border-l text-sm bg-white">VNĐ</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-black text-gray-800">🧾 Phí đăng ký & khu vực</h3>
                    <p className="text-xs text-gray-500 mt-1">Ứng dụng tự chọn tỷ lệ trước bạ theo loại động cơ của xe.</p>
                  </div>
                  <button onClick={handleRestoreDefaultFees} className="shrink-0 px-2.5 py-1.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-[10px] font-black">Khôi phục mặc định</button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <label className="text-xs font-bold text-gray-600">Ngày áp dụng chung
                    <input type="date" value={registrationFees.effectiveDate || ''} onChange={e => updateRegistrationFee('effectiveDate', e.target.value)} className="mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium" />
                  </label>
                  <label className="text-xs font-bold text-gray-600">Phí đăng kiểm
                    <input type="text" inputMode="numeric" value={formatNumber(registrationFees.inspectionFee)} onChange={e => updateRegistrationFee('inspectionFee', parseMoney(e.target.value))} className="mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </label>
                  <label className="text-xs font-bold text-gray-600">Đường bộ biển trắng/tháng
                    <input type="text" inputMode="numeric" value={formatNumber(registrationFees.roadFeeMonthlyWhite)} onChange={e => updateRegistrationFee('roadFeeMonthlyWhite', parseMoney(e.target.value))} className="mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </label>
                  <label className="text-xs font-bold text-gray-600">Đường bộ biển vàng/tháng
                    <input type="text" inputMode="numeric" value={formatNumber(registrationFees.roadFeeMonthlyYellow)} onChange={e => updateRegistrationFee('roadFeeMonthlyYellow', parseMoney(e.target.value))} className="mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </label>
                  <label className="text-xs font-bold text-gray-600">TNDS xe 5 chỗ
                    <input type="text" inputMode="numeric" value={formatNumber(registrationFees.civilInsurance5Seats)} onChange={e => updateRegistrationFee('civilInsurance5Seats', parseMoney(e.target.value))} className="mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </label>
                  <label className="text-xs font-bold text-gray-600">TNDS xe 7 chỗ
                    <input type="text" inputMode="numeric" value={formatNumber(registrationFees.civilInsurance7Seats)} onChange={e => updateRegistrationFee('civilInsurance7Seats', parseMoney(e.target.value))} className="mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </label>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between mb-2"><h4 className="text-sm font-black text-gray-700">Khu vực đăng ký</h4><span className="text-[10px] font-bold text-gray-500">{registrationFees.locations.length} khu vực</span></div>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {registrationFees.locations.map(area => (
                      <div key={area.id} className={`p-3 rounded-xl border ${editingLocationId === area.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="font-black text-sm text-gray-800 truncate">{area.name}</div>
                            <div className="text-xs text-blue-700 font-bold mt-0.5">Biển số: {formatVND(area.plateFee)}</div>
                            <div className="grid grid-cols-4 gap-1 mt-2">
                              {Object.entries(ENGINE_TYPES).map(([type,label]) => <div key={type} className="bg-white border border-gray-200 rounded-md p-1 text-center"><div className="text-[8px] uppercase font-black text-gray-400 truncate">{label}</div><div className="text-[11px] font-black text-gray-700">{formatPercentValue(area.taxRates?.[type])}%</div></div>)}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1.5">Áp dụng: {area.effectiveDate ? new Date(`${area.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN') : 'Chưa đặt'}</div>
                          </div>
                          <div className="flex flex-col gap-1.5 shrink-0"><button onClick={() => handleStartEditLocation(area)} className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Sửa</button><button onClick={() => handleDeleteLocation(area.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold">Xóa</button></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="registration-area-editor" className={`mt-4 pt-4 border-t space-y-3 scroll-mt-24 ${editingLocationId ? 'border-blue-300' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between"><h4 className={`font-black text-sm uppercase ${editingLocationId ? 'text-blue-700' : 'text-gray-700'}`}>{editingLocationId ? 'Chỉnh sửa khu vực' : 'Thêm khu vực mới'}</h4>{editingLocationId && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">ĐANG SỬA</span>}</div>
                  <input type="text" value={newLocationName} onChange={e => setNewLocationName(e.target.value)} placeholder="Tên khu vực (VD: Hải Phòng)" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs font-bold text-gray-600">Phí biển số
                      <input type="text" inputMode="numeric" value={newLocationPlateFee} onChange={e => formatNumberInput(e, setNewLocationPlateFee)} placeholder="1.000.000" className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </label>
                    <label className="text-xs font-bold text-gray-600">Ngày áp dụng
                      <input type="date" value={newLocationEffectiveDate || ''} onChange={e => setNewLocationEffectiveDate(e.target.value)} className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </label>
                  </div>
                  <div><p className="text-xs font-black text-gray-600 mb-2">Tỷ lệ trước bạ theo loại động cơ (%)</p><div className="grid grid-cols-2 gap-2">{Object.entries(ENGINE_TYPES).map(([type,label]) => <label key={type} className="text-xs font-bold text-gray-600">{label}<div className="mt-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"><input type="number" min="0" max="100" step="0.1" value={formatPercentValue(newLocationTaxRates[type])} onChange={e => setNewLocationTaxRates(current => ({ ...current, [type]: Math.max(0, Number(e.target.value) || 0) / 100 }))} className="w-full px-3 py-2 outline-none bg-transparent text-sm"/><span className="px-2 text-gray-500 font-bold">%</span></div></label>)}</div></div>
                  <div className={`grid ${editingLocationId ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>{editingLocationId && <button onClick={resetLocationEditor} className="py-2.5 bg-white text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm">Hủy</button>}<button onClick={handleSaveLocation} className="py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm">{editingLocationId ? 'Lưu khu vực' : '+ Thêm khu vực'}</button></div>
                </div>

                <p className="mt-3 text-[10px] text-orange-700 bg-orange-50 border border-orange-100 rounded-lg p-2 leading-relaxed">Các mức đang hiển thị là cấu hình vận hành của ứng dụng. Hãy cập nhật theo chính sách thực tế trước khi gửi báo giá cho khách.</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-1">🚘 Quản Lý Dòng Xe & Hình Ảnh</h3>
                <p className="text-xs text-gray-500 mb-3">Bấm <b>Sửa</b> để cập nhật xe đã có. Có thể dán link ảnh hoặc chọn ảnh trực tiếp từ điện thoại/máy tính.</p>

                <div className="space-y-2 mb-4 max-h-80 overflow-y-auto pr-1">
                  {cars.map(c => (
                    <div key={c.id} className={`p-2.5 rounded-xl border text-sm ${editingCarId === c.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                          <CarSilhouette className="w-14 text-slate-200" />
                          {(c.colors?.find(color => color.id === c.defaultColorId)?.imagePath || c.colors?.[0]?.imagePath || carImageMap[c.id] || c.imagePath) && (
                            <img
                              src={c.colors?.find(color => color.id === c.defaultColorId)?.imagePath || c.colors?.[0]?.imagePath || carImageMap[c.id] || c.imagePath}
                              crossOrigin="anonymous"
                              alt={c.name}
                              className="absolute inset-0 w-full h-full object-contain p-1 bg-white"
                              onError={e => { e.currentTarget.style.display = 'none'; }}
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-gray-800 truncate">{c.name}</div>
                          <div className="text-blue-600 font-semibold">{formatVND(c.price)}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            {Number(c.seats) || 5} chỗ · {ENGINE_TYPES[c.engineType] || 'Xăng'} · {(c.colors || []).length} màu · {carImageMap[c.id] ? 'Có ảnh riêng' : 'Ảnh GitHub'}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button onClick={() => handleStartEditCar(c)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs">Sửa</button>
                          <button onClick={() => handleDeleteCar(c.id)} className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-bold text-xs">Xóa</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div id="car-editor" className={`pt-4 border-t space-y-3 scroll-mt-24 ${editingCarId ? 'border-blue-300' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`font-black text-sm uppercase ${editingCarId ? 'text-blue-700' : 'text-gray-700'}`}>
                      {editingCarId ? 'Chỉnh sửa dòng xe' : 'Thêm dòng xe mới'}
                    </h4>
                    {editingCarId && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">ĐANG SỬA</span>}
                  </div>

                  <input type="text" placeholder="Tên xe (VD: Geely EX5)" value={newCarName} onChange={e => setNewCarName(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />

                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" inputMode="numeric" placeholder="Giá tiền" value={newCarPrice} onChange={e => formatNumberInput(e, setNewCarPrice)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <select value={newCarSeats} onChange={e => setNewCarSeats(Number(e.target.value))} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option value={5}>Xe 5 chỗ</option>
                      <option value={7}>Xe 7 chỗ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Loại động cơ — dùng để tự chọn mức trước bạ</label>
                    <select value={newCarEngineType} onChange={e => setNewCarEngineType(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      {Object.entries(ENGINE_TYPES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Đường dẫn ảnh dự phòng</label>
                    <input type="text" placeholder="./assets/cars/Ex2/ex2-moon-white.png" value={newCarImagePath} onChange={e => setNewCarImagePath(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h5 className="text-xs font-black uppercase text-blue-900">Màu xe & ảnh GitHub</h5>
                        <p className="text-[10px] text-blue-700 mt-0.5">Danh sách này đồng bộ qua Firebase; ảnh được đọc trực tiếp từ GitHub Pages.</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        {DEFAULT_CAR_COLOR_GROUPS[editingCarId] && <button type="button" onClick={loadDefaultEditorColors} className="px-2.5 py-2 bg-white text-blue-700 border border-blue-300 rounded-lg text-[10px] font-bold">Nạp màu chuẩn</button>}
                        <button type="button" onClick={addEditorColor} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">+ Thêm màu</button>
                      </div>
                    </div>

                    {newCarColors.length === 0 && <div className="text-xs text-gray-500 bg-white border border-dashed rounded-lg p-3 text-center">Chưa có màu xe. Nhấn “Thêm màu” để tạo danh sách.</div>}
                    <div className="space-y-2">
                      {newCarColors.map((color, index) => (
                        <div key={`${color.id}-${index}`} className="bg-white border border-gray-200 rounded-xl p-2.5">
                          <div className="flex gap-2 items-center">
                            <input type="radio" name="default-car-color" checked={newCarDefaultColorId === color.id} onChange={() => setNewCarDefaultColorId(color.id)} title="Đặt làm màu mặc định" className="w-4 h-4" />
                            <input type="text" value={color.name} onChange={e => updateEditorColor(index, 'name', e.target.value)} placeholder="Tên màu" className="flex-1 min-w-0 px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" />
                            <button type="button" onClick={() => removeEditorColor(index)} className="px-2.5 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold">Xóa</button>
                          </div>
                          <input type="text" value={color.imagePath} onChange={e => updateEditorColor(index, 'imagePath', e.target.value)} placeholder="./assets/cars/TenThuMuc/ten-anh.png" className="w-full mt-2 px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[11px]" />
                          {color.imagePath && <div className="mt-2 h-20 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center"><img src={color.imagePath} alt={color.name || 'Màu xe'} className="w-full h-full object-contain p-1" onError={e => { e.currentTarget.style.opacity = '0.15'; }} /></div>}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500">Nút tròn bên trái dùng để chọn màu mặc định khi mở dòng xe.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label className={`w-full py-2.5 rounded-lg font-bold text-sm text-center cursor-pointer border-2 transition-colors ${isProcessingCarImage ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none' : 'bg-green-50 text-green-700 border-green-500 hover:bg-green-100'}`}>
                      <input type="file" accept="image/*" onChange={handleCarImageFileChange} className="hidden" disabled={isProcessingCarImage} />
                      {isProcessingCarImage ? 'Đang xử lý ảnh...' : 'Chọn ảnh riêng trên máy'}
                    </label>
                    <button type="button" onClick={() => setNewCarImage('')} disabled={!newCarImage || isProcessingCarImage} className="w-full py-2.5 bg-gray-100 text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm disabled:opacity-40">Bỏ ảnh cục bộ</button>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed">Đường dẫn GitHub được đồng bộ trên mọi thiết bị. Ảnh chọn trực tiếp được nén và lưu trong IndexedDB, không làm đầy localStorage.</p>

                  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <CarSilhouette className="w-44 text-slate-200" />
                    {(newCarImage || newCarColors.find(color => color.id === newCarDefaultColorId)?.imagePath || newCarImagePath) && (
                      <img src={newCarImage || newCarColors.find(color => color.id === newCarDefaultColorId)?.imagePath || newCarImagePath} crossOrigin="anonymous" alt="Xem trước ảnh xe" className="absolute inset-0 w-full h-full object-contain p-3 bg-white" onError={e => { e.currentTarget.style.display = 'none'; }} />
                    )}
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-white/90 text-gray-500 px-2 py-1 rounded-md border">{newCarImage ? 'ẢNH CỤC BỘ' : (newCarColors.length ? 'MÀU MẶC ĐỊNH' : 'ẢNH GITHUB')}</span>
                  </div>

                  <div className={`grid ${editingCarId ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                    {editingCarId && (
                      <button onClick={resetCarEditor} className="w-full py-2.5 bg-white text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm">Hủy chỉnh sửa</button>
                    )}
                    <button onClick={handleSaveCar} disabled={isProcessingCarImage} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm disabled:opacity-50">
                      {editingCarId ? 'Lưu thay đổi' : '+ Thêm xe'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">🎁 Quản Lý Khuyến Mãi</h3>
                <div className="space-y-2 mb-3 max-h-60 overflow-y-auto">
                  {promotions.map(p => (
                    <div key={p.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border text-sm"><div className="font-medium"><span className="text-[10px] uppercase font-black text-blue-600">{PROMOTION_TYPES[p.type] || 'Khuyến mãi'}</span><br/>{p.name} {p.value > 0 ? <span className={p.deductFromPrice ? "text-red-500 block text-xs font-bold" : "text-gray-500 block text-xs font-bold"}>{p.deductFromPrice ? '-' : 'Giá trị '}{formatVND(p.value)}</span> : null}</div><button onClick={() => handleDeletePromo(p.id)} className="text-red-500 font-bold p-2 text-xs">Xóa</button></div>
                  ))}
                </div>
                <div className="pt-3 border-t space-y-2">
                  <input type="text" placeholder="Tên KM (VD: Tặng thảm sàn)" value={newPromoName} onChange={e => setNewPromoName(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
                  <div className="grid grid-cols-2 gap-2">
                    <select value={newPromoType} onChange={e => setNewPromoType(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm">{Object.entries(PROMOTION_TYPES).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select>
                    <input type="text" inputMode="numeric" placeholder="Giá trị VNĐ" value={newPromoValue} onChange={e => formatNumberInput(e, setNewPromoValue)} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
                  </div>
                  <label className="flex items-center gap-2 p-2 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-700"><input type="checkbox" checked={newPromoDeduct} onChange={e => setNewPromoDeduct(e.target.checked)} className="w-4 h-4"/>Trừ trực tiếp vào giá xe</label>
                  <button onClick={handleAddPromo} className="w-full py-2 bg-red-100 text-red-700 font-bold rounded-lg text-sm">+ Thêm Khuyến Mãi</button>
                </div>
              </div>
            </div>
          );

          const renderHistory = () => {
            const keyword = historySearch.trim().toLowerCase();
            const items = quotations.filter(item => !keyword || [item.id, item.customerName, item.customerPhone, item.carName].some(value => String(value || '').toLowerCase().includes(keyword)));
            const statusLabels = { draft: 'Bản nháp', sent: 'Đã gửi', followup: 'Đang theo dõi', test_drive: 'Hẹn lái thử', deposited: 'Đã đặt cọc', lost: 'Không thành công' };
            return (
              <div className="space-y-4 pb-24">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-3"><div><h3 className="font-black text-gray-800">📋 Lịch sử báo giá</h3><p className="text-xs text-gray-500 mt-1">Được lưu trên máy và đồng bộ Firebase khi đăng nhập.</p></div><button onClick={handleNewQuotation} className="px-3 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs">+ Báo giá mới</button></div>
                  <input value={historySearch} onChange={e => setHistorySearch(e.target.value)} placeholder="Tìm tên, SĐT, xe hoặc mã báo giá..." className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                </div>
                {items.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500"><p className="font-bold">Chưa có báo giá phù hợp</p><p className="text-xs mt-1">Lưu báo giá tại tab Báo Giá để theo dõi khách hàng.</p></div>
                ) : items.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><p className="text-[11px] font-black text-blue-600">{item.id}</p><p className="font-black text-gray-900 truncate">{item.customerName || 'Khách hàng chưa đặt tên'}</p><p className="text-xs text-gray-500">{item.customerPhone || 'Chưa có SĐT'} · {item.carName || 'Chưa chọn xe'}</p></div>
                      <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-700 rounded-full">{statusLabels[item.status] || 'Bản nháp'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs"><div className="p-2 bg-blue-50 rounded-lg"><span className="text-gray-500">Tổng thanh toán</span><div className="font-black text-blue-800">{formatVND(item.totalAmount)}</div></div><div className="p-2 bg-yellow-50 rounded-lg"><span className="text-gray-500">Cập nhật</span><div className="font-bold text-yellow-800">{new Date(item.updatedAtMs || item.createdAtMs || Date.now()).toLocaleDateString('vi-VN')}</div></div></div>
                    {item.notes && <p className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg line-clamp-2">{item.notes}</p>}
                    <div className="grid grid-cols-3 gap-2 mt-3"><button onClick={() => handleLoadQuotation(item)} className="py-2 bg-blue-600 text-white rounded-lg font-bold text-xs">Mở lại</button><button onClick={() => { handleLoadQuotation(item); setCurrentQuoteId(createQuoteId()); }} className="py-2 bg-green-50 border border-green-300 text-green-700 rounded-lg font-bold text-xs">Nhân bản</button><button onClick={() => handleDeleteQuotation(item.id)} className="py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg font-bold text-xs">Xóa</button></div>
                  </div>
                ))}
              </div>
            );
          };

          const renderQuotePreview = () => {
            if (!calculations || !car) return null;
            return (
              <div ref={previewContainerRef} className="w-full flex justify-center mb-24">
                <div
                  className="relative shrink-0"
                  style={{
                    width: `${800 * previewScale}px`,
                    height: quoteHeight ? `${quoteHeight * previewScale}px` : 'auto'
                  }}
                >
                  <div 
                    ref={captureRef}
                    id="quote-capture-area" 
                    className="bg-white relative shadow-md shrink-0 border border-gray-200" 
                    style={{ 
                      width: '800px', 
                      padding: '40px 50px', 
                      boxSizing: 'border-box',
                      transform: `scale(${previewScale})`,
                      transformOrigin: 'top left'
                    }}
                  >
                  
                  <div className="flex justify-between items-start border-b-[3px] border-slate-800 pb-5 mb-8">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <GeelyLogo className="w-32 h-auto text-slate-800" color="currentColor" />
                      </div>
                      <span className="font-black text-2xl uppercase text-slate-800 tracking-wide">Hải Dương</span>
                      <span className="text-sm text-gray-500 font-medium uppercase tracking-widest mt-1">Đại lý 3S Chính Hãng</span>
                    </div>
                    <div className="text-right text-sm space-y-1.5 text-gray-600 pt-2">
                      <p>Mã Báo Giá: <span className="font-bold text-slate-800">{quoteData.code}</span></p>
                      <p>Ngày lập: <span className="font-medium text-slate-800">{quoteData.date}</span></p>
                      <p>Hiệu lực đến: <span className="font-bold text-red-600">{quoteData.validUntil}</span></p>
                    </div>
                  </div>

                  <h1 className="text-3xl font-black text-center uppercase text-slate-800 mb-8 tracking-wide">Báo Giá Lăn Bánh Xe Ô Tô</h1>

                  <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                      <div className="border border-gray-300 p-4 rounded-lg bg-slate-50/50">
                          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">Thông tin khách hàng</p>
                          <p className="font-black text-lg text-slate-800">{customerName || 'Khách hàng cá nhân/Doanh nghiệp'}</p>
                          {customerPhone && <p className="text-gray-700 font-medium mt-1">SĐT: {customerPhone}</p>}
                      </div>
                      <div className="border border-blue-200 p-4 rounded-lg bg-blue-50/30">
                          <p className="text-blue-500 text-xs uppercase font-bold tracking-wider mb-2">Thông tin dòng xe</p>
                          <p className="font-black text-lg text-blue-900">{car.name}</p>
                          <p className="text-slate-700 font-medium mt-1">Động cơ: {ENGINE_TYPES[car.engineType] || 'Xăng'}</p>
                          {carColor && <p className="text-slate-700 font-medium mt-1">Màu sắc: {carColor}</p>}
                      </div>
                  </div>

                  <div className="w-full h-64 bg-slate-100 flex items-center justify-center mb-8 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner">
                      {resolvedCarImage ? (
                        <CarImageCanvas src={resolvedCarImage} alt={car.name} />
                      ) : (
                        <CarSilhouette className="w-72 text-slate-300" />
                      )}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-5 py-3 rounded-lg shadow-md border border-slate-200 text-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Giá Niêm Yết</p>
                        <p className="text-2xl font-black text-blue-900 leading-none">{formatVND(calculations.price)}</p>
                      </div>
                  </div>

                  <table className="w-full text-[15px] mb-8 border-collapse">
                      <tbody>
                          <tr className="bg-slate-100 border-y border-slate-300"><td className="p-3 font-black text-slate-800 uppercase" colSpan="2">1. Chi tiết giá trị xe</td></tr>
                          <tr className="border-b border-slate-200 border-dashed">
                            <td className="p-3 text-slate-700">Giá xe niêm yết</td>
                            <td className="p-3 text-right font-bold text-slate-800">{formatVND(calculations.price)}</td>
                          </tr>
                          
                          {calculations.discountAmount > 0 && (
                            <tr className="border-b border-slate-200 border-dashed bg-red-50/50">
                              <td className="p-3 text-red-600">
                                <span className="font-bold">Giảm giá trực tiếp</span>
                                <ul className="text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600">
                                  {calculations.selectedPromotions.filter(p => p.deductFromPrice).map(p => <li key={p.id}>{p.name}</li>)}
                                  {parseMoney(discount) > 0 && <li>Giảm tiền mặt bổ sung</li>}
                                </ul>
                              </td>
                              <td className="p-3 text-right font-bold text-red-600 align-top">-{formatVND(calculations.discountAmount)}</td>
                            </tr>
                          )}
                          {calculations.giftPromotions.length > 0 && (
                            <tr className="border-b border-slate-200 border-dashed bg-green-50/50">
                              <td className="p-3 text-green-700"><span className="font-bold">Quà tặng & quyền lợi</span><ul className="text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600">{calculations.giftPromotions.map(p => <li key={p.id}>{p.name}{p.value > 0 ? ` (giá trị ${formatVND(p.value)})` : ''}</li>)}</ul></td>
                              <td className="p-3 text-right font-bold text-green-700 align-top">Không trừ giá</td>
                            </tr>
                          )}
                          
                          <tr className="border-b-2 border-blue-200 bg-blue-50/50">
                            <td className="p-3 font-bold text-blue-900">Giá xe dự kiến sau giảm trừ</td>
                            <td className="p-3 text-right font-black text-blue-900 text-lg">{formatVND(calculations.price - calculations.discountAmount)}</td>
                          </tr>

                          <tr className="bg-slate-100 border-b border-slate-300"><td className="p-3 font-black text-slate-800 uppercase mt-4 block border-none">2. Chi phí đăng ký (Tạm tính tại {location.name})</td><td className="p-3 text-right text-[10px] font-bold text-slate-500">Áp dụng {calculations.effectiveDate ? new Date(`${calculations.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN') : ''}</td></tr>
                          <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Lệ phí trước bạ ({formatPercentValue(calculations.taxRate)}% · {ENGINE_TYPES[calculations.engineType]})</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.taxFee)}</td></tr>
                          <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Phí cấp biển số</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.plateFee)}</td></tr>
                          <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Phí đăng kiểm</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.inspectionFee)}</td></tr>
                          <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Phí bảo trì đường bộ ({calculations.roadFeeYears} năm)</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.roadFee)}</td></tr>
                          <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Bảo hiểm TNDS (bắt buộc)</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.civilInsurance)}</td></tr>
                          {includePhysicalInsurance && <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Bảo hiểm vật chất ({physicalInsuranceRate}%)</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.physicalInsuranceFee)}</td></tr>}
                          {includeServiceFee && <tr className="border-b border-slate-300"><td className="p-2.5 text-slate-700 pl-4">Phí dịch vụ đăng ký</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.serviceFee)}</td></tr>}
                      </tbody>
                  </table>

                  <div className="bg-slate-800 text-white p-5 rounded-xl flex justify-between items-center mb-5 shadow-lg">
                      <span className="font-bold uppercase text-lg tracking-wider">Tổng thanh toán thực tế:</span>
                      <span className="font-black text-3xl text-yellow-400 drop-shadow-md">{formatVND(calculations.finalAmount)}</span>
                  </div>

                  {loanCalculations && loanCalculations.loanAmount > 0 && (
                    <div className="border-l-4 border-yellow-400 bg-yellow-50/50 p-4 mb-8 rounded-r-lg">
                        <p className="text-slate-700 mb-1">Dự kiến vốn khách cần chuẩn bị <span className="font-bold text-sm">(Vay {formatVND(loanCalculations.loanAmount)} · {loanCalculations.loanPercent.toFixed(2)}% giá xe)</span>:</p>
                        <p className="font-black text-2xl text-yellow-600 mb-1">{formatVND(loanCalculations.upfrontPayment)}</p>
                        <p className="text-xs text-slate-500 italic">Bao gồm phần giá xe không vay và các chi phí lăn bánh. Khoản vay thực tế phụ thuộc phê duyệt của ngân hàng.</p>
                    </div>
                  )}

                  <div className="border-t-[3px] border-slate-800 pt-6 flex justify-between items-end mt-12">
                       <div className="text-[11px] text-slate-500 italic w-3/5 pr-6 leading-relaxed">
                          * Ghi chú: Chi phí thuế, phí trên mang tính chất tham khảo và có thể thay đổi theo quy định của Nhà nước tại thời điểm xuất hóa đơn và đăng ký xe.<br/>
                          * Báo giá không thay thế cho Hợp đồng mua bán chính thức.
                       </div>
                       
                       <div className="w-2/5 flex items-end justify-end space-x-4">
                          <div className="text-right pb-1">
                             <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5">Đại diện bán hàng</p>
                             <p className="font-black text-lg text-slate-800 uppercase leading-none">{salesInfo.name || 'Tư Vấn Bán Hàng'}</p>
                             <p className="text-blue-700 font-black text-base mt-1">{salesInfo.phone || 'Geely Hải Dương'}</p>
                          </div>
                          <div className="p-1.5 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col items-center">
                              <QrCodeImage value={`https://zalo.me/${normalizePhoneForZalo(salesInfo.phone)}`} className="w-16 h-16 object-contain" />
                              <p className="text-[8px] font-bold text-slate-600 mt-1 uppercase tracking-wider">Quét Zalo</p>
                          </div>
                       </div>
                  </div>

                  </div>
                </div>
              </div>
            );
          };

          return (
            <div className="min-h-screen font-sans pb-safe">
              <div className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-center">
                <GeelyLogo className="w-20 h-8 text-gray-900" color="currentColor" />
                <div className="text-xl font-black text-gray-900 tracking-tighter ml-4 pl-4 border-l-2 border-gray-300 uppercase">Báo Giá <span className="text-[9px] align-top text-blue-600">PWA 2.4</span></div>
              </div>
              
              <div className="max-w-xl mx-auto p-4">
                <div className="grid grid-cols-5 p-1 bg-gray-200 rounded-lg shadow-inner mb-4 gap-0.5">
                  <button onClick={() => setActiveTab('input')} className={`py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'input' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}`}>Nhập TT</button>
                  <button onClick={() => setActiveTab('loan')} className={`py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'loan' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}`}>Vay NH</button>
                  <button onClick={() => setActiveTab('preview')} className={`py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'preview' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}`}>Báo Giá</button>
                  <button onClick={() => setActiveTab('history')} className={`py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'history' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}`}>Lịch Sử</button>
                  <button onClick={() => setActiveTab('settings')} className={`py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'settings' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}`}>Cài Đặt</button>
                </div>
                
                {activeTab === 'input' && renderInputForm()}
                {activeTab === 'loan' && renderBankLoan()}
                {activeTab === 'preview' && renderQuotePreview()}
                {activeTab === 'history' && renderHistory()}
                {activeTab === 'settings' && renderSettings()}
              </div>

              {activeTab === 'preview' && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20 flex justify-center pb-safe">
                  <div className="max-w-xl w-full grid grid-cols-3 gap-2">
                    <button onClick={handleSaveQuotation} className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-xs shadow-md">Lưu lịch sử</button>
                    <button onClick={handlePrintA4} className="w-full py-3 bg-slate-700 text-white rounded-xl font-bold text-xs shadow-md">In / PDF A4</button>
                    <button onClick={handleExportImage} disabled={isExporting} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md disabled:opacity-50">{isExporting ? 'Đang tạo...' : 'Ảnh Zalo'}</button>
                  </div>
                </div>
              )}
              {toastMessage && <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-2 rounded-full shadow-xl text-sm font-medium animate-fade-in-out w-max max-w-[90%] text-center">{toastMessage}</div>}
            </div>
          );
        }

        const rootElement = document.getElementById('root');
        if (ReactDOM.createRoot) {
          ReactDOM.createRoot(rootElement).render(<GeelyQuotationApp />);
        } else {
          ReactDOM.render(<GeelyQuotationApp />, rootElement);
        }