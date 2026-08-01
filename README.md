# Báo Giá Geely Hải Dương — PWA V1.9

Ứng dụng PWA tạo báo giá lăn bánh, phương án vay, lịch sử khách hàng, ảnh gửi Zalo và bản in/PDF A4.

## Nâng cấp V1.9

1. Toàn bộ phí đăng ký được quản lý tại **Cài đặt → Phí đăng ký & khu vực**.
2. Có thể sửa:
   - Phí đăng kiểm.
   - Phí bảo trì đường bộ theo tháng cho biển trắng và biển vàng.
   - Bảo hiểm TNDS xe 5 chỗ và 7 chỗ.
   - Ngày áp dụng chung.
3. Có thể thêm, sửa và xóa khu vực đăng ký với:
   - Tên khu vực.
   - Phí biển số.
   - Ngày áp dụng.
   - Tỷ lệ trước bạ riêng cho Xăng, Hybrid, PHEV và Thuần điện.
4. Mỗi dòng xe có trường **Loại động cơ**.
5. Khi chọn xe và khu vực, ứng dụng tự lấy đúng tỷ lệ trước bạ; không còn các lựa chọn khu vực trùng lặp kiểu “Hà Nội - Xe điện”.
6. Cấu hình phí và loại động cơ được đồng bộ Firebase giữa điện thoại và máy tính.
7. Báo giá hiển thị loại động cơ, tỷ lệ trước bạ và ngày áp dụng cấu hình.

## Dữ liệu mặc định

Các mức phí mặc định được chuyển từ cấu hình của phiên bản trước và chỉ dùng làm dữ liệu khởi tạo. Người dùng cần kiểm tra, chỉnh lại theo chính sách đang áp dụng trước khi gửi báo giá chính thức.

## Cấu trúc Firebase

```text
users/{uid}/settings/main
users/{uid}/cars/{carId}
users/{uid}/promotions/{promotionId}
users/{uid}/quotations/{quotationId}
```

- `settings/main` lưu bảng phí đăng ký và danh sách khu vực.
- Từng tài liệu xe lưu thêm trường `engineType`: `gasoline`, `hybrid`, `phev` hoặc `ev`.
- Firestore Rules vẫn giới hạn dữ liệu theo UID của tài khoản đăng nhập.

## Ảnh xe

Ứng dụng ưu tiên:

1. Ảnh riêng trong IndexedDB của thiết bị.
2. Ảnh chuẩn trên GitHub theo `imagePath`.
3. Hình dự phòng.

Ảnh riêng không đồng bộ Firebase. Ảnh chuẩn trên GitHub và đường dẫn ảnh được đồng bộ.

## Dùng ngoại tuyến

Giao diện, tính toán, bảng phí đã lưu, ảnh chuẩn đã cache và xuất ảnh Zalo hoạt động ngoại tuyến. Đăng nhập và đồng bộ Firebase cần Internet.
