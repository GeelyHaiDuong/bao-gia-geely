// @ts-nocheck
const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useMemo, useEffect, useRef } = React;
const DEFAULT_CAR_MODELS = [
    { id: 'ex2_pro', name: 'Geely EX2 Pro', price: 459000000, seats: 5, imagePath: './assets/cars/ex2_pro.svg' },
    { id: 'ex2_max', name: 'Geely EX2 Max', price: 499000000, seats: 5, imagePath: './assets/cars/ex2_max.svg' },
    { id: 'ex5_pro', name: 'Geely EX5 Pro', price: 839000000, seats: 5, imagePath: './assets/cars/ex5_pro.svg' },
    { id: 'ex5_max', name: 'Geely EX5 Max', price: 889000000, seats: 5, imagePath: './assets/cars/ex5_max.svg' },
    { id: 'ex5_emi_pro', name: 'Geely EX5 EM-i Pro', price: 789000000, seats: 5, imagePath: './assets/cars/ex5_emi_pro.svg' },
    { id: 'ex5_emi_max', name: 'Geely EX5 EM-i Max', price: 909000000, seats: 5, imagePath: './assets/cars/ex5_emi_max.svg' },
    { id: 'monjaro_premium', name: 'Geely Monjaro Premium', price: 1149000000, seats: 5, imagePath: './assets/cars/monjaro_premium.svg' },
    { id: 'monjaro_flagship', name: 'Geely Monjaro Flagship', price: 1199000000, seats: 5, imagePath: './assets/cars/monjaro_flagship.svg' },
    { id: 'coolray_exec_26', name: 'Geely Coolray New 2026 Executive', price: 499000000, seats: 5, imagePath: './assets/cars/coolray_exec_26.svg' },
    { id: 'coolray_prem_26', name: 'Geely Coolray New 2026 Premium', price: 549000000, seats: 5, imagePath: './assets/cars/coolray_prem_26.svg' },
    { id: 'coolray_flag_26', name: 'Geely Coolray New 2026 Flagship', price: 599000000, seats: 5, imagePath: './assets/cars/coolray_flag_26.svg' },
    { id: 'okavango_exec', name: 'Geely Okavango Executive', price: 739000000, seats: 7, imagePath: './assets/cars/okavango_exec.svg' },
    { id: 'okavango_prem', name: 'Geely Okavango Premium', price: 799000000, seats: 7, imagePath: './assets/cars/okavango_prem.svg' },
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
const LOCATIONS = [
    { id: 'HN', name: 'Hà Nội (Trước bạ 12%, Biển 14tr)', taxRate: 0.12, plateFee: 14000000 },
    { id: 'HN_EV', name: 'Hà Nội - Xe điện (Trước bạ 0%, Biển 14tr)', taxRate: 0, plateFee: 14000000 },
    { id: 'HCM', name: 'TP. Hồ Chí Minh (Trước bạ 10%, Biển 20tr)', taxRate: 0.10, plateFee: 20000000 },
    { id: 'HCM_EV', name: 'TP. Hồ Chí Minh - Xe điện (Trước bạ 0%, Biển 20tr)', taxRate: 0, plateFee: 20000000 },
    { id: 'TINH_12', name: 'Tỉnh khác (Trước bạ 12%, Biển 1tr)', taxRate: 0.12, plateFee: 1000000 },
    { id: 'TINH_10', name: 'Tỉnh khác (Trước bạ 10%, Biển 1tr)', taxRate: 0.10, plateFee: 1000000 },
    { id: 'TINH_EV', name: 'Tỉnh khác - Xe điện (Trước bạ 0%, Biển 1tr)', taxRate: 0, plateFee: 1000000 },
];
const FIXED_FEES = {
    inspection: 340000,
    civilInsurance5Seats: 480700,
    civilInsurance7Seats: 873400,
};
const PROMOTION_TYPES = {
    cash: 'Giảm tiền mặt', registration: 'Hỗ trợ trước bạ', gift: 'Quà tặng',
    accessory: 'Phụ kiện', insurance: 'Bảo hiểm', maintenance: 'Bảo dưỡng', service: 'Dịch vụ'
};
const DEFAULT_CAR_IMAGE_PATHS = Object.fromEntries(DEFAULT_CAR_MODELS.map(item => [item.id, item.imagePath]));
const DEFAULT_PROMOTION_META = Object.fromEntries(DEFAULT_PROMOTIONS.map(item => [item.id, {
        type: item.type, deductFromPrice: item.deductFromPrice
    }]));
const normalizeCar = car => {
    const id = String((car === null || car === void 0 ? void 0 : car.id) || `car_${Date.now()}`);
    return {
        id,
        name: String((car === null || car === void 0 ? void 0 : car.name) || ''),
        price: Number(car === null || car === void 0 ? void 0 : car.price) || 0,
        seats: Number(car === null || car === void 0 ? void 0 : car.seats) || 5,
        imagePath: String((car === null || car === void 0 ? void 0 : car.imagePath) || DEFAULT_CAR_IMAGE_PATHS[id] || ''),
        image: String((car === null || car === void 0 ? void 0 : car.image) || '')
    };
};
const normalizePromotion = promo => {
    const id = String((promo === null || promo === void 0 ? void 0 : promo.id) || `promo_${Date.now()}`);
    const defaultMeta = DEFAULT_PROMOTION_META[id];
    const fallbackDeduct = defaultMeta ? defaultMeta.deductFromPrice : ((Number(promo === null || promo === void 0 ? void 0 : promo.value) || 0) > 0);
    return {
        id,
        name: String((promo === null || promo === void 0 ? void 0 : promo.name) || ''),
        value: Number(promo === null || promo === void 0 ? void 0 : promo.value) || 0,
        type: String((promo === null || promo === void 0 ? void 0 : promo.type) || (defaultMeta === null || defaultMeta === void 0 ? void 0 : defaultMeta.type) || (fallbackDeduct ? 'cash' : 'gift')),
        deductFromPrice: (promo === null || promo === void 0 ? void 0 : promo.deductFromPrice) !== undefined ? Boolean(promo.deductFromPrice) : Boolean(fallbackDeduct)
    };
};
const createQuoteId = () => {
    const now = new Date();
    const date = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `BG-HD-${date}-${suffix}`;
};
const getSavedData = (key, defaultData) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultData;
    }
    catch (error) {
        console.warn(`Không thể đọc dữ liệu ${key}:`, error);
        return defaultData;
    }
};
const saveData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    catch (error) {
        console.warn(`Không thể lưu dữ liệu ${key}:`, error);
        return false;
    }
};
const parseMoney = (value) => {
    const digits = String(value !== null && value !== void 0 ? value : '').replace(/\D/g, '');
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
    if (!image)
        return;
    if (!image.complete) {
        await new Promise(resolve => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
        });
    }
    if (typeof image.decode === 'function') {
        try {
            await image.decode();
        }
        catch (error) { }
    }
};
const prepareImagesForExport = async (element) => {
    const restoreItems = [];
    let usedPlaceholder = false;
    const images = Array.from(element.querySelectorAll('img'));
    for (const image of images) {
        const originalSrc = image.getAttribute('src') || '';
        const originalCrossOrigin = image.getAttribute('crossorigin');
        if (!originalSrc)
            continue;
        let absoluteUrl;
        try {
            absoluteUrl = new URL(originalSrc, window.location.href);
        }
        catch (error) {
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
        }
        catch (error) {
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
                if (originalCrossOrigin === null)
                    image.removeAttribute('crossorigin');
                else
                    image.setAttribute('crossorigin', originalCrossOrigin);
            });
        }
    };
};
const waitForExportCanvases = async (element, timeoutMs = 6000) => {
    const canvases = Array.from(element.querySelectorAll('canvas[data-export-canvas]'));
    await Promise.all(canvases.map(canvas => {
        if (canvas.dataset.exportState === 'ready')
            return Promise.resolve();
        return new Promise(resolve => {
            let finished = false;
            const complete = () => {
                if (finished)
                    return;
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
        if (blob)
            resolve(blob);
        else
            reject(new Error('Trình duyệt không thể tạo tệp ảnh.'));
    }, 'image/jpeg', quality);
});
const safeFilePart = (value) => String(value || 'KhachHang')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'KhachHang';
const normalizePhoneForZalo = (phone) => {
    const digits = String(phone || '').replace(/\D/g, '');
    if (!digits)
        return '0961018288';
    if (digits.startsWith('84'))
        return `0${digits.slice(2)}`;
    return digits;
};
const QrCodeImage = ({ value, className = '' }) => {
    const [src, setSrc] = useState('');
    useEffect(() => {
        try {
            if (window.GeelyQR && value) {
                setSrc(window.GeelyQR.toDataURL(value, 256));
            }
            else {
                setSrc('');
            }
        }
        catch (error) {
            console.warn('Không thể tạo QR:', error);
            setSrc('');
        }
    }, [value]);
    if (!src) {
        return (React.createElement("div", { className: `${className} bg-slate-100 text-slate-400 flex items-center justify-center text-[8px] font-bold text-center` }, "QR ZALO"));
    }
    return React.createElement("img", { src: src, alt: "Zalo QR", className: className });
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
        if (!context)
            throw new Error('Không tạo được canvas quét ảnh.');
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
                    if (x < minX)
                        minX = x;
                    if (x > maxX)
                        maxX = x;
                    if (y < minY)
                        minY = y;
                    if (y > maxY)
                        maxY = y;
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
    }
    catch (error) {
        console.warn('Không thể tự căn viền ảnh xe, dùng toàn bộ ảnh:', error);
        return { sx: 0, sy: 0, sw: naturalWidth, sh: naturalHeight };
    }
};
const drawCarImageWithoutDistortion = (canvas, image) => {
    const context = canvas.getContext('2d');
    if (!context)
        throw new Error('Trình duyệt không hỗ trợ canvas ảnh xe.');
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
        if (!canvas)
            return undefined;
        let cancelled = false;
        canvas.dataset.exportState = 'loading';
        const markReady = () => {
            if (cancelled)
                return;
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
        if (/^https?:/i.test(src))
            image.crossOrigin = 'anonymous';
        image.onload = () => {
            if (cancelled)
                return;
            try {
                drawCarImageWithoutDistortion(canvas, image);
            }
            catch (error) {
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
    return (React.createElement("canvas", { ref: canvasRef, width: CAR_CANVAS_WIDTH, height: CAR_CANVAS_HEIGHT, "data-export-canvas": "car-image", "aria-label": alt, role: "img", className: "block w-full h-full", style: { width: '100%', height: '100%' } }));
};
const GeelyLogo = ({ className = "w-24 h-auto", color = "currentColor" }) => (React.createElement("svg", { viewBox: "0 0 200 100", className: className, xmlns: "http://www.w3.org/2000/svg", fill: color },
    React.createElement("path", { d: "M 12 18 Q 40 12 68 12 L 68 28 L 8 28 Q 8 22 12 18 Z" }),
    React.createElement("path", { d: "M 71 12 Q 100 10 129 12 L 129 28 L 71 28 Z" }),
    React.createElement("path", { d: "M 132 12 Q 160 12 188 18 Q 192 22 192 28 L 132 28 Z" }),
    React.createElement("path", { d: "M 9 31 L 68 31 L 68 54 Q 40 48 18 39 Q 10 36 9 31 Z" }),
    React.createElement("path", { d: "M 71 31 L 129 31 L 129 55 Q 100 62 71 55 Z" }),
    React.createElement("path", { d: "M 132 31 L 191 31 Q 190 36 182 39 Q 160 48 132 54 Z" }),
    React.createElement("text", { x: "100", y: "88", fontFamily: "Arial, sans-serif", fontSize: "30", fontWeight: "900", letterSpacing: "6", textAnchor: "middle" }, "GEELY")));
const CarSilhouette = ({ className }) => (React.createElement("svg", { className: className, viewBox: "0 0 240 100", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M222.5 45.3C218.8 41.5 197.4 32.8 178.6 30.2C159.8 27.6 132.5 24 105 24C78.4 24 63.8 29.5 56.5 35.8C52 39.7 41.2 46.1 30.5 48.2C16 51 5 57 5 65C5 67 6.5 69.5 10 70.8V75C10 83.3 16.7 90 25 90C33.3 90 40 83.3 40 75C40 73.2 39.7 71.5 39 70H181C180.3 71.5 180 73.2 180 75C180 83.3 186.7 90 195 90C203.3 90 210 83.3 210 75C210 71.2 208.6 67.8 206.3 65.2C216.5 64 235 60.5 235 52C235 48.5 228 47 222.5 45.3ZM25 80C22.2 80 20 77.8 20 75C20 72.2 22.2 70 25 70C27.8 70 30 72.2 30 75C30 77.8 27.8 80 25 80ZM195 80C192.2 80 190 77.8 190 75C190 72.2 192.2 70 195 70C197.8 70 200 72.2 200 75C200 77.8 197.8 80 195 80ZM183.4 46.2C172.5 44 145 42 120 42C95 42 74.8 44 65.5 46.2C64.6 46.4 63 46 64.2 44.5C70.5 36.8 92.5 33 120 33C148 33 168.2 38.5 174.5 42.5C175.7 43.3 175.5 45 174 45.8L183.4 46.2Z" })));
const buildCloudPayload = ({ cars, promotions, salesInfo, serviceFeeAmount, physicalInsuranceRate }) => ({
    cars: (Array.isArray(cars) ? cars : []).map(car => ({
        id: String(car.id || `car_${Date.now()}`),
        name: String(car.name || ''),
        price: parseMoney(car.price),
        seats: Number(car.seats) || 5
    })),
    promotions: (Array.isArray(promotions) ? promotions : []).map(promo => ({
        id: String(promo.id || `promo_${Date.now()}`),
        name: String(promo.name || ''),
        value: parseMoney(promo.value)
    })),
    salesInfo: {
        name: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.name) || ''),
        phone: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.phone) || '')
    },
    serviceFeeAmount: parseMoney(serviceFeeAmount),
    physicalInsuranceRate: Number(physicalInsuranceRate) || 0
});
const serializeCloudPayload = payload => JSON.stringify(payload || {});
const formatSyncTime = value => {
    if (!value)
        return '';
    try {
        return new Date(Number(value)).toLocaleString('vi-VN');
    }
    catch (error) {
        return '';
    }
};
function GeelyQuotationApp() {
    var _a;
    const [cars, setCars] = useState(() => (getSavedData('geely_cars_v8', DEFAULT_CAR_MODELS) || []).map(normalizeCar));
    const [promotions, setPromotions] = useState(() => (getSavedData('geely_promotions_v2', DEFAULT_PROMOTIONS) || []).map(normalizePromotion));
    const [salesInfo, setSalesInfo] = useState(() => getSavedData('geely_sales_info', { name: '', phone: '' }));
    const [serviceFeeAmount, setServiceFeeAmount] = useState(() => parseMoney(getSavedData('geely_service_fee', 2500000)));
    const [physicalInsuranceRate, setPhysicalInsuranceRate] = useState(() => Number(getSavedData('geely_phys_ins_rate', 1.2)) || 0);
    const [carImageMap, setCarImageMap] = useState({});
    const [quotations, setQuotations] = useState([]);
    const [currentQuoteId, setCurrentQuoteId] = useState(() => createQuoteId());
    const [quoteStatus, setQuoteStatus] = useState('draft');
    const [quoteNotes, setQuoteNotes] = useState('');
    const [historySearch, setHistorySearch] = useState('');
    const [firebaseState, setFirebaseState] = useState(() => {
        var _a, _b;
        return (((_b = (_a = window.GeelyFirebaseSync) === null || _a === void 0 ? void 0 : _a.getState) === null || _b === void 0 ? void 0 : _b.call(_a)) || {
            sdk: 'loading', user: null, online: navigator.onLine,
            message: 'Đang tải dịch vụ đồng bộ...', error: null
        });
    });
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
    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!window.GeelyIDB)
                return;
            const map = {};
            const migratedCars = [];
            for (const item of cars) {
                try {
                    if (item.image && item.image.startsWith('data:image/')) {
                        await window.GeelyIDB.saveCarImage(item.id, item.image);
                        migratedCars.push(item.id);
                    }
                    const localImage = await window.GeelyIDB.getCarImage(item.id);
                    if (localImage)
                        map[item.id] = localImage;
                }
                catch (error) {
                    console.warn('Không đọc được ảnh IndexedDB:', error);
                }
            }
            if (!cancelled) {
                setCarImageMap(map);
                if (migratedCars.length)
                    setCars(current => current.map(({ image, ...car }) => car));
            }
            try {
                const localQuotes = await window.GeelyIDB.listQuotations();
                if (!cancelled && localQuotes.length)
                    setQuotations(localQuotes);
            }
            catch (error) {
                console.warn('Không đọc được lịch sử báo giá:', error);
            }
        })();
        return () => { cancelled = true; };
    }, []);
    useEffect(() => {
        latestDataRef.current = {
            cars, promotions, salesInfo, serviceFeeAmount, physicalInsuranceRate, quotations
        };
    }, [cars, promotions, salesInfo, serviceFeeAmount, physicalInsuranceRate, quotations]);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [carColor, setCarColor] = useState('');
    const [selectedCarId, setSelectedCarId] = useState(((_a = cars[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
    const [selectedLocationId, setSelectedLocationId] = useState(LOCATIONS[0].id);
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
        }
        catch (error) {
            return 'input';
        }
    });
    const [toastMessage, setToastMessage] = useState('');
    const [newCarName, setNewCarName] = useState('');
    const [newCarPrice, setNewCarPrice] = useState('');
    const [newCarSeats, setNewCarSeats] = useState(5);
    const [newCarImage, setNewCarImage] = useState('');
    const [newCarImagePath, setNewCarImagePath] = useState('');
    const [editingCarId, setEditingCarId] = useState(null);
    const [isProcessingCarImage, setIsProcessingCarImage] = useState(false);
    const [newPromoName, setNewPromoName] = useState('');
    const [newPromoValue, setNewPromoValue] = useState('');
    const [newPromoType, setNewPromoType] = useState('gift');
    const [newPromoDeduct, setNewPromoDeduct] = useState(false);
    const [loanParams, setLoanParams] = useState({
        downPaymentPercent: 20, loanTermYears: 5, fixedInterestRate: 8.0, fixedTermMonths: 12, floatingInterestRate: 11.5
    });
    const [isExporting, setIsExporting] = useState(false);
    const [previewScale, setPreviewScale] = useState(1);
    const [quoteHeight, setQuoteHeight] = useState(0);
    const previewContainerRef = useRef(null);
    const captureRef = useRef(null);
    useEffect(() => {
        if (activeTab !== 'preview' || !previewContainerRef.current)
            return;
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
        if (activeTab !== 'preview' || !captureRef.current)
            return;
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
    const resolvedCarImage = car ? (carImageMap[car.id] || car.imagePath || car.image || '') : '';
    const location = useMemo(() => LOCATIONS.find(l => l.id === selectedLocationId) || LOCATIONS[0], [selectedLocationId]);
    const calculations = useMemo(() => {
        if (!car || !location)
            return null;
        const price = parseMoney(car.price);
        const taxFee = price * location.taxRate;
        const plateFee = location.plateFee;
        const inspectionFee = FIXED_FEES.inspection;
        const roadFeePerMonth = plateColor === 'white' ? 130000 : 180000;
        const roadFee = roadFeePerMonth * 12 * roadFeeYears;
        let civilInsurance = 0;
        if (tndsOption === 'auto') {
            civilInsurance = car.seats <= 5 ? FIXED_FEES.civilInsurance5Seats : FIXED_FEES.civilInsurance7Seats;
        }
        else if (tndsOption === '5_seats') {
            civilInsurance = FIXED_FEES.civilInsurance5Seats;
        }
        else {
            civilInsurance = FIXED_FEES.civilInsurance7Seats;
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
            price, taxFee, plateFee, inspectionFee, roadFee, civilInsurance,
            physicalInsuranceFee, serviceFee, discountAmount, promoValue, giftPromotions, selectedPromotions, totalRollingCost, finalAmount, roadFeeYears
        };
    }, [car, location, discount, includePhysicalInsurance, includeServiceFee, selectedPromoIds, promotions, plateColor, roadFeeYears, tndsOption, serviceFeeAmount, physicalInsuranceRate]);
    const loanCalculations = useMemo(() => {
        if (!calculations)
            return null;
        const loanAmount = calculations.price * (1 - loanParams.downPaymentPercent / 100);
        const upfrontPayment = calculations.finalAmount - loanAmount;
        const months = loanParams.loanTermYears * 12;
        const monthlyPrincipal = loanAmount / months;
        const currentFirstMonthRate = loanParams.fixedTermMonths > 0 ? loanParams.fixedInterestRate : loanParams.floatingInterestRate;
        const firstMonthInterest = loanAmount * (currentFirstMonthRate / 100 / 12);
        const firstMonthTotal = monthlyPrincipal + firstMonthInterest;
        let firstFloatingMonth = loanParams.fixedTermMonths + 1;
        let firstFloatingMonthInterest = 0;
        let firstFloatingMonthTotal = 0;
        if (firstFloatingMonth <= months && loanParams.fixedTermMonths > 0) {
            const remainingPrincipalBeforeFloat = loanAmount - (monthlyPrincipal * loanParams.fixedTermMonths);
            firstFloatingMonthInterest = remainingPrincipalBeforeFloat * (loanParams.floatingInterestRate / 100 / 12);
            firstFloatingMonthTotal = monthlyPrincipal + firstFloatingMonthInterest;
        }
        return {
            loanAmount, upfrontPayment, monthlyPrincipal, firstMonthInterest, firstMonthTotal,
            months, firstFloatingMonth, firstFloatingMonthInterest, firstFloatingMonthTotal
        };
    }, [calculations, loanParams]);
    const showToast = (message) => { setToastMessage(message); setTimeout(() => setToastMessage(''), 3000); };
    const getSyncKey = uid => `geely_sync_initialized_v2_${uid || 'unknown'}`;
    const setSyncInitialized = uid => { if (uid)
        saveData(getSyncKey(uid), true); };
    const settingsPayload = () => ({
        salesInfo: { name: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.name) || ''), phone: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.phone) || '') },
        serviceFeeAmount: parseMoney(serviceFeeAmount),
        physicalInsuranceRate: Number(physicalInsuranceRate) || 0
    });
    const cloudCar = item => ({
        id: String(item.id), name: String(item.name || ''), price: parseMoney(item.price),
        seats: Number(item.seats) || 5, imagePath: String(item.imagePath || '')
    });
    const cloudPromo = item => ({
        id: String(item.id), name: String(item.name || ''), value: parseMoney(item.value),
        type: String(item.type || 'gift'), deductFromPrice: Boolean(item.deductFromPrice)
    });
    const applyWorkspace = workspace => {
        var _a, _b, _c, _d, _e;
        if (!workspace)
            return;
        syncApplyingRef.current = true;
        if (workspace.settings) {
            if (workspace.settings.salesInfo)
                setSalesInfo({
                    name: String(workspace.settings.salesInfo.name || ''),
                    phone: String(workspace.settings.salesInfo.phone || '')
                });
            if (workspace.settings.serviceFeeAmount !== undefined)
                setServiceFeeAmount(parseMoney(workspace.settings.serviceFeeAmount));
            if (workspace.settings.physicalInsuranceRate !== undefined)
                setPhysicalInsuranceRate(Number(workspace.settings.physicalInsuranceRate) || 0);
        }
        const cloudCars = ((_a = workspace.cars) === null || _a === void 0 ? void 0 : _a.length) ? workspace.cars : (_b = workspace.legacy) === null || _b === void 0 ? void 0 : _b.cars;
        if (Array.isArray(cloudCars) && cloudCars.length) {
            const nextCars = cloudCars.map(normalizeCar).map(item => ({ ...item, image: '' }));
            setCars(nextCars);
            if (!nextCars.some(item => item.id === selectedCarId))
                setSelectedCarId(((_c = nextCars[0]) === null || _c === void 0 ? void 0 : _c.id) || '');
        }
        const cloudPromos = ((_d = workspace.promotions) === null || _d === void 0 ? void 0 : _d.length) ? workspace.promotions : (_e = workspace.legacy) === null || _e === void 0 ? void 0 : _e.promotions;
        if (Array.isArray(cloudPromos))
            setPromotions(cloudPromos.map(normalizePromotion));
        if (Array.isArray(workspace.quotations)) {
            setQuotations(workspace.quotations);
            workspace.quotations.forEach(item => { var _a; return (_a = window.GeelyIDB) === null || _a === void 0 ? void 0 : _a.saveQuotation(item).catch(() => { }); });
        }
        if (workspace.legacy && !workspace.settings) {
            if (workspace.legacy.salesInfo)
                setSalesInfo(workspace.legacy.salesInfo);
            if (workspace.legacy.serviceFeeAmount !== undefined)
                setServiceFeeAmount(parseMoney(workspace.legacy.serviceFeeAmount));
            if (workspace.legacy.physicalInsuranceRate !== undefined)
                setPhysicalInsuranceRate(Number(workspace.legacy.physicalInsuranceRate) || 0);
        }
        window.setTimeout(() => { syncApplyingRef.current = false; }, 600);
    };
    const describeFirebaseError = error => {
        const code = (error === null || error === void 0 ? void 0 : error.code) || '';
        if (code.includes('unauthorized-domain'))
            return 'Tên miền GitHub chưa được cấp quyền trong Firebase Authentication.';
        if (code.includes('popup-blocked'))
            return 'Trình duyệt đã chặn cửa sổ đăng nhập. Hãy mở bằng Chrome hoặc Safari.';
        if (code.includes('popup-closed-by-user'))
            return 'Bạn đã đóng cửa sổ đăng nhập Google.';
        if (code.includes('permission-denied'))
            return 'Firestore từ chối truy cập. Hãy cập nhật Security Rules cho cấu trúc V1.8.';
        if (!navigator.onLine)
            return 'Thiết bị đang ngoại tuyến. Dữ liệu cục bộ vẫn được giữ.';
        return (error === null || error === void 0 ? void 0 : error.message) || 'Không thể kết nối Firebase.';
    };
    const handleFirebaseSignIn = async () => {
        try {
            setSyncStatus({ code: 'working', message: 'Đang mở đăng nhập Google...', updatedAtMs: 0 });
            await window.GeelyFirebaseSync.signInGoogle();
        }
        catch (error) {
            const message = describeFirebaseError(error);
            setSyncStatus({ code: 'error', message, updatedAtMs: 0 });
            showToast(message);
        }
    };
    const handleFirebaseSignOut = async () => {
        try {
            await window.GeelyFirebaseSync.signOut();
            showToast('Đã đăng xuất tài khoản đồng bộ.');
        }
        catch (error) {
            showToast(describeFirebaseError(error));
        }
    };
    const handleUploadCurrentToCloud = async () => {
        if (!syncUser)
            return showToast('Vui lòng đăng nhập Google.');
        try {
            setSyncStatus({ code: 'working', message: 'Đang đưa dữ liệu lên Firebase...', updatedAtMs: 0 });
            await window.GeelyFirebaseSync.bootstrapWorkspace({
                settings: settingsPayload(), cars: cars.map(cloudCar), promotions: promotions.map(cloudPromo), quotations
            });
            syncReadyRef.current = true;
            setSyncInitialized(syncUser.uid);
            setSyncStatus({ code: navigator.onLine ? 'synced' : 'queued', message: 'Đã bật đồng bộ từng mục.', updatedAtMs: Date.now() });
            showToast('Đã đồng bộ dữ liệu lên Firebase.');
        }
        catch (error) {
            const message = describeFirebaseError(error);
            setSyncStatus({ code: 'error', message, updatedAtMs: 0 });
            showToast(message);
        }
    };
    const handleDownloadCloudToDevice = () => {
        if (!pendingWorkspaceRef.current)
            return showToast('Chưa tìm thấy dữ liệu trên Firebase.');
        applyWorkspace(pendingWorkspaceRef.current);
        syncReadyRef.current = true;
        setSyncInitialized(syncUser === null || syncUser === void 0 ? void 0 : syncUser.uid);
        setSyncStatus({ code: 'synced', message: 'Đã tải dữ liệu Firebase về thiết bị.', updatedAtMs: Date.now() });
        showToast('Đã tải dữ liệu; ảnh cục bộ vẫn được giữ theo mã xe.');
    };
    const handleSyncNow = async () => {
        if (!syncUser || !syncReadyRef.current)
            return showToast('Hãy hoàn tất lựa chọn dữ liệu ban đầu trước.');
        try {
            await window.GeelyFirebaseSync.saveSettings(settingsPayload());
            await Promise.all(cars.map(item => window.GeelyFirebaseSync.saveCar(cloudCar(item))));
            await Promise.all(promotions.map(item => window.GeelyFirebaseSync.savePromotion(cloudPromo(item))));
            setSyncStatus({ code: 'synced', message: 'Đã đồng bộ thủ công.', updatedAtMs: Date.now() });
            showToast('Đồng bộ hoàn tất.');
        }
        catch (error) {
            showToast(describeFirebaseError(error));
        }
    };
    useEffect(() => {
        const service = window.GeelyFirebaseSync;
        if (!service)
            return undefined;
        const unsubscribeState = service.onStateChange(nextState => setFirebaseState(nextState));
        const unsubscribeAuth = service.onAuthStateChanged(user => setSyncUser(user));
        return () => { unsubscribeState === null || unsubscribeState === void 0 ? void 0 : unsubscribeState(); unsubscribeAuth === null || unsubscribeAuth === void 0 ? void 0 : unsubscribeAuth(); };
    }, []);
    useEffect(() => {
        var _a;
        (_a = syncUnsubscribeRef.current) === null || _a === void 0 ? void 0 : _a.call(syncUnsubscribeRef);
        syncUnsubscribeRef.current = null;
        syncReadyRef.current = false;
        pendingWorkspaceRef.current = null;
        if (!syncUser) {
            setSyncStatus({ code: 'signed_out', message: 'Đăng nhập Google để đồng bộ dữ liệu.', updatedAtMs: 0 });
            return undefined;
        }
        let cancelled = false;
        setSyncStatus({ code: 'working', message: 'Đang kiểm tra dữ liệu Firebase...', updatedAtMs: 0 });
        (async () => {
            try {
                const workspace = await window.GeelyFirebaseSync.getWorkspace();
                if (cancelled)
                    return;
                pendingWorkspaceRef.current = workspace;
                const initialized = Boolean(getSavedData(getSyncKey(syncUser.uid), false));
                if (workspace.empty) {
                    setSyncStatus({ code: 'cloud_empty', message: 'Tài khoản chưa có dữ liệu V1.8.', updatedAtMs: 0 });
                }
                else if (!initialized) {
                    setSyncStatus({ code: 'choice_needed', message: 'Hãy chọn dữ liệu ban đầu dùng làm bản chính.', updatedAtMs: 0 });
                }
                else {
                    applyWorkspace(workspace);
                    syncReadyRef.current = true;
                    setSyncStatus({ code: 'synced', message: 'Dữ liệu đã đồng bộ theo từng mục.', updatedAtMs: Date.now() });
                }
                const unsubscribe = await window.GeelyFirebaseSync.watchWorkspace(event => {
                    if (cancelled || !syncReadyRef.current || event.hasPendingWrites)
                        return;
                    syncApplyingRef.current = true;
                    if (event.type === 'settings' && event.data) {
                        const data = event.data;
                        if (data.salesInfo)
                            setSalesInfo(data.salesInfo);
                        if (data.serviceFeeAmount !== undefined)
                            setServiceFeeAmount(parseMoney(data.serviceFeeAmount));
                        if (data.physicalInsuranceRate !== undefined)
                            setPhysicalInsuranceRate(Number(data.physicalInsuranceRate) || 0);
                    }
                    else if (event.type === 'cars') {
                        const next = event.items.map(normalizeCar);
                        setCars(next);
                        cloudCarsHashRef.current = JSON.stringify(next.map(cloudCar));
                    }
                    else if (event.type === 'promotions') {
                        const next = event.items.map(normalizePromotion);
                        setPromotions(next);
                        cloudPromosHashRef.current = JSON.stringify(next.map(cloudPromo));
                    }
                    else if (event.type === 'quotations') {
                        setQuotations(event.items);
                        event.items.forEach(item => { var _a; return (_a = window.GeelyIDB) === null || _a === void 0 ? void 0 : _a.saveQuotation(item).catch(() => { }); });
                    }
                    window.setTimeout(() => { syncApplyingRef.current = false; }, 400);
                    setSyncStatus({ code: event.fromCache && !navigator.onLine ? 'offline' : 'synced', message: 'Dữ liệu đã đồng bộ.', updatedAtMs: Date.now() });
                }, error => setSyncStatus({ code: 'error', message: describeFirebaseError(error), updatedAtMs: 0 }));
                if (cancelled)
                    unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
                else
                    syncUnsubscribeRef.current = unsubscribe;
            }
            catch (error) {
                if (!cancelled)
                    setSyncStatus({ code: 'error', message: describeFirebaseError(error), updatedAtMs: 0 });
            }
        })();
        return () => { var _a; cancelled = true; (_a = syncUnsubscribeRef.current) === null || _a === void 0 ? void 0 : _a.call(syncUnsubscribeRef); syncUnsubscribeRef.current = null; };
    }, [syncUser === null || syncUser === void 0 ? void 0 : syncUser.uid]);
    useEffect(() => {
        if (!syncUser || !syncReadyRef.current || syncApplyingRef.current)
            return undefined;
        if (syncWriteTimerRef.current)
            clearTimeout(syncWriteTimerRef.current);
        const payload = settingsPayload();
        const hash = JSON.stringify(payload);
        if (hash === settingsHashRef.current)
            return undefined;
        syncWriteTimerRef.current = window.setTimeout(async () => {
            try {
                await window.GeelyFirebaseSync.saveSettings(payload);
                settingsHashRef.current = hash;
                setSyncStatus({ code: navigator.onLine ? 'synced' : 'queued', message: navigator.onLine ? 'Cài đặt đã đồng bộ.' : 'Thay đổi đang chờ gửi.', updatedAtMs: Date.now() });
            }
            catch (error) {
                setSyncStatus({ code: 'error', message: describeFirebaseError(error), updatedAtMs: 0 });
            }
        }, 1200);
        return () => { if (syncWriteTimerRef.current)
            clearTimeout(syncWriteTimerRef.current); };
    }, [salesInfo, serviceFeeAmount, physicalInsuranceRate, syncUser === null || syncUser === void 0 ? void 0 : syncUser.uid]);
    const handleDiscountChange = (e) => {
        const value = parseMoney(e.target.value);
        setDiscount(value ? formatNumber(value) : '');
    };
    const formatNumberInput = (e, setter) => {
        const value = parseMoney(e.target.value);
        setter(value ? formatNumber(value) : '');
    };
    const handleExportExcel = () => {
        if (!loanCalculations || !calculations)
            return;
        const loanAmount = loanCalculations.loanAmount;
        const months = loanCalculations.months;
        const monthlyPrincipal = loanCalculations.monthlyPrincipal;
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Thang,Du no dau ky,Goc phai tra,Lai phai tra,Tong Goc + Lai\n";
        let currentPrincipal = loanAmount;
        for (let i = 1; i <= months; i++) {
            let currentRate = i <= loanParams.fixedTermMonths ? loanParams.fixedInterestRate : loanParams.floatingInterestRate;
            let interest = currentPrincipal * (currentRate / 100 / 12);
            let totalPayment = monthlyPrincipal + interest;
            csvContent += `${i},"${Math.round(currentPrincipal)}","${Math.round(monthlyPrincipal)}","${Math.round(interest)}","${Math.round(totalPayment)}"\n`;
            currentPrincipal -= monthlyPrincipal;
        }
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `LichTraNo_Geely_${customerName || 'KhachHang'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const resetCarEditor = () => {
        setEditingCarId(null);
        setNewCarName('');
        setNewCarPrice('');
        setNewCarSeats(5);
        setNewCarImage('');
        setNewCarImagePath('');
    };
    const optimizeCarImage = (file) => new Promise((resolve, reject) => {
        var _a;
        if (!file || !((_a = file.type) === null || _a === void 0 ? void 0 : _a.startsWith('image/'))) {
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
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        input.value = '';
        if (!file)
            return;
        setIsProcessingCarImage(true);
        try {
            const optimizedImage = await optimizeCarImage(file);
            setNewCarImage(optimizedImage);
            showToast('Đã xử lý và thêm ảnh xe!');
        }
        catch (error) {
            console.error(error);
            showToast(error.message || 'Không thể xử lý ảnh xe.');
        }
        finally {
            setIsProcessingCarImage(false);
        }
    };
    const handleStartEditCar = (carToEdit) => {
        setEditingCarId(carToEdit.id);
        setNewCarName(carToEdit.name || '');
        setNewCarPrice(formatNumber(carToEdit.price));
        setNewCarSeats(Number(carToEdit.seats) || 5);
        setNewCarImage(carImageMap[carToEdit.id] || '');
        setNewCarImagePath(carToEdit.imagePath || '');
        setTimeout(() => {
            var _a;
            (_a = document.getElementById('car-editor')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };
    const handleSaveCar = async () => {
        var _a, _b;
        if (!newCarName.trim() || !newCarPrice)
            return showToast('Nhập tên và giá xe!');
        const price = parseMoney(newCarPrice);
        if (!Number.isFinite(price) || price <= 0)
            return showToast('Giá xe không hợp lệ!');
        const id = editingCarId || ('car_' + Date.now());
        const carData = {
            id, name: newCarName.trim(), price, seats: Number(newCarSeats) || 5,
            imagePath: newCarImagePath.trim()
        };
        try {
            if (newCarImage === null || newCarImage === void 0 ? void 0 : newCarImage.startsWith('data:image/')) {
                await ((_a = window.GeelyIDB) === null || _a === void 0 ? void 0 : _a.saveCarImage(id, newCarImage));
                setCarImageMap(current => ({ ...current, [id]: newCarImage }));
            }
            else if (!newCarImage && editingCarId && !newCarImagePath) {
                await ((_b = window.GeelyIDB) === null || _b === void 0 ? void 0 : _b.deleteCarImage(id));
                setCarImageMap(current => { const next = { ...current }; delete next[id]; return next; });
            }
            setCars(currentCars => editingCarId
                ? currentCars.map(item => item.id === id ? { ...item, ...carData, image: '' } : item)
                : [...currentCars, carData]);
            if (syncUser && syncReadyRef.current)
                await window.GeelyFirebaseSync.saveCar(cloudCar(carData));
            showToast(editingCarId ? 'Đã cập nhật thông tin xe!' : 'Thêm xe thành công!');
            resetCarEditor();
        }
        catch (error) {
            showToast((error === null || error === void 0 ? void 0 : error.message) || 'Không thể lưu xe.');
        }
    };
    const handleDeleteCar = async (id) => {
        var _a;
        if (cars.length <= 1)
            return showToast('Phải giữ ít nhất 1 xe!');
        const updated = cars.filter(c => c.id !== id);
        setCars(updated);
        if (selectedCarId === id)
            setSelectedCarId(updated[0].id);
        if (editingCarId === id)
            resetCarEditor();
        await ((_a = window.GeelyIDB) === null || _a === void 0 ? void 0 : _a.deleteCarImage(id).catch(() => { }));
        setCarImageMap(current => { const next = { ...current }; delete next[id]; return next; });
        if (syncUser && syncReadyRef.current)
            window.GeelyFirebaseSync.deleteCar(id).catch(() => { });
        showToast('Đã xóa xe!');
    };
    const handleAddPromo = async () => {
        if (!newPromoName.trim())
            return showToast('Nhập tên khuyến mãi!');
        const promo = normalizePromotion({
            id: 'promo_' + Date.now(), name: newPromoName.trim(), value: parseMoney(newPromoValue),
            type: newPromoType, deductFromPrice: newPromoDeduct
        });
        setPromotions(current => [...current, promo]);
        setNewPromoName('');
        setNewPromoValue('');
        setNewPromoType('gift');
        setNewPromoDeduct(false);
        if (syncUser && syncReadyRef.current)
            await window.GeelyFirebaseSync.savePromotion(cloudPromo(promo)).catch(() => { });
        showToast('Thêm khuyến mãi thành công!');
    };
    const handleDeletePromo = async (id) => {
        setPromotions(current => current.filter(p => p.id !== id));
        setSelectedPromoIds(current => current.filter(promoId => promoId !== id));
        if (syncUser && syncReadyRef.current)
            await window.GeelyFirebaseSync.deletePromotion(id).catch(() => { });
    };
    const handleExportImage = async () => {
        var _a, _b, _c;
        if (!calculations || !car)
            return showToast('Chưa có dữ liệu báo giá.');
        setIsExporting(true);
        showToast('Đang tạo ảnh Zalo...');
        const loadCanvasImage = source => new Promise((resolve, reject) => {
            if (!source)
                return reject(new Error('Thiếu nguồn ảnh.'));
            const image = new Image();
            if (/^https?:/i.test(source))
                image.crossOrigin = 'anonymous';
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
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        };
        const drawText = (ctx, text, x, y, options = {}) => {
            ctx.save();
            ctx.font = `${options.weight || 600} ${options.size || 28}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`;
            ctx.fillStyle = options.color || '#0f172a';
            ctx.textAlign = options.align || 'left';
            ctx.textBaseline = options.baseline || 'alphabetic';
            ctx.fillText(String(text || ''), x, y, options.maxWidth || undefined);
            ctx.restore();
        };
        const drawWrapped = (ctx, text, x, y, maxWidth, lineHeight, options = {}) => {
            ctx.save();
            ctx.font = `${options.weight || 500} ${options.size || 24}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`;
            ctx.fillStyle = options.color || '#334155';
            ctx.textAlign = options.align || 'left';
            ctx.textBaseline = 'top';
            const words = String(text || '').split(/\s+/).filter(Boolean);
            let line = '';
            let currentY = y;
            words.forEach(word => {
                const test = line ? `${line} ${word}` : word;
                if (ctx.measureText(test).width > maxWidth && line) {
                    ctx.fillText(line, x, currentY);
                    line = word;
                    currentY += lineHeight;
                }
                else
                    line = test;
            });
            if (line)
                ctx.fillText(line, x, currentY);
            ctx.restore();
            return currentY + lineHeight;
        };
        const drawContainedImage = (ctx, image, x, y, width, height) => {
            try {
                const temp = document.createElement('canvas');
                temp.width = Math.max(1, image.naturalWidth || image.width || 1200);
                temp.height = Math.max(1, image.naturalHeight || image.height || 800);
                const tempCtx = temp.getContext('2d', { willReadFrequently: true });
                tempCtx.drawImage(image, 0, 0, temp.width, temp.height);
                const { sx, sy, sw, sh } = getCarImageContentBounds(image);
                const scale = Math.min(width / sw, height / sh);
                const drawWidth = sw * scale;
                const drawHeight = sh * scale;
                ctx.drawImage(image, sx, sy, sw, sh, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
            }
            catch (error) {
                const iw = image.naturalWidth || image.width || 1;
                const ih = image.naturalHeight || image.height || 1;
                const scale = Math.min(width / iw, height / ih);
                const drawWidth = iw * scale;
                const drawHeight = ih * scale;
                ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
            }
        };
        try {
            if ((_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready)
                await document.fonts.ready;
            const directItems = calculations.selectedPromotions.filter(item => item.deductFromPrice).map(item => item.name);
            if (parseMoney(discount) > 0)
                directItems.push(`Giảm thêm ${formatVND(parseMoney(discount))}`);
            const giftItems = calculations.giftPromotions.map(item => item.name);
            const hasPromotionSummary = directItems.length > 0 || giftItems.length > 0;
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = hasPromotionSummary ? 1500 : 1350;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                throw new Error('Trình duyệt không hỗ trợ canvas.');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Header
            ctx.fillStyle = '#0f2d64';
            ctx.fillRect(0, 0, 1080, 165);
            drawText(ctx, 'GEELY', 60, 82, { size: 52, weight: 900, color: '#ffffff' });
            drawText(ctx, 'HẢI DƯƠNG', 60, 128, { size: 28, weight: 800, color: '#dbeafe' });
            drawText(ctx, currentQuoteId, 1020, 72, { size: 24, weight: 800, color: '#ffffff', align: 'right' });
            drawText(ctx, quoteData.date, 1020, 112, { size: 21, weight: 600, color: '#dbeafe', align: 'right' });
            // Customer and car heading
            drawText(ctx, 'BÁO GIÁ DÀNH CHO', 540, 213, { size: 20, weight: 800, color: '#2563eb', align: 'center' });
            drawText(ctx, customerName || 'QUÝ KHÁCH HÀNG', 540, 258, { size: 34, weight: 900, color: '#0f172a', align: 'center', maxWidth: 940 });
            if (customerPhone)
                drawText(ctx, customerPhone, 540, 292, { size: 21, weight: 600, color: '#64748b', align: 'center' });
            // Car box
            roundedRect(ctx, 50, 320, 980, 425, 28, '#f8fafc', '#dbe3ef');
            let carImageDrawn = false;
            try {
                const image = await loadCanvasImage(resolvedCarImage);
                drawContainedImage(ctx, image, 95, 365, 890, 320);
                carImageDrawn = true;
            }
            catch (error) { }
            if (!carImageDrawn) {
                drawText(ctx, 'CHƯA CÓ ẢNH XE', 540, 540, { size: 34, weight: 800, color: '#cbd5e1', align: 'center' });
            }
            roundedRect(ctx, 76, 342, 460, carColor ? 98 : 72, 16, 'rgba(255,255,255,0.94)', '#dbe3ef');
            drawWrapped(ctx, car.name, 98, 358, 420, 29, { size: 24, weight: 900, color: '#0f2d64' });
            if (carColor)
                drawText(ctx, `Màu: ${carColor}`, 98, 423, { size: 19, weight: 600, color: '#475569' });
            // Price boxes
            roundedRect(ctx, 50, 770, 475, 132, 22, '#ffffff', '#dbe3ef');
            drawText(ctx, 'GIÁ NIÊM YẾT', 78, 812, { size: 19, weight: 800, color: '#64748b' });
            drawText(ctx, formatVND(calculations.price), 78, 866, { size: 31, weight: 900, color: '#0f172a', maxWidth: 420 });
            roundedRect(ctx, 555, 770, 475, 132, 22, '#fff1f2', '#fecdd3');
            drawText(ctx, 'GIẢM TRỰC TIẾP', 583, 812, { size: 19, weight: 800, color: '#e11d48' });
            drawText(ctx, calculations.discountAmount > 0 ? `-${formatVND(calculations.discountAmount)}` : formatVND(0), 583, 866, { size: 31, weight: 900, color: '#be123c', maxWidth: 420 });
            // Promotions summary
            let summaryY = 935;
            if (hasPromotionSummary) {
                roundedRect(ctx, 50, 925, 980, 145, 20, '#f8fafc', '#e2e8f0');
                drawText(ctx, 'ƯU ĐÃI', 78, 963, { size: 20, weight: 900, color: '#0f2d64' });
                const summary = [...directItems.slice(0, 2), ...giftItems.slice(0, 3)].map(item => `• ${item}`).join('   ');
                drawWrapped(ctx, summary, 78, 982, 920, 29, { size: 20, weight: 600, color: '#334155' });
                summaryY = 1095;
            }
            // Total / upfront
            roundedRect(ctx, 50, summaryY, 980, 135, 24, '#0f2d64', null);
            drawText(ctx, 'TỔNG THANH TOÁN DỰ KIẾN', 82, summaryY + 45, { size: 19, weight: 800, color: '#bfdbfe' });
            drawText(ctx, formatVND(calculations.finalAmount), 82, summaryY + 100, { size: 38, weight: 900, color: '#fde047', maxWidth: 560 });
            if (loanCalculations) {
                ctx.strokeStyle = '#31548b';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(690, summaryY + 25);
                ctx.lineTo(690, summaryY + 110);
                ctx.stroke();
                drawText(ctx, 'TRẢ TRƯỚC DỰ KIẾN', 1000, summaryY + 46, { size: 17, weight: 700, color: '#bfdbfe', align: 'right' });
                drawText(ctx, formatVND(loanCalculations.upfrontPayment), 1000, summaryY + 88, { size: 28, weight: 900, color: '#ffffff', align: 'right', maxWidth: 285 });
                drawText(ctx, `Tỷ lệ ${loanParams.downPaymentPercent}%`, 1000, summaryY + 113, { size: 16, weight: 600, color: '#bfdbfe', align: 'right' });
            }
            // Footer
            const footerY = summaryY + 165;
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(50, footerY);
            ctx.lineTo(1030, footerY);
            ctx.stroke();
            drawText(ctx, 'TƯ VẤN BÁN HÀNG', 62, footerY + 42, { size: 17, weight: 800, color: '#64748b' });
            drawText(ctx, salesInfo.name || 'NGUYỄN HOÀNG TÙNG', 62, footerY + 82, { size: 29, weight: 900, color: '#0f172a', maxWidth: 600 });
            drawText(ctx, salesInfo.phone || '0961 018 288', 62, footerY + 118, { size: 26, weight: 900, color: '#dc2626' });
            try {
                const qrDataUrl = (_c = (_b = window.GeelyQR) === null || _b === void 0 ? void 0 : _b.toDataURL) === null || _c === void 0 ? void 0 : _c.call(_b, `https://zalo.me/${normalizePhoneForZalo(salesInfo.phone)}`, 220);
                const qrImage = await loadCanvasImage(qrDataUrl);
                ctx.drawImage(qrImage, 858, footerY + 14, 150, 150);
                drawText(ctx, 'QUÉT ZALO', 933, footerY + 176, { size: 15, weight: 900, color: '#0f2d64', align: 'center' });
            }
            catch (error) { }
            const blob = await canvasToJpegBlob(canvas, 0.93);
            const fileName = `BaoGia_Zalo_${safeFilePart(customerName)}_${Date.now()}.jpg`;
            let shared = false;
            if (navigator.share && typeof File !== 'undefined') {
                try {
                    const file = new File([blob], fileName, { type: 'image/jpeg' });
                    if (!navigator.canShare || navigator.canShare({ files: [file] })) {
                        await navigator.share({ files: [file], title: 'Báo giá Geely', text: `Báo giá ${car.name}` });
                        shared = true;
                    }
                }
                catch (error) {
                    if ((error === null || error === void 0 ? void 0 : error.name) === 'AbortError')
                        return showToast('Bạn đã đóng bảng chia sẻ.');
                }
            }
            if (!shared) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.rel = 'noopener';
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.setTimeout(() => URL.revokeObjectURL(url), 15000);
            }
            showToast(shared ? 'Đã mở bảng chia sẻ ảnh Zalo!' : 'Đã tải ảnh Zalo!');
        }
        catch (error) {
            console.error('Lỗi tạo ảnh Zalo:', error);
            showToast(`Không thể tạo ảnh Zalo: ${(error === null || error === void 0 ? void 0 : error.message) || 'lỗi không xác định'}`);
        }
        finally {
            setIsExporting(false);
        }
    };
    const buildQuotationRecord = () => {
        const existing = quotations.find(item => item.id === currentQuoteId);
        return {
            id: currentQuoteId,
            createdAtMs: (existing === null || existing === void 0 ? void 0 : existing.createdAtMs) || Date.now(),
            updatedAtMs: Date.now(),
            status: quoteStatus,
            notes: quoteNotes,
            customerName, customerPhone, carColor,
            carId: selectedCarId,
            carName: (car === null || car === void 0 ? void 0 : car.name) || '',
            selectedLocationId, selectedPromoIds,
            discount: parseMoney(discount), includePhysicalInsurance, includeServiceFee,
            plateColor, roadFeeYears, tndsOption,
            loanParams: { ...loanParams },
            totalAmount: (calculations === null || calculations === void 0 ? void 0 : calculations.finalAmount) || 0,
            upfrontPayment: (loanCalculations === null || loanCalculations === void 0 ? void 0 : loanCalculations.upfrontPayment) || 0
        };
    };
    const handleSaveQuotation = async () => {
        var _a;
        if (!customerName.trim() && !customerPhone.trim())
            return showToast('Hãy nhập tên hoặc số điện thoại khách hàng.');
        const record = buildQuotationRecord();
        setQuotations(current => [record, ...current.filter(item => item.id !== record.id)]);
        await ((_a = window.GeelyIDB) === null || _a === void 0 ? void 0 : _a.saveQuotation(record).catch(() => { }));
        if (syncUser && syncReadyRef.current) {
            try {
                await window.GeelyFirebaseSync.saveQuotation(record);
            }
            catch (error) {
                showToast('Đã lưu trên máy, nhưng chưa đồng bộ Firebase.');
                return;
            }
        }
        showToast('Đã lưu báo giá vào lịch sử.');
    };
    const handleLoadQuotation = record => {
        setCurrentQuoteId(record.id || createQuoteId());
        setQuoteStatus(record.status || 'draft');
        setQuoteNotes(record.notes || '');
        setCustomerName(record.customerName || '');
        setCustomerPhone(record.customerPhone || '');
        setCarColor(record.carColor || '');
        if (record.carId && cars.some(item => item.id === record.carId))
            setSelectedCarId(record.carId);
        setSelectedLocationId(record.selectedLocationId || LOCATIONS[0].id);
        setSelectedPromoIds(Array.isArray(record.selectedPromoIds) ? record.selectedPromoIds : []);
        setDiscount(record.discount ? formatNumber(record.discount) : '');
        setIncludePhysicalInsurance(record.includePhysicalInsurance !== false);
        setIncludeServiceFee(record.includeServiceFee !== false);
        setPlateColor(record.plateColor || 'white');
        setRoadFeeYears(Number(record.roadFeeYears) || 1);
        setTndsOption(record.tndsOption || 'auto');
        if (record.loanParams)
            setLoanParams(current => ({ ...current, ...record.loanParams }));
        setActiveTab('preview');
        showToast('Đã mở lại báo giá.');
    };
    const handleDeleteQuotation = async (id) => {
        var _a;
        if (!window.confirm('Xóa báo giá này khỏi lịch sử?'))
            return;
        setQuotations(current => current.filter(item => item.id !== id));
        await ((_a = window.GeelyIDB) === null || _a === void 0 ? void 0 : _a.deleteQuotation(id).catch(() => { }));
        if (syncUser && syncReadyRef.current)
            await window.GeelyFirebaseSync.deleteQuotation(id).catch(() => { });
        showToast('Đã xóa báo giá.');
    };
    const handleNewQuotation = () => {
        setCurrentQuoteId(createQuoteId());
        setCustomerName('');
        setCustomerPhone('');
        setCarColor('');
        setSelectedPromoIds([]);
        setDiscount('');
        setQuoteNotes('');
        setQuoteStatus('draft');
        setActiveTab('input');
    };
    const handlePrintA4 = async () => {
        const element = captureRef.current;
        if (!element)
            return showToast('Hãy mở tab Báo Giá trước.');
        await waitForExportCanvases(element);
        const clone = element.cloneNode(true);
        const sourceCanvases = Array.from(element.querySelectorAll('canvas'));
        const clonedCanvases = Array.from(clone.querySelectorAll('canvas'));
        clonedCanvases.forEach((canvas, index) => {
            var _a;
            const image = document.createElement('img');
            try {
                image.src = ((_a = sourceCanvases[index]) === null || _a === void 0 ? void 0 : _a.toDataURL('image/png')) || '';
            }
            catch (error) { }
            image.style.width = '100%';
            image.style.height = '100%';
            image.style.objectFit = 'contain';
            canvas.replaceWith(image);
        });
        clone.style.transform = 'none';
        clone.style.width = '800px';
        clone.style.boxShadow = 'none';
        clone.style.border = '0';
        const printWindow = window.open('', '_blank');
        if (!printWindow)
            return showToast('Trình duyệt đã chặn cửa sổ in.');
        const appCssUrl = new URL('./assets/app.css', window.location.href).href;
        const exportCssUrl = new URL('./assets/export-compat.css', window.location.href).href;
        printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${currentQuoteId}</title><link rel="stylesheet" href="${appCssUrl}"><link rel="stylesheet" href="${exportCssUrl}"><style>@page{size:A4;margin:8mm}body{margin:0;background:white}.print-wrap{width:194mm;margin:0 auto}.print-wrap>#quote-capture-area{width:100%!important;transform:none!important;padding:8mm!important;box-sizing:border-box!important}@media print{button{display:none!important}}</style></head><body><div class="print-wrap">${clone.outerHTML}</div><script>window.onload=()=>setTimeout(()=>window.print(),700)<\/script></body></html>`);
        printWindow.document.close();
    };
    const renderInputForm = () => (React.createElement("div", { className: "space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20" },
        React.createElement("div", { className: "grid grid-cols-2 gap-3" },
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "T\u00EAn kh\u00E1ch h\u00E0ng"),
                React.createElement("input", { type: "text", value: customerName, onChange: (e) => setCustomerName(e.target.value), placeholder: "VD: Anh Tu\u1EA5n", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" })),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"),
                React.createElement("input", { type: "tel", value: customerPhone, onChange: (e) => setCustomerPhone(e.target.value), placeholder: "VD: 090xxxxxxx", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" }))),
        React.createElement("div", { className: "grid grid-cols-3 gap-3" },
            React.createElement("div", { className: "col-span-2" },
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "D\u00F2ng xe Geely"),
                React.createElement("select", { value: selectedCarId, onChange: (e) => setSelectedCarId(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-900 text-sm" }, cars.map(c => React.createElement("option", { key: c.id, value: c.id },
                    c.name,
                    " - ",
                    formatVND(c.price))))),
            React.createElement("div", { className: "col-span-1" },
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "M\u00E0u s\u1EAFc"),
                React.createElement("input", { type: "text", value: carColor, onChange: (e) => setCarColor(e.target.value), placeholder: "VD: Tr\u1EAFng", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" }))),
        React.createElement("div", null,
            React.createElement("label", { className: "block text-sm font-semibold text-gray-700 mb-1" }, "N\u01A1i \u0111\u0103ng k\u00FD"),
            React.createElement("select", { value: selectedLocationId, onChange: (e) => setSelectedLocationId(e.target.value), className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" }, LOCATIONS.map(l => React.createElement("option", { key: l.id, value: l.id }, l.name)))),
        React.createElement("div", { className: "grid grid-cols-2 gap-3" },
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Lo\u1EA1i Bi\u1EC3n (Ph\u00ED \u0110B)"),
                React.createElement("select", { value: plateColor, onChange: (e) => setPlateColor(e.target.value), className: "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium" },
                    React.createElement("option", { value: "white" }, "Tr\u1EAFng (130k)"),
                    React.createElement("option", { value: "yellow" }, "V\u00E0ng (180k)"))),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Th\u1EDDi gian n\u1ED9p \u0110B"),
                React.createElement("select", { value: roadFeeYears, onChange: (e) => setRoadFeeYears(Number(e.target.value)), className: "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium" },
                    React.createElement("option", { value: 1 }, "1 n\u0103m"),
                    React.createElement("option", { value: 2 }, "2 n\u0103m"),
                    React.createElement("option", { value: 3 }, "3 n\u0103m")))),
        React.createElement("div", { className: "space-y-3" },
            React.createElement("label", { className: "block text-sm font-semibold text-gray-700 mb-1" }, "Khuy\u1EBFn m\u00E3i (Ch\u1ECDn nhi\u1EC1u)"),
            promotions.length > 0 && (React.createElement("div", { className: "grid grid-cols-1 gap-2 p-3 bg-red-50 border border-red-100 rounded-lg max-h-48 overflow-y-auto" }, promotions.map(p => (React.createElement("label", { key: p.id, className: "flex items-start space-x-3 cursor-pointer p-2 hover:bg-white rounded border border-transparent hover:border-red-200" },
                React.createElement("input", { type: "checkbox", checked: selectedPromoIds.includes(p.id), onChange: (e) => { e.target.checked ? setSelectedPromoIds([...selectedPromoIds, p.id]) : setSelectedPromoIds(selectedPromoIds.filter(id => id !== p.id)); }, className: "mt-1 w-4 h-4 text-red-600 rounded" }),
                React.createElement("span", { className: "text-sm font-medium text-gray-800" },
                    React.createElement("b", null,
                        PROMOTION_TYPES[p.type] || 'Khuyến mãi',
                        ":"),
                    " ",
                    p.name,
                    " ",
                    p.deductFromPrice && p.value > 0 ? `(-${formatVND(p.value)})` : (p.value > 0 ? `(Giá trị ${formatVND(p.value)})` : ''))))))),
            React.createElement("label", { className: "block text-sm font-semibold text-gray-700 mt-3 mb-1" }, "Gi\u1EA3m gi\u00E1 ti\u1EC1n m\u1EB7t th\u00EAm (VN\u0110)"),
            React.createElement("input", { type: "text", value: discount, onChange: handleDiscountChange, placeholder: "\u0110\u1EC3 tr\u1ED1ng \u0111\u1EC3 \u0111i\u1EC1n s\u1ED1 ti\u1EC1n gi\u1EA3m...", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-700" })),
        React.createElement("div", { className: "pt-2 space-y-3 border-t border-gray-100" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("label", { className: "flex items-center space-x-3 cursor-pointer flex-1" },
                    React.createElement("input", { type: "checkbox", checked: includePhysicalInsurance, onChange: (e) => setIncludePhysicalInsurance(e.target.checked), className: "w-5 h-5 text-blue-600 rounded" }),
                    React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "K\u00E8m BH v\u1EADt ch\u1EA5t")),
                includePhysicalInsurance && (React.createElement("div", { className: "flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200" },
                    React.createElement("input", { type: "number", step: "0.1", value: physicalInsuranceRate, onChange: (e) => setPhysicalInsuranceRate(Number(e.target.value)), className: "w-14 bg-transparent text-sm text-center outline-none font-bold text-blue-600" }),
                    React.createElement("span", { className: "text-xs font-semibold text-gray-500" }, "%")))),
            React.createElement("label", { className: "flex items-center space-x-3 cursor-pointer" },
                React.createElement("input", { type: "checkbox", checked: includeServiceFee, onChange: (e) => setIncludeServiceFee(e.target.checked), className: "w-5 h-5 text-blue-600 rounded" }),
                React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "K\u00E8m Ph\u00ED d\u1ECBch v\u1EE5 \u0111\u0103ng k\u00FD"))),
        React.createElement("div", { className: "pt-3 border-t border-gray-100 space-y-2" },
            React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-bold text-gray-600 mb-1" }, "Tr\u1EA1ng th\u00E1i b\u00E1o gi\u00E1"),
                    React.createElement("select", { value: quoteStatus, onChange: e => setQuoteStatus(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" },
                        React.createElement("option", { value: "draft" }, "B\u1EA3n nh\u00E1p"),
                        React.createElement("option", { value: "sent" }, "\u0110\u00E3 g\u1EEDi kh\u00E1ch"),
                        React.createElement("option", { value: "followup" }, "\u0110ang theo d\u00F5i"),
                        React.createElement("option", { value: "test_drive" }, "H\u1EB9n l\u00E1i th\u1EED"),
                        React.createElement("option", { value: "deposited" }, "\u0110\u00E3 \u0111\u1EB7t c\u1ECDc"),
                        React.createElement("option", { value: "lost" }, "Kh\u00F4ng th\u00E0nh c\u00F4ng"))),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-bold text-gray-600 mb-1" }, "M\u00E3 b\u00E1o gi\u00E1"),
                    React.createElement("div", { className: "px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-black text-blue-800 truncate" }, currentQuoteId))),
            React.createElement("textarea", { value: quoteNotes, onChange: e => setQuoteNotes(e.target.value), placeholder: "Ghi ch\u00FA ch\u0103m s\u00F3c kh\u00E1ch h\u00E0ng...", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm min-h-20" }))));
    const renderBankLoan = () => {
        if (!loanCalculations)
            return null;
        return (React.createElement("div", { className: "space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20" },
            React.createElement("h3", { className: "font-bold text-gray-800 text-lg mb-2" }, "Ph\u01B0\u01A1ng \u00E1n t\u00E0i ch\u00EDnh"),
            React.createElement("div", { className: "space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200" },
                React.createElement("div", null,
                    React.createElement("div", { className: "flex justify-between mb-1" },
                        React.createElement("span", { className: "text-sm font-semibold text-gray-700" }, "T\u1EF7 l\u1EC7 tr\u1EA3 tr\u01B0\u1EDBc"),
                        React.createElement("span", { className: "text-sm font-bold text-blue-600" },
                            loanParams.downPaymentPercent,
                            "%")),
                    React.createElement("input", { type: "range", min: "15", max: "80", step: "5", value: loanParams.downPaymentPercent, onChange: (e) => setLoanParams({ ...loanParams, downPaymentPercent: Number(e.target.value) }), className: "w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" })),
                React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Th\u1EDDi gian vay (N\u0103m)"),
                        React.createElement("select", { value: loanParams.loanTermYears, onChange: (e) => setLoanParams({ ...loanParams, loanTermYears: Number(e.target.value) }), className: "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium" }, [2, 3, 4, 5, 6, 7, 8].map(y => React.createElement("option", { key: y, value: y },
                            y,
                            " n\u0103m")))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Th\u1EDDi gian \u01AFu \u0111\u00E3i"),
                        React.createElement("select", { value: loanParams.fixedTermMonths, onChange: (e) => setLoanParams({ ...loanParams, fixedTermMonths: Number(e.target.value) }), className: "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium" },
                            React.createElement("option", { value: 0 }, "Kh\u00F4ng \u01B0u \u0111\u00E3i"),
                            React.createElement("option", { value: 6 }, "6 th\u00E1ng"),
                            React.createElement("option", { value: 12 }, "12 th\u00E1ng (1 n\u0103m)"),
                            React.createElement("option", { value: 24 }, "24 th\u00E1ng (2 n\u0103m)"),
                            React.createElement("option", { value: 36 }, "36 th\u00E1ng (3 n\u0103m)")))),
                React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "L\u00E3i su\u1EA5t \u01AFu \u0111\u00E3i"),
                        React.createElement("div", { className: "flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden" },
                            React.createElement("input", { type: "number", step: "0.1", value: loanParams.fixedInterestRate, onChange: (e) => setLoanParams({ ...loanParams, fixedInterestRate: Number(e.target.value) }), className: "w-full px-3 py-2 outline-none text-sm font-medium text-blue-600" }),
                            React.createElement("span", { className: "px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm" }, "%"))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "L\u00E3i th\u1EA3 n\u1ED5i d\u1EF1 ki\u1EBFn"),
                        React.createElement("div", { className: "flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden" },
                            React.createElement("input", { type: "number", step: "0.1", value: loanParams.floatingInterestRate, onChange: (e) => setLoanParams({ ...loanParams, floatingInterestRate: Number(e.target.value) }), className: "w-full px-3 py-2 outline-none text-sm font-medium text-orange-600" }),
                            React.createElement("span", { className: "px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm" }, "%")))),
                React.createElement("p", { className: "text-[10px] text-gray-500 italic mt-1" }, "* L\u00E3i th\u1EA3 n\u1ED5i = L\u00E3i c\u01A1 s\u1EDF + Bi\u00EAn \u0111\u1ED9 (Th\u01B0\u1EDDng t\u1EEB 10.5% - 12%)")),
            React.createElement("div", { className: "border-t border-gray-100 pt-4 mt-2" },
                React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 text-center" },
                    React.createElement("p", { className: "text-sm font-semibold text-blue-900 mb-1" }, "Kho\u1EA3n tr\u1EA3 tr\u01B0\u1EDBc (Bao g\u1ED3m l\u0103n b\u00E1nh)"),
                    React.createElement("p", { className: "text-3xl font-black text-blue-700" }, formatVND(loanCalculations.upfrontPayment))),
                React.createElement("div", { className: "flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3" },
                    React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "T\u1ED5ng s\u1ED1 ti\u1EC1n vay NH"),
                    React.createElement("span", { className: "font-bold text-gray-900" }, formatVND(loanCalculations.loanAmount))),
                React.createElement("div", { className: "bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg mb-2" },
                    React.createElement("p", { className: "text-xs font-bold text-green-700 uppercase mb-1" }, "G\u1ED1c & L\u00E3i th\u00E1ng \u0111\u1EA7u (\u01AFu \u0111\u00E3i)"),
                    React.createElement("div", { className: "flex justify-between items-end" },
                        React.createElement("span", { className: "text-2xl font-black text-green-600" }, formatVND(loanCalculations.firstMonthTotal)))),
                loanCalculations.firstFloatingMonthTotal > 0 && (React.createElement("div", { className: "bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg" },
                    React.createElement("p", { className: "text-xs font-bold text-orange-700 uppercase mb-1" },
                        "D\u1EF1 ki\u1EBFn G\u1ED1c & L\u00E3i th\u00E1ng ",
                        loanCalculations.firstFloatingMonth,
                        " (Th\u1EA3 n\u1ED5i)"),
                    React.createElement("div", { className: "flex justify-between items-end" },
                        React.createElement("span", { className: "text-lg font-black text-orange-600" }, formatVND(loanCalculations.firstFloatingMonthTotal))),
                    React.createElement("p", { className: "text-[10px] text-orange-500 mt-1" }, "* T\u00EDnh tr\u00EAn d\u01B0 n\u1EE3 th\u1EF1c t\u1EBF c\u00F2n l\u1EA1i sau khi h\u1EBFt \u01B0u \u0111\u00E3i")))),
            React.createElement("button", { onClick: handleExportExcel, className: "w-full mt-4 py-3 bg-green-100 text-green-700 border-2 border-green-600 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white transition-colors" }, "T\u1EA3i B\u1EA3ng L\u00E3i Xu\u1ED1ng Excel (CSV)")));
    };
    const renderSettings = () => (React.createElement("div", { className: "space-y-4 pb-20" },
        React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
            React.createElement("div", { className: "flex items-start justify-between gap-3 mb-3" },
                React.createElement("div", null,
                    React.createElement("h3", { className: "font-black text-gray-800" }, "\u2601\uFE0F \u0110\u1ED3ng B\u1ED9 Firebase"),
                    React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "\u0110\u1ED3ng b\u1ED9 ri\u00EAng t\u1EEBng xe, khuy\u1EBFn m\u00E3i, c\u00E0i \u0111\u1EB7t v\u00E0 l\u1ECBch s\u1EED b\u00E1o gi\u00E1.")),
                React.createElement("span", { className: `shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full ${['synced'].includes(syncStatus.code) ? 'bg-green-100 text-green-700' :
                        ['pending', 'queued', 'working'].includes(syncStatus.code) ? 'bg-yellow-100 text-yellow-700' :
                            ['error'].includes(syncStatus.code) ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-600'}` }, syncStatus.code === 'synced' ? 'ĐÃ ĐỒNG BỘ' :
                    syncStatus.code === 'offline' ? 'NGOẠI TUYẾN' :
                        ['pending', 'queued'].includes(syncStatus.code) ? 'ĐANG CHỜ' :
                            syncStatus.code === 'working' ? 'ĐANG XỬ LÝ' :
                                syncStatus.code === 'error' ? 'CÓ LỖI' :
                                    syncUser ? 'CHƯA THIẾT LẬP' : 'CHƯA ĐĂNG NHẬP')),
            React.createElement("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3" },
                React.createElement("p", { className: "text-sm font-semibold text-slate-700" }, syncStatus.message || firebaseState.message),
                syncStatus.updatedAtMs > 0 && (React.createElement("p", { className: "text-[11px] text-slate-500 mt-1" },
                    "C\u1EADp nh\u1EADt g\u1EA7n nh\u1EA5t: ",
                    formatSyncTime(syncStatus.updatedAtMs))),
                !firebaseState.online && React.createElement("p", { className: "text-[11px] font-bold text-orange-600 mt-1" }, "Thi\u1EBFt b\u1ECB \u0111ang kh\u00F4ng c\u00F3 m\u1EA1ng."),
                firebaseState.sdk === 'error' && (React.createElement("p", { className: "text-[11px] text-red-600 mt-1" }, firebaseState.error || 'Không tải được thư viện Firebase.'))),
            !syncUser ? (React.createElement("div", { className: "space-y-2" },
                React.createElement("button", { type: "button", onClick: handleFirebaseSignIn, disabled: firebaseState.sdk === 'loading', className: "w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-sm disabled:opacity-50" }, firebaseState.sdk === 'loading' ? 'Đang tải Firebase...' : 'Đăng nhập bằng Google'),
                firebaseState.sdk === 'error' && (React.createElement("button", { type: "button", onClick: () => { var _a, _b; return (_b = (_a = window.GeelyFirebaseSync) === null || _a === void 0 ? void 0 : _a.retry) === null || _b === void 0 ? void 0 : _b.call(_a).catch(() => { }); }, className: "w-full py-2.5 bg-white text-blue-700 border-2 border-blue-500 rounded-xl font-bold text-sm" }, "Th\u1EED t\u1EA3i l\u1EA1i Firebase")),
                React.createElement("p", { className: "text-[11px] text-gray-500 text-center" }, "H\u00E3y \u0111\u0103ng nh\u1EADp c\u00F9ng m\u1ED9t t\u00E0i kho\u1EA3n Google tr\u00EAn \u0111i\u1EC7n tho\u1EA1i v\u00E0 m\u00E1y t\u00EDnh."))) : (React.createElement("div", { className: "space-y-3" },
                React.createElement("div", { className: "flex items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl" },
                    React.createElement("div", { className: "min-w-0" },
                        React.createElement("p", { className: "font-bold text-blue-900 truncate" }, syncUser.displayName || 'Tài khoản Google'),
                        React.createElement("p", { className: "text-xs text-blue-700 truncate" }, syncUser.email)),
                    React.createElement("button", { type: "button", onClick: handleFirebaseSignOut, className: "shrink-0 px-3 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold text-xs" }, "\u0110\u0103ng xu\u1EA5t")),
                syncStatus.code === 'choice_needed' && (React.createElement("div", { className: "space-y-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl" },
                    React.createElement("p", { className: "text-xs font-bold text-yellow-900" }, "Hai n\u01A1i \u0111ang c\u00F3 d\u1EEF li\u1EC7u. H\u00E3y ch\u1ECDn b\u1EA3n ch\u00EDnh cho l\u1EA7n thi\u1EBFt l\u1EADp \u0111\u1EA7u ti\u00EAn:"),
                    React.createElement("button", { type: "button", onClick: handleUploadCurrentToCloud, className: "w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm" }, "\u0110\u01B0a d\u1EEF li\u1EC7u thi\u1EBFt b\u1ECB n\u00E0y l\u00EAn Firebase"),
                    React.createElement("button", { type: "button", onClick: handleDownloadCloudToDevice, className: "w-full py-2.5 bg-white text-yellow-800 border-2 border-yellow-500 rounded-lg font-bold text-sm" }, "T\u1EA3i d\u1EEF li\u1EC7u Firebase v\u1EC1 thi\u1EBFt b\u1ECB n\u00E0y"))),
                syncStatus.code === 'cloud_empty' && (React.createElement("button", { type: "button", onClick: handleUploadCurrentToCloud, className: "w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm" }, "\u0110\u01B0a d\u1EEF li\u1EC7u hi\u1EC7n t\u1EA1i l\u00EAn Firebase")),
                !['choice_needed', 'cloud_empty'].includes(syncStatus.code) && (React.createElement("button", { type: "button", onClick: handleSyncNow, className: "w-full py-2.5 bg-green-50 text-green-700 border-2 border-green-500 rounded-xl font-bold text-sm" }, "\u0110\u1ED3ng b\u1ED9 ngay")))),
            React.createElement("div", { className: "mt-3 p-3 bg-orange-50 border border-orange-100 rounded-xl text-[11px] text-orange-800 leading-relaxed" },
                React.createElement("b", null, "\u1EA2nh chu\u1EA9n \u0111\u01B0\u1EE3c \u0111\u1ED3ng b\u1ED9 b\u1EB1ng \u0111\u01B0\u1EDDng d\u1EABn GitHub."),
                " \u1EA2nh b\u1EA1n ch\u1ECDn t\u1EEB thi\u1EBFt b\u1ECB \u0111\u01B0\u1EE3c l\u01B0u ri\u00EAng trong IndexedDB v\u00E0 s\u1EBD \u01B0u ti\u00EAn hi\u1EC3n th\u1ECB tr\u00EAn thi\u1EBFt b\u1ECB \u0111\u00F3.")),
        React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
            React.createElement("h3", { className: "font-bold text-gray-800 mb-3" }, "\uD83D\uDC68\u200D\uD83D\uDCBC Th\u00F4ng Tin B\u00E1n H\u00E0ng (In tr\u00EAn B\u00E1o gi\u00E1)"),
            React.createElement("input", { type: "text", placeholder: "T\u00EAn (VD: Tu\u1EA5n Geely)", value: salesInfo.name, onChange: e => setSalesInfo({ ...salesInfo, name: e.target.value }), className: "w-full px-3 py-2 mb-2 bg-gray-50 border rounded-lg text-sm" }),
            React.createElement("input", { type: "tel", placeholder: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", value: salesInfo.phone, onChange: e => setSalesInfo({ ...salesInfo, phone: e.target.value }), className: "w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" })),
        React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
            React.createElement("h3", { className: "font-bold text-gray-800 mb-3" }, "\uD83D\uDEE0 C\u00E0i \u0110\u1EB7t Ph\u00ED D\u1ECBch V\u1EE5 \u0110\u0103ng K\u00FD"),
            React.createElement("div", { className: "flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden" },
                React.createElement("input", { type: "text", inputMode: "numeric", value: formatNumber(serviceFeeAmount), onChange: e => setServiceFeeAmount(parseMoney(e.target.value)), className: "w-full px-3 py-2 outline-none text-sm font-medium text-blue-600 bg-transparent" }),
                React.createElement("span", { className: "px-3 text-gray-500 font-semibold border-l text-sm bg-white" }, "VN\u0110"))),
        React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
            React.createElement("h3", { className: "font-bold text-gray-800 mb-1" }, "\uD83D\uDE98 Qu\u1EA3n L\u00FD D\u00F2ng Xe & H\u00ECnh \u1EA2nh"),
            React.createElement("p", { className: "text-xs text-gray-500 mb-3" },
                "B\u1EA5m ",
                React.createElement("b", null, "S\u1EEDa"),
                " \u0111\u1EC3 c\u1EADp nh\u1EADt xe \u0111\u00E3 c\u00F3. C\u00F3 th\u1EC3 d\u00E1n link \u1EA3nh ho\u1EB7c ch\u1ECDn \u1EA3nh tr\u1EF1c ti\u1EBFp t\u1EEB \u0111i\u1EC7n tho\u1EA1i/m\u00E1y t\u00EDnh."),
            React.createElement("div", { className: "space-y-2 mb-4 max-h-80 overflow-y-auto pr-1" }, cars.map(c => (React.createElement("div", { key: c.id, className: `p-2.5 rounded-xl border text-sm ${editingCarId === c.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}` },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center" },
                        React.createElement(CarSilhouette, { className: "w-14 text-slate-200" }),
                        (carImageMap[c.id] || c.imagePath) && (React.createElement("img", { src: carImageMap[c.id] || c.imagePath, crossOrigin: "anonymous", alt: c.name, className: "absolute inset-0 w-full h-full object-contain p-1 bg-white", onError: e => { e.currentTarget.style.display = 'none'; } }))),
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        React.createElement("div", { className: "font-bold text-gray-800 truncate" }, c.name),
                        React.createElement("div", { className: "text-blue-600 font-semibold" }, formatVND(c.price)),
                        React.createElement("div", { className: "text-[11px] text-gray-500 mt-0.5" },
                            Number(c.seats) || 5,
                            " ch\u1ED7 \u00B7 ",
                            carImageMap[c.id] ? 'Ảnh cục bộ' : (c.imagePath ? 'Ảnh GitHub' : 'Chưa có ảnh'))),
                    React.createElement("div", { className: "flex flex-col gap-1.5 shrink-0" },
                        React.createElement("button", { onClick: () => handleStartEditCar(c), className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs" }, "S\u1EEDa"),
                        React.createElement("button", { onClick: () => handleDeleteCar(c.id), className: "px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-bold text-xs" }, "X\u00F3a"))))))),
            React.createElement("div", { id: "car-editor", className: `pt-4 border-t space-y-3 scroll-mt-24 ${editingCarId ? 'border-blue-300' : 'border-gray-200'}` },
                React.createElement("div", { className: "flex items-center justify-between" },
                    React.createElement("h4", { className: `font-black text-sm uppercase ${editingCarId ? 'text-blue-700' : 'text-gray-700'}` }, editingCarId ? 'Chỉnh sửa dòng xe' : 'Thêm dòng xe mới'),
                    editingCarId && React.createElement("span", { className: "text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full" }, "\u0110ANG S\u1EECA")),
                React.createElement("input", { type: "text", placeholder: "T\u00EAn xe (VD: Geely EX5)", value: newCarName, onChange: e => setNewCarName(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" }),
                React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                    React.createElement("input", { type: "text", inputMode: "numeric", placeholder: "Gi\u00E1 ti\u1EC1n", value: newCarPrice, onChange: e => formatNumberInput(e, setNewCarPrice), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" }),
                    React.createElement("select", { value: newCarSeats, onChange: e => setNewCarSeats(Number(e.target.value)), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" },
                        React.createElement("option", { value: 5 }, "Xe 5 ch\u1ED7"),
                        React.createElement("option", { value: 7 }, "Xe 7 ch\u1ED7"))),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-bold text-gray-600 mb-1" }, "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh chu\u1EA9n tr\u00EAn GitHub"),
                    React.createElement("input", { type: "text", placeholder: "./assets/cars/ex2_pro.png", value: newCarImagePath, onChange: e => setNewCarImagePath(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" })),
                React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                    React.createElement("label", { className: `w-full py-2.5 rounded-lg font-bold text-sm text-center cursor-pointer border-2 transition-colors ${isProcessingCarImage ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none' : 'bg-green-50 text-green-700 border-green-500 hover:bg-green-100'}` },
                        React.createElement("input", { type: "file", accept: "image/*", onChange: handleCarImageFileChange, className: "hidden", disabled: isProcessingCarImage }),
                        isProcessingCarImage ? 'Đang xử lý ảnh...' : 'Chọn ảnh riêng trên máy'),
                    React.createElement("button", { type: "button", onClick: () => setNewCarImage(''), disabled: !newCarImage || isProcessingCarImage, className: "w-full py-2.5 bg-gray-100 text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm disabled:opacity-40" }, "B\u1ECF \u1EA3nh c\u1EE5c b\u1ED9")),
                React.createElement("p", { className: "text-[11px] text-gray-500 leading-relaxed" }, "\u0110\u01B0\u1EDDng d\u1EABn GitHub \u0111\u01B0\u1EE3c \u0111\u1ED3ng b\u1ED9 tr\u00EAn m\u1ECDi thi\u1EBFt b\u1ECB. \u1EA2nh ch\u1ECDn tr\u1EF1c ti\u1EBFp \u0111\u01B0\u1EE3c n\u00E9n v\u00E0 l\u01B0u trong IndexedDB, kh\u00F4ng l\u00E0m \u0111\u1EA7y localStorage."),
                React.createElement("div", { className: "relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center" },
                    React.createElement(CarSilhouette, { className: "w-44 text-slate-200" }),
                    (newCarImage || newCarImagePath) && (React.createElement("img", { src: newCarImage || newCarImagePath, crossOrigin: "anonymous", alt: "Xem tr\u01B0\u1EDBc \u1EA3nh xe", className: "absolute inset-0 w-full h-full object-contain p-3 bg-white", onError: e => { e.currentTarget.style.display = 'none'; } })),
                    React.createElement("span", { className: "absolute bottom-2 right-2 text-[10px] font-bold bg-white/90 text-gray-500 px-2 py-1 rounded-md border" }, newCarImage ? 'ẢNH CỤC BỘ' : 'ẢNH GITHUB')),
                React.createElement("div", { className: `grid ${editingCarId ? 'grid-cols-2' : 'grid-cols-1'} gap-2` },
                    editingCarId && (React.createElement("button", { onClick: resetCarEditor, className: "w-full py-2.5 bg-white text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm" }, "H\u1EE7y ch\u1EC9nh s\u1EEDa")),
                    React.createElement("button", { onClick: handleSaveCar, disabled: isProcessingCarImage, className: "w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm disabled:opacity-50" }, editingCarId ? 'Lưu thay đổi' : '+ Thêm xe')))),
        React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
            React.createElement("h3", { className: "font-bold text-gray-800 mb-3" }, "\uD83C\uDF81 Qu\u1EA3n L\u00FD Khuy\u1EBFn M\u00E3i"),
            React.createElement("div", { className: "space-y-2 mb-3 max-h-60 overflow-y-auto" }, promotions.map(p => (React.createElement("div", { key: p.id, className: "flex justify-between items-center p-2 bg-gray-50 rounded-lg border text-sm" },
                React.createElement("div", { className: "font-medium" },
                    React.createElement("span", { className: "text-[10px] uppercase font-black text-blue-600" }, PROMOTION_TYPES[p.type] || 'Khuyến mãi'),
                    React.createElement("br", null),
                    p.name,
                    " ",
                    p.value > 0 ? React.createElement("span", { className: p.deductFromPrice ? "text-red-500 block text-xs font-bold" : "text-gray-500 block text-xs font-bold" },
                        p.deductFromPrice ? '-' : 'Giá trị ',
                        formatVND(p.value)) : null),
                React.createElement("button", { onClick: () => handleDeletePromo(p.id), className: "text-red-500 font-bold p-2 text-xs" }, "X\u00F3a"))))),
            React.createElement("div", { className: "pt-3 border-t space-y-2" },
                React.createElement("input", { type: "text", placeholder: "T\u00EAn KM (VD: T\u1EB7ng th\u1EA3m s\u00E0n)", value: newPromoName, onChange: e => setNewPromoName(e.target.value), className: "w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" }),
                React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                    React.createElement("select", { value: newPromoType, onChange: e => setNewPromoType(e.target.value), className: "w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" }, Object.entries(PROMOTION_TYPES).map(([value, label]) => React.createElement("option", { key: value, value: value }, label))),
                    React.createElement("input", { type: "text", inputMode: "numeric", placeholder: "Gi\u00E1 tr\u1ECB VN\u0110", value: newPromoValue, onChange: e => formatNumberInput(e, setNewPromoValue), className: "w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" })),
                React.createElement("label", { className: "flex items-center gap-2 p-2 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-700" },
                    React.createElement("input", { type: "checkbox", checked: newPromoDeduct, onChange: e => setNewPromoDeduct(e.target.checked), className: "w-4 h-4" }),
                    "Tr\u1EEB tr\u1EF1c ti\u1EBFp v\u00E0o gi\u00E1 xe"),
                React.createElement("button", { onClick: handleAddPromo, className: "w-full py-2 bg-red-100 text-red-700 font-bold rounded-lg text-sm" }, "+ Th\u00EAm Khuy\u1EBFn M\u00E3i")))));
    const renderHistory = () => {
        const keyword = historySearch.trim().toLowerCase();
        const items = quotations.filter(item => !keyword || [item.id, item.customerName, item.customerPhone, item.carName].some(value => String(value || '').toLowerCase().includes(keyword)));
        const statusLabels = { draft: 'Bản nháp', sent: 'Đã gửi', followup: 'Đang theo dõi', test_drive: 'Hẹn lái thử', deposited: 'Đã đặt cọc', lost: 'Không thành công' };
        return (React.createElement("div", { className: "space-y-4 pb-24" },
            React.createElement("div", { className: "bg-white p-4 rounded-xl border border-gray-100 shadow-sm" },
                React.createElement("div", { className: "flex items-center justify-between gap-3 mb-3" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-gray-800" }, "\uD83D\uDCCB L\u1ECBch s\u1EED b\u00E1o gi\u00E1"),
                        React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "\u0110\u01B0\u1EE3c l\u01B0u tr\u00EAn m\u00E1y v\u00E0 \u0111\u1ED3ng b\u1ED9 Firebase khi \u0111\u0103ng nh\u1EADp.")),
                    React.createElement("button", { onClick: handleNewQuotation, className: "px-3 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs" }, "+ B\u00E1o gi\u00E1 m\u1EDBi")),
                React.createElement("input", { value: historySearch, onChange: e => setHistorySearch(e.target.value), placeholder: "T\u00ECm t\u00EAn, S\u0110T, xe ho\u1EB7c m\u00E3 b\u00E1o gi\u00E1...", className: "w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" })),
            items.length === 0 ? (React.createElement("div", { className: "bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500" },
                React.createElement("p", { className: "font-bold" }, "Ch\u01B0a c\u00F3 b\u00E1o gi\u00E1 ph\u00F9 h\u1EE3p"),
                React.createElement("p", { className: "text-xs mt-1" }, "L\u01B0u b\u00E1o gi\u00E1 t\u1EA1i tab B\u00E1o Gi\u00E1 \u0111\u1EC3 theo d\u00F5i kh\u00E1ch h\u00E0ng."))) : items.map(item => (React.createElement("div", { key: item.id, className: "bg-white p-4 rounded-xl border border-gray-100 shadow-sm" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", { className: "min-w-0" },
                        React.createElement("p", { className: "text-[11px] font-black text-blue-600" }, item.id),
                        React.createElement("p", { className: "font-black text-gray-900 truncate" }, item.customerName || 'Khách hàng chưa đặt tên'),
                        React.createElement("p", { className: "text-xs text-gray-500" },
                            item.customerPhone || 'Chưa có SĐT',
                            " \u00B7 ",
                            item.carName || 'Chưa chọn xe')),
                    React.createElement("span", { className: "text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-700 rounded-full" }, statusLabels[item.status] || 'Bản nháp')),
                React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-3 text-xs" },
                    React.createElement("div", { className: "p-2 bg-blue-50 rounded-lg" },
                        React.createElement("span", { className: "text-gray-500" }, "T\u1ED5ng thanh to\u00E1n"),
                        React.createElement("div", { className: "font-black text-blue-800" }, formatVND(item.totalAmount))),
                    React.createElement("div", { className: "p-2 bg-yellow-50 rounded-lg" },
                        React.createElement("span", { className: "text-gray-500" }, "C\u1EADp nh\u1EADt"),
                        React.createElement("div", { className: "font-bold text-yellow-800" }, new Date(item.updatedAtMs || item.createdAtMs || Date.now()).toLocaleDateString('vi-VN')))),
                item.notes && React.createElement("p", { className: "mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg line-clamp-2" }, item.notes),
                React.createElement("div", { className: "grid grid-cols-3 gap-2 mt-3" },
                    React.createElement("button", { onClick: () => handleLoadQuotation(item), className: "py-2 bg-blue-600 text-white rounded-lg font-bold text-xs" }, "M\u1EDF l\u1EA1i"),
                    React.createElement("button", { onClick: () => { handleLoadQuotation(item); setCurrentQuoteId(createQuoteId()); }, className: "py-2 bg-green-50 border border-green-300 text-green-700 rounded-lg font-bold text-xs" }, "Nh\u00E2n b\u1EA3n"),
                    React.createElement("button", { onClick: () => handleDeleteQuotation(item.id), className: "py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg font-bold text-xs" }, "X\u00F3a")))))));
    };
    const renderQuotePreview = () => {
        if (!calculations || !car)
            return null;
        return (React.createElement("div", { ref: previewContainerRef, className: "w-full flex justify-center mb-24" },
            React.createElement("div", { className: "relative shrink-0", style: {
                    width: `${800 * previewScale}px`,
                    height: quoteHeight ? `${quoteHeight * previewScale}px` : 'auto'
                } },
                React.createElement("div", { ref: captureRef, id: "quote-capture-area", className: "bg-white relative shadow-md shrink-0 border border-gray-200", style: {
                        width: '800px',
                        padding: '40px 50px',
                        boxSizing: 'border-box',
                        transform: `scale(${previewScale})`,
                        transformOrigin: 'top left'
                    } },
                    React.createElement("div", { className: "flex justify-between items-start border-b-[3px] border-slate-800 pb-5 mb-8" },
                        React.createElement("div", { className: "flex flex-col" },
                            React.createElement("div", { className: "flex items-center space-x-3 mb-3" },
                                React.createElement(GeelyLogo, { className: "w-32 h-auto text-slate-800", color: "currentColor" })),
                            React.createElement("span", { className: "font-black text-2xl uppercase text-slate-800 tracking-wide" }, "H\u1EA3i D\u01B0\u01A1ng"),
                            React.createElement("span", { className: "text-sm text-gray-500 font-medium uppercase tracking-widest mt-1" }, "\u0110\u1EA1i l\u00FD 3S Ch\u00EDnh H\u00E3ng")),
                        React.createElement("div", { className: "text-right text-sm space-y-1.5 text-gray-600 pt-2" },
                            React.createElement("p", null,
                                "M\u00E3 B\u00E1o Gi\u00E1: ",
                                React.createElement("span", { className: "font-bold text-slate-800" }, quoteData.code)),
                            React.createElement("p", null,
                                "Ng\u00E0y l\u1EADp: ",
                                React.createElement("span", { className: "font-medium text-slate-800" }, quoteData.date)),
                            React.createElement("p", null,
                                "Hi\u1EC7u l\u1EF1c \u0111\u1EBFn: ",
                                React.createElement("span", { className: "font-bold text-red-600" }, quoteData.validUntil)))),
                    React.createElement("h1", { className: "text-3xl font-black text-center uppercase text-slate-800 mb-8 tracking-wide" }, "B\u00E1o Gi\u00E1 L\u0103n B\u00E1nh Xe \u00D4 T\u00F4"),
                    React.createElement("div", { className: "grid grid-cols-2 gap-6 mb-8 text-sm" },
                        React.createElement("div", { className: "border border-gray-300 p-4 rounded-lg bg-slate-50/50" },
                            React.createElement("p", { className: "text-gray-500 text-xs uppercase font-bold tracking-wider mb-2" }, "Th\u00F4ng tin kh\u00E1ch h\u00E0ng"),
                            React.createElement("p", { className: "font-black text-lg text-slate-800" }, customerName || 'Khách hàng cá nhân/Doanh nghiệp'),
                            customerPhone && React.createElement("p", { className: "text-gray-700 font-medium mt-1" },
                                "S\u0110T: ",
                                customerPhone)),
                        React.createElement("div", { className: "border border-blue-200 p-4 rounded-lg bg-blue-50/30" },
                            React.createElement("p", { className: "text-blue-500 text-xs uppercase font-bold tracking-wider mb-2" }, "Th\u00F4ng tin d\u00F2ng xe"),
                            React.createElement("p", { className: "font-black text-lg text-blue-900" }, car.name),
                            carColor && React.createElement("p", { className: "text-slate-700 font-medium mt-1" },
                                "M\u00E0u s\u1EAFc: ",
                                carColor))),
                    React.createElement("div", { className: "w-full h-64 bg-slate-100 flex items-center justify-center mb-8 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner" },
                        resolvedCarImage ? (React.createElement(CarImageCanvas, { src: resolvedCarImage, alt: car.name })) : (React.createElement(CarSilhouette, { className: "w-72 text-slate-300" })),
                        React.createElement("div", { className: "absolute top-4 right-4 bg-white/95 backdrop-blur px-5 py-3 rounded-lg shadow-md border border-slate-200 text-center" },
                            React.createElement("p", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1" }, "Gi\u00E1 Ni\u00EAm Y\u1EBFt"),
                            React.createElement("p", { className: "text-2xl font-black text-blue-900 leading-none" }, formatVND(calculations.price)))),
                    React.createElement("table", { className: "w-full text-[15px] mb-8 border-collapse" },
                        React.createElement("tbody", null,
                            React.createElement("tr", { className: "bg-slate-100 border-y border-slate-300" },
                                React.createElement("td", { className: "p-3 font-black text-slate-800 uppercase", colSpan: "2" }, "1. Chi ti\u1EBFt gi\u00E1 tr\u1ECB xe")),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-3 text-slate-700" }, "Gi\u00E1 xe ni\u00EAm y\u1EBFt"),
                                React.createElement("td", { className: "p-3 text-right font-bold text-slate-800" }, formatVND(calculations.price))),
                            calculations.discountAmount > 0 && (React.createElement("tr", { className: "border-b border-slate-200 border-dashed bg-red-50/50" },
                                React.createElement("td", { className: "p-3 text-red-600" },
                                    React.createElement("span", { className: "font-bold" }, "Gi\u1EA3m gi\u00E1 tr\u1EF1c ti\u1EBFp"),
                                    React.createElement("ul", { className: "text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600" },
                                        calculations.selectedPromotions.filter(p => p.deductFromPrice).map(p => React.createElement("li", { key: p.id }, p.name)),
                                        parseMoney(discount) > 0 && React.createElement("li", null, "Gi\u1EA3m ti\u1EC1n m\u1EB7t b\u1ED5 sung"))),
                                React.createElement("td", { className: "p-3 text-right font-bold text-red-600 align-top" },
                                    "-",
                                    formatVND(calculations.discountAmount)))),
                            calculations.giftPromotions.length > 0 && (React.createElement("tr", { className: "border-b border-slate-200 border-dashed bg-green-50/50" },
                                React.createElement("td", { className: "p-3 text-green-700" },
                                    React.createElement("span", { className: "font-bold" }, "Qu\u00E0 t\u1EB7ng & quy\u1EC1n l\u1EE3i"),
                                    React.createElement("ul", { className: "text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600" }, calculations.giftPromotions.map(p => React.createElement("li", { key: p.id },
                                        p.name,
                                        p.value > 0 ? ` (giá trị ${formatVND(p.value)})` : '')))),
                                React.createElement("td", { className: "p-3 text-right font-bold text-green-700 align-top" }, "Kh\u00F4ng tr\u1EEB gi\u00E1"))),
                            React.createElement("tr", { className: "border-b-2 border-blue-200 bg-blue-50/50" },
                                React.createElement("td", { className: "p-3 font-bold text-blue-900" }, "Gi\u00E1 xe d\u1EF1 ki\u1EBFn sau gi\u1EA3m tr\u1EEB"),
                                React.createElement("td", { className: "p-3 text-right font-black text-blue-900 text-lg" }, formatVND(calculations.price - calculations.discountAmount))),
                            React.createElement("tr", { className: "bg-slate-100 border-b border-slate-300" },
                                React.createElement("td", { className: "p-3 font-black text-slate-800 uppercase mt-4 block border-none" },
                                    "2. Chi ph\u00ED \u0111\u0103ng k\u00FD (T\u1EA1m t\u00EDnh t\u1EA1i ",
                                    location.name,
                                    ")"),
                                React.createElement("td", null)),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" }, "L\u1EC7 ph\u00ED tr\u01B0\u1EDBc b\u1EA1"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.taxFee))),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" }, "Ph\u00ED c\u1EA5p bi\u1EC3n s\u1ED1"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.plateFee))),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" }, "Ph\u00ED \u0111\u0103ng ki\u1EC3m"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.inspectionFee))),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" },
                                    "Ph\u00ED b\u1EA3o tr\u00EC \u0111\u01B0\u1EDDng b\u1ED9 (",
                                    calculations.roadFeeYears,
                                    " n\u0103m)"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.roadFee))),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" }, "B\u1EA3o hi\u1EC3m TNDS (b\u1EAFt bu\u1ED9c)"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.civilInsurance))),
                            includePhysicalInsurance && React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" },
                                    "B\u1EA3o hi\u1EC3m v\u1EADt ch\u1EA5t (",
                                    physicalInsuranceRate,
                                    "%)"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.physicalInsuranceFee))),
                            includeServiceFee && React.createElement("tr", { className: "border-b border-slate-300" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" }, "Ph\u00ED d\u1ECBch v\u1EE5 \u0111\u0103ng k\u00FD"),
                                React.createElement("td", { className: "p-2.5 text-right font-medium" }, formatVND(calculations.serviceFee))))),
                    React.createElement("div", { className: "bg-slate-800 text-white p-5 rounded-xl flex justify-between items-center mb-5 shadow-lg" },
                        React.createElement("span", { className: "font-bold uppercase text-lg tracking-wider" }, "T\u1ED5ng thanh to\u00E1n th\u1EF1c t\u1EBF:"),
                        React.createElement("span", { className: "font-black text-3xl text-yellow-400 drop-shadow-md" }, formatVND(calculations.finalAmount))),
                    loanCalculations && loanParams.downPaymentPercent < 100 && (React.createElement("div", { className: "border-l-4 border-yellow-400 bg-yellow-50/50 p-4 mb-8 rounded-r-lg" },
                        React.createElement("p", { className: "text-slate-700 mb-1" },
                            "D\u1EF1 ki\u1EBFn tr\u1EA3 tr\u01B0\u1EDBc khi mua tr\u1EA3 g\u00F3p ",
                            React.createElement("span", { className: "font-bold text-sm" },
                                "(",
                                loanParams.downPaymentPercent,
                                "% gi\u00E1 xe + Chi ph\u00ED l\u0103n b\u00E1nh)"),
                            ":"),
                        React.createElement("p", { className: "font-black text-2xl text-yellow-600 mb-1" }, formatVND(loanCalculations.upfrontPayment)),
                        React.createElement("p", { className: "text-xs text-slate-500 italic" }, "Kho\u1EA3n tr\u1EA3 tr\u01B0\u1EDBc c\u00F3 th\u1EC3 thay \u0111\u1ED5i t\u00F9y thu\u1ED9c v\u00E0o t\u1EF7 l\u1EC7 x\u00E9t duy\u1EC7t c\u1EE7a ng\u00E2n h\u00E0ng."))),
                    React.createElement("div", { className: "border-t-[3px] border-slate-800 pt-6 flex justify-between items-end mt-12" },
                        React.createElement("div", { className: "text-[11px] text-slate-500 italic w-3/5 pr-6 leading-relaxed" },
                            "* Ghi ch\u00FA: Chi ph\u00ED thu\u1EBF, ph\u00ED tr\u00EAn mang t\u00EDnh ch\u1EA5t tham kh\u1EA3o v\u00E0 c\u00F3 th\u1EC3 thay \u0111\u1ED5i theo quy \u0111\u1ECBnh c\u1EE7a Nh\u00E0 n\u01B0\u1EDBc t\u1EA1i th\u1EDDi \u0111i\u1EC3m xu\u1EA5t h\u00F3a \u0111\u01A1n v\u00E0 \u0111\u0103ng k\u00FD xe.",
                            React.createElement("br", null),
                            "* B\u00E1o gi\u00E1 kh\u00F4ng thay th\u1EBF cho H\u1EE3p \u0111\u1ED3ng mua b\u00E1n ch\u00EDnh th\u1EE9c."),
                        React.createElement("div", { className: "w-2/5 flex items-end justify-end space-x-4" },
                            React.createElement("div", { className: "text-right pb-1" },
                                React.createElement("p", { className: "text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5" }, "\u0110\u1EA1i di\u1EC7n b\u00E1n h\u00E0ng"),
                                React.createElement("p", { className: "font-black text-lg text-slate-800 uppercase leading-none" }, salesInfo.name || 'Tư Vấn Bán Hàng'),
                                React.createElement("p", { className: "text-blue-700 font-black text-base mt-1" }, salesInfo.phone || 'Geely Hải Dương')),
                            React.createElement("div", { className: "p-1.5 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col items-center" },
                                React.createElement(QrCodeImage, { value: `https://zalo.me/${normalizePhoneForZalo(salesInfo.phone)}`, className: "w-16 h-16 object-contain" }),
                                React.createElement("p", { className: "text-[8px] font-bold text-slate-600 mt-1 uppercase tracking-wider" }, "Qu\u00E9t Zalo"))))))));
    };
    return (React.createElement("div", { className: "min-h-screen font-sans pb-safe" },
        React.createElement("div", { className: "bg-white sticky top-0 z-10 shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-center" },
            React.createElement(GeelyLogo, { className: "w-20 h-8 text-gray-900", color: "currentColor" }),
            React.createElement("div", { className: "text-xl font-black text-gray-900 tracking-tighter ml-4 pl-4 border-l-2 border-gray-300 uppercase" },
                "B\u00E1o Gi\u00E1 ",
                React.createElement("span", { className: "text-[9px] align-top text-blue-600" }, "PWA 1.8"))),
        React.createElement("div", { className: "max-w-xl mx-auto p-4" },
            React.createElement("div", { className: "grid grid-cols-5 p-1 bg-gray-200 rounded-lg shadow-inner mb-4 gap-0.5" },
                React.createElement("button", { onClick: () => setActiveTab('input'), className: `py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'input' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}` }, "Nh\u1EADp TT"),
                React.createElement("button", { onClick: () => setActiveTab('loan'), className: `py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'loan' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}` }, "Vay NH"),
                React.createElement("button", { onClick: () => setActiveTab('preview'), className: `py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'preview' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}` }, "B\u00E1o Gi\u00E1"),
                React.createElement("button", { onClick: () => setActiveTab('history'), className: `py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'history' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}` }, "L\u1ECBch S\u1EED"),
                React.createElement("button", { onClick: () => setActiveTab('settings'), className: `py-2 px-0.5 text-[10px] font-bold rounded-md ${activeTab === 'settings' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}` }, "C\u00E0i \u0110\u1EB7t")),
            activeTab === 'input' && renderInputForm(),
            activeTab === 'loan' && renderBankLoan(),
            activeTab === 'preview' && renderQuotePreview(),
            activeTab === 'history' && renderHistory(),
            activeTab === 'settings' && renderSettings()),
        activeTab === 'preview' && (React.createElement("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20 flex justify-center pb-safe" },
            React.createElement("div", { className: "max-w-xl w-full grid grid-cols-3 gap-2" },
                React.createElement("button", { onClick: handleSaveQuotation, className: "w-full py-3 bg-green-600 text-white rounded-xl font-bold text-xs shadow-md" }, "L\u01B0u l\u1ECBch s\u1EED"),
                React.createElement("button", { onClick: handlePrintA4, className: "w-full py-3 bg-slate-700 text-white rounded-xl font-bold text-xs shadow-md" }, "In / PDF A4"),
                React.createElement("button", { onClick: handleExportImage, disabled: isExporting, className: "w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md disabled:opacity-50" }, isExporting ? 'Đang tạo...' : 'Ảnh Zalo')))),
        toastMessage && React.createElement("div", { className: "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-2 rounded-full shadow-xl text-sm font-medium animate-fade-in-out w-max max-w-[90%] text-center" }, toastMessage)));
}
const rootElement = document.getElementById('root');
if (ReactDOM.createRoot) {
    ReactDOM.createRoot(rootElement).render(React.createElement(GeelyQuotationApp, null));
}
else {
    ReactDOM.render(React.createElement(GeelyQuotationApp, null), rootElement);
}
