# Báo Giá Geely Hải Dương — PWA V2.0

Ứng dụng PWA tạo báo giá lăn bánh, tính vay, lưu lịch sử khách hàng, xuất ảnh Zalo/PDF A4 và đồng bộ dữ liệu giữa điện thoại với máy tính.

## Nâng cấp V2.0 — Chọn màu và đổi ảnh tự động

1. Mỗi dòng xe có danh sách màu riêng.
2. Khi chọn màu, ảnh xe trên báo giá đổi ngay sang đúng ảnh trong GitHub Pages.
3. Có bộ chọn màu dạng danh sách và ảnh thu nhỏ tại tab **Nhập TT**.
4. Tên màu và ảnh được lưu cùng lịch sử báo giá.
5. Danh sách màu, màu mặc định và đường dẫn ảnh được đồng bộ qua Firebase.
6. Ảnh PNG được đọc trực tiếp từ `assets/cars/...`, không cần Firebase Storage.
7. Ảnh riêng chọn từ thiết bị vẫn lưu trong IndexedDB và có thể chọn bằng mục **Ảnh riêng trên máy**.
8. Trong **Cài đặt → Quản lý dòng xe**, có thể thêm, sửa, xóa màu, đổi đường dẫn ảnh và chọn màu mặc định.
9. Với xe mặc định, nút **Nạp màu chuẩn** khôi phục thư viện màu GitHub.
10. Service Worker cache ảnh màu để dùng lại khi ngoại tuyến.

## Thư viện ảnh GitHub được ánh xạ

```text
assets/cars/
├── Ex2/
├── EX5/
├── EX5 EMi/
├── Coolray/
├── Monjaro/
└── Okavango/
```

Tên thư mục và tên file phân biệt chữ hoa/chữ thường. Không đổi tên các thư mục hoặc file nếu chưa cập nhật lại đường dẫn trong ứng dụng.

## Cách chọn màu

1. Mở tab **Nhập TT**.
2. Chọn dòng xe.
3. Chọn màu từ danh sách hoặc bấm ảnh thu nhỏ.
4. Mở tab **Báo Giá** để kiểm tra đúng màu xe.
5. Lưu lịch sử hoặc xuất ảnh/PDF như bình thường.

## Quản lý màu xe

Vào **Cài đặt → Quản lý dòng xe & hình ảnh → Sửa**:

- Nhấn **Nạp màu chuẩn** để dùng lại bộ ảnh GitHub mặc định.
- Nhấn **+ Thêm màu** để thêm màu mới.
- Điền tên màu và đường dẫn tương đối, ví dụ:

```text
./assets/cars/Ex2/ex2-moon-white.png
```

- Chọn nút tròn bên trái để đặt màu mặc định.
- Nhấn **Lưu thay đổi**.

## Firebase

Các trường sau được đồng bộ trong từng tài liệu xe:

```text
colorGroup
colors[]
  ├── id
  ├── name
  └── imagePath
defaultColorId
```

Không có dữ liệu ảnh nhị phân được gửi lên Firestore. Firestore Rules của V1.9 vẫn sử dụng được cho V2.0.

## Dùng ngoại tuyến

Ảnh màu được cache trong lần cập nhật/mở có mạng. Nếu một ảnh chưa kịp tải, ứng dụng vẫn cài được và sẽ cache ảnh đó khi người dùng mở màu tương ứng.
