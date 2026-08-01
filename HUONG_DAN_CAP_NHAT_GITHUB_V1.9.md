# Hướng dẫn cập nhật GitHub Pages lên PWA V1.9

Repository: `GeelyHaiDuong/bao-gia-geely`

## 1. Sao lưu trước khi cập nhật

Trên thiết bị đang có dữ liệu đầy đủ, mở:

```text
Cài đặt → Đồng bộ ngay
```

Không xóa dữ liệu website hoặc gỡ PWA trước khi kiểm tra bản mới.

## 2. Tải bản vá lên GitHub

Giải nén:

```text
Patch_GitHub_PWA_V1.9_PhiDangKy.zip
```

Tại repository, chọn **Add file → Upload files**, rồi kéo toàn bộ nội dung bên trong bản vá lên và giữ nguyên cấu trúc thư mục.

Các file quan trọng:

```text
index.html
manifest.webmanifest
service-worker.js
assets/app.js
assets/app.jsx
assets/app.css
assets/firebase-sync.js
assets/idb-store.js
README.md
FIRESTORE_RULES_V1.9.rules
```

Commit message:

```text
Cập nhật PWA V1.9 quản lý phí đăng ký
```

## 3. Firestore Rules

Rules của V1.9 không thay đổi cấu trúc quyền so với V1.8. Có thể giữ rules hiện tại. Để kiểm tra lại, vào:

```text
Firebase Console → Firestore Database → Rules
```

và đối chiếu với file `FIRESTORE_RULES_V1.9.rules`.

## 4. Mở phiên bản mới

Chờ tab **Actions** có dấu tích xanh, sau đó mở:

```text
https://geelyhaiduong.github.io/bao-gia-geely/?v=190
```

Ứng dụng phải hiển thị nhãn **PWA 1.9**.

## 5. Kiểm tra sau cập nhật

1. Vào **Cài đặt → Phí đăng ký & khu vực**.
2. Kiểm tra phí đăng kiểm, đường bộ và TNDS.
3. Bấm **Sửa** từng khu vực để nhập đúng tỷ lệ trước bạ và ngày áp dụng.
4. Vào **Quản lý dòng xe**, kiểm tra loại động cơ của từng xe.
5. Mở tab **Nhập TT**, chọn EX2: tỷ lệ trước bạ phải lấy cột Thuần điện.
6. Chọn Coolray hoặc Monjaro: tỷ lệ phải lấy cột Xăng.
7. Chọn EX5 EM-i: tỷ lệ phải lấy cột PHEV.
8. Chọn Okavango: tỷ lệ phải lấy cột Hybrid theo cấu hình mặc định; có thể chỉnh lại trong Cài đặt nếu phiên bản xe của bạn dùng loại động cơ khác.
9. Nhấn **Đồng bộ ngay**, sau đó kiểm tra trên thiết bị thứ hai.

## 6. Cache phiên bản cũ

Nếu điện thoại chưa nhận bản mới:

1. Mở đường dẫn `?v=190` bằng Chrome/Safari khi có mạng.
2. Chờ thông báo phiên bản mới và nhấn **Cập nhật**.
3. Đóng hoàn toàn PWA rồi mở lại.
4. Chưa nên xóa dữ liệu trang web vì thao tác đó có thể xóa ảnh xe cục bộ.
