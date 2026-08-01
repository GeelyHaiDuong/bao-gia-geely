# Ảnh xe chuẩn trên GitHub

Các file SVG trong thư mục này là ảnh dự phòng để PWA luôn có tài nguyên ngoại tuyến.

Để dùng ảnh xe thực tế:

1. Tải PNG/JPG/WebP vào thư mục này.
2. Mở ứng dụng → Cài đặt → Sửa xe.
3. Nhập đường dẫn tương đối, ví dụ `./assets/cars/ex2_pro.png`.
4. Lưu và đồng bộ Firebase.

Không đưa ảnh Base64 vào Firestore. Ảnh chọn trực tiếp trên thiết bị được lưu riêng trong IndexedDB và sẽ ưu tiên hơn ảnh GitHub.
