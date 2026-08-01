# Báo Giá Geely Hải Dương — PWA V1.8

Ứng dụng PWA tạo báo giá lăn bánh, phương án vay, ảnh gửi Zalo và bản in/PDF A4.

## Những nâng cấp chính

1. **Giao diện chạy cục bộ:** React, ReactDOM, Scheduler, QR và trình tạo ảnh Zalo được đóng gói trong ứng dụng. Không còn phụ thuộc html2canvas.
2. **Ảnh riêng lưu bằng IndexedDB:** ảnh chọn từ điện thoại/máy tính không còn chiếm dung lượng `localStorage`.
3. **Firebase tách dữ liệu:** cài đặt, từng dòng xe, từng khuyến mãi và từng báo giá được lưu thành các tài liệu riêng, hạn chế ghi đè chéo giữa thiết bị.
4. **Lịch sử báo giá:** tìm kiếm, mở lại, nhân bản, cập nhật trạng thái và xóa báo giá.
5. **Phân loại khuyến mãi:** giảm tiền mặt, hỗ trợ trước bạ, quà tặng, phụ kiện, bảo hiểm, bảo dưỡng và dịch vụ. Chỉ mục được đánh dấu “Trừ trực tiếp” mới giảm giá xe.
6. **Hai đầu ra:** ảnh dọc 1080 × 1350 px để gửi Zalo và bản A4 qua hộp thoại In/Lưu PDF của trình duyệt.
7. **Ảnh chuẩn đồng bộ không cần Firebase Storage:** ảnh chuẩn đặt trong `assets/cars/`; Firebase chỉ đồng bộ đường dẫn `imagePath`.

## Cấu trúc Firebase V1.8

```text
users/{uid}/settings/main
users/{uid}/cars/{carId}
users/{uid}/promotions/{promotionId}
users/{uid}/quotations/{quotationId}
```

Cập nhật Firestore Rules bằng nội dung trong `FIRESTORE_RULES_V1.8.rules`.

## Ảnh xe hoạt động thế nào?

Ứng dụng ưu tiên theo thứ tự:

1. Ảnh riêng được chọn trên thiết bị và lưu trong IndexedDB.
2. Ảnh chuẩn trên GitHub theo trường `imagePath`.
3. Hình dự phòng nếu không tải được ảnh.

Ảnh riêng **không đồng bộ**. Ảnh chuẩn GitHub và đường dẫn của ảnh **được đồng bộ**.

Để dùng ảnh PNG chuẩn cho EX2 Pro:

1. Tải ảnh lên repository tại `assets/cars/ex2_pro.png`.
2. Vào **Cài đặt → Sửa Geely EX2 Pro**.
3. Nhập `./assets/cars/ex2_pro.png` ở ô **Đường dẫn ảnh chuẩn trên GitHub**.
4. Lưu thay đổi và đồng bộ.

## Dùng ngoại tuyến

- Giao diện, tính toán, ảnh chuẩn đã cache và xuất ảnh Zalo hoạt động ngoại tuyến.
- Đăng nhập Google và đồng bộ Firebase cần kết nối Internet.
- Firebase SDK được tải khi cần đồng bộ và được Service Worker lưu cache sau lần tải thành công.

## Lưu PDF A4

Mở tab **Báo Giá → In / PDF A4**, sau đó chọn:

- Android/Chrome: **Save as PDF / Lưu dưới dạng PDF**.
- Máy tính: chọn máy in **Microsoft Print to PDF** hoặc **Save as PDF**.

## Bảo vệ dữ liệu

Thông tin khách hàng trong lịch sử có thể được đồng bộ lên Firestore. Chỉ sử dụng tài khoản Google được phép và không chia sẻ quyền truy cập Firebase cho người không liên quan.
