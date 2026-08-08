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
        { id: 'pink', name: 'Hồng Kẹo Bông', imagePath: './assets/cars/Ex2/ex2-pink.png' },
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
    Math.max(0, Number(rates === null || rates === void 0 ? void 0 : rates[type]) || 0)
]));
const normalizeRegistrationLocation = location => ({
    id: String((location === null || location === void 0 ? void 0 : location.id) || `area_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`),
    name: String((location === null || location === void 0 ? void 0 : location.name) || 'Khu vực mới'),
    plateFee: parseMoney(location === null || location === void 0 ? void 0 : location.plateFee),
    effectiveDate: String((location === null || location === void 0 ? void 0 : location.effectiveDate) || DEFAULT_REGISTRATION_FEES.effectiveDate),
    taxRates: normalizeTaxRates(location === null || location === void 0 ? void 0 : location.taxRates)
});
const normalizeRegistrationFees = data => {
    var _a, _b, _c, _d, _e;
    const source = data && typeof data === 'object' ? data : {};
    const locations = Array.isArray(source.locations) && source.locations.length
        ? source.locations.map(normalizeRegistrationLocation)
        : DEFAULT_REGISTRATION_FEES.locations.map(normalizeRegistrationLocation);
    return {
        effectiveDate: String(source.effectiveDate || DEFAULT_REGISTRATION_FEES.effectiveDate),
        inspectionFee: parseMoney((_a = source.inspectionFee) !== null && _a !== void 0 ? _a : DEFAULT_REGISTRATION_FEES.inspectionFee),
        roadFeeMonthlyWhite: parseMoney((_b = source.roadFeeMonthlyWhite) !== null && _b !== void 0 ? _b : DEFAULT_REGISTRATION_FEES.roadFeeMonthlyWhite),
        roadFeeMonthlyYellow: parseMoney((_c = source.roadFeeMonthlyYellow) !== null && _c !== void 0 ? _c : DEFAULT_REGISTRATION_FEES.roadFeeMonthlyYellow),
        civilInsurance5Seats: parseMoney((_d = source.civilInsurance5Seats) !== null && _d !== void 0 ? _d : DEFAULT_REGISTRATION_FEES.civilInsurance5Seats),
        civilInsurance7Seats: parseMoney((_e = source.civilInsurance7Seats) !== null && _e !== void 0 ? _e : DEFAULT_REGISTRATION_FEES.civilInsurance7Seats),
        locations
    };
};
const PROMOTION_TYPES = {
    cash: 'Giảm tiền mặt', registration: 'Hỗ trợ trước bạ', gift: 'Quà tặng',
    accessory: 'Phụ kiện', insurance: 'Bảo hiểm', maintenance: 'Bảo dưỡng', service: 'Cứu hộ / Dịch vụ',
    charger: 'Sạc / Wallbox', loan: 'Hỗ trợ vay', other: 'Khác'
};
const DEFAULT_SALES_POLICIES = [];
const POLICY_STATUS_LABELS = {
    active: 'Đang áp dụng', upcoming: 'Sắp áp dụng', expired: 'Hết hiệu lực', disabled: 'Tạm tắt'
};
const toLocalIsoDate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const monthLabelFromIso = iso => {
    const match = String(iso || '').match(/^(\d{4})-(\d{2})/);
    return match ? `${match[2]}/${match[1]}` : '';
};
const monthBounds = monthKey => {
    const match = String(monthKey || '').match(/^(\d{4})-(\d{2})$/);
    if (!match)
        return { start: '', end: '' };
    const year = Number(match[1]);
    const month = Number(match[2]);
    const lastDay = new Date(year, month, 0).getDate();
    return { start: `${match[1]}-${match[2]}-01`, end: `${match[1]}-${match[2]}-${String(lastDay).padStart(2, '0')}` };
};
const shiftIsoMonth = (iso, amount = 1) => {
    const match = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match)
        return iso || '';
    const year = Number(match[1]);
    const monthIndex = Number(match[2]) - 1;
    const day = Number(match[3]);
    const targetFirst = new Date(year, monthIndex + amount, 1);
    const maxDay = new Date(targetFirst.getFullYear(), targetFirst.getMonth() + 1, 0).getDate();
    const target = new Date(targetFirst.getFullYear(), targetFirst.getMonth(), Math.min(day, maxDay));
    return toLocalIsoDate(target);
};
const policyBenefitKey = (policyId, benefitId) => `${policyId}::${benefitId}`;
const normalizePolicyBenefit = (benefit, index = 0) => {
    const type = PROMOTION_TYPES[benefit === null || benefit === void 0 ? void 0 : benefit.type] ? benefit.type : 'gift';
    const required = Boolean(benefit === null || benefit === void 0 ? void 0 : benefit.required);
    return {
        id: String((benefit === null || benefit === void 0 ? void 0 : benefit.id) || `benefit_${Date.now()}_${index}`),
        type,
        name: String((benefit === null || benefit === void 0 ? void 0 : benefit.name) || ''),
        value: parseMoney(benefit === null || benefit === void 0 ? void 0 : benefit.value),
        deductFromPrice: (benefit === null || benefit === void 0 ? void 0 : benefit.deductFromPrice) !== undefined ? Boolean(benefit.deductFromPrice) : type === 'cash',
        defaultSelected: required || (benefit === null || benefit === void 0 ? void 0 : benefit.defaultSelected) !== false,
        required,
        choiceGroup: String((benefit === null || benefit === void 0 ? void 0 : benefit.choiceGroup) || '').trim()
    };
};
const normalizeSalesPolicy = policy => {
    const currentMonth = toLocalIsoDate().slice(0, 7);
    const bounds = monthBounds(currentMonth);
    return {
        id: String((policy === null || policy === void 0 ? void 0 : policy.id) || `policy_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`),
        name: String((policy === null || policy === void 0 ? void 0 : policy.name) || `Chính sách bán hàng tháng ${monthLabelFromIso(bounds.start)}`),
        startDate: String((policy === null || policy === void 0 ? void 0 : policy.startDate) || bounds.start),
        endDate: String((policy === null || policy === void 0 ? void 0 : policy.endDate) || bounds.end),
        enabled: (policy === null || policy === void 0 ? void 0 : policy.enabled) !== false,
        note: String((policy === null || policy === void 0 ? void 0 : policy.note) || ''),
        carIds: Array.from(new Set((Array.isArray(policy === null || policy === void 0 ? void 0 : policy.carIds) ? policy.carIds : []).map(String))),
        benefits: (Array.isArray(policy === null || policy === void 0 ? void 0 : policy.benefits) ? policy.benefits : []).map(normalizePolicyBenefit)
    };
};
const createEmptySalesPolicy = () => {
    const monthKey = toLocalIsoDate().slice(0, 7);
    const bounds = monthBounds(monthKey);
    return normalizeSalesPolicy({
        id: '', name: `Chính sách bán hàng tháng ${monthLabelFromIso(bounds.start)}`,
        startDate: bounds.start, endDate: bounds.end, enabled: true, carIds: [], benefits: [], note: ''
    });
};
const getSalesPolicyStatus = (policy, dateIso = toLocalIsoDate()) => {
    if (!(policy === null || policy === void 0 ? void 0 : policy.enabled))
        return 'disabled';
    if (policy.startDate && dateIso < policy.startDate)
        return 'upcoming';
    if (policy.endDate && dateIso > policy.endDate)
        return 'expired';
    return 'active';
};
const policyIntersectsMonth = (policy, monthKey) => {
    const bounds = monthBounds(monthKey);
    if (!bounds.start || !bounds.end)
        return true;
    const start = (policy === null || policy === void 0 ? void 0 : policy.startDate) || '0000-01-01';
    const end = (policy === null || policy === void 0 ? void 0 : policy.endDate) || '9999-12-31';
    return start <= bounds.end && end >= bounds.start;
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
    id: String((color === null || color === void 0 ? void 0 : color.id) || slugifyColorId(color === null || color === void 0 ? void 0 : color.name, `color-${index + 1}`)),
    name: String((color === null || color === void 0 ? void 0 : color.name) || `Màu ${index + 1}`),
    imagePath: String((color === null || color === void 0 ? void 0 : color.imagePath) || '')
});
const normalizeCar = car => {
    var _a, _b;
    const id = String((car === null || car === void 0 ? void 0 : car.id) || `car_${Date.now()}`);
    const engineType = String((car === null || car === void 0 ? void 0 : car.engineType) || DEFAULT_CAR_ENGINE_TYPES[id] || 'gasoline');
    const fallbackColors = (DEFAULT_CAR_COLORS[id] || []).map(normalizeCarColor);
    const providedColors = Array.isArray(car === null || car === void 0 ? void 0 : car.colors) && car.colors.length
        ? car.colors.map(normalizeCarColor)
        : fallbackColors;
    const uniqueColors = providedColors.filter((color, index, list) => list.findIndex(item => item.id === color.id) === index);
    const requestedDefault = String((car === null || car === void 0 ? void 0 : car.defaultColorId) || DEFAULT_CAR_DEFAULT_COLORS[id] || '');
    const defaultColorId = uniqueColors.some(color => color.id === requestedDefault)
        ? requestedDefault
        : (((_a = uniqueColors[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
    const defaultColorImage = ((_b = uniqueColors.find(color => color.id === defaultColorId)) === null || _b === void 0 ? void 0 : _b.imagePath) || '';
    return {
        id,
        name: String((car === null || car === void 0 ? void 0 : car.name) || ''),
        price: Number(car === null || car === void 0 ? void 0 : car.price) || 0,
        seats: Number(car === null || car === void 0 ? void 0 : car.seats) || 5,
        engineType: ENGINE_TYPES[engineType] ? engineType : 'gasoline',
        colorGroup: String((car === null || car === void 0 ? void 0 : car.colorGroup) || DEFAULT_CAR_COLOR_GROUPS[id] || ''),
        colors: uniqueColors,
        defaultColorId,
        imagePath: String((car === null || car === void 0 ? void 0 : car.imagePath) || defaultColorImage || DEFAULT_CAR_IMAGE_PATHS[id] || ''),
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
        name: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.name) || ''),
        phone: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.phone) || '')
    },
    serviceFeeAmount: parseMoney(serviceFeeAmount),
    physicalInsuranceRate: Number(physicalInsuranceRate) || 0,
    registrationFees: normalizeRegistrationFees(registrationFees)
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
    var _a, _b;
    const [cars, setCars] = useState(() => (getSavedData('geely_cars_v8', DEFAULT_CAR_MODELS) || []).map(normalizeCar));
    const [promotions, setPromotions] = useState(() => (getSavedData('geely_promotions_v2', DEFAULT_PROMOTIONS) || []).map(normalizePromotion));
    const [salesPolicies, setSalesPolicies] = useState(() => (getSavedData('geely_sales_policies_v1', DEFAULT_SALES_POLICIES) || []).map(normalizeSalesPolicy));
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
    const cloudPoliciesHashRef = useRef('');
    useEffect(() => { saveData('geely_cars_v8', cars.map(({ image, ...car }) => car)); }, [cars]);
    useEffect(() => { saveData('geely_promotions_v2', promotions); }, [promotions]);
    useEffect(() => { saveData('geely_sales_policies_v1', salesPolicies); }, [salesPolicies]);
    useEffect(() => { saveData('geely_sales_info', salesInfo); }, [salesInfo]);
    useEffect(() => { saveData('geely_service_fee', serviceFeeAmount); }, [serviceFeeAmount]);
    useEffect(() => { saveData('geely_phys_ins_rate', physicalInsuranceRate); }, [physicalInsuranceRate]);
    useEffect(() => { saveData('geely_registration_fees_v1', registrationFees); }, [registrationFees]);
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
            cars, promotions, salesPolicies, salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees, quotations
        };
    }, [cars, promotions, salesPolicies, salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees, quotations]);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [carColor, setCarColor] = useState('');
    const [selectedColorId, setSelectedColorId] = useState(() => { var _a, _b, _c, _d; return ((_a = cars[0]) === null || _a === void 0 ? void 0 : _a.defaultColorId) || ((_d = (_c = (_b = cars[0]) === null || _b === void 0 ? void 0 : _b.colors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id) || ''; });
    const [selectedCarId, setSelectedCarId] = useState(((_a = cars[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
    const [selectedLocationId, setSelectedLocationId] = useState(((_b = registrationFees.locations[0]) === null || _b === void 0 ? void 0 : _b.id) || '');
    const [selectedPromoIds, setSelectedPromoIds] = useState([]);
    const [selectedPolicyBenefitIds, setSelectedPolicyBenefitIds] = useState([]);
    const [policySnapshotOverride, setPolicySnapshotOverride] = useState(null);
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
    const [editingPolicyId, setEditingPolicyId] = useState(null);
    const [policyDraft, setPolicyDraft] = useState(() => createEmptySalesPolicy());
    const [policyMonthFilter, setPolicyMonthFilter] = useState(() => toLocalIsoDate().slice(0, 7));
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
    const selectedCarColor = useMemo(() => {
        var _a;
        if (!car || selectedColorId === '__local__')
            return null;
        return (car.colors || []).find(color => color.id === selectedColorId)
            || (car.colors || []).find(color => color.id === car.defaultColorId)
            || ((_a = car.colors) === null || _a === void 0 ? void 0 : _a[0])
            || null;
    }, [car, selectedColorId]);
    const resolvedCarImage = car
        ? (selectedColorId === '__local__'
            ? (carImageMap[car.id] || car.imagePath || car.image || '')
            : ((selectedCarColor === null || selectedCarColor === void 0 ? void 0 : selectedCarColor.imagePath) || car.imagePath || carImageMap[car.id] || car.image || ''))
        : '';
    const location = useMemo(() => registrationFees.locations.find(l => l.id === selectedLocationId) || registrationFees.locations[0], [selectedLocationId, registrationFees.locations]);
    useEffect(() => {
        if (!car)
            return;
        if (selectedColorId === '__local__' && carImageMap[car.id]) {
            if (!carColor)
                setCarColor('Ảnh riêng');
            return;
        }
        const colors = Array.isArray(car.colors) ? car.colors : [];
        const current = colors.find(color => color.id === selectedColorId);
        const fallback = colors.find(color => color.id === car.defaultColorId) || colors[0];
        const next = current || fallback;
        if (next) {
            if (selectedColorId !== next.id)
                setSelectedColorId(next.id);
            if (carColor !== next.name)
                setCarColor(next.name);
        }
        else if (selectedColorId) {
            setSelectedColorId('');
        }
    }, [car === null || car === void 0 ? void 0 : car.id, car === null || car === void 0 ? void 0 : car.defaultColorId, car === null || car === void 0 ? void 0 : car.colors, selectedColorId, carImageMap]);
    const handleCarSelection = carId => {
        var _a, _b;
        const nextCar = cars.find(item => item.id === carId);
        setPolicySnapshotOverride(null);
        setSelectedPolicyBenefitIds([]);
        setSelectedCarId(carId);
        const nextColor = ((_a = nextCar === null || nextCar === void 0 ? void 0 : nextCar.colors) === null || _a === void 0 ? void 0 : _a.find(color => color.id === nextCar.defaultColorId)) || ((_b = nextCar === null || nextCar === void 0 ? void 0 : nextCar.colors) === null || _b === void 0 ? void 0 : _b[0]);
        setSelectedColorId((nextColor === null || nextColor === void 0 ? void 0 : nextColor.id) || (carImageMap[carId] ? '__local__' : ''));
        setCarColor((nextColor === null || nextColor === void 0 ? void 0 : nextColor.name) || (carImageMap[carId] ? 'Ảnh riêng' : ''));
    };
    const handleColorSelection = colorId => {
        var _a;
        setSelectedColorId(colorId);
        if (colorId === '__local__') {
            setCarColor('Ảnh riêng');
            return;
        }
        const color = (_a = car === null || car === void 0 ? void 0 : car.colors) === null || _a === void 0 ? void 0 : _a.find(item => item.id === colorId);
        setCarColor((color === null || color === void 0 ? void 0 : color.name) || '');
    };
    useEffect(() => {
        if (!registrationFees.locations.length)
            return;
        if (!registrationFees.locations.some(item => item.id === selectedLocationId)) {
            setSelectedLocationId(registrationFees.locations[0].id);
        }
    }, [registrationFees.locations, selectedLocationId]);
    const policyTodayIso = toLocalIsoDate();
    const applicableSalesPolicies = useMemo(() => salesPolicies
        .map(normalizeSalesPolicy)
        .filter(policy => getSalesPolicyStatus(policy, policyTodayIso) === 'active' && policy.carIds.includes(selectedCarId))
        .sort((a, b) => String(a.startDate).localeCompare(String(b.startDate))), [salesPolicies, selectedCarId, policyTodayIso]);
    const livePolicyBenefitEntries = useMemo(() => applicableSalesPolicies.flatMap(policy => policy.benefits.map(benefit => ({
        ...normalizePolicyBenefit(benefit),
        policyId: policy.id,
        policyName: policy.name,
        policyStartDate: policy.startDate,
        policyEndDate: policy.endDate,
        key: policyBenefitKey(policy.id, benefit.id)
    }))), [applicableSalesPolicies]);
    const livePolicySignature = useMemo(() => JSON.stringify(applicableSalesPolicies.map(policy => ({
        id: policy.id, startDate: policy.startDate, endDate: policy.endDate,
        benefits: policy.benefits.map(benefit => ({ id: benefit.id, required: benefit.required, defaultSelected: benefit.defaultSelected, choiceGroup: benefit.choiceGroup }))
    }))), [applicableSalesPolicies]);
    useEffect(() => {
        if (policySnapshotOverride)
            return;
        const nextIds = [];
        const grouped = new Set();
        livePolicyBenefitEntries.forEach(benefit => {
            if (!(benefit.required || benefit.defaultSelected))
                return;
            const groupKey = benefit.choiceGroup ? `${benefit.policyId}::${benefit.choiceGroup}` : '';
            if (groupKey && grouped.has(groupKey))
                return;
            if (groupKey)
                grouped.add(groupKey);
            nextIds.push(benefit.key);
        });
        setSelectedPolicyBenefitIds(nextIds);
    }, [selectedCarId, livePolicySignature, Boolean(policySnapshotOverride)]);
    const selectedPolicyBenefits = useMemo(() => {
        if (policySnapshotOverride === null || policySnapshotOverride === void 0 ? void 0 : policySnapshotOverride.selectedBenefits) {
            return policySnapshotOverride.selectedBenefits.map((benefit, index) => ({
                ...normalizePolicyBenefit(benefit, index),
                policyId: String(benefit.policyId || ''), policyName: String(benefit.policyName || ''),
                policyStartDate: String(benefit.policyStartDate || ''), policyEndDate: String(benefit.policyEndDate || ''),
                key: String(benefit.key || policyBenefitKey(benefit.policyId || 'snapshot', benefit.id || index))
            }));
        }
        return livePolicyBenefitEntries.filter(benefit => selectedPolicyBenefitIds.includes(benefit.key));
    }, [policySnapshotOverride, livePolicyBenefitEntries, selectedPolicyBenefitIds]);
    const effectivePolicyNames = useMemo(() => {
        var _a;
        if ((_a = policySnapshotOverride === null || policySnapshotOverride === void 0 ? void 0 : policySnapshotOverride.policies) === null || _a === void 0 ? void 0 : _a.length)
            return policySnapshotOverride.policies.map(item => item.name).filter(Boolean);
        return applicableSalesPolicies.map(item => item.name);
    }, [policySnapshotOverride, applicableSalesPolicies]);
    const handlePolicyBenefitToggle = (benefitKey, checked) => {
        if (policySnapshotOverride)
            return showToast('Báo giá đang dùng chính sách đã lưu trong lịch sử. Hãy chọn “Dùng chính sách hiện tại” để thay đổi.');
        const benefit = livePolicyBenefitEntries.find(item => item.key === benefitKey);
        if (!benefit)
            return;
        if (!checked && benefit.required)
            return showToast('Quyền lợi này là bắt buộc trong chính sách.');
        if (checked && benefit.choiceGroup) {
            const requiredSibling = livePolicyBenefitEntries.find(item => item.policyId === benefit.policyId && item.choiceGroup === benefit.choiceGroup && item.key !== benefitKey && item.required);
            if (requiredSibling)
                return showToast(`Nhóm này có quyền lợi bắt buộc: ${requiredSibling.name}.`);
        }
        setSelectedPolicyBenefitIds(current => {
            let next = current.filter(key => key !== benefitKey);
            if (checked) {
                if (benefit.choiceGroup) {
                    const siblingKeys = livePolicyBenefitEntries
                        .filter(item => item.policyId === benefit.policyId && item.choiceGroup === benefit.choiceGroup && item.key !== benefitKey)
                        .map(item => item.key);
                    next = next.filter(key => !siblingKeys.includes(key));
                }
                next.push(benefitKey);
            }
            return Array.from(new Set(next));
        });
    };
    const handleUseCurrentSalesPolicies = () => {
        setPolicySnapshotOverride(null);
        setSelectedPolicyBenefitIds([]);
        showToast('Đã chuyển sang chính sách bán hàng đang áp dụng hiện tại.');
    };
    const calculations = useMemo(() => {
        var _a;
        if (!car || !location)
            return null;
        const price = parseMoney(car.price);
        const engineType = ENGINE_TYPES[car.engineType] ? car.engineType : 'gasoline';
        const taxRate = Math.max(0, Number((_a = location.taxRates) === null || _a === void 0 ? void 0 : _a[engineType]) || 0);
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
        }
        else if (tndsOption === '5_seats') {
            civilInsurance = parseMoney(registrationFees.civilInsurance5Seats);
        }
        else {
            civilInsurance = parseMoney(registrationFees.civilInsurance7Seats);
        }
        const physicalInsuranceFee = includePhysicalInsurance ? price * (physicalInsuranceRate / 100) : 0;
        const serviceFee = includeServiceFee ? parseMoney(serviceFeeAmount) : 0;
        const selectedPromotions = selectedPromoIds.map(id => promotions.find(promo => promo.id === id)).filter(Boolean);
        const manualPromoValue = selectedPromotions
            .filter(promo => promo.deductFromPrice)
            .reduce((sum, promo) => sum + parseMoney(promo.value), 0);
        const giftPromotions = selectedPromotions.filter(promo => !promo.deductFromPrice);
        const policyDiscountValue = selectedPolicyBenefits
            .filter(benefit => benefit.deductFromPrice)
            .reduce((sum, benefit) => sum + parseMoney(benefit.value), 0);
        const policyGiftBenefits = selectedPolicyBenefits.filter(benefit => !benefit.deductFromPrice);
        const manualDiscount = parseMoney(discount);
        const promoValue = manualPromoValue + policyDiscountValue;
        const discountAmount = promoValue + manualDiscount;
        const totalRollingCost = taxFee + plateFee + inspectionFee + roadFee + civilInsurance + physicalInsuranceFee + serviceFee;
        const finalAmount = price - discountAmount + totalRollingCost;
        return {
            price, taxRate, taxFee, plateFee, inspectionFee, roadFeePerMonth, roadFee, civilInsurance,
            engineType, effectiveDate: location.effectiveDate || registrationFees.effectiveDate,
            physicalInsuranceFee, serviceFee, discountAmount, promoValue, manualPromoValue, policyDiscountValue,
            giftPromotions, policyGiftBenefits, selectedPromotions, selectedPolicyBenefits,
            effectivePolicyNames, totalRollingCost, finalAmount, roadFeeYears
        };
    }, [car, location, registrationFees, discount, includePhysicalInsurance, includeServiceFee, selectedPromoIds, promotions, selectedPolicyBenefits, effectivePolicyNames, plateColor, roadFeeYears, tndsOption, serviceFeeAmount, physicalInsuranceRate]);
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
        if (!calculations)
            return null;
        const { loanInputMode, requestedLoanAmount, downPaymentPercent, months, fixedTermMonths, fixedInterestRate, floatingInterestRate } = normalizedLoanParams;
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
            firstMonthInterest: (firstMonth === null || firstMonth === void 0 ? void 0 : firstMonth.interest) || 0,
            firstMonthTotal: (firstMonth === null || firstMonth === void 0 ? void 0 : firstMonth.totalPayment) || 0,
            firstFloatingMonthInterest: (firstFloatingMonth === null || firstFloatingMonth === void 0 ? void 0 : firstFloatingMonth.interest) || 0,
            firstFloatingMonthTotal: (firstFloatingMonth === null || firstFloatingMonth === void 0 ? void 0 : firstFloatingMonth.totalPayment) || 0
        };
    }, [
        calculations === null || calculations === void 0 ? void 0 : calculations.price,
        calculations === null || calculations === void 0 ? void 0 : calculations.finalAmount,
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
        const isEmpty = String(rawValue !== null && rawValue !== void 0 ? rawValue : '').trim() === '';
        setLoanParams(current => ({
            ...current,
            loanInputMode: 'amount',
            loanAmount: isEmpty ? '' : parseMoney(rawValue)
        }));
    };
    const normalizeLoanAmountField = () => {
        if (!calculations)
            return;
        const enteredAmount = parseMoney(loanParams.loanAmount);
        const maximum = Math.max(0, calculations.price);
        const normalizedAmount = Math.min(maximum, enteredAmount);
        setLoanParams(current => ({
            ...current,
            loanInputMode: 'amount',
            loanAmount: normalizedAmount
        }));
        if (enteredAmount > maximum)
            showToast(`Số tiền vay tối đa theo giá xe là ${formatVND(maximum)}.`);
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
    const setSyncInitialized = uid => { if (uid)
        saveData(getSyncKey(uid), true); };
    const settingsPayload = () => ({
        salesInfo: { name: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.name) || ''), phone: String((salesInfo === null || salesInfo === void 0 ? void 0 : salesInfo.phone) || '') },
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
    const cloudSalesPolicy = item => {
        const policy = normalizeSalesPolicy(item);
        return {
            id: policy.id,
            name: policy.name,
            startDate: policy.startDate,
            endDate: policy.endDate,
            enabled: policy.enabled,
            note: policy.note,
            carIds: policy.carIds,
            benefits: policy.benefits.map(benefit => ({
                id: benefit.id,
                type: benefit.type,
                name: benefit.name,
                value: parseMoney(benefit.value),
                deductFromPrice: Boolean(benefit.deductFromPrice),
                defaultSelected: Boolean(benefit.defaultSelected),
                required: Boolean(benefit.required),
                choiceGroup: String(benefit.choiceGroup || '')
            }))
        };
    };
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
            if (workspace.settings.registrationFees)
                setRegistrationFees(normalizeRegistrationFees(workspace.settings.registrationFees));
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
        if (Array.isArray(workspace.salesPolicies) && (workspace.salesPolicies.length || salesPolicies.length === 0)) {
            setSalesPolicies(workspace.salesPolicies.map(normalizeSalesPolicy));
        }
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
            if (workspace.legacy.registrationFees)
                setRegistrationFees(normalizeRegistrationFees(workspace.legacy.registrationFees));
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
            return 'Firestore từ chối truy cập. Hãy cập nhật Security Rules cho cấu trúc V2.0.';
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
                settings: settingsPayload(), cars: cars.map(cloudCar), promotions: promotions.map(cloudPromo),
                salesPolicies: salesPolicies.map(cloudSalesPolicy), quotations
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
            await Promise.all(salesPolicies.map(item => window.GeelyFirebaseSync.saveSalesPolicy(cloudSalesPolicy(item))));
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
                let workspace = await window.GeelyFirebaseSync.getWorkspace();
                if (cancelled)
                    return;
                if (workspace.sharedCarsEmpty && cars.length) {
                    try {
                        await window.GeelyFirebaseSync.seedSharedCars(cars.map(cloudCar));
                        workspace = await window.GeelyFirebaseSync.getWorkspace();
                    }
                    catch (seedError) {
                        console.warn('Chưa thể khởi tạo danh sách xe dùng chung:', seedError);
                    }
                }
                pendingWorkspaceRef.current = workspace;
                const initialized = Boolean(getSavedData(getSyncKey(syncUser.uid), false));
                if (workspace.empty) {
                    setSyncStatus({ code: 'cloud_empty', message: 'Tài khoản chưa có dữ liệu V2.0.', updatedAtMs: 0 });
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
                        if (data.registrationFees)
                            setRegistrationFees(normalizeRegistrationFees(data.registrationFees));
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
                    else if (event.type === 'salesPolicies') {
                        const next = event.items.map(normalizeSalesPolicy);
                        if (next.length || !(latestDataRef.current.salesPolicies || []).length)
                            setSalesPolicies(next);
                        cloudPoliciesHashRef.current = JSON.stringify(next.map(cloudSalesPolicy));
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
    }, [salesInfo, serviceFeeAmount, physicalInsuranceRate, registrationFees, syncUser === null || syncUser === void 0 ? void 0 : syncUser.uid]);
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
        window.setTimeout(() => { var _a; return (_a = document.getElementById('registration-area-editor')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    };
    const handleSaveLocation = () => {
        if (!newLocationName.trim())
            return showToast('Hãy nhập tên khu vực đăng ký.');
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
        if (!selectedLocationId)
            setSelectedLocationId(id);
        resetLocationEditor();
        showToast(editingLocationId ? 'Đã cập nhật khu vực đăng ký.' : 'Đã thêm khu vực đăng ký.');
    };
    const handleDeleteLocation = id => {
        var _a;
        if (registrationFees.locations.length <= 1)
            return showToast('Phải giữ ít nhất một khu vực đăng ký.');
        if (!window.confirm('Xóa khu vực đăng ký này?'))
            return;
        const nextLocations = registrationFees.locations.filter(item => item.id !== id);
        setRegistrationFees(current => normalizeRegistrationFees({ ...current, locations: nextLocations }));
        if (selectedLocationId === id)
            setSelectedLocationId(((_a = nextLocations[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
        if (editingLocationId === id)
            resetLocationEditor();
        showToast('Đã xóa khu vực đăng ký.');
    };
    const handleRestoreDefaultFees = () => {
        var _a;
        if (!window.confirm('Khôi phục toàn bộ bảng phí đăng ký về dữ liệu mặc định của ứng dụng?'))
            return;
        const defaults = normalizeRegistrationFees(DEFAULT_REGISTRATION_FEES);
        setRegistrationFees(defaults);
        setSelectedLocationId(((_a = defaults.locations[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
        resetLocationEditor();
        showToast('Đã khôi phục bảng phí mặc định.');
    };
    const handleExportExcel = () => {
        if (!loanCalculations || !calculations)
            return;
        const rows = [
            ['LỊCH TRẢ NỢ DƯ NỢ GIẢM DẦN'],
            ['Khách hàng', customerName || 'Khách hàng'],
            ['Dòng xe', (car === null || car === void 0 ? void 0 : car.name) || ''],
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
        const escapeCsv = value => `"${String(value !== null && value !== void 0 ? value : '').replace(/"/g, '""')}"`;
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
        if (!newCarDefaultColorId)
            setNewCarDefaultColorId(id);
    };
    const loadDefaultEditorColors = () => {
        var _a, _b, _c;
        const group = DEFAULT_CAR_COLOR_GROUPS[editingCarId];
        if (!group || !CAR_COLOR_LIBRARY[group])
            return showToast('Dòng xe này chưa có thư viện màu mặc định.');
        const colors = cloneColorSet(group);
        const defaultId = DEFAULT_CAR_DEFAULT_COLORS[editingCarId] || ((_a = colors[0]) === null || _a === void 0 ? void 0 : _a.id) || '';
        setNewCarColors(colors);
        setNewCarDefaultColorId(defaultId);
        setNewCarImagePath(((_b = colors.find(color => color.id === defaultId)) === null || _b === void 0 ? void 0 : _b.imagePath) || ((_c = colors[0]) === null || _c === void 0 ? void 0 : _c.imagePath) || '');
        showToast('Đã nạp thư viện màu chuẩn từ GitHub.');
    };
    const updateEditorColor = (index, field, value) => {
        setNewCarColors(current => current.map((color, colorIndex) => colorIndex === index ? { ...color, [field]: value } : color));
    };
    const removeEditorColor = index => {
        setNewCarColors(current => {
            var _a;
            const removed = current[index];
            const next = current.filter((_, colorIndex) => colorIndex !== index);
            if ((removed === null || removed === void 0 ? void 0 : removed.id) === newCarDefaultColorId)
                setNewCarDefaultColorId(((_a = next[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
            return next;
        });
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
        var _a, _b;
        setEditingCarId(carToEdit.id);
        setNewCarName(carToEdit.name || '');
        setNewCarPrice(formatNumber(carToEdit.price));
        setNewCarSeats(Number(carToEdit.seats) || 5);
        setNewCarEngineType(ENGINE_TYPES[carToEdit.engineType] ? carToEdit.engineType : 'gasoline');
        setNewCarImage(carImageMap[carToEdit.id] || '');
        setNewCarImagePath(carToEdit.imagePath || '');
        setNewCarColors((carToEdit.colors || []).map(color => ({ ...color })));
        setNewCarDefaultColorId(carToEdit.defaultColorId || ((_b = (_a = carToEdit.colors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id) || '');
        setTimeout(() => {
            var _a;
            (_a = document.getElementById('car-editor')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };
    const handleSaveCar = async () => {
        var _a, _b, _c, _d;
        if (!newCarName.trim() || !newCarPrice)
            return showToast('Nhập tên và giá xe!');
        const price = parseMoney(newCarPrice);
        if (!Number.isFinite(price) || price <= 0)
            return showToast('Giá xe không hợp lệ!');
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
            : (((_a = uniqueColors[0]) === null || _a === void 0 ? void 0 : _a.id) || '');
        const defaultColorImage = ((_b = uniqueColors.find(color => color.id === defaultColorId)) === null || _b === void 0 ? void 0 : _b.imagePath) || '';
        const carData = {
            id, name: newCarName.trim(), price, seats: Number(newCarSeats) || 5,
            engineType: ENGINE_TYPES[newCarEngineType] ? newCarEngineType : 'gasoline',
            colors: uniqueColors,
            defaultColorId,
            imagePath: defaultColorImage || newCarImagePath.trim()
        };
        try {
            if (newCarImage === null || newCarImage === void 0 ? void 0 : newCarImage.startsWith('data:image/')) {
                await ((_c = window.GeelyIDB) === null || _c === void 0 ? void 0 : _c.saveCarImage(id, newCarImage));
                setCarImageMap(current => ({ ...current, [id]: newCarImage }));
            }
            else if (!newCarImage && editingCarId && carImageMap[id]) {
                await ((_d = window.GeelyIDB) === null || _d === void 0 ? void 0 : _d.deleteCarImage(id));
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
    const resetSalesPolicyEditor = () => {
        setEditingPolicyId(null);
        setPolicyDraft(createEmptySalesPolicy());
    };
    const startNewSalesPolicyForMonth = monthKey => {
        const key = /^\d{4}-\d{2}$/.test(String(monthKey || '')) ? monthKey : toLocalIsoDate().slice(0, 7);
        const bounds = monthBounds(key);
        setEditingPolicyId(null);
        setPolicyDraft(normalizeSalesPolicy({
            id: '', name: `Chính sách bán hàng tháng ${monthLabelFromIso(bounds.start)}`,
            startDate: bounds.start, endDate: bounds.end, enabled: true, carIds: [], benefits: [], note: ''
        }));
        window.setTimeout(() => { var _a; return (_a = document.getElementById('sales-policy-editor')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    };
    const handleStartEditSalesPolicy = policy => {
        const normalized = normalizeSalesPolicy(policy);
        setEditingPolicyId(normalized.id);
        setPolicyDraft({ ...normalized, carIds: [...normalized.carIds], benefits: normalized.benefits.map(item => ({ ...item })) });
        window.setTimeout(() => { var _a; return (_a = document.getElementById('sales-policy-editor')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    };
    const togglePolicyCar = carId => {
        setPolicyDraft(current => ({
            ...current,
            carIds: current.carIds.includes(carId)
                ? current.carIds.filter(id => id !== carId)
                : [...current.carIds, carId]
        }));
    };
    const addPolicyBenefit = () => {
        setPolicyDraft(current => ({
            ...current,
            benefits: [...current.benefits, normalizePolicyBenefit({
                    id: `benefit_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
                    type: 'gift', name: '', value: 0, deductFromPrice: false,
                    defaultSelected: true, required: false, choiceGroup: ''
                }, current.benefits.length)]
        }));
    };
    const updatePolicyBenefit = (index, field, value) => {
        setPolicyDraft(current => ({
            ...current,
            benefits: current.benefits.map((benefit, benefitIndex) => {
                if (benefitIndex !== index)
                    return benefit;
                const next = { ...benefit, [field]: value };
                if (field === 'type' && value === 'cash')
                    next.deductFromPrice = true;
                if (field === 'required' && value)
                    next.defaultSelected = true;
                return next;
            })
        }));
    };
    const removePolicyBenefit = index => {
        setPolicyDraft(current => ({ ...current, benefits: current.benefits.filter((_, benefitIndex) => benefitIndex !== index) }));
    };
    const handleSaveSalesPolicy = async () => {
        const normalized = normalizeSalesPolicy({ ...policyDraft, id: editingPolicyId || `policy_${Date.now()}` });
        if (!normalized.name.trim())
            return showToast('Hãy nhập tên chính sách bán hàng.');
        if (!normalized.startDate || !normalized.endDate)
            return showToast('Hãy chọn ngày bắt đầu và ngày kết thúc.');
        if (normalized.startDate > normalized.endDate)
            return showToast('Ngày kết thúc phải từ ngày bắt đầu trở đi.');
        if (!normalized.carIds.length)
            return showToast('Hãy chọn ít nhất một phiên bản xe áp dụng.');
        const benefits = normalized.benefits.filter(item => item.name.trim());
        if (!benefits.length)
            return showToast('Hãy thêm ít nhất một quyền lợi/chính sách.');
        const requiredGroups = new Map();
        benefits.filter(item => item.choiceGroup && item.required).forEach(item => requiredGroups.set(item.choiceGroup, (requiredGroups.get(item.choiceGroup) || 0) + 1));
        if ([...requiredGroups.values()].some(count => count > 1))
            return showToast('Mỗi nhóm “chọn 1” chỉ được có tối đa một quyền lợi bắt buộc.');
        const policy = { ...normalized, benefits };
        setSalesPolicies(current => editingPolicyId
            ? current.map(item => item.id === policy.id ? policy : item)
            : [policy, ...current]);
        if (syncUser && syncReadyRef.current) {
            try {
                await window.GeelyFirebaseSync.saveSalesPolicy(cloudSalesPolicy(policy));
            }
            catch (error) {
                showToast('Đã lưu trên máy, nhưng chưa đồng bộ chính sách lên Firebase.');
            }
        }
        resetSalesPolicyEditor();
        showToast(editingPolicyId ? 'Đã cập nhật chính sách bán hàng.' : 'Đã thêm chính sách bán hàng.');
    };
    const handleDeleteSalesPolicy = async (id) => {
        if (!window.confirm('Xóa chính sách bán hàng này? Các báo giá đã lưu vẫn giữ snapshot chính sách cũ.'))
            return;
        setSalesPolicies(current => current.filter(item => item.id !== id));
        if (editingPolicyId === id)
            resetSalesPolicyEditor();
        if (syncUser && syncReadyRef.current)
            await window.GeelyFirebaseSync.deleteSalesPolicy(id).catch(() => { });
        showToast('Đã xóa chính sách bán hàng.');
    };
    const handleCloneSalesPolicy = async (policy) => {
        const source = normalizeSalesPolicy(policy);
        const nextStart = shiftIsoMonth(source.startDate, 1);
        const nextEnd = shiftIsoMonth(source.endDate, 1);
        const sourceMonthLabel = monthLabelFromIso(source.startDate);
        const nextMonthLabel = monthLabelFromIso(nextStart);
        const nextName = sourceMonthLabel && source.name.includes(sourceMonthLabel)
            ? source.name.replace(sourceMonthLabel, nextMonthLabel)
            : `${source.name} - ${nextMonthLabel}`;
        const clone = normalizeSalesPolicy({
            ...source,
            id: `policy_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
            name: nextName,
            startDate: nextStart,
            endDate: nextEnd,
            benefits: source.benefits.map((benefit, index) => ({ ...benefit, id: `benefit_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 4)}` }))
        });
        setSalesPolicies(current => [clone, ...current]);
        setPolicyMonthFilter(nextStart.slice(0, 7));
        if (syncUser && syncReadyRef.current)
            await window.GeelyFirebaseSync.saveSalesPolicy(cloudSalesPolicy(clone)).catch(() => { });
        showToast(`Đã nhân bản chính sách sang ${nextMonthLabel}.`);
    };
    const buildSalesPolicySnapshot = () => {
        var _a;
        const policies = ((_a = policySnapshotOverride === null || policySnapshotOverride === void 0 ? void 0 : policySnapshotOverride.policies) === null || _a === void 0 ? void 0 : _a.length)
            ? policySnapshotOverride.policies
            : applicableSalesPolicies.map(policy => ({
                id: policy.id, name: policy.name, startDate: policy.startDate, endDate: policy.endDate, note: policy.note || ''
            }));
        const selectedBenefits = selectedPolicyBenefits.map(benefit => ({
            id: benefit.id,
            key: benefit.key,
            policyId: benefit.policyId,
            policyName: benefit.policyName,
            policyStartDate: benefit.policyStartDate,
            policyEndDate: benefit.policyEndDate,
            type: benefit.type,
            name: benefit.name,
            value: parseMoney(benefit.value),
            deductFromPrice: Boolean(benefit.deductFromPrice),
            defaultSelected: Boolean(benefit.defaultSelected),
            required: Boolean(benefit.required),
            choiceGroup: String(benefit.choiceGroup || '')
        }));
        if (!policies.length && !selectedBenefits.length)
            return null;
        return {
            capturedAtMs: (policySnapshotOverride === null || policySnapshotOverride === void 0 ? void 0 : policySnapshotOverride.capturedAtMs) || Date.now(),
            policies: policies.map(item => ({ ...item })),
            selectedBenefits,
            totalDeductValue: selectedBenefits.filter(item => item.deductFromPrice).reduce((sum, item) => sum + parseMoney(item.value), 0)
        };
    };
    const handleExportImage = async () => {
        var _a, _b, _c;
        if (!calculations || !car)
            return showToast('Chưa có dữ liệu báo giá.');
        setIsExporting(true);
        showToast('Đang tạo ảnh Zalo đầy đủ...');
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
        const fontString = options => `${options.weight || 600} ${options.size || 28}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`;
        const drawText = (ctx, text, x, y, options = {}) => {
            ctx.save();
            ctx.font = fontString(options);
            ctx.fillStyle = options.color || '#0f172a';
            ctx.textAlign = options.align || 'left';
            ctx.textBaseline = options.baseline || 'alphabetic';
            ctx.fillText(String(text !== null && text !== void 0 ? text : ''), x, y, options.maxWidth || undefined);
            ctx.restore();
        };
        const wrapLines = (ctx, text, maxWidth, options = {}) => {
            ctx.save();
            ctx.font = fontString(options);
            const paragraphs = String(text !== null && text !== void 0 ? text : '').split(/\n/);
            const lines = [];
            paragraphs.forEach((paragraph, paragraphIndex) => {
                const words = paragraph.split(/\s+/).filter(Boolean);
                let line = '';
                words.forEach(word => {
                    const test = line ? `${line} ${word}` : word;
                    if (ctx.measureText(test).width > maxWidth && line) {
                        lines.push(line);
                        line = word;
                    }
                    else
                        line = test;
                });
                if (line)
                    lines.push(line);
                if (!words.length)
                    lines.push('');
                if (paragraphIndex < paragraphs.length - 1)
                    lines.push('');
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
        const drawSectionHeader = (ctx, title, y, rightText = '') => {
            roundedRect(ctx, 50, y, 980, 58, 10, '#eef2f7', '#d7dee8');
            drawText(ctx, title, 72, y + 38, { size: 21, weight: 900, color: '#172033' });
            if (rightText)
                drawText(ctx, rightText, 1008, y + 37, { size: 15, weight: 700, color: '#64748b', align: 'right', maxWidth: 360 });
            return y + 58;
        };
        const drawTableRow = (ctx, label, value, y, options = {}) => {
            const lineHeight = 26;
            const labelLines = wrapLines(ctx, label, 650, { size: options.size || 20, weight: options.bold ? 800 : 600 });
            const height = Math.max(options.minHeight || 58, labelLines.length * lineHeight + 24);
            if (options.fill) {
                ctx.fillStyle = options.fill;
                ctx.fillRect(50, y, 980, height);
            }
            ctx.strokeStyle = options.border || '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(50, y + height);
            ctx.lineTo(1030, y + height);
            ctx.stroke();
            drawWrapped(ctx, label, 72, y + 14, 650, lineHeight, { size: options.size || 20, weight: options.bold ? 800 : 600, color: options.labelColor || '#334155' });
            drawText(ctx, value, 1008, y + Math.min(height - 18, 38), { size: options.valueSize || 21, weight: options.valueWeight || 800, color: options.valueColor || '#0f172a', align: 'right', maxWidth: 300 });
            return y + height;
        };
        const drawBulletBlock = (ctx, heading, items, y, options = {}) => {
            if (!items.length)
                return y;
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
            if ((_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready)
                await document.fonts.ready;
            const policyItems = [
                ...calculations.effectivePolicyNames.map(name => `Chương trình: ${name}`),
                ...calculations.selectedPolicyBenefits.map(item => `${PROMOTION_TYPES[item.type] || 'Quyền lợi'}: ${item.name}${item.value > 0 ? ` (${item.deductFromPrice ? '-' : 'giá trị '}${formatVND(item.value)})` : ''}`)
            ];
            const directItems = calculations.selectedPromotions.filter(item => item.deductFromPrice).map(item => item.name);
            if (parseMoney(discount) > 0)
                directItems.push(`Giảm tiền mặt bổ sung: ${formatVND(parseMoney(discount))}`);
            const giftItems = calculations.giftPromotions.map(item => `${item.name}${item.value > 0 ? ` (giá trị ${formatVND(item.value)})` : ''}`);
            const feeRows = [
                [`Lệ phí trước bạ (${formatPercentValue(calculations.taxRate)}% · ${ENGINE_TYPES[calculations.engineType]})`, formatVND(calculations.taxFee)],
                ['Phí cấp biển số', formatVND(calculations.plateFee)],
                ['Phí đăng kiểm', formatVND(calculations.inspectionFee)],
                [`Phí bảo trì đường bộ (${calculations.roadFeeYears} năm)`, formatVND(calculations.roadFee)],
                ['Bảo hiểm TNDS (bắt buộc)', formatVND(calculations.civilInsurance)]
            ];
            if (includePhysicalInsurance)
                feeRows.push([`Bảo hiểm vật chất (${physicalInsuranceRate}%)`, formatVND(calculations.physicalInsuranceFee)]);
            if (includeServiceFee)
                feeRows.push(['Phí dịch vụ đăng ký', formatVND(calculations.serviceFee)]);
            const estimatedHeight = 2250 + (policyItems.length + directItems.length + giftItems.length) * 38 + ((loanCalculations === null || loanCalculations === void 0 ? void 0 : loanCalculations.loanAmount) > 0 ? 330 : 0);
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = Math.max(2350, estimatedHeight);
            const ctx = canvas.getContext('2d');
            if (!ctx)
                throw new Error('Trình duyệt không hỗ trợ canvas.');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let y = 0;
            // Header
            ctx.fillStyle = '#0f2d64';
            ctx.fillRect(0, 0, 1080, 160);
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
            if (customerPhone)
                drawText(ctx, `SĐT: ${customerPhone}`, 72, cardY + 130, { size: 18, weight: 650, color: '#475569' });
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
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(72, y + 18, 936, 374);
                drawContainedImage(ctx, image, 92, y + 35, 896, 335);
                carImageDrawn = true;
            }
            catch (error) { }
            if (!carImageDrawn)
                drawText(ctx, 'CHƯA CÓ ẢNH XE', 540, y + 215, { size: 33, weight: 800, color: '#cbd5e1', align: 'center' });
            roundedRect(ctx, 755, y + 24, 245, 94, 14, 'rgba(255,255,255,.96)', '#d7dee8');
            drawText(ctx, 'GIÁ NIÊM YẾT', 878, y + 57, { size: 15, weight: 900, color: '#64748b', align: 'center' });
            drawText(ctx, formatVND(calculations.price), 878, y + 94, { size: 25, weight: 900, color: '#173a85', align: 'center', maxWidth: 220 });
            y += 440;
            // Vehicle value section
            y = drawSectionHeader(ctx, '1. CHI TIẾT GIÁ TRỊ XE', y);
            y = drawTableRow(ctx, 'Giá xe niêm yết', formatVND(calculations.price), y);
            if (policyItems.length) {
                y = drawBulletBlock(ctx, 'CHÍNH SÁCH BÁN HÀNG', policyItems, y, { fill: '#eff6ff', border: '#bfdbfe', headingColor: '#1d4ed8' });
            }
            if (calculations.discountAmount > 0) {
                y = drawTableRow(ctx, 'Tổng giảm giá trực tiếp', `-${formatVND(calculations.discountAmount)}`, y, { fill: '#fff1f2', labelColor: '#be123c', valueColor: '#be123c', bold: true });
                if (directItems.length)
                    y = drawBulletBlock(ctx, 'ƯU ĐÃI BỔ SUNG / GIẢM THÊM', directItems, y, { fill: '#fff7f7', border: '#fecdd3', headingColor: '#be123c' });
            }
            if (giftItems.length)
                y = drawBulletBlock(ctx, 'QUÀ TẶNG BỔ SUNG', giftItems, y, { fill: '#f0fdf4', border: '#bbf7d0', headingColor: '#15803d' });
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
            if ((loanCalculations === null || loanCalculations === void 0 ? void 0 : loanCalculations.loanAmount) > 0) {
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
            ctx.strokeStyle = '#17243b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(50, y);
            ctx.lineTo(1030, y);
            ctx.stroke();
            y += 30;
            const noteText = '* Chi phí thuế, phí mang tính tham khảo và có thể thay đổi theo quy định tại thời điểm xuất hóa đơn, đăng ký xe.\n* Báo giá không thay thế Hợp đồng mua bán chính thức. Khoản vay phụ thuộc phê duyệt của ngân hàng.';
            drawWrapped(ctx, noteText, 55, y, 650, 25, { size: 16, weight: 550, color: '#64748b' });
            roundedRect(ctx, 730, y - 5, 300, 190, 16, '#f8fafc', '#d7dee8');
            drawText(ctx, 'ĐẠI DIỆN BÁN HÀNG', 880, y + 25, { size: 15, weight: 900, color: '#64748b', align: 'center' });
            drawText(ctx, salesInfo.name || 'NGUYỄN HOÀNG TÙNG', 880, y + 58, { size: 21, weight: 900, color: '#172033', align: 'center', maxWidth: 260 });
            drawText(ctx, salesInfo.phone || '0961 018 288', 835, y + 88, { size: 20, weight: 900, color: '#2563eb', align: 'center', maxWidth: 170 });
            try {
                const qrDataUrl = (_c = (_b = window.GeelyQR) === null || _b === void 0 ? void 0 : _b.toDataURL) === null || _c === void 0 ? void 0 : _c.call(_b, `https://zalo.me/${normalizePhoneForZalo(salesInfo.phone)}`, 220);
                const qrImage = await loadCanvasImage(qrDataUrl);
                ctx.drawImage(qrImage, 930, y + 72, 82, 82);
                drawText(ctx, 'QUÉT ZALO', 971, y + 173, { size: 12, weight: 900, color: '#0f2d64', align: 'center' });
            }
            catch (error) { }
            y += 205;
            // Crop unused canvas area.
            const finalHeight = Math.min(canvas.height, Math.max(1200, Math.ceil(y + 25)));
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = canvas.width;
            finalCanvas.height = finalHeight;
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
            showToast(shared ? 'Đã mở bảng chia sẻ ảnh Zalo đầy đủ!' : 'Đã tải ảnh Zalo đầy đủ!');
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
            selectedColorId,
            selectedColorName: carColor,
            selectedColorImagePath: (selectedCarColor === null || selectedCarColor === void 0 ? void 0 : selectedCarColor.imagePath) || (selectedColorId === '__local__' ? '' : resolvedCarImage),
            carId: selectedCarId,
            carName: (car === null || car === void 0 ? void 0 : car.name) || '',
            carEngineType: (car === null || car === void 0 ? void 0 : car.engineType) || 'gasoline',
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
            selectedPolicyBenefitIds: [...selectedPolicyBenefitIds],
            salesPolicySnapshot: buildSalesPolicySnapshot(),
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
        var _a, _b, _c, _d, _e, _f;
        setCurrentQuoteId(record.id || createQuoteId());
        setQuoteStatus(record.status || 'draft');
        setQuoteNotes(record.notes || '');
        setCustomerName(record.customerName || '');
        setCustomerPhone(record.customerPhone || '');
        const recordCar = cars.find(item => item.id === record.carId);
        if (recordCar) {
            setSelectedCarId(recordCar.id);
            const matchingColor = ((_a = recordCar.colors) === null || _a === void 0 ? void 0 : _a.find(color => color.id === record.selectedColorId))
                || ((_b = recordCar.colors) === null || _b === void 0 ? void 0 : _b.find(color => color.name === (record.selectedColorName || record.carColor)));
            const nextColorId = (matchingColor === null || matchingColor === void 0 ? void 0 : matchingColor.id) || recordCar.defaultColorId || ((_d = (_c = recordCar.colors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id) || (carImageMap[recordCar.id] ? '__local__' : '');
            setSelectedColorId(nextColorId);
            setCarColor((matchingColor === null || matchingColor === void 0 ? void 0 : matchingColor.name) || record.selectedColorName || record.carColor || (nextColorId === '__local__' ? 'Ảnh riêng' : ''));
        }
        else {
            setCarColor(record.selectedColorName || record.carColor || '');
        }
        const preferredLocationId = record.selectedLocationId;
        setSelectedLocationId(registrationFees.locations.some(item => item.id === preferredLocationId) ? preferredLocationId : (((_e = registrationFees.locations[0]) === null || _e === void 0 ? void 0 : _e.id) || ''));
        setSelectedPromoIds(Array.isArray(record.selectedPromoIds) ? record.selectedPromoIds : []);
        const storedPolicySnapshot = record.salesPolicySnapshot && typeof record.salesPolicySnapshot === 'object'
            ? record.salesPolicySnapshot
            : null;
        setPolicySnapshotOverride(storedPolicySnapshot);
        setSelectedPolicyBenefitIds(((_f = storedPolicySnapshot === null || storedPolicySnapshot === void 0 ? void 0 : storedPolicySnapshot.selectedBenefits) === null || _f === void 0 ? void 0 : _f.map(item => String(item.key || policyBenefitKey(item.policyId || 'snapshot', item.id || 'benefit'))))
            || (Array.isArray(record.selectedPolicyBenefitIds) ? record.selectedPolicyBenefitIds : []));
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
        setSelectedPolicyBenefitIds([]);
        setPolicySnapshotOverride(null);
        setDiscount('');
        setQuoteNotes('');
        setQuoteStatus('draft');
        setActiveTab('input');
    };
    const handlePrintA4 = async () => {
        var _a;
        const element = captureRef.current;
        if (!element)
            return showToast('Hãy mở tab Báo Giá trước.');
        await waitForExportCanvases(element);
        if ((_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready)
            await document.fonts.ready;
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
        clone.classList.add('print-a4-compact');
        clone.style.transform = 'none';
        clone.style.transformOrigin = 'top left';
        clone.style.width = '800px';
        clone.style.maxWidth = 'none';
        clone.style.boxShadow = 'none';
        clone.style.border = '0';
        clone.style.margin = '0';
        const printWindow = window.open('', '_blank');
        if (!printWindow)
            return showToast('Trình duyệt đã chặn cửa sổ in.');
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
    const renderInputForm = () => {
        var _a, _b;
        return (React.createElement("div", { className: "space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20" },
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
                    React.createElement("select", { value: selectedCarId, onChange: (e) => handleCarSelection(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-900 text-sm" }, cars.map(c => React.createElement("option", { key: c.id, value: c.id },
                        c.name,
                        " - ",
                        formatVND(c.price))))),
                React.createElement("div", { className: "col-span-1" },
                    React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "M\u00E0u s\u1EAFc"),
                    (((_a = car === null || car === void 0 ? void 0 : car.colors) === null || _a === void 0 ? void 0 : _a.length) || carImageMap[car === null || car === void 0 ? void 0 : car.id]) ? (React.createElement("select", { value: selectedColorId, onChange: (e) => handleColorSelection(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold" },
                        ((car === null || car === void 0 ? void 0 : car.colors) || []).map(color => React.createElement("option", { key: color.id, value: color.id }, color.name)),
                        carImageMap[car === null || car === void 0 ? void 0 : car.id] && React.createElement("option", { value: "__local__" }, "\u1EA2nh ri\u00EAng tr\u00EAn m\u00E1y"))) : (React.createElement("input", { type: "text", value: carColor, onChange: (e) => setCarColor(e.target.value), placeholder: "VD: Tr\u1EAFng", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" })))),
            ((_b = car === null || car === void 0 ? void 0 : car.colors) === null || _b === void 0 ? void 0 : _b.length) > 0 && (React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-2" }, "Ch\u1ECDn nhanh m\u00E0u xe"),
                React.createElement("div", { className: "car-color-quick-grid" }, car.colors.map(color => (React.createElement("button", { key: color.id, type: "button", onClick: () => handleColorSelection(color.id), className: `car-color-quick-card rounded-xl border-2 p-1.5 bg-white ${selectedColorId === color.id ? 'border-blue-600 shadow-md' : 'border-gray-200'}`, title: color.name },
                    React.createElement("div", { className: "car-color-quick-image rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center" },
                        React.createElement("img", { src: color.imagePath, alt: `${car.name} ${color.name}`, className: "w-full h-full object-contain p-1", onError: e => { e.currentTarget.style.opacity = '0.15'; } })),
                    React.createElement("div", { className: `car-color-quick-label mt-1 text-[10px] font-bold ${selectedColorId === color.id ? 'text-blue-700' : 'text-gray-600'}` }, color.name))))))),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-sm font-semibold text-gray-700 mb-1" }, "N\u01A1i \u0111\u0103ng k\u00FD"),
                React.createElement("select", { value: selectedLocationId, onChange: (e) => setSelectedLocationId(e.target.value), className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" }, registrationFees.locations.map(l => React.createElement("option", { key: l.id, value: l.id }, l.name))),
                car && location && calculations && (React.createElement("div", { className: "mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900" },
                    React.createElement("div", { className: "flex items-center justify-between gap-3" },
                        React.createElement("span", null, "Lo\u1EA1i \u0111\u1ED9ng c\u01A1"),
                        React.createElement("b", null, ENGINE_TYPES[calculations.engineType])),
                    React.createElement("div", { className: "flex items-center justify-between gap-3 mt-1" },
                        React.createElement("span", null, "Tr\u01B0\u1EDBc b\u1EA1 t\u1EF1 \u0111\u1ED9ng"),
                        React.createElement("b", null,
                            formatPercentValue(calculations.taxRate),
                            "%")),
                    React.createElement("div", { className: "flex items-center justify-between gap-3 mt-1" },
                        React.createElement("span", null, "Ph\u00ED bi\u1EC3n s\u1ED1"),
                        React.createElement("b", null, formatVND(calculations.plateFee))),
                    React.createElement("div", { className: "flex items-center justify-between gap-3 mt-1" },
                        React.createElement("span", null, "Ng\u00E0y \u00E1p d\u1EE5ng"),
                        React.createElement("b", null, calculations.effectiveDate ? new Date(`${calculations.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN') : 'Chưa đặt'))))),
            React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Lo\u1EA1i Bi\u1EC3n (Ph\u00ED \u0110B)"),
                    React.createElement("select", { value: plateColor, onChange: (e) => setPlateColor(e.target.value), className: "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium" },
                        React.createElement("option", { value: "white" },
                            "Tr\u1EAFng (",
                            formatVND(registrationFees.roadFeeMonthlyWhite),
                            "/th\u00E1ng)"),
                        React.createElement("option", { value: "yellow" },
                            "V\u00E0ng (",
                            formatVND(registrationFees.roadFeeMonthlyYellow),
                            "/th\u00E1ng)"))),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Th\u1EDDi gian n\u1ED9p \u0110B"),
                    React.createElement("select", { value: roadFeeYears, onChange: (e) => setRoadFeeYears(Number(e.target.value)), className: "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium" },
                        React.createElement("option", { value: 1 }, "1 n\u0103m"),
                        React.createElement("option", { value: 2 }, "2 n\u0103m"),
                        React.createElement("option", { value: 3 }, "3 n\u0103m")))),
            React.createElement("div", { className: "space-y-3 rounded-xl border border-blue-200 bg-blue-50/60 p-3" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-black text-blue-950" }, "\uD83D\uDCC5 Ch\u00EDnh s\u00E1ch b\u00E1n h\u00E0ng"),
                        React.createElement("p", { className: "text-[11px] text-blue-700 mt-0.5" },
                            "T\u1EF1 \u0111\u1ED9ng \u00E1p d\u1EE5ng theo ng\u00E0y ",
                            new Date(`${policyTodayIso}T00:00:00`).toLocaleDateString('vi-VN'),
                            " v\u00E0 phi\u00EAn b\u1EA3n xe \u0111\u00E3 ch\u1ECDn.")),
                    policySnapshotOverride && React.createElement("span", { className: "shrink-0 text-[9px] font-black px-2 py-1 rounded-full bg-amber-100 text-amber-800" }, "SNAPSHOT")),
                policySnapshotOverride ? (React.createElement("div", { className: "space-y-2" },
                    React.createElement("div", { className: "p-3 bg-amber-50 border border-amber-200 rounded-xl" },
                        React.createElement("p", { className: "text-xs font-black text-amber-900" }, "\u0110ang d\u00F9ng ch\u00EDnh s\u00E1ch \u0111\u00E3 l\u01B0u c\u00F9ng b\u00E1o gi\u00E1 l\u1ECBch s\u1EED"),
                        React.createElement("p", { className: "text-[11px] text-amber-700 mt-1" }, "Ch\u00EDnh s\u00E1ch th\u00E1ng hi\u1EC7n t\u1EA1i s\u1EBD kh\u00F4ng t\u1EF1 thay \u0111\u1ED5i b\u00E1o gi\u00E1 c\u0169."),
                        React.createElement("div", { className: "mt-2 space-y-1" },
                            (policySnapshotOverride.policies || []).map(policy => React.createElement("p", { key: policy.id || policy.name, className: "text-xs font-bold text-slate-700" },
                                "\u2022 ",
                                policy.name)),
                            (policySnapshotOverride.selectedBenefits || []).map(benefit => (React.createElement("div", { key: benefit.key || benefit.id, className: "text-xs text-slate-600 pl-2" },
                                "\u2713 ",
                                PROMOTION_TYPES[benefit.type] || 'Quyền lợi',
                                ": ",
                                benefit.name,
                                benefit.value > 0 ? ` (${benefit.deductFromPrice ? '-' : 'giá trị '}${formatVND(benefit.value)})` : ''))))),
                    React.createElement("button", { type: "button", onClick: handleUseCurrentSalesPolicies, className: "w-full py-2.5 bg-white border-2 border-blue-500 text-blue-700 rounded-lg font-bold text-xs" }, "D\u00F9ng ch\u00EDnh s\u00E1ch hi\u1EC7n t\u1EA1i"))) : applicableSalesPolicies.length > 0 ? (React.createElement("div", { className: "space-y-3" }, applicableSalesPolicies.map(policy => (React.createElement("div", { key: policy.id, className: "bg-white border border-blue-100 rounded-xl p-3" },
                    React.createElement("div", { className: "flex items-start justify-between gap-2 mb-2" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-sm font-black text-blue-950" }, policy.name),
                            React.createElement("p", { className: "text-[10px] text-gray-500" },
                                new Date(`${policy.startDate}T00:00:00`).toLocaleDateString('vi-VN'),
                                " \u2192 ",
                                new Date(`${policy.endDate}T00:00:00`).toLocaleDateString('vi-VN'))),
                        React.createElement("span", { className: "text-[9px] font-black px-2 py-1 bg-green-100 text-green-700 rounded-full" }, "\u0110ANG \u00C1P D\u1EE4NG")),
                    React.createElement("div", { className: "space-y-1.5" }, policy.benefits.map((rawBenefit, benefitIndex) => {
                        const benefit = normalizePolicyBenefit(rawBenefit, benefitIndex);
                        const key = policyBenefitKey(policy.id, benefit.id);
                        const checked = selectedPolicyBenefitIds.includes(key);
                        return (React.createElement("label", { key: key, className: `flex items-start gap-2.5 p-2 rounded-lg border ${checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} ${benefit.required ? 'cursor-default' : 'cursor-pointer'}` },
                            React.createElement("input", { type: "checkbox", checked: checked, onChange: e => handlePolicyBenefitToggle(key, e.target.checked), disabled: benefit.required, className: "mt-0.5 w-4 h-4 rounded text-green-600" }),
                            React.createElement("span", { className: "flex-1 min-w-0 text-xs text-gray-800" },
                                React.createElement("span", { className: "font-black" },
                                    PROMOTION_TYPES[benefit.type] || 'Quyền lợi',
                                    ":"),
                                " ",
                                benefit.name,
                                benefit.value > 0 && React.createElement("span", { className: `ml-1 font-bold ${benefit.deductFromPrice ? 'text-red-600' : 'text-gray-500'}` },
                                    "(",
                                    benefit.deductFromPrice ? '-' : 'Giá trị ',
                                    formatVND(benefit.value),
                                    ")"),
                                React.createElement("span", { className: "flex flex-wrap gap-1 mt-1" },
                                    benefit.required && React.createElement("span", { className: "text-[9px] font-black px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded" }, "B\u1EAET BU\u1ED8C"),
                                    !benefit.required && benefit.defaultSelected && React.createElement("span", { className: "text-[9px] font-black px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded" }, "M\u1EB6C \u0110\u1ECANH"),
                                    benefit.choiceGroup && React.createElement("span", { className: "text-[9px] font-black px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded" },
                                        "CH\u1ECCN 1 \u00B7 ",
                                        benefit.choiceGroup)))));
                    })),
                    policy.note && React.createElement("p", { className: "text-[10px] italic text-gray-500 mt-2" }, policy.note)))))) : (React.createElement("div", { className: "p-3 bg-white border border-dashed border-blue-200 rounded-xl text-xs text-gray-500 text-center" }, "Ch\u01B0a c\u00F3 ch\u00EDnh s\u00E1ch b\u00E1n h\u00E0ng \u0111ang hi\u1EC7u l\u1EF1c cho phi\u00EAn b\u1EA3n xe n\u00E0y."))),
            React.createElement("div", { className: "space-y-3" },
                React.createElement("label", { className: "block text-sm font-semibold text-gray-700 mb-1" }, "Khuy\u1EBFn m\u00E3i b\u1ED5 sung th\u1EE7 c\u00F4ng (n\u1EBFu c\u00F3)"),
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
    };
    const renderBankLoan = () => {
        if (!loanCalculations)
            return null;
        const preferredOptions = [0, 6, 12, 24, 36].filter(month => month <= normalizedLoanParams.months);
        const firstMonth = loanCalculations.firstMonth;
        const lastPreferredMonth = loanCalculations.lastPreferredMonth;
        const firstFloatingMonth = loanCalculations.firstFloatingMonth;
        const finalMonth = loanCalculations.finalMonth;
        const loanAmountInputValue = normalizedLoanParams.loanInputMode === 'amount'
            ? (loanParams.loanAmount === '' ? '' : formatNumber(loanParams.loanAmount))
            : formatNumber(Math.round(loanCalculations.loanAmount));
        const PaymentCard = ({ title, item, tone = 'blue', note = '' }) => {
            if (!item)
                return null;
            const tones = {
                blue: 'bg-blue-50 border-blue-200 text-blue-700',
                green: 'bg-green-50 border-green-200 text-green-700',
                orange: 'bg-orange-50 border-orange-200 text-orange-700',
                slate: 'bg-slate-50 border-slate-200 text-slate-700'
            };
            return (React.createElement("div", { className: `border rounded-xl p-3 ${tones[tone] || tones.blue}` },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-black uppercase" }, title),
                        React.createElement("p", { className: "text-[11px] opacity-75 mt-0.5" },
                            "L\u00E3i su\u1EA5t ",
                            item.annualRate,
                            "%/n\u0103m \u00B7 D\u01B0 n\u1EE3 \u0111\u1EA7u k\u1EF3 ",
                            formatVND(item.openingBalance))),
                    React.createElement("span", { className: "text-xs font-bold whitespace-nowrap" },
                        "Th\u00E1ng ",
                        item.month)),
                React.createElement("p", { className: "text-2xl font-black mt-2" }, formatVND(item.totalPayment)),
                React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2 text-xs" },
                    React.createElement("span", null,
                        "G\u1ED1c: ",
                        React.createElement("b", null, formatVND(item.principalPayment))),
                    React.createElement("span", null,
                        "L\u00E3i: ",
                        React.createElement("b", null, formatVND(item.interest)))),
                note && React.createElement("p", { className: "text-[10px] mt-2 opacity-75 italic" }, note)));
        };
        return (React.createElement("div", { className: "space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20" },
            React.createElement("div", { className: "flex items-start justify-between gap-3" },
                React.createElement("div", null,
                    React.createElement("h3", { className: "font-bold text-gray-800 text-lg" }, "Ph\u01B0\u01A1ng \u00E1n t\u00E0i ch\u00EDnh"),
                    React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "Ph\u01B0\u01A1ng ph\u00E1p duy nh\u1EA5t: g\u1ED1c c\u1ED1 \u0111\u1ECBnh, l\u00E3i t\u00EDnh tr\u00EAn d\u01B0 n\u1EE3 gi\u1EA3m d\u1EA7n.")),
                React.createElement("span", { className: "px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase whitespace-nowrap" }, "D\u01B0 n\u1EE3 gi\u1EA3m d\u1EA7n")),
            React.createElement("div", { className: "space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200" },
                React.createElement("div", { className: "rounded-xl border border-blue-200 bg-blue-50/60 p-3" },
                    React.createElement("div", { className: "flex items-start justify-between gap-3 mb-2" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-black text-blue-950" }, "S\u1ED1 ti\u1EC1n kh\u00E1ch mu\u1ED1n vay"),
                            React.createElement("p", { className: "text-[10px] text-blue-700 mt-0.5" }, "Nh\u1EADp ch\u00EDnh x\u00E1c s\u1ED1 ti\u1EC1n \u0111\u1EC3 tr\u00E1nh kho\u1EA3n vay b\u1ECB l\u1EBB khi ch\u1ECDn theo ph\u1EA7n tr\u0103m.")),
                        React.createElement("span", { className: `shrink-0 px-2 py-1 rounded-full text-[9px] font-black uppercase ${normalizedLoanParams.loanInputMode === 'amount' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200'}` }, normalizedLoanParams.loanInputMode === 'amount' ? 'Đang ưu tiên số tiền' : 'Đang tính theo %')),
                    React.createElement("div", { className: "flex items-center bg-white border-2 border-blue-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400" },
                        React.createElement("input", { type: "text", inputMode: "numeric", value: loanAmountInputValue, onChange: (e) => updateLoanAmount(e.target.value), onBlur: normalizeLoanAmountField, placeholder: "V\u00ED d\u1EE5: 350.000.000", className: "w-full px-3 py-3 outline-none text-lg font-black text-blue-900 bg-transparent" }),
                        React.createElement("span", { className: "px-3 py-3 bg-blue-100 text-blue-700 font-black border-l border-blue-200" }, "VN\u0110")),
                    React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2 text-[11px]" },
                        React.createElement("div", { className: "rounded-lg bg-white border border-blue-100 px-2.5 py-2" },
                            React.createElement("span", { className: "text-gray-500 block" }, "T\u1EF7 l\u1EC7 vay t\u01B0\u01A1ng \u0111\u01B0\u01A1ng"),
                            React.createElement("b", { className: "text-blue-700" },
                                loanCalculations.loanPercent.toFixed(2),
                                "% gi\u00E1 xe")),
                        React.createElement("div", { className: "rounded-lg bg-white border border-blue-100 px-2.5 py-2" },
                            React.createElement("span", { className: "text-gray-500 block" }, "T\u1EF7 l\u1EC7 v\u1ED1n t\u1EF1 c\u00F3"),
                            React.createElement("b", { className: "text-blue-700" },
                                loanCalculations.effectiveDownPaymentPercent.toFixed(2),
                                "%"))),
                    loanCalculations.loanAmountWasClamped && React.createElement("p", { className: "text-[10px] text-red-600 font-semibold mt-2" },
                        "S\u1ED1 ti\u1EC1n nh\u1EADp v\u01B0\u1EE3t gi\u00E1 xe v\u00E0 \u0111ang \u0111\u01B0\u1EE3c gi\u1EDBi h\u1EA1n \u1EDF ",
                        formatVND(loanCalculations.maxLoanAmount),
                        ".")),
                React.createElement("div", null,
                    React.createElement("div", { className: "flex justify-between mb-1" },
                        React.createElement("span", { className: "text-sm font-semibold text-gray-700" }, "\u0110i\u1EC1u ch\u1EC9nh nhanh theo t\u1EF7 l\u1EC7 tr\u1EA3 tr\u01B0\u1EDBc"),
                        React.createElement("span", { className: "text-sm font-bold text-blue-600" },
                            loanCalculations.effectiveDownPaymentPercent.toFixed(1),
                            "%")),
                    React.createElement("input", { type: "range", min: "0", max: "100", step: "1", value: loanCalculations.effectiveDownPaymentPercent, onChange: (e) => updateDownPaymentPercent(e.target.value), className: "w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" }),
                    React.createElement("p", { className: "text-[10px] text-gray-500 mt-1" }, "Khi k\u00E9o thanh n\u00E0y, \u1EE9ng d\u1EE5ng chuy\u1EC3n sang t\u00EDnh theo t\u1EF7 l\u1EC7. Ch\u1EC9 c\u1EA7n nh\u1EADp l\u1EA1i s\u1ED1 ti\u1EC1n ph\u00EDa tr\u00EAn \u0111\u1EC3 \u01B0u ti\u00EAn kho\u1EA3n vay ch\u00EDnh x\u00E1c.")),
                React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Th\u1EDDi gian vay"),
                        React.createElement("select", { value: normalizedLoanParams.loanTermYears, onChange: (e) => updateLoanTermYears(e.target.value), className: "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium" }, [1, 2, 3, 4, 5, 6, 7, 8].map(y => React.createElement("option", { key: y, value: y },
                            y,
                            " n\u0103m (",
                            y * 12,
                            " th\u00E1ng)")))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "Th\u1EDDi gian \u01B0u \u0111\u00E3i"),
                        React.createElement("select", { value: normalizedLoanParams.fixedTermMonths, onChange: (e) => updateLoanParam('fixedTermMonths', e.target.value), className: "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium" }, preferredOptions.map(month => React.createElement("option", { key: month, value: month }, month === 0 ? 'Không ưu đãi' : `${month} tháng`))))),
                React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "L\u00E3i su\u1EA5t \u01B0u \u0111\u00E3i (%/n\u0103m)"),
                        React.createElement("div", { className: "flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden" },
                            React.createElement("input", { type: "number", inputMode: "decimal", min: "0", max: "100", step: "0.1", disabled: normalizedLoanParams.fixedTermMonths === 0, value: loanParams.fixedInterestRate, onChange: (e) => updateLoanRate('fixedInterestRate', e.target.value), onBlur: () => normalizeLoanRateField('fixedInterestRate'), className: "w-full px-3 py-2 outline-none text-sm font-medium text-blue-600 disabled:bg-gray-100 disabled:text-gray-400" }),
                            React.createElement("span", { className: "px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm" }, "%"))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-semibold text-gray-700 mb-1" }, "L\u00E3i th\u1EA3 n\u1ED5i d\u1EF1 ki\u1EBFn (%/n\u0103m)"),
                        React.createElement("div", { className: "flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden" },
                            React.createElement("input", { type: "number", inputMode: "decimal", min: "0", max: "100", step: "0.1", value: loanParams.floatingInterestRate, onChange: (e) => updateLoanRate('floatingInterestRate', e.target.value), onBlur: () => normalizeLoanRateField('floatingInterestRate'), className: "w-full px-3 py-2 outline-none text-sm font-medium text-orange-600" }),
                            React.createElement("span", { className: "px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm" }, "%")))),
                React.createElement("p", { className: "text-[10px] text-gray-500 italic" }, "K\u1EBFt qu\u1EA3 b\u00EAn d\u01B0\u1EDBi c\u1EADp nh\u1EADt ngay khi thay \u0111\u1ED5i t\u1EF7 l\u1EC7 tr\u1EA3 tr\u01B0\u1EDBc, k\u1EF3 h\u1EA1n, th\u1EDDi gian \u01B0u \u0111\u00E3i ho\u1EB7c l\u00E3i su\u1EA5t.")),
            React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-3" },
                    React.createElement("p", { className: "text-xs font-semibold text-blue-900" }, "V\u1ED1n kh\u00E1ch c\u1EA7n chu\u1EA9n b\u1ECB + chi ph\u00ED l\u0103n b\u00E1nh"),
                    React.createElement("p", { className: "text-xl font-black text-blue-700 mt-1" }, formatVND(loanCalculations.upfrontPayment))),
                React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-xl p-3" },
                    React.createElement("p", { className: "text-xs font-semibold text-slate-700" }, "S\u1ED1 ti\u1EC1n vay ng\u00E2n h\u00E0ng"),
                    React.createElement("p", { className: "text-xl font-black text-slate-900 mt-1" }, formatVND(loanCalculations.loanAmount)))),
            React.createElement("div", { className: "grid grid-cols-2 gap-3 text-sm" },
                React.createElement("div", { className: "p-3 rounded-lg bg-gray-50 border" },
                    React.createElement("span", { className: "text-gray-500 block text-xs" }, "G\u1ED1c c\u1ED1 \u0111\u1ECBnh m\u1ED7i th\u00E1ng"),
                    React.createElement("b", null, formatVND(loanCalculations.monthlyPrincipal))),
                React.createElement("div", { className: "p-3 rounded-lg bg-gray-50 border" },
                    React.createElement("span", { className: "text-gray-500 block text-xs" }, "T\u1ED5ng ti\u1EC1n l\u00E3i d\u1EF1 ki\u1EBFn"),
                    React.createElement("b", { className: "text-orange-600" }, formatVND(loanCalculations.totalInterest))),
                React.createElement("div", { className: "p-3 rounded-lg bg-gray-50 border" },
                    React.createElement("span", { className: "text-gray-500 block text-xs" }, "T\u1ED5ng tr\u1EA3 ng\u00E2n h\u00E0ng"),
                    React.createElement("b", null, formatVND(loanCalculations.totalBankPayment))),
                React.createElement("div", { className: "p-3 rounded-lg bg-gray-50 border" },
                    React.createElement("span", { className: "text-gray-500 block text-xs" }, "B\u00ECnh qu\u00E2n m\u1ED7i th\u00E1ng"),
                    React.createElement("b", null, formatVND(loanCalculations.averageMonthlyPayment)))),
            React.createElement("div", { className: "space-y-3" },
                React.createElement(PaymentCard, { title: "K\u1EF3 thanh to\u00E1n \u0111\u1EA7u ti\u00EAn", item: firstMonth, tone: "green" }),
                lastPreferredMonth && lastPreferredMonth.month !== (firstMonth === null || firstMonth === void 0 ? void 0 : firstMonth.month) && (React.createElement(PaymentCard, { title: "K\u1EF3 cu\u1ED1i th\u1EDDi gian \u01B0u \u0111\u00E3i", item: lastPreferredMonth, tone: "blue" })),
                firstFloatingMonth && (React.createElement(PaymentCard, { title: "K\u1EF3 \u0111\u1EA7u l\u00E3i su\u1EA5t th\u1EA3 n\u1ED5i", item: firstFloatingMonth, tone: "orange", note: "L\u00E3i su\u1EA5t th\u1EA3 n\u1ED5i l\u00E0 m\u1EE9c d\u1EF1 ki\u1EBFn v\u00E0 c\u00F3 th\u1EC3 thay \u0111\u1ED5i theo ch\u00EDnh s\u00E1ch ng\u00E2n h\u00E0ng." })),
                finalMonth && finalMonth.month !== (firstMonth === null || firstMonth === void 0 ? void 0 : firstMonth.month) && finalMonth.month !== (lastPreferredMonth === null || lastPreferredMonth === void 0 ? void 0 : lastPreferredMonth.month) && finalMonth.month !== (firstFloatingMonth === null || firstFloatingMonth === void 0 ? void 0 : firstFloatingMonth.month) && (React.createElement(PaymentCard, { title: "K\u1EF3 thanh to\u00E1n cu\u1ED1i c\u00F9ng", item: finalMonth, tone: "slate" }))),
            React.createElement("button", { onClick: handleExportExcel, className: "w-full mt-2 py-3 bg-green-100 text-green-700 border-2 border-green-600 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white transition-colors" }, "T\u1EA3i l\u1ECBch tr\u1EA3 n\u1EE3 d\u01B0 n\u1EE3 gi\u1EA3m d\u1EA7n (CSV)")));
    };
    const visibleSalesPolicies = salesPolicies
        .map(normalizeSalesPolicy)
        .filter(policy => policyIntersectsMonth(policy, policyMonthFilter))
        .sort((a, b) => String(b.startDate).localeCompare(String(a.startDate)) || a.name.localeCompare(b.name));
    const renderSettings = () => {
        var _a, _b;
        return (React.createElement("div", { className: "space-y-4 pb-20" },
            React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
                React.createElement("div", { className: "flex items-start justify-between gap-3 mb-3" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-gray-800" }, "\u2601\uFE0F \u0110\u1ED3ng B\u1ED9 Firebase"),
                        React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "Danh sách xe, giá xe, màu + ảnh GitHub dùng chung cho mọi tài khoản. Chính sách, khuyến mãi, phí, thông tin nhân viên và lịch sử vẫn riêng từng tài khoản.")),
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
                    React.createElement("p", { className: "text-[11px] text-gray-500 text-center" }, "Mỗi nhân viên có thể đăng nhập Google riêng; danh sách xe dùng chung vẫn tự đồng bộ giữa các tài khoản."))) : (React.createElement("div", { className: "space-y-3" },
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
                    React.createElement("b", null, "Tên xe, giá xe, màu và đường dẫn ảnh GitHub là dữ liệu dùng chung giữa các tài khoản."),
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
                React.createElement("div", { className: "flex items-start justify-between gap-3 mb-3" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-gray-800" }, "\uD83E\uDDFE Ph\u00ED \u0111\u0103ng k\u00FD & khu v\u1EF1c"),
                        React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "\u1EE8ng d\u1EE5ng t\u1EF1 ch\u1ECDn t\u1EF7 l\u1EC7 tr\u01B0\u1EDBc b\u1EA1 theo lo\u1EA1i \u0111\u1ED9ng c\u01A1 c\u1EE7a xe.")),
                    React.createElement("button", { onClick: handleRestoreDefaultFees, className: "shrink-0 px-2.5 py-1.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-[10px] font-black" }, "Kh\u00F4i ph\u1EE5c m\u1EB7c \u0111\u1ECBnh")),
                React.createElement("div", { className: "grid grid-cols-2 gap-2 mb-3" },
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "Ng\u00E0y \u00E1p d\u1EE5ng chung",
                        React.createElement("input", { type: "date", value: registrationFees.effectiveDate || '', onChange: e => updateRegistrationFee('effectiveDate', e.target.value), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium" })),
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "Ph\u00ED \u0111\u0103ng ki\u1EC3m",
                        React.createElement("input", { type: "text", inputMode: "numeric", value: formatNumber(registrationFees.inspectionFee), onChange: e => updateRegistrationFee('inspectionFee', parseMoney(e.target.value)), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "\u0110\u01B0\u1EDDng b\u1ED9 bi\u1EC3n tr\u1EAFng/th\u00E1ng",
                        React.createElement("input", { type: "text", inputMode: "numeric", value: formatNumber(registrationFees.roadFeeMonthlyWhite), onChange: e => updateRegistrationFee('roadFeeMonthlyWhite', parseMoney(e.target.value)), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "\u0110\u01B0\u1EDDng b\u1ED9 bi\u1EC3n v\u00E0ng/th\u00E1ng",
                        React.createElement("input", { type: "text", inputMode: "numeric", value: formatNumber(registrationFees.roadFeeMonthlyYellow), onChange: e => updateRegistrationFee('roadFeeMonthlyYellow', parseMoney(e.target.value)), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "TNDS xe 5 ch\u1ED7",
                        React.createElement("input", { type: "text", inputMode: "numeric", value: formatNumber(registrationFees.civilInsurance5Seats), onChange: e => updateRegistrationFee('civilInsurance5Seats', parseMoney(e.target.value)), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "TNDS xe 7 ch\u1ED7",
                        React.createElement("input", { type: "text", inputMode: "numeric", value: formatNumber(registrationFees.civilInsurance7Seats), onChange: e => updateRegistrationFee('civilInsurance7Seats', parseMoney(e.target.value)), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" }))),
                React.createElement("div", { className: "border-t border-gray-100 pt-3" },
                    React.createElement("div", { className: "flex items-center justify-between mb-2" },
                        React.createElement("h4", { className: "text-sm font-black text-gray-700" }, "Khu v\u1EF1c \u0111\u0103ng k\u00FD"),
                        React.createElement("span", { className: "text-[10px] font-bold text-gray-500" },
                            registrationFees.locations.length,
                            " khu v\u1EF1c")),
                    React.createElement("div", { className: "space-y-2 max-h-80 overflow-y-auto pr-1" }, registrationFees.locations.map(area => (React.createElement("div", { key: area.id, className: `p-3 rounded-xl border ${editingLocationId === area.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}` },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("div", { className: "min-w-0 flex-1" },
                                React.createElement("div", { className: "font-black text-sm text-gray-800 truncate" }, area.name),
                                React.createElement("div", { className: "text-xs text-blue-700 font-bold mt-0.5" },
                                    "Bi\u1EC3n s\u1ED1: ",
                                    formatVND(area.plateFee)),
                                React.createElement("div", { className: "grid grid-cols-4 gap-1 mt-2" }, Object.entries(ENGINE_TYPES).map(([type, label]) => { var _a; return React.createElement("div", { key: type, className: "bg-white border border-gray-200 rounded-md p-1 text-center" },
                                    React.createElement("div", { className: "text-[8px] uppercase font-black text-gray-400 truncate" }, label),
                                    React.createElement("div", { className: "text-[11px] font-black text-gray-700" },
                                        formatPercentValue((_a = area.taxRates) === null || _a === void 0 ? void 0 : _a[type]),
                                        "%")); })),
                                React.createElement("div", { className: "text-[10px] text-gray-500 mt-1.5" },
                                    "\u00C1p d\u1EE5ng: ",
                                    area.effectiveDate ? new Date(`${area.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN') : 'Chưa đặt')),
                            React.createElement("div", { className: "flex flex-col gap-1.5 shrink-0" },
                                React.createElement("button", { onClick: () => handleStartEditLocation(area), className: "px-2.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold" }, "S\u1EEDa"),
                                React.createElement("button", { onClick: () => handleDeleteLocation(area.id), className: "px-2.5 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold" }, "X\u00F3a")))))))),
                React.createElement("div", { id: "registration-area-editor", className: `mt-4 pt-4 border-t space-y-3 scroll-mt-24 ${editingLocationId ? 'border-blue-300' : 'border-gray-200'}` },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("h4", { className: `font-black text-sm uppercase ${editingLocationId ? 'text-blue-700' : 'text-gray-700'}` }, editingLocationId ? 'Chỉnh sửa khu vực' : 'Thêm khu vực mới'),
                        editingLocationId && React.createElement("span", { className: "text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full" }, "\u0110ANG S\u1EECA")),
                    React.createElement("input", { type: "text", value: newLocationName, onChange: e => setNewLocationName(e.target.value), placeholder: "T\u00EAn khu v\u1EF1c (VD: H\u1EA3i Ph\u00F2ng)", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" }),
                    React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                        React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                            "Ph\u00ED bi\u1EC3n s\u1ED1",
                            React.createElement("input", { type: "text", inputMode: "numeric", value: newLocationPlateFee, onChange: e => formatNumberInput(e, setNewLocationPlateFee), placeholder: "1.000.000", className: "mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                        React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                            "Ng\u00E0y \u00E1p d\u1EE5ng",
                            React.createElement("input", { type: "date", value: newLocationEffectiveDate || '', onChange: e => setNewLocationEffectiveDate(e.target.value), className: "mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" }))),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-black text-gray-600 mb-2" }, "T\u1EF7 l\u1EC7 tr\u01B0\u1EDBc b\u1EA1 theo lo\u1EA1i \u0111\u1ED9ng c\u01A1 (%)"),
                        React.createElement("div", { className: "grid grid-cols-2 gap-2" }, Object.entries(ENGINE_TYPES).map(([type, label]) => React.createElement("label", { key: type, className: "text-xs font-bold text-gray-600" },
                            label,
                            React.createElement("div", { className: "mt-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden" },
                                React.createElement("input", { type: "number", min: "0", max: "100", step: "0.1", value: formatPercentValue(newLocationTaxRates[type]), onChange: e => setNewLocationTaxRates(current => ({ ...current, [type]: Math.max(0, Number(e.target.value) || 0) / 100 })), className: "w-full px-3 py-2 outline-none bg-transparent text-sm" }),
                                React.createElement("span", { className: "px-2 text-gray-500 font-bold" }, "%")))))),
                    React.createElement("div", { className: `grid ${editingLocationId ? 'grid-cols-2' : 'grid-cols-1'} gap-2` },
                        editingLocationId && React.createElement("button", { onClick: resetLocationEditor, className: "py-2.5 bg-white text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm" }, "H\u1EE7y"),
                        React.createElement("button", { onClick: handleSaveLocation, className: "py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm" }, editingLocationId ? 'Lưu khu vực' : '+ Thêm khu vực'))),
                React.createElement("p", { className: "mt-3 text-[10px] text-orange-700 bg-orange-50 border border-orange-100 rounded-lg p-2 leading-relaxed" }, "C\u00E1c m\u1EE9c \u0111ang hi\u1EC3n th\u1ECB l\u00E0 c\u1EA5u h\u00ECnh v\u1EADn h\u00E0nh c\u1EE7a \u1EE9ng d\u1EE5ng. H\u00E3y c\u1EADp nh\u1EADt theo ch\u00EDnh s\u00E1ch th\u1EF1c t\u1EBF tr\u01B0\u1EDBc khi g\u1EEDi b\u00E1o gi\u00E1 cho kh\u00E1ch.")),
            React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
                React.createElement("h3", { className: "font-bold text-gray-800 mb-1" }, "\uD83D\uDE98 Qu\u1EA3n L\u00FD D\u00F2ng Xe & H\u00ECnh \u1EA2nh"),
                React.createElement("p", { className: "text-xs text-gray-500 mb-3" },
                    "Bấm ",
                    React.createElement("b", null, "Sửa"),
                    " để cập nhật xe. ",
                    React.createElement("b", null, "Tên xe, giá, màu và đường dẫn ảnh GitHub sẽ đồng bộ cho tất cả tài khoản."),
                    " Ảnh chọn trực tiếp từ thiết bị vẫn chỉ lưu trên thiết bị đó."),
                React.createElement("div", { className: "space-y-2 mb-4 max-h-80 overflow-y-auto pr-1" }, cars.map(c => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    return (React.createElement("div", { key: c.id, className: `p-2.5 rounded-xl border text-sm ${editingCarId === c.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}` },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("div", { className: "relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center" },
                                React.createElement(CarSilhouette, { className: "w-14 text-slate-200" }),
                                (((_b = (_a = c.colors) === null || _a === void 0 ? void 0 : _a.find(color => color.id === c.defaultColorId)) === null || _b === void 0 ? void 0 : _b.imagePath) || ((_d = (_c = c.colors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.imagePath) || carImageMap[c.id] || c.imagePath) && (React.createElement("img", { src: ((_f = (_e = c.colors) === null || _e === void 0 ? void 0 : _e.find(color => color.id === c.defaultColorId)) === null || _f === void 0 ? void 0 : _f.imagePath) || ((_h = (_g = c.colors) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.imagePath) || carImageMap[c.id] || c.imagePath, crossOrigin: "anonymous", alt: c.name, className: "absolute inset-0 w-full h-full object-contain p-1 bg-white", onError: e => { e.currentTarget.style.display = 'none'; } }))),
                            React.createElement("div", { className: "min-w-0 flex-1" },
                                React.createElement("div", { className: "font-bold text-gray-800 truncate" }, c.name),
                                React.createElement("div", { className: "text-blue-600 font-semibold" }, formatVND(c.price)),
                                React.createElement("div", { className: "text-[11px] text-gray-500 mt-0.5" },
                                    Number(c.seats) || 5,
                                    " ch\u1ED7 \u00B7 ",
                                    ENGINE_TYPES[c.engineType] || 'Xăng',
                                    " \u00B7 ",
                                    (c.colors || []).length,
                                    " m\u00E0u \u00B7 ",
                                    carImageMap[c.id] ? 'Có ảnh riêng' : 'Ảnh GitHub')),
                            React.createElement("div", { className: "flex flex-col gap-1.5 shrink-0" },
                                React.createElement("button", { onClick: () => handleStartEditCar(c), className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs" }, "S\u1EEDa"),
                                React.createElement("button", { onClick: () => handleDeleteCar(c.id), className: "px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-bold text-xs" }, "X\u00F3a")))));
                })),
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
                        React.createElement("label", { className: "block text-xs font-bold text-gray-600 mb-1" }, "Lo\u1EA1i \u0111\u1ED9ng c\u01A1 \u2014 d\u00F9ng \u0111\u1EC3 t\u1EF1 ch\u1ECDn m\u1EE9c tr\u01B0\u1EDBc b\u1EA1"),
                        React.createElement("select", { value: newCarEngineType, onChange: e => setNewCarEngineType(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" }, Object.entries(ENGINE_TYPES).map(([value, label]) => React.createElement("option", { key: value, value: value }, label)))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-gray-600 mb-1" }, "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh d\u1EF1 ph\u00F2ng"),
                        React.createElement("input", { type: "text", placeholder: "./assets/cars/Ex2/ex2-moon-white.png", value: newCarImagePath, onChange: e => setNewCarImagePath(e.target.value), className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" })),
                    React.createElement("div", { className: "rounded-xl border border-blue-100 bg-blue-50 p-3 space-y-3" },
                        React.createElement("div", { className: "flex items-center justify-between gap-3" },
                            React.createElement("div", null,
                                React.createElement("h5", { className: "text-xs font-black uppercase text-blue-900" }, "M\u00E0u xe & \u1EA3nh GitHub"),
                                React.createElement("p", { className: "text-[10px] text-blue-700 mt-0.5" }, "Danh sách màu này là dữ liệu dùng chung V2.7; ảnh được đọc trực tiếp từ GitHub Pages.")),
                            React.createElement("div", { className: "flex gap-1.5 shrink-0" },
                                DEFAULT_CAR_COLOR_GROUPS[editingCarId] && React.createElement("button", { type: "button", onClick: loadDefaultEditorColors, className: "px-2.5 py-2 bg-white text-blue-700 border border-blue-300 rounded-lg text-[10px] font-bold" }, "N\u1EA1p m\u00E0u chu\u1EA9n"),
                                React.createElement("button", { type: "button", onClick: addEditorColor, className: "px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold" }, "+ Th\u00EAm m\u00E0u"))),
                        newCarColors.length === 0 && React.createElement("div", { className: "text-xs text-gray-500 bg-white border border-dashed rounded-lg p-3 text-center" }, "Ch\u01B0a c\u00F3 m\u00E0u xe. Nh\u1EA5n \u201CTh\u00EAm m\u00E0u\u201D \u0111\u1EC3 t\u1EA1o danh s\u00E1ch."),
                        React.createElement("div", { className: "space-y-2" }, newCarColors.map((color, index) => (React.createElement("div", { key: `${color.id}-${index}`, className: "bg-white border border-gray-200 rounded-xl p-2.5" },
                            React.createElement("div", { className: "flex gap-2 items-center" },
                                React.createElement("input", { type: "radio", name: "default-car-color", checked: newCarDefaultColorId === color.id, onChange: () => setNewCarDefaultColorId(color.id), title: "\u0110\u1EB7t l\u00E0m m\u00E0u m\u1EB7c \u0111\u1ECBnh", className: "w-4 h-4" }),
                                React.createElement("input", { type: "text", value: color.name, onChange: e => updateEditorColor(index, 'name', e.target.value), placeholder: "T\u00EAn m\u00E0u", className: "flex-1 min-w-0 px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" }),
                                React.createElement("button", { type: "button", onClick: () => removeEditorColor(index), className: "px-2.5 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold" }, "X\u00F3a")),
                            React.createElement("input", { type: "text", value: color.imagePath, onChange: e => updateEditorColor(index, 'imagePath', e.target.value), placeholder: "./assets/cars/TenThuMuc/ten-anh.png", className: "w-full mt-2 px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[11px]" }),
                            color.imagePath && React.createElement("div", { className: "mt-2 h-20 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center" },
                                React.createElement("img", { src: color.imagePath, alt: color.name || 'Màu xe', className: "w-full h-full object-contain p-1", onError: e => { e.currentTarget.style.opacity = '0.15'; } })))))),
                        React.createElement("p", { className: "text-[10px] text-gray-500" }, "N\u00FAt tr\u00F2n b\u00EAn tr\u00E1i d\u00F9ng \u0111\u1EC3 ch\u1ECDn m\u00E0u m\u1EB7c \u0111\u1ECBnh khi m\u1EDF d\u00F2ng xe.")),
                    React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                        React.createElement("label", { className: `w-full py-2.5 rounded-lg font-bold text-sm text-center cursor-pointer border-2 transition-colors ${isProcessingCarImage ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none' : 'bg-green-50 text-green-700 border-green-500 hover:bg-green-100'}` },
                            React.createElement("input", { type: "file", accept: "image/*", onChange: handleCarImageFileChange, className: "hidden", disabled: isProcessingCarImage }),
                            isProcessingCarImage ? 'Đang xử lý ảnh...' : 'Chọn ảnh riêng trên máy'),
                        React.createElement("button", { type: "button", onClick: () => setNewCarImage(''), disabled: !newCarImage || isProcessingCarImage, className: "w-full py-2.5 bg-gray-100 text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm disabled:opacity-40" }, "B\u1ECF \u1EA3nh c\u1EE5c b\u1ED9")),
                    React.createElement("p", { className: "text-[11px] text-gray-500 leading-relaxed" }, "\u0110\u01B0\u1EDDng d\u1EABn GitHub \u0111\u01B0\u1EE3c \u0111\u1ED3ng b\u1ED9 tr\u00EAn m\u1ECDi thi\u1EBFt b\u1ECB. \u1EA2nh ch\u1ECDn tr\u1EF1c ti\u1EBFp \u0111\u01B0\u1EE3c n\u00E9n v\u00E0 l\u01B0u trong IndexedDB, kh\u00F4ng l\u00E0m \u0111\u1EA7y localStorage."),
                    React.createElement("div", { className: "relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center" },
                        React.createElement(CarSilhouette, { className: "w-44 text-slate-200" }),
                        (newCarImage || ((_a = newCarColors.find(color => color.id === newCarDefaultColorId)) === null || _a === void 0 ? void 0 : _a.imagePath) || newCarImagePath) && (React.createElement("img", { src: newCarImage || ((_b = newCarColors.find(color => color.id === newCarDefaultColorId)) === null || _b === void 0 ? void 0 : _b.imagePath) || newCarImagePath, crossOrigin: "anonymous", alt: "Xem tr\u01B0\u1EDBc \u1EA3nh xe", className: "absolute inset-0 w-full h-full object-contain p-3 bg-white", onError: e => { e.currentTarget.style.display = 'none'; } })),
                        React.createElement("span", { className: "absolute bottom-2 right-2 text-[10px] font-bold bg-white/90 text-gray-500 px-2 py-1 rounded-md border" }, newCarImage ? 'ẢNH CỤC BỘ' : (newCarColors.length ? 'MÀU MẶC ĐỊNH' : 'ẢNH GITHUB'))),
                    React.createElement("div", { className: `grid ${editingCarId ? 'grid-cols-2' : 'grid-cols-1'} gap-2` },
                        editingCarId && (React.createElement("button", { onClick: resetCarEditor, className: "w-full py-2.5 bg-white text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm" }, "H\u1EE7y ch\u1EC9nh s\u1EEDa")),
                        React.createElement("button", { onClick: handleSaveCar, disabled: isProcessingCarImage, className: "w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm disabled:opacity-50" }, editingCarId ? 'Lưu thay đổi' : '+ Thêm xe')))),
            React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
                React.createElement("div", { className: "flex items-start justify-between gap-3 mb-3" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-gray-800" }, "\uD83D\uDCC5 Ch\u00EDnh S\u00E1ch B\u00E1n H\u00E0ng"),
                        React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "Qu\u1EA3n l\u00FD theo th\u1EDDi gian hi\u1EC7u l\u1EF1c, \u00E1p d\u1EE5ng cho nhi\u1EC1u phi\u00EAn b\u1EA3n xe v\u00E0 t\u1EF1 \u0111\u1ED9ng \u0111\u01B0a v\u00E0o b\u00E1o gi\u00E1.")),
                    React.createElement("span", { className: "shrink-0 text-[10px] font-black px-2 py-1 rounded-full bg-blue-100 text-blue-700" },
                        salesPolicies.length,
                        " CS")),
                React.createElement("div", { className: "grid grid-cols-[1fr_auto] gap-2 mb-3" },
                    React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                        "Th\u00E1ng xem ch\u00EDnh s\u00E1ch",
                        React.createElement("input", { type: "month", value: policyMonthFilter, onChange: e => setPolicyMonthFilter(e.target.value), className: "mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                    React.createElement("button", { type: "button", onClick: () => startNewSalesPolicyForMonth(policyMonthFilter), className: "policy-create-button px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-bold text-xs" }, "+ T\u1EA1o m\u1EDBi")),
                React.createElement("div", { className: "space-y-2 max-h-80 overflow-y-auto pr-1 mb-4" }, visibleSalesPolicies.length === 0 ? (React.createElement("div", { className: "p-4 text-center text-xs text-gray-500 bg-gray-50 border border-dashed rounded-xl" }, "Ch\u01B0a c\u00F3 ch\u00EDnh s\u00E1ch trong th\u00E1ng \u0111\u00E3 ch\u1ECDn.")) : visibleSalesPolicies.map(policy => {
                    const status = getSalesPolicyStatus(policy);
                    const statusClass = status === 'active' ? 'bg-green-100 text-green-700' : status === 'upcoming' ? 'bg-blue-100 text-blue-700' : status === 'expired' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700';
                    const carNames = policy.carIds.map(id => { var _a; return (_a = cars.find(carItem => carItem.id === id)) === null || _a === void 0 ? void 0 : _a.name; }).filter(Boolean);
                    return (React.createElement("div", { key: policy.id, className: "p-3 bg-slate-50 border border-slate-200 rounded-xl" },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("div", { className: "flex flex-wrap items-center gap-1.5" },
                                    React.createElement("p", { className: "font-black text-sm text-slate-900" }, policy.name),
                                    React.createElement("span", { className: `text-[9px] font-black px-2 py-0.5 rounded-full ${statusClass}` }, POLICY_STATUS_LABELS[status])),
                                React.createElement("p", { className: "text-[10px] text-gray-500 mt-1" },
                                    new Date(`${policy.startDate}T00:00:00`).toLocaleDateString('vi-VN'),
                                    " \u2192 ",
                                    new Date(`${policy.endDate}T00:00:00`).toLocaleDateString('vi-VN')),
                                React.createElement("p", { className: "text-[10px] text-blue-700 mt-1 line-clamp-2" }, carNames.join(' · ') || 'Chưa chọn xe'),
                                React.createElement("p", { className: "text-[10px] text-gray-600 mt-1" },
                                    policy.benefits.length,
                                    " quy\u1EC1n l\u1EE3i \u00B7 ",
                                    policy.benefits.filter(item => item.deductFromPrice).reduce((sum, item) => sum + parseMoney(item.value), 0) > 0 ? `Giảm tối đa ${formatVND(policy.benefits.filter(item => item.deductFromPrice).reduce((sum, item) => sum + parseMoney(item.value), 0))}` : 'Không có khoản giảm trực tiếp'))),
                        React.createElement("div", { className: "grid grid-cols-3 gap-1.5 mt-2" },
                            React.createElement("button", { type: "button", onClick: () => handleStartEditSalesPolicy(policy), className: "py-2 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold text-[10px]" }, "S\u1EEDa"),
                            React.createElement("button", { type: "button", onClick: () => handleCloneSalesPolicy(policy), className: "py-2 bg-white border border-green-200 text-green-700 rounded-lg font-bold text-[10px]" }, "Nh\u00E2n b\u1EA3n +1 th\u00E1ng"),
                            React.createElement("button", { type: "button", onClick: () => handleDeleteSalesPolicy(policy.id), className: "py-2 bg-white border border-red-200 text-red-600 rounded-lg font-bold text-[10px]" }, "X\u00F3a"))));
                })),
                React.createElement("div", { id: "sales-policy-editor", className: "pt-4 border-t border-gray-200 space-y-3" },
                    React.createElement("div", { className: "flex items-center justify-between gap-3" },
                        React.createElement("h4", { className: "font-black text-blue-950" }, editingPolicyId ? 'Chỉnh sửa chính sách' : 'Tạo chính sách mới'),
                        editingPolicyId && React.createElement("button", { type: "button", onClick: resetSalesPolicyEditor, className: "text-xs font-bold text-gray-500" }, "H\u1EE7y")),
                    React.createElement("input", { type: "text", value: policyDraft.name, onChange: e => setPolicyDraft(current => ({ ...current, name: e.target.value })), placeholder: "VD: Ch\u00EDnh s\u00E1ch b\u00E1n h\u00E0ng th\u00E1ng 08/2026", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold" }),
                    React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                        React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                            "T\u1EEB ng\u00E0y",
                            React.createElement("input", { type: "date", value: policyDraft.startDate, onChange: e => setPolicyDraft(current => ({ ...current, startDate: e.target.value })), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" })),
                        React.createElement("label", { className: "text-xs font-bold text-gray-600" },
                            "\u0110\u1EBFn ng\u00E0y",
                            React.createElement("input", { type: "date", value: policyDraft.endDate, onChange: e => setPolicyDraft(current => ({ ...current, endDate: e.target.value })), className: "mt-1 w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" }))),
                    React.createElement("label", { className: "flex items-center gap-2 p-2.5 bg-green-50 border border-green-100 rounded-lg text-xs font-bold text-green-800" },
                        React.createElement("input", { type: "checkbox", checked: policyDraft.enabled, onChange: e => setPolicyDraft(current => ({ ...current, enabled: e.target.checked })), className: "w-4 h-4" }),
                        "B\u1EADt ch\u00EDnh s\u00E1ch n\u00E0y"),
                    React.createElement("div", { className: "p-3 rounded-xl bg-blue-50 border border-blue-100" },
                        React.createElement("p", { className: "text-xs font-black text-blue-950 mb-2" }, "\u00C1p d\u1EE5ng cho c\u00E1c phi\u00EAn b\u1EA3n"),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-52 overflow-y-auto" }, cars.map(carItem => React.createElement("label", { key: carItem.id, className: `flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer ${policyDraft.carIds.includes(carItem.id) ? 'bg-white border-blue-300 text-blue-900' : 'bg-blue-50 border-blue-100 text-gray-600'}` },
                            React.createElement("input", { type: "checkbox", checked: policyDraft.carIds.includes(carItem.id), onChange: () => togglePolicyCar(carItem.id), className: "w-4 h-4" }),
                            React.createElement("span", { className: "font-semibold" }, carItem.name))))),
                    React.createElement("div", { className: "p-3 rounded-xl bg-amber-50 border border-amber-100 space-y-2" },
                        React.createElement("div", { className: "flex items-center justify-between gap-2" },
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-xs font-black text-amber-950" }, "Quy\u1EC1n l\u1EE3i / \u01B0u \u0111\u00E3i"),
                                React.createElement("p", { className: "text-[10px] text-amber-700" }, "C\u00F9ng m\u1ED9t \u201CNh\u00F3m ch\u1ECDn 1\u201D s\u1EBD lo\u1EA1i tr\u1EEB l\u1EABn nhau khi b\u00E1o gi\u00E1.")),
                            React.createElement("button", { type: "button", onClick: addPolicyBenefit, className: "px-3 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold" }, "+ Quy\u1EC1n l\u1EE3i")),
                        policyDraft.benefits.length === 0 && React.createElement("div", { className: "text-xs text-gray-500 bg-white border border-dashed rounded-lg p-3 text-center" }, "Ch\u01B0a c\u00F3 quy\u1EC1n l\u1EE3i n\u00E0o."),
                        policyDraft.benefits.map((benefit, index) => (React.createElement("div", { key: benefit.id || index, className: "bg-white border border-amber-200 rounded-xl p-2.5 space-y-2" },
                            React.createElement("div", { className: "grid grid-cols-[120px_1fr_auto] gap-2" },
                                React.createElement("select", { value: benefit.type, onChange: e => updatePolicyBenefit(index, 'type', e.target.value), className: "px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[11px]" }, Object.entries(PROMOTION_TYPES).map(([value, label]) => React.createElement("option", { key: value, value: value }, label))),
                                React.createElement("input", { type: "text", value: benefit.name, onChange: e => updatePolicyBenefit(index, 'name', e.target.value), placeholder: "T\u00EAn quy\u1EC1n l\u1EE3i", className: "min-w-0 px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" }),
                                React.createElement("button", { type: "button", onClick: () => removePolicyBenefit(index), className: "px-2.5 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] font-bold" }, "X\u00F3a")),
                            React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                                React.createElement("input", { type: "text", inputMode: "numeric", value: benefit.value ? formatNumber(benefit.value) : '', onChange: e => updatePolicyBenefit(index, 'value', parseMoney(e.target.value)), placeholder: "Gi\u00E1 tr\u1ECB VN\u0110 (n\u1EBFu c\u00F3)", className: "px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" }),
                                React.createElement("input", { type: "text", value: benefit.choiceGroup || '', onChange: e => updatePolicyBenefit(index, 'choiceGroup', e.target.value), placeholder: "Nh\u00F3m ch\u1ECDn 1 (VD: sac-hoac-tien)", className: "px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" })),
                            React.createElement("div", { className: "grid grid-cols-3 gap-1.5 text-[10px] font-bold" },
                                React.createElement("label", { className: `flex items-center gap-1.5 p-2 rounded-lg border ${benefit.deductFromPrice ? 'bg-red-50 border-red-200 text-red-700' : 'bg-gray-50 border-gray-200 text-gray-600'}` },
                                    React.createElement("input", { type: "checkbox", checked: benefit.deductFromPrice, onChange: e => updatePolicyBenefit(index, 'deductFromPrice', e.target.checked) }),
                                    "Tr\u1EEB v\u00E0o gi\u00E1"),
                                React.createElement("label", { className: `flex items-center gap-1.5 p-2 rounded-lg border ${benefit.defaultSelected ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600'}` },
                                    React.createElement("input", { type: "checkbox", checked: benefit.defaultSelected, onChange: e => updatePolicyBenefit(index, 'defaultSelected', e.target.checked), disabled: benefit.required }),
                                    "M\u1EB7c \u0111\u1ECBnh"),
                                React.createElement("label", { className: `flex items-center gap-1.5 p-2 rounded-lg border ${benefit.required ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'}` },
                                    React.createElement("input", { type: "checkbox", checked: benefit.required, onChange: e => updatePolicyBenefit(index, 'required', e.target.checked) }),
                                    "B\u1EAFt bu\u1ED9c")))))),
                    React.createElement("textarea", { value: policyDraft.note, onChange: e => setPolicyDraft(current => ({ ...current, note: e.target.value })), placeholder: "Ghi ch\u00FA ch\u00EDnh s\u00E1ch, \u0111i\u1EC1u ki\u1EC7n \u00E1p d\u1EE5ng...", className: "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm min-h-20" }),
                    React.createElement("button", { type: "button", onClick: handleSaveSalesPolicy, className: "w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-sm" }, editingPolicyId ? 'Lưu thay đổi chính sách' : '+ Thêm chính sách bán hàng'))),
            React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-gray-100" },
                React.createElement("h3", { className: "font-bold text-gray-800 mb-3" }, "\uD83C\uDF81 Qu\u1EA3n L\u00FD Khuy\u1EBFn M\u00E3i B\u1ED5 Sung"),
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
    };
    const renderHistory = () => {
        const keyword = historySearch.trim().toLowerCase();
        const items = quotations.filter(item => {
            var _a;
            return !keyword || [
                item.id, item.customerName, item.customerPhone, item.carName,
                ...(((_a = item.salesPolicySnapshot) === null || _a === void 0 ? void 0 : _a.policies) || []).map(policy => policy.name)
            ].some(value => String(value || '').toLowerCase().includes(keyword));
        });
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
                React.createElement("p", { className: "text-xs mt-1" }, "L\u01B0u b\u00E1o gi\u00E1 t\u1EA1i tab B\u00E1o Gi\u00E1 \u0111\u1EC3 theo d\u00F5i kh\u00E1ch h\u00E0ng."))) : items.map(item => {
                var _a, _b;
                return (React.createElement("div", { key: item.id, className: "bg-white p-4 rounded-xl border border-gray-100 shadow-sm" },
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
                    ((_b = (_a = item.salesPolicySnapshot) === null || _a === void 0 ? void 0 : _a.policies) === null || _b === void 0 ? void 0 : _b.length) > 0 && React.createElement("div", { className: "mt-2 p-2 bg-blue-50 border border-blue-100 rounded-lg" },
                        React.createElement("p", { className: "text-[10px] font-black text-blue-700 uppercase" }, "Ch\u00EDnh s\u00E1ch \u0111\u00E3 ch\u1ED1t"),
                        React.createElement("p", { className: "text-xs font-semibold text-blue-900 mt-0.5 line-clamp-2" }, item.salesPolicySnapshot.policies.map(policy => policy.name).join(' · '))),
                    item.notes && React.createElement("p", { className: "mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg line-clamp-2" }, item.notes),
                    React.createElement("div", { className: "grid grid-cols-3 gap-2 mt-3" },
                        React.createElement("button", { onClick: () => handleLoadQuotation(item), className: "py-2 bg-blue-600 text-white rounded-lg font-bold text-xs" }, "M\u1EDF l\u1EA1i"),
                        React.createElement("button", { onClick: () => { handleLoadQuotation(item); setCurrentQuoteId(createQuoteId()); }, className: "py-2 bg-green-50 border border-green-300 text-green-700 rounded-lg font-bold text-xs" }, "Nh\u00E2n b\u1EA3n"),
                        React.createElement("button", { onClick: () => handleDeleteQuotation(item.id), className: "py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg font-bold text-xs" }, "X\u00F3a"))));
            })));
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
                            React.createElement("p", { className: "text-slate-700 font-medium mt-1" },
                                "\u0110\u1ED9ng c\u01A1: ",
                                ENGINE_TYPES[car.engineType] || 'Xăng'),
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
                            calculations.selectedPolicyBenefits.length > 0 && (React.createElement("tr", { className: "border-b border-blue-200 border-dashed bg-blue-50/60" },
                                React.createElement("td", { className: "p-3 text-blue-800" },
                                    React.createElement("span", { className: "font-black" }, "Ch\u00EDnh s\u00E1ch b\u00E1n h\u00E0ng"),
                                    calculations.effectivePolicyNames.length > 0 && React.createElement("div", { className: "text-[10px] font-bold text-blue-600 mt-0.5" }, calculations.effectivePolicyNames.join(' · ')),
                                    React.createElement("ul", { className: "text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600" }, calculations.selectedPolicyBenefits.map(p => React.createElement("li", { key: p.key || p.id },
                                        React.createElement("b", null,
                                            PROMOTION_TYPES[p.type] || 'Quyền lợi',
                                            ":"),
                                        " ",
                                        p.name,
                                        p.value > 0 ? ` (${p.deductFromPrice ? '-' : 'giá trị '}${formatVND(p.value)})` : '')))),
                                React.createElement("td", { className: "p-3 text-right font-bold text-blue-700 align-top" }, calculations.policyDiscountValue > 0 ? `-${formatVND(calculations.policyDiscountValue)}` : 'Theo chương trình'))),
                            (calculations.selectedPromotions.length > 0 || parseMoney(discount) > 0) && (React.createElement("tr", { className: "border-b border-slate-200 border-dashed bg-red-50/50" },
                                React.createElement("td", { className: "p-3 text-red-600" },
                                    React.createElement("span", { className: "font-bold" }, "\u01AFu \u0111\u00E3i b\u1ED5 sung / gi\u1EA3m th\u00EAm"),
                                    React.createElement("ul", { className: "text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600" },
                                        calculations.selectedPromotions.filter(p => p.deductFromPrice).map(p => React.createElement("li", { key: p.id }, p.name)),
                                        calculations.giftPromotions.map(p => React.createElement("li", { key: p.id },
                                            p.name,
                                            p.value > 0 ? ` (giá trị ${formatVND(p.value)})` : '')),
                                        parseMoney(discount) > 0 && React.createElement("li", null,
                                            "Gi\u1EA3m ti\u1EC1n m\u1EB7t b\u1ED5 sung: ",
                                            formatVND(parseMoney(discount))))),
                                React.createElement("td", { className: "p-3 text-right font-bold text-red-600 align-top" }, calculations.manualPromoValue + parseMoney(discount) > 0 ? `-${formatVND(calculations.manualPromoValue + parseMoney(discount))}` : 'Không trừ giá'))),
                            calculations.discountAmount > 0 && (React.createElement("tr", { className: "border-b border-red-200 bg-red-50" },
                                React.createElement("td", { className: "p-3 font-black text-red-700" }, "T\u1ED5ng gi\u1EA3m gi\u00E1 tr\u1EF1c ti\u1EBFp"),
                                React.createElement("td", { className: "p-3 text-right font-black text-red-700" },
                                    "-",
                                    formatVND(calculations.discountAmount)))),
                            React.createElement("tr", { className: "border-b-2 border-blue-200 bg-blue-50/50" },
                                React.createElement("td", { className: "p-3 font-bold text-blue-900" }, "Gi\u00E1 xe d\u1EF1 ki\u1EBFn sau gi\u1EA3m tr\u1EEB"),
                                React.createElement("td", { className: "p-3 text-right font-black text-blue-900 text-lg" }, formatVND(calculations.price - calculations.discountAmount))),
                            React.createElement("tr", { className: "bg-slate-100 border-b border-slate-300" },
                                React.createElement("td", { className: "p-3 font-black text-slate-800 uppercase mt-4 block border-none" },
                                    "2. Chi ph\u00ED \u0111\u0103ng k\u00FD (T\u1EA1m t\u00EDnh t\u1EA1i ",
                                    location.name,
                                    ")"),
                                React.createElement("td", { className: "p-3 text-right text-[10px] font-bold text-slate-500" },
                                    "\u00C1p d\u1EE5ng ",
                                    calculations.effectiveDate ? new Date(`${calculations.effectiveDate}T00:00:00`).toLocaleDateString('vi-VN') : '')),
                            React.createElement("tr", { className: "border-b border-slate-200 border-dashed" },
                                React.createElement("td", { className: "p-2.5 text-slate-700 pl-4" },
                                    "L\u1EC7 ph\u00ED tr\u01B0\u1EDBc b\u1EA1 (",
                                    formatPercentValue(calculations.taxRate),
                                    "% \u00B7 ",
                                    ENGINE_TYPES[calculations.engineType],
                                    ")"),
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
                    loanCalculations && loanCalculations.loanAmount > 0 && (React.createElement("div", { className: "border-l-4 border-yellow-400 bg-yellow-50/50 p-4 mb-8 rounded-r-lg" },
                        React.createElement("p", { className: "text-slate-700 mb-1" },
                            "D\u1EF1 ki\u1EBFn v\u1ED1n kh\u00E1ch c\u1EA7n chu\u1EA9n b\u1ECB ",
                            React.createElement("span", { className: "font-bold text-sm" },
                                "(Vay ",
                                formatVND(loanCalculations.loanAmount),
                                " \u00B7 ",
                                loanCalculations.loanPercent.toFixed(2),
                                "% gi\u00E1 xe)"),
                            ":"),
                        React.createElement("p", { className: "font-black text-2xl text-yellow-600 mb-1" }, formatVND(loanCalculations.upfrontPayment)),
                        React.createElement("p", { className: "text-xs text-slate-500 italic" }, "Bao g\u1ED3m ph\u1EA7n gi\u00E1 xe kh\u00F4ng vay v\u00E0 c\u00E1c chi ph\u00ED l\u0103n b\u00E1nh. Kho\u1EA3n vay th\u1EF1c t\u1EBF ph\u1EE5 thu\u1ED9c ph\u00EA duy\u1EC7t c\u1EE7a ng\u00E2n h\u00E0ng."))),
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
                React.createElement("span", { className: "text-[9px] align-top text-blue-600" }, "PWA 2.7"))),
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
