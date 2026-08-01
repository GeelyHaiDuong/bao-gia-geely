# Hướng dẫn cập nhật GitHub Pages lên PWA V2.0

## 1. Điều kiện trước khi cập nhật

Repository phải giữ nguyên các thư mục ảnh đã tải lên:

```text
assets/cars/Coolray
assets/cars/EX5 EMi
assets/cars/EX5
assets/cars/Ex2
assets/cars/Monjaro
assets/cars/Okavango
```

Không xóa hoặc đổi tên các thư mục này.

## 2. Tải bản vá

Giải nén:

```text
Patch_GitHub_PWA_V2.0_MauXe.zip
```

Bản vá không chứa lại ảnh PNG vì ảnh đã có sẵn trong repository. Bản vá chỉ thay mã ứng dụng.

## 3. Upload lên GitHub

1. Mở repository `GeelyHaiDuong/bao-gia-geely`.
2. Chọn **Add file → Upload files**.
3. Kéo toàn bộ nội dung bên trong thư mục bản vá vào vùng tải lên.
4. Bảo đảm GitHub hiển thị đúng các đường dẫn như:

```text
index.html
manifest.webmanifest
service-worker.js
assets/app.js
assets/app.jsx
assets/app.css
assets/firebase-sync.js
assets/idb-store.js
```

5. Commit với nội dung:

```text
Cập nhật PWA V2.0 chọn màu và đổi ảnh tự động
```

## 4. Firestore Rules

V2.0 không cần thay đổi quyền so với V1.9. Có thể giữ Rules hiện tại. File `FIRESTORE_RULES_V2.0.rules` được kèm để đối chiếu.

## 5. Chờ GitHub Pages cập nhật

Mở tab **Actions** và chờ tác vụ Pages có dấu tích xanh.

Sau đó mở:

```text
https://geelyhaiduong.github.io/bao-gia-geely/?v=200
```

Ứng dụng phải hiển thị nhãn **PWA 2.0**.

## 6. Cập nhật PWA trên điện thoại

1. Mở đường dẫn `?v=200` bằng Chrome/Safari khi có mạng.
2. Khi xuất hiện thông báo có phiên bản mới, nhấn **Cập nhật**.
3. Đóng hoàn toàn ứng dụng.
4. Mở lại từ biểu tượng trên màn hình chính.
5. Vào tab **Nhập TT**, chọn xe và thử đổi màu.

Không xóa dữ liệu trang web nếu không cần thiết, vì ảnh riêng trên thiết bị và dữ liệu cục bộ có thể bị xóa.

## 7. Đồng bộ dữ liệu cũ

Dữ liệu xe từ V1.9 chưa có trường `colors` sẽ được tự động bổ sung thư viện màu mặc định dựa trên mã xe. Sau khi đăng nhập Firebase và đồng bộ, danh sách màu mới sẽ được lưu lên Firestore.

## 8. Kiểm tra đường dẫn ảnh

Ví dụ:

```text
https://geelyhaiduong.github.io/bao-gia-geely/assets/cars/Ex2/ex2-moon-white.png
```

Nếu đường dẫn báo 404, kiểm tra chính tả, chữ hoa/chữ thường và tên file trên GitHub.
