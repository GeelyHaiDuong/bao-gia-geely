# Báo Giá Geely Hải Dương — PWA Offline

## Cách chạy thử trên máy tính

Không mở trực tiếp `index.html` bằng đường dẫn `file://`, vì Service Worker chỉ chạy trên HTTPS hoặc localhost.

```bash
python -m http.server 8080
```

Sau đó mở `http://localhost:8080`.

## Cách đưa lên điện thoại

1. Đưa toàn bộ thư mục này lên một hosting có HTTPS (Netlify, Cloudflare Pages, GitHub Pages hoặc hosting riêng).
2. Mở đường dẫn bằng Chrome trên Android hoặc Safari trên iPhone.
3. Mở ứng dụng trực tuyến ít nhất một lần để lưu React và html2canvas vào bộ nhớ ngoại tuyến.
4. Android: chọn **Cài ứng dụng**.
5. iPhone: Safari → **Chia sẻ** → **Thêm vào Màn hình chính**.

## Phạm vi ngoại tuyến

- Tạo báo giá, tính phí, tính vay, quản lý xe/khuyến mãi và ảnh tải từ thiết bị hoạt động offline.
- Ảnh được dán bằng link Internet chỉ hiện offline sau khi ảnh đó đã được mở và cache thành công. Để ổn định nhất, dùng nút chọn ảnh từ thiết bị.
- Khi cập nhật file, đổi `VERSION` trong `service-worker.js` để điện thoại nhận bản mới.
