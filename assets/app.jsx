const { useState, useMemo, useEffect, useRef } = React;

        const DEFAULT_CAR_MODELS = [
          { id: 'ex2_pro', name: 'Geely EX2 Pro', price: 459000000, seats: 5, image: '' },
          { id: 'ex2_max', name: 'Geely EX2 Max', price: 499000000, seats: 5, image: '' },
          { id: 'ex5_pro', name: 'Geely EX5 Pro', price: 839000000, seats: 5, image: '' },
          { id: 'ex5_max', name: 'Geely EX5 Max', price: 889000000, seats: 5, image: '' },
          { id: 'ex5_emi_pro', name: 'Geely EX5 EM-i Pro', price: 789000000, seats: 5, image: '' },
          { id: 'ex5_emi_max', name: 'Geely EX5 EM-i Max', price: 909000000, seats: 5, image: '' },
          { id: 'monjaro_premium', name: 'Geely Monjaro Premium', price: 1149000000, seats: 5, image: '' },
          { id: 'monjaro_flagship', name: 'Geely Monjaro Flagship', price: 1199000000, seats: 5, image: '' },
          { id: 'coolray_exec_26', name: 'Geely Coolray New 2026 Executive', price: 499000000, seats: 5, image: '' },
          { id: 'coolray_prem_26', name: 'Geely Coolray New 2026 Premium', price: 549000000, seats: 5, image: '' },
          { id: 'coolray_flag_26', name: 'Geely Coolray New 2026 Flagship', price: 599000000, seats: 5, image: '' },
          { id: 'okavango_exec', name: 'Geely Okavango Executive', price: 739000000, seats: 7, image: '' },
          { id: 'okavango_prem', name: 'Geely Okavango Premium', price: 799000000, seats: 7, image: '' },
        ];

        const DEFAULT_PROMOTIONS = [
          { id: 'p1', name: '01 sạc cầm tay', value: 0 },
          { id: 'p2', name: '01 gói cứu hộ miễn phí 5 năm', value: 0 },
          { id: 'p3', name: '01 gói bảo dưỡng miễn phí 5 năm', value: 0 },
          { id: 'p4', name: '10 triệu tiền mặt', value: 10000000 },
          { id: 'p5', name: '06 năm bảo dưỡng miễn phí', value: 0 },
          { id: 'p6', name: '01 năm bảo hiểm thân vỏ', value: 0 },
          { id: 'p7', name: '06 năm cứu hộ miễn phí', value: 0 },
          { id: 'p8', name: '01 bộ thảm sàn chính hãng', value: 0 },
          { id: 'p9', name: '01 bộ sạc 7 kw (quy đổi 5tr TM)', value: 5000000 },
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

        function GeelyQuotationApp() {
          const [cars, setCars] = useState(() => getSavedData('geely_cars_v8', DEFAULT_CAR_MODELS));
          const [promotions, setPromotions] = useState(() => getSavedData('geely_promotions_v2', DEFAULT_PROMOTIONS));
          const [salesInfo, setSalesInfo] = useState(() => getSavedData('geely_sales_info', { name: '', phone: '' }));
          const [serviceFeeAmount, setServiceFeeAmount] = useState(() => parseMoney(getSavedData('geely_service_fee', 2500000))); 
          const [physicalInsuranceRate, setPhysicalInsuranceRate] = useState(() => Number(getSavedData('geely_phys_ins_rate', 1.2)) || 0);

          useEffect(() => { saveData('geely_cars_v8', cars); }, [cars]);
          useEffect(() => { saveData('geely_promotions_v2', promotions); }, [promotions]);
          useEffect(() => { saveData('geely_sales_info', salesInfo); }, [salesInfo]);
          useEffect(() => { saveData('geely_service_fee', serviceFeeAmount); }, [serviceFeeAmount]);
          useEffect(() => { saveData('geely_phys_ins_rate', physicalInsuranceRate); }, [physicalInsuranceRate]);

          const [customerName, setCustomerName] = useState('');
          const [customerPhone, setCustomerPhone] = useState('');
          const [carColor, setCarColor] = useState('');

          const [selectedCarId, setSelectedCarId] = useState(cars[0]?.id || '');
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
              return ['input', 'loan', 'preview', 'settings'].includes(requestedTab) ? requestedTab : 'input';
            } catch (error) {
              return 'input';
            }
          }); 
          const [toastMessage, setToastMessage] = useState('');

          const [newCarName, setNewCarName] = useState('');
          const [newCarPrice, setNewCarPrice] = useState('');
          const [newCarSeats, setNewCarSeats] = useState(5);
          const [newCarImage, setNewCarImage] = useState('');
          const [editingCarId, setEditingCarId] = useState(null);
          const [isProcessingCarImage, setIsProcessingCarImage] = useState(false);
          
          const [newPromoName, setNewPromoName] = useState('');
          const [newPromoValue, setNewPromoValue] = useState('');

          const [loanParams, setLoanParams] = useState({
            downPaymentPercent: 20, loanTermYears: 5, fixedInterestRate: 8.0, fixedTermMonths: 12, floatingInterestRate: 11.5 
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
            const randomCode = Math.floor(10000 + Math.random() * 90000);
            return { date: dateStr, validUntil: validDate, code: `BG-HD${randomCode}` };
          }, []);

          const car = useMemo(() => cars.find(c => c.id === selectedCarId) || cars[0], [selectedCarId, cars]);
          const location = useMemo(() => LOCATIONS.find(l => l.id === selectedLocationId) || LOCATIONS[0], [selectedLocationId]);

          const calculations = useMemo(() => {
            if (!car || !location) return null;
            const price = parseMoney(car.price);
            const taxFee = price * location.taxRate;
            const plateFee = location.plateFee;
            const inspectionFee = FIXED_FEES.inspection;
            const roadFeePerMonth = plateColor === 'white' ? 130000 : 180000;
            const roadFee = roadFeePerMonth * 12 * roadFeeYears;

            let civilInsurance = 0;
            if (tndsOption === 'auto') {
              civilInsurance = car.seats <= 5 ? FIXED_FEES.civilInsurance5Seats : FIXED_FEES.civilInsurance7Seats;
            } else if (tndsOption === '5_seats') {
              civilInsurance = FIXED_FEES.civilInsurance5Seats;
            } else {
              civilInsurance = FIXED_FEES.civilInsurance7Seats;
            }
            
            const physicalInsuranceFee = includePhysicalInsurance ? price * (physicalInsuranceRate / 100) : 0;
            const serviceFee = includeServiceFee ? parseMoney(serviceFeeAmount) : 0;
            
            const promoValue = selectedPromoIds.reduce((sum, id) => {
              const p = promotions.find(promo => promo.id === id);
              return sum + (p ? parseMoney(p.value) : 0);
            }, 0);
            
            const manualDiscount = parseMoney(discount);
            const discountAmount = promoValue + manualDiscount;

            const totalRollingCost = taxFee + plateFee + inspectionFee + roadFee + civilInsurance + physicalInsuranceFee + serviceFee;
            const finalAmount = price - discountAmount + totalRollingCost;

            return {
              price, taxFee, plateFee, inspectionFee, roadFee, civilInsurance,
              physicalInsuranceFee, serviceFee, discountAmount, totalRollingCost, finalAmount, roadFeeYears
            };
          }, [car, location, discount, includePhysicalInsurance, includeServiceFee, selectedPromoIds, promotions, plateColor, roadFeeYears, tndsOption, serviceFeeAmount, physicalInsuranceRate]);

          const loanCalculations = useMemo(() => {
            if (!calculations) return null;
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
          
          const handleDiscountChange = (e) => {
            const value = parseMoney(e.target.value);
            setDiscount(value ? formatNumber(value) : '');
          };
          
          const formatNumberInput = (e, setter) => {
            const value = parseMoney(e.target.value);
            setter(value ? formatNumber(value) : '');
          };

          const handleExportExcel = () => { 
              if (!loanCalculations || !calculations) return;
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
            setNewCarImage(carToEdit.image || '');

            setTimeout(() => {
              document.getElementById('car-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
          };

          const handleSaveCar = () => {
            if (!newCarName.trim() || !newCarPrice) return showToast('Nhập tên và giá xe!');
            const price = parseMoney(newCarPrice);
            if (!Number.isFinite(price) || price <= 0) return showToast('Giá xe không hợp lệ!');

            const carData = {
              name: newCarName.trim(),
              price,
              seats: Number(newCarSeats) || 5,
              image: newCarImage.trim()
            };

            if (editingCarId) {
              setCars(currentCars => currentCars.map(item => (
                item.id === editingCarId ? { ...item, ...carData } : item
              )));
              showToast('Đã cập nhật thông tin xe!');
            } else {
              setCars(currentCars => [...currentCars, {
                id: 'car_' + Date.now(),
                ...carData
              }]);
              showToast('Thêm xe thành công!');
            }

            resetCarEditor();
          };

          const handleDeleteCar = (id) => {
            if(cars.length <= 1) return showToast('Phải giữ ít nhất 1 xe!');
            const updated = cars.filter(c => c.id !== id);
            setCars(updated);
            if (selectedCarId === id) setSelectedCarId(updated[0].id);
            if (editingCarId === id) resetCarEditor();
            showToast('Đã xóa xe!');
          };

          const handleAddPromo = () => {
            if (!newPromoName.trim()) return showToast('Nhập tên khuyến mãi!');
            const value = parseMoney(newPromoValue);
            setPromotions([...promotions, {
              id: 'promo_' + Date.now(),
              name: newPromoName.trim(),
              value
            }]);
            setNewPromoName('');
            setNewPromoValue('');
            showToast('Thêm khuyến mãi thành công!');
          };
          
          const handleDeletePromo = (id) => {
            setPromotions(promotions.filter(p => p.id !== id));
            setSelectedPromoIds(selectedPromoIds.filter(promoId => promoId !== id));
          };

          const handleExportImage = async () => {
            const element = captureRef.current;
            if (!element) return showToast('Không tìm thấy nội dung báo giá.');
            if (!window.html2canvas) return showToast('Thiếu thư viện tạo ảnh. Hãy tải lại ứng dụng khi có mạng.');

            const originalTransform = element.style.transform;
            let restorePreparedImages = () => {};
            let usedPlaceholder = false;
            setIsExporting(true);
            showToast('Đang tạo ảnh báo giá...');

            try {
              element.style.transform = 'none';

              if (document.fonts?.ready) {
                await document.fonts.ready;
              }

              const preparedImages = await prepareImagesForExport(element);
              restorePreparedImages = preparedImages.restore;
              usedPlaceholder = preparedImages.usedPlaceholder;

              await new Promise(resolve => setTimeout(resolve, 120));

              const canvas = await window.html2canvas(element, {
                scale: Math.min(2, window.devicePixelRatio || 2),
                useCORS: true,
                allowTaint: false,
                imageTimeout: 12000,
                backgroundColor: '#ffffff',
                logging: false,
                removeContainer: true
              });

              const blob = await canvasToJpegBlob(canvas, 0.92);
              const fileName = `BaoGia_Geely_${safeFilePart(customerName)}_${Date.now()}.jpg`;
              let completedByShare = false;

              if (navigator.share && typeof File !== 'undefined') {
                try {
                  const file = new File([blob], fileName, { type: 'image/jpeg' });
                  if (!navigator.canShare || navigator.canShare({ files: [file] })) {
                    await navigator.share({
                      files: [file],
                      title: 'Báo giá Geely',
                      text: `Báo giá ${car?.name || 'Geely'}`
                    });
                    completedByShare = true;
                  }
                } catch (shareError) {
                  if (shareError?.name === 'AbortError') {
                    showToast('Bạn đã đóng bảng chia sẻ.');
                    return;
                  }
                  console.warn('Không thể mở bảng chia sẻ, chuyển sang tải tệp:', shareError);
                }
              }

              if (!completedByShare) {
                const objectUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = fileName;
                link.href = objectUrl;
                link.rel = 'noopener';
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.setTimeout(() => URL.revokeObjectURL(objectUrl), 15000);
              }

              if (usedPlaceholder) {
                showToast('Đã tạo ảnh, nhưng ảnh xe từ link ngoài bị thay bằng ảnh dự phòng. Hãy chọn ảnh từ thiết bị để xuất đầy đủ.');
              } else {
                showToast(completedByShare ? 'Đã mở bảng lưu/chia sẻ ảnh!' : 'Đã tải ảnh báo giá!');
              }
            } catch (error) {
              console.error('Lỗi xuất ảnh báo giá:', error);
              const message = String(error?.message || '');
              if (/oklch|oklab|color-mix|unsupported color function/i.test(message)) {
                showToast('Lỗi màu giao diện cũ. Hãy tải lại bản V1.5 rồi thử lại.');
              } else if (/memory|canvas|size/i.test(message)) {
                showToast('Điện thoại thiếu bộ nhớ để tạo ảnh. Hãy đóng bớt ứng dụng rồi thử lại.');
              } else {
                showToast(`Không thể tạo ảnh: ${message || 'lỗi không xác định'}`);
              }
            } finally {
              try { restorePreparedImages(); } catch (error) {}
              element.style.transform = originalTransform;
              setIsExporting(false);
            }
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
                    <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-900 text-sm">
                    {cars.map(c => <option key={c.id} value={c.id}>{c.name} - {formatVND(c.price)}</option>)}
                    </select>
                </div>
                <div className="col-span-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Màu sắc</label>
                    <input type="text" value={carColor} onChange={(e) => setCarColor(e.target.value)} placeholder="VD: Trắng" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nơi đăng ký</label>
                <select value={selectedLocationId} onChange={(e) => setSelectedLocationId(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  {LOCATIONS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Loại Biển (Phí ĐB)</label>
                  <select value={plateColor} onChange={(e) => setPlateColor(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium">
                    <option value="white">Trắng (130k)</option>
                    <option value="yellow">Vàng (180k)</option>
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
                        <span className="text-sm font-medium text-gray-800">{p.name} {p.value > 0 ? `(-${formatVND(p.value)})` : ''}</span>
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
            </div>
          );

          const renderBankLoan = () => {
            if (!loanCalculations) return null;
            return (
              <div className="space-y-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-20">
                 <h3 className="font-bold text-gray-800 text-lg mb-2">Phương án tài chính</h3>
                 <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div>
                       <div className="flex justify-between mb-1">
                         <span className="text-sm font-semibold text-gray-700">Tỷ lệ trả trước</span>
                         <span className="text-sm font-bold text-blue-600">{loanParams.downPaymentPercent}%</span>
                       </div>
                       <input type="range" min="15" max="80" step="5" value={loanParams.downPaymentPercent} onChange={(e) => setLoanParams({...loanParams, downPaymentPercent: Number(e.target.value)})} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Thời gian vay (Năm)</label>
                        <select value={loanParams.loanTermYears} onChange={(e) => setLoanParams({...loanParams, loanTermYears: Number(e.target.value)})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium">
                          {[2, 3, 4, 5, 6, 7, 8].map(y => <option key={y} value={y}>{y} năm</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Thời gian Ưu đãi</label>
                        <select value={loanParams.fixedTermMonths} onChange={(e) => setLoanParams({...loanParams, fixedTermMonths: Number(e.target.value)})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none text-sm font-medium">
                          <option value={0}>Không ưu đãi</option>
                          <option value={6}>6 tháng</option>
                          <option value={12}>12 tháng (1 năm)</option>
                          <option value={24}>24 tháng (2 năm)</option>
                          <option value={36}>36 tháng (3 năm)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Lãi suất Ưu đãi</label>
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                          <input type="number" step="0.1" value={loanParams.fixedInterestRate} onChange={(e) => setLoanParams({...loanParams, fixedInterestRate: Number(e.target.value)})} className="w-full px-3 py-2 outline-none text-sm font-medium text-blue-600" />
                          <span className="px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Lãi thả nổi dự kiến</label>
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                          <input type="number" step="0.1" value={loanParams.floatingInterestRate} onChange={(e) => setLoanParams({...loanParams, floatingInterestRate: Number(e.target.value)})} className="w-full px-3 py-2 outline-none text-sm font-medium text-orange-600" />
                          <span className="px-3 bg-gray-100 text-gray-500 font-semibold border-l text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 italic mt-1">* Lãi thả nổi = Lãi cơ sở + Biên độ (Thường từ 10.5% - 12%)</p>
                 </div>

                 <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 text-center">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Khoản trả trước (Bao gồm lăn bánh)</p>
                      <p className="text-3xl font-black text-blue-700">{formatVND(loanCalculations.upfrontPayment)}</p>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                       <span className="text-sm font-medium text-gray-700">Tổng số tiền vay NH</span>
                       <span className="font-bold text-gray-900">{formatVND(loanCalculations.loanAmount)}</span>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg mb-2">
                       <p className="text-xs font-bold text-green-700 uppercase mb-1">Gốc & Lãi tháng đầu (Ưu đãi)</p>
                       <div className="flex justify-between items-end">
                         <span className="text-2xl font-black text-green-600">{formatVND(loanCalculations.firstMonthTotal)}</span>
                       </div>
                    </div>

                    {loanCalculations.firstFloatingMonthTotal > 0 && (
                       <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg">
                         <p className="text-xs font-bold text-orange-700 uppercase mb-1">Dự kiến Gốc & Lãi tháng {loanCalculations.firstFloatingMonth} (Thả nổi)</p>
                         <div className="flex justify-between items-end">
                           <span className="text-lg font-black text-orange-600">{formatVND(loanCalculations.firstFloatingMonthTotal)}</span>
                         </div>
                         <p className="text-[10px] text-orange-500 mt-1">* Tính trên dư nợ thực tế còn lại sau khi hết ưu đãi</p>
                       </div>
                    )}
                 </div>

                 <button onClick={handleExportExcel} className="w-full mt-4 py-3 bg-green-100 text-green-700 border-2 border-green-600 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white transition-colors">
                    Tải Bảng Lãi Xuống Excel (CSV)
                 </button>
              </div>
            );
          }

          const renderSettings = () => (
            <div className="space-y-4 pb-20">
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
                <h3 className="font-bold text-gray-800 mb-1">🚘 Quản Lý Dòng Xe & Hình Ảnh</h3>
                <p className="text-xs text-gray-500 mb-3">Bấm <b>Sửa</b> để cập nhật xe đã có. Có thể dán link ảnh hoặc chọn ảnh trực tiếp từ điện thoại/máy tính.</p>

                <div className="space-y-2 mb-4 max-h-80 overflow-y-auto pr-1">
                  {cars.map(c => (
                    <div key={c.id} className={`p-2.5 rounded-xl border text-sm ${editingCarId === c.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                          <CarSilhouette className="w-14 text-slate-200" />
                          {c.image && (
                            <img
                              src={c.image}
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
                            {Number(c.seats) || 5} chỗ · {c.image ? 'Đã có ảnh' : 'Chưa có ảnh'}
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
                    <label className="block text-xs font-bold text-gray-600 mb-1">Hình ảnh xe</label>
                    <input
                      type="text"
                      placeholder={newCarImage.startsWith('data:image/') ? 'Đang sử dụng ảnh đã chọn từ thiết bị' : 'Dán link ảnh hoặc chọn ảnh bên dưới'}
                      value={newCarImage.startsWith('data:image/') ? '' : newCarImage}
                      onChange={e => setNewCarImage(e.target.value)}
                      disabled={newCarImage.startsWith('data:image/')}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-green-50 disabled:text-green-700 disabled:font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label className={`w-full py-2.5 rounded-lg font-bold text-sm text-center cursor-pointer border-2 transition-colors ${isProcessingCarImage ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none' : 'bg-green-50 text-green-700 border-green-500 hover:bg-green-100'}`}>
                      <input type="file" accept="image/*" onChange={handleCarImageFileChange} className="hidden" disabled={isProcessingCarImage} />
                      {isProcessingCarImage ? 'Đang xử lý ảnh...' : 'Chọn ảnh từ thiết bị'}
                    </label>
                    <button type="button" onClick={() => setNewCarImage('')} disabled={!newCarImage || isProcessingCarImage} className="w-full py-2.5 bg-gray-100 text-gray-600 border-2 border-gray-300 rounded-lg font-bold text-sm disabled:opacity-40">Bỏ ảnh hiện tại</button>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed">Ảnh chọn từ thiết bị sẽ tự thu nhỏ tối đa 1.200 × 800 px và nén thành JPEG để giảm dung lượng lưu trữ.</p>

                  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <CarSilhouette className="w-44 text-slate-200" />
                    {newCarImage && (
                      <img
                        src={newCarImage}
                        crossOrigin="anonymous"
                        alt="Xem trước ảnh xe"
                        className="absolute inset-0 w-full h-full object-contain p-3 bg-white"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-white/90 text-gray-500 px-2 py-1 rounded-md border">XEM TRƯỚC</span>
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
                    <div key={p.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border text-sm"><div className="font-medium">{p.name} {p.value > 0 ? <span className="text-red-500 block text-xs font-bold">-{formatVND(p.value)}</span> : null}</div><button onClick={() => handleDeletePromo(p.id)} className="text-red-500 font-bold p-2 text-xs">Xóa</button></div>
                  ))}
                </div>
                <div className="pt-3 border-t space-y-2">
                  <input type="text" placeholder="Tên KM (VD: Tặng thảm sàn)" value={newPromoName} onChange={e => setNewPromoName(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
                  <input type="text" inputMode="numeric" placeholder="Quy đổi VNĐ (Trừ vào giá nếu có)" value={newPromoValue} onChange={e => formatNumberInput(e, setNewPromoValue)} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
                  <button onClick={handleAddPromo} className="w-full py-2 bg-red-100 text-red-700 font-bold rounded-lg text-sm">+ Thêm Khuyến Mãi</button>
                </div>
              </div>
            </div>
          );

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
                          {carColor && <p className="text-slate-700 font-medium mt-1">Màu sắc: {carColor}</p>}
                      </div>
                  </div>

                  <div className="w-full h-64 bg-slate-100 flex items-center justify-center mb-8 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner">
                      {car.image ? (
                        <img src={car.image} crossOrigin="anonymous" className="object-contain w-full h-full p-4 drop-shadow-xl" alt={car.name} />
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
                          
                          {(calculations.discountAmount > 0 || selectedPromoIds.length > 0) && (
                            <tr className="border-b border-slate-200 border-dashed bg-red-50/50">
                              <td className="p-3 text-red-600">
                                <span className="font-bold">Khuyến mãi / Giảm giá trực tiếp</span>
                                {selectedPromoIds.length > 0 && (
                                  <ul className="text-xs mt-1.5 list-disc pl-4 space-y-0.5 font-medium text-slate-600">
                                    {selectedPromoIds.map(id => { const p = promotions.find(x => x.id === id); return p ? <li key={id}>{p.name}</li> : null; })}
                                  </ul>
                                )}
                              </td>
                              <td className="p-3 text-right font-bold text-red-600 align-top">-{formatVND(calculations.discountAmount)}</td>
                            </tr>
                          )}
                          
                          <tr className="border-b-2 border-blue-200 bg-blue-50/50">
                            <td className="p-3 font-bold text-blue-900">Giá xe sau ưu đãi (Hóa đơn)</td>
                            <td className="p-3 text-right font-black text-blue-900 text-lg">{formatVND(calculations.price - calculations.discountAmount)}</td>
                          </tr>

                          <tr className="bg-slate-100 border-b border-slate-300"><td className="p-3 font-black text-slate-800 uppercase mt-4 block border-none">2. Chi phí đăng ký (Tạm tính tại {location.name})</td><td></td></tr>
                          <tr className="border-b border-slate-200 border-dashed"><td className="p-2.5 text-slate-700 pl-4">Lệ phí trước bạ</td><td className="p-2.5 text-right font-medium">{formatVND(calculations.taxFee)}</td></tr>
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

                  {loanCalculations && loanParams.downPaymentPercent < 100 && (
                    <div className="border-l-4 border-yellow-400 bg-yellow-50/50 p-4 mb-8 rounded-r-lg">
                        <p className="text-slate-700 mb-1">Dự kiến trả trước khi mua trả góp <span className="font-bold text-sm">({loanParams.downPaymentPercent}% giá xe + Chi phí lăn bánh)</span>:</p>
                        <p className="font-black text-2xl text-yellow-600 mb-1">{formatVND(loanCalculations.upfrontPayment)}</p>
                        <p className="text-xs text-slate-500 italic">Khoản trả trước có thể thay đổi tùy thuộc vào tỷ lệ xét duyệt của ngân hàng.</p>
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
                <div className="text-xl font-black text-gray-900 tracking-tighter ml-4 pl-4 border-l-2 border-gray-300 uppercase">Báo Giá <span className="text-[9px] align-top text-blue-600">PWA</span></div>
              </div>
              
              <div className="max-w-xl mx-auto p-4">
                <div className="flex p-1 bg-gray-200 rounded-lg shadow-inner mb-4">
                  <button onClick={() => setActiveTab('input')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${activeTab === 'input' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Nhập TT</button>
                  <button onClick={() => setActiveTab('loan')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${activeTab === 'loan' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Vay NH</button>
                  <button onClick={() => setActiveTab('preview')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${activeTab === 'preview' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Báo Giá</button>
                  <button onClick={() => setActiveTab('settings')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${activeTab === 'settings' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Cài Đặt</button>
                </div>
                
                {activeTab === 'input' && renderInputForm()}
                {activeTab === 'loan' && renderBankLoan()}
                {activeTab === 'preview' && renderQuotePreview()}
                {activeTab === 'settings' && renderSettings()}
              </div>

              {activeTab === 'preview' && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20 flex justify-center pb-safe">
                  <div className="max-w-md w-full grid grid-cols-1">
                    <button onClick={handleExportImage} disabled={isExporting} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md active:bg-blue-700 transition-colors">{isExporting ? 'Đang tạo ảnh...' : 'Lưu / Chia sẻ Ảnh Báo Giá'}</button>
                  </div>
                </div>
              )}
              {toastMessage && <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-2 rounded-full shadow-xl text-sm font-medium animate-fade-in-out w-max max-w-[90%] text-center">{toastMessage}</div>}
            </div>
          );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<GeelyQuotationApp />);