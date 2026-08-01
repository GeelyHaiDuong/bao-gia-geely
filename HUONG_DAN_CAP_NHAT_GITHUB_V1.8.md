# Hướng dẫn cập nhật GitHub Pages lên PWA V1.8

Repository: `GeelyHaiDuong/bao-gia-geely`

## 1. Sao lưu dữ liệu hiện tại

Trước khi cập nhật, mở ứng dụng trên thiết bị đang có dữ liệu đầy đủ và nhấn **Cài đặt → Đồng bộ ngay**. Không xóa dữ liệu website hoặc gỡ ứng dụng trước khi kiểm tra bản mới.

## 2. Tải bộ cập nhật

Giải nén `Patch_GitHub_PWA_V1.8_ToiUu.zip`.

Tại trang chính repository, chọn **Add file → Upload files**, rồi kéo toàn bộ file và thư mục bên trong bản vá lên. GitHub sẽ thay thế các file trùng tên.

Các mục quan trọng gồm:

```text
index.html
manifest.webmanifest
service-worker.js
assets/app.js
assets/app.jsx
assets/app.css
assets/custom.css
assets/export-compat.css
assets/firebase-sync.js
assets/idb-store.js
assets/vendor/
assets/cars/
FIRESTORE_RULES_V1.8.rules
```

Commit message:

```text
Cập nhật PWA V1.8 tối ưu dữ liệu và báo giá
```

## 3. Cập nhật Firestore Rules

Vào Firebase Console:

```text
Firestore Database → Rules
```

Dán nội dung file `FIRESTORE_RULES_V1.8.rules`, rồi nhấn **Publish**.

## 4. Chờ GitHub Pages triển khai

Mở tab **Actions** và chờ tác vụ Pages có dấu tích xanh. Sau đó mở:

```text
https://geelyhaiduong.github.io/bao-gia-geely/?v=180
```

Ứng dụng phải hiển thị nhãn **PWA 1.8**.

## 5. Chuyển dữ liệu Firebase cũ

Khi đăng nhập lần đầu ở V1.8:

- Trên thiết bị có dữ liệu đầy đủ: chọn **Đưa dữ liệu thiết bị này lên Firebase**.
- Trên thiết bị thứ hai: chọn **Tải dữ liệu Firebase về thiết bị này**.

V1.8 có thể đọc tài liệu V1.7 cũ `appData/current` và chuyển sang cấu trúc mới khi bạn tải dữ liệu lên.

## 6. Kiểm tra

1. Sửa giá một xe trên máy tính và kiểm tra điện thoại nhận thay đổi.
2. Thêm một khuyến mãi dạng quà tặng; tổng giảm trực tiếp không được thay đổi.
3. Lưu một báo giá và kiểm tra tab **Lịch Sử** trên thiết bị còn lại.
4. Nhấn **Ảnh Zalo** để tạo ảnh dọc.
5. Nhấn **In / PDF A4** để mở hộp thoại lưu PDF.
6. Bật chế độ máy bay và xác nhận ứng dụng vẫn mở, tính giá và tạo ảnh Zalo.

## 7. Thay ảnh chuẩn dùng chung

Tải ảnh vào `assets/cars/`, sau đó sửa `imagePath` của xe trong tab Cài đặt. Nên dùng tên file không dấu, không khoảng trắng, ví dụ:

```text
assets/cars/ex2_pro.png
assets/cars/ex5_emi_max.png
```

Sau mỗi lần thêm hoặc đổi file ảnh trên GitHub, tăng `VERSION` trong `service-worker.js`, ví dụ từ `geely-pwa-v1.8.0` thành `geely-pwa-v1.8.1`, để thiết bị nhận cache mới.
