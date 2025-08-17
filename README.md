# NovelNest - Digital Book Reading Platform


1. [Giới thiệu](#giới-thiệu)
2. [Cấu trúc dự án](#cấu-trúc-dự-án)
3. [Các tính năng chính](#các-tính-năng-chính)
    - [Trang chủ](#1-trang-chủ)
    - [Khám phá sách](#2-khám-phá-sách)
    - [Chi tiết sách](#3-chi-tiết-sách)
    - [Login](#4-login)
    - [Register](#5-register)
    - [Giới thiệu NovelNest](#6-giới-thiệu-novelnest)
    - [FAQ](#7-faq)
4. [Tài khoản demo](#tài-khoản-demo)
5. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
6. [Cách chạy dự án](#cách-chạy-dự-án)
7. [Liên hệ](#liên-hệ)

---

## Giới thiệu
**NovelNest** là nền tảng đọc sách trực tuyến, giúp người dùng tìm kiếm, khám phá và đọc sách nhanh chóng. Dự án được xây dựng với **React**, **Next.js**, **Node.js/Express**, kết hợp REST API để quản lý dữ liệu sách, người dùng và đơn hàng.

NovelNest cung cấp trải nghiệm toàn diện: từ xem thông tin chi tiết sách, nhà xuất bản, đến các công cụ lọc, tìm kiếm thông minh và quản lý admin.

---

## Cấu trúc dự án
- **client/**: Frontend cho người dùng, xây dựng bằng Next.js + React + TailwindCSS.
- **server/**: Backend bằng Node.js + Express, kết nối cơ sở dữ liệu và xử lý API.
- **admin/**: Giao diện quản trị, xây dựng bằng React + Vite + Ant Design.

---

## Các tính năng chính

### 1. Trang chủ
- Giới thiệu nền tảng và các sách nổi bật.
- Banner quảng bá sách và chương trình đặc biệt.

![Trang chủ](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450642/novelnest-homepage_pp9h6i.png)

---

### 2. Khám phá sách
- Hiển thị danh sách sách đang bày bán.
- Lọc theo **thể loại, giá tiền, rating**.
- Tìm kiếm sách theo tên, tác giả hoặc từ khóa.

![Khám phá sách](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450642/novelnest-books_sjwpqs.png)

---

### 3. Chi tiết sách
- Thông tin đầy đủ về sách: tên, tác giả, thể loại, rating, giá.
- Thông tin về nhà xuất bản và các chi tiết liên quan.

![Chi tiết sách](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450642/novelnest-books-details_wwmjnz.png)

---

### 4. Login
- Cho phép người dùng đăng nhập để trải nghiệm đầy đủ các tính năng.
- Xác thực thông tin email và mật khẩu.

![Login](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450642/novelnest-login_ovrg1a.png)

---

### 5. Register
- Người dùng mới có thể đăng ký tài khoản.
- Thu thập thông tin cơ bản: email, mật khẩu, tên người dùng.

![Register](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450642/novelnest-register_huucow.png)

---

### 6. Giới thiệu NovelNest
- Câu chuyện ra đời của NovelNest.
- Mục đích, tầm nhìn và giá trị mang đến cho độc giả.

![Giới thiệu NovelNest](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450642/novelnest-about-us_vwsnvj.png)

---

### 7. FAQ
- Giải đáp các thắc mắc phổ biến từ độc giả.

![FAQ](https://res.cloudinary.com/duw4cwp7d/image/upload/v1755450641/novelnest-faq_zfunmx.png)

---

## Tài khoản demo
- **Email**: userdemo@gmail.com  
- **Mật khẩu**: novelnest@@123  

---

## Công nghệ sử dụng
- **Frontend (client)**: Next.js, React, TailwindCSS, MUI, Zustand, SWR, react-reader.
- **Admin panel**: React, Vite, Ant Design, axios.
- **Backend (server)**: Node.js, Express, REST API, dotenv, cookie-parser, cors.
- **Cơ sở dữ liệu**: MongoDB.
- **Thanh toán**: PayOS Checkout.
- **Quản lý trạng thái & dữ liệu**: Zustand, SWR, local storage.

---

## Cách chạy dự án

### Frontend
```bash
cd client
npm install
npm run dev