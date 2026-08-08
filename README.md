# Báo Giá Geely Hải Dương – PWA V2.7

## Điểm mới V2.7

V2.7 tách dữ liệu Firebase thành 2 phạm vi:

### Dùng chung giữa mọi tài khoản đăng nhập
- Danh sách dòng/phiên bản xe.
- Giá xe.
- Số chỗ và loại động cơ gắn với xe (cần cho phép tính lăn bánh).
- Danh sách màu xe.
- Màu mặc định.
- Đường dẫn ảnh màu trên GitHub Pages.

Các dữ liệu này nằm tại:

`shared/geely-hai-duong/cars/{carId}`

### Riêng theo từng tài khoản
- Thông tin tư vấn viên.
- Phí dịch vụ, phí đăng ký và các cài đặt cá nhân.
- Khuyến mãi.
- Chính sách bán hàng theo tháng.
- Lịch sử báo giá.
- Thiết lập/vận hành báo giá khác.

Các dữ liệu này tiếp tục nằm dưới `users/{uid}/...`.

## Migration V2.6 → V2.7

Khi tài khoản đầu tiên mở V2.7:
1. Ứng dụng ưu tiên lấy danh sách xe dùng chung nếu đã có.
2. Nếu chưa có, ứng dụng tự chuyển danh sách xe V2.6 của tài khoản đó sang kho dùng chung.
3. Nếu tài khoản chưa có dữ liệu xe trên Firebase nhưng thiết bị đang có danh sách xe cục bộ, V2.7 sẽ dùng danh sách trên thiết bị để khởi tạo kho xe dùng chung.
4. Các tài khoản khác sau đó sẽ tự nhận danh sách xe/giá/màu/ảnh dùng chung.

## Màu Hồng EX2

Thư viện màu chuẩn V2.7 đã có:

`./assets/cars/Ex2/ex2-pink.png` → `Hồng Kẹo Bông`

Nếu xe EX2 hiện tại trên Firebase chưa có màu này, vào **Cài đặt → Quản lý dòng xe → Sửa EX2 → Nạp màu chuẩn → Lưu**. Làm cho EX2 Pro và EX2 Max nếu cần. Sau khi lưu, các tài khoản khác sẽ nhận màu mới tự động.

## Lưu ý ảnh

Ảnh chuẩn chỉ đồng bộ **đường dẫn GitHub**, không tải byte ảnh lên Firestore. Ảnh cá nhân chọn trực tiếp từ máy vẫn được giữ riêng trong IndexedDB của thiết bị.
