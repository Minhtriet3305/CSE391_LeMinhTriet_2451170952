PHẦN A: KIỂM TRA ĐỌC HIỂU
CÂU A1:
    1. <meta name="viewport" content="width=device-width, initial-scale=1.0">
    -viewport: dùng để cấu hình khung nhìn trên trình duyệt di động
    -width=device-width: thiết lập chiều rộng khung nhìn bằng chiều rộng của màn hình
    -initial-scale=1.0: tỉ lệ phóng to ban đầu khi tải trang với giá trị 1.0 => không phóng to,không thu nhỏ để hiển thị theo đúng kích thước màn hình
    2. Nếu thiếu thẻ này, Iphone sẽ giả định trang rộng như màn hình của desktop khiến cho trang bị thu nhỏ lại,chữ bé đi,giao diện tệ
    3. Khác nhau giữa Mobile-first và Desktop-First
    - Tiếp cận:
        + Mobile-first: Thiết kế cho màn hình nhỏ (mobile) trước, sau đó dùng media query min-width để mở rộng lên màn hình lớn hơn (tablet, desktop)
        + Desktop-first: Thiết kế cho màn hình lớn (desktop) trước, sau đó dùng media query max-width để thu nhỏ xuống màn hình nhỏ hơn (tablet, mobile)

    - Media Query sử dụng:
        + Mobile-first: Dùng min-width (ví dụ: @media (min-width: 768px) { ... }) 
        + Desktop-first: Dùng max-width (ví dụ: @media (max-width: 768px) { ... })

    - Dung lượng code:
        + Mobile-first: Thường nhẹ hơn, ít style ghi đè
        + Desktop-first: Thường nặng hơn, nhiều style ghi đè khi thu nhỏ
    
    -Ví dụ CSS:
    +Mobile-first:
        /* Mặc định: mobile (dưới 768px) */
        .container {
        padding: 10px;
        }

        .card {
        width: 100%;
        }

        /* Tablet trở lên (≥ 768px) */
        @media (min-width: 768px) {
            .container {
                padding: 20px;
                display: flex;
            }

            .card {
                width: calc(50% - 10px);
            }
        }

    +Desktop-first:
    /* Mặc định: desktop (≥ 768px) */
    .container {
    padding: 20px;
    display: flex;
    }

    .card {
    width: calc(33.333% - 14px);
    }

    /* Tablet trở xuống (≤ 768px) */
    @media (max-width: 768px) {
        .card {
            width: calc(50% - 10px);
        }
    }

    -Tại sao mobile-first được khuyên dùng:
        + Mobile tải ít CSS hơn (mobile chỉ tải mobile styles, không download desktop styles)
        + Buộc bạn ưu tiên nội dung quan trọng trước (content thinking)
        + Google và performance tools đánh giá cao hơn

CÂU A2:
    | Tên        | Min-width | Thiết bị điển hình            | Ví dụ: lưới sản phẩm (số cột) |
    |------------|-----------|-------------------------------|-------------------------------|
    | Mobile     | < 576px   | iPhone SE, các điện thoại nhỏ | 1 cột |
    | Mobile L   | ≥ 576px   | iPhone Plus, điện thoại ngang | 2 cột |
    | Tablet     | ≥ 768px   | iPad dọc, tablet              | 2 - 3 cột |
    | Desktop    | ≥ 992px   | Laptop nhỏ                    | 3 - 4 cột |
    | Desktop L  | ≥ 1200px  | Desktop, laptop lớn           | 4 - 5 cột |
    | Desktop XL | ≥ 1400px  | Màn hình 4K, ultrawide        | 5 - 6 cột |

CÂU A3:
    | Chiều rộng màn hình | .container width |
    |---------------------|------------------|
    | 375px (iPhone SE)   | 100%             |
    | 600px               | 540px            |
    | 800px               | 720px            |
    | 1000px              | 960px            |
    | 1400px              | 1140px           |

CÂU A4:
    -Variables:Lưu trữ giá trị (màu sắc, font-size, spacing,...) để tái sử dụng. Khi cần thay đổi, chỉ sửa một chỗ.
    VD:
        $primary-color: #3498db;
        $font-size-base: 16px;

        .button {
        background: $primary-color;
        font-size: $font-size-base;
        }

    -Nesting:Viết selector lồng bên trong selector khác, phản ánh đúng cấu trúc HTML.
    VD:
        .nav {
                ul {
                    list-style: none;
                    li {
                    display: inline-block;
                    a {
                        color: white;
                        &:hover { color: blue; }
                    }
                    }
                }
            }

    -Mixins: Tạo khối code tái sử dụng, có thể nhận tham số (giống hàm).
    VD:
        @mixin border-radius($radius) {
            border-radius: $radius;
        }

        .card {
            @include border-radius(10px);
        }
    
    -@extend / Inheritance:  Selector kế thừa thuộc tính của selector khác.
    VD: 
        %button-base {
        padding: 10px 20px;
        border: none;
        }

        .btn-primary {
        @extend %button-base;
        background: blue;
        }

    Tại sao trình duyệt KHÔNG đọc được file .scss?

    Lý do: Trình duyệt chỉ hiểu CSS thuần. SCSS là ngôn ngữ mở rộng (preprocessor) có cú pháp đặc biệt (biến, lồng nhau, mixin,...) không phải CSS hợp lệ.

    Các bước để chuyển SCSS → CSS:
    +Bước 1: Cài đặt trình biên dịch SCSS
    +Bước 2: Chạy lệnh biên dịch 
    VD: sass style.scss style.css
    +Bước 3: Liên kết CSS vào HTML

PHẦN B: THỰC HÀNH CODE
BÀI B1:
    + screenshots:
        - 3 breakpoints:
            -375px:  ![alt text](screenshots/375px.png)
            -768px:  ![alt text](screenshots/768px.png)
            -1024px:  ![alt text](screenshots/1024px.png)
    + CSS base:
        -CSS cho mobile:
            body {
                background: #f5f5f5;
                min-height: 100vh;
                font-size: 14px; /* Font cơ bản cho mobile */
            }
        -CSS cho tablet(768px):
            @media (min-width: 768px) {
                body {
                    font-size: 15px;
                }
            }
        -CSS cho desktop(1024px):
            @media (min-width: 1024px) {
                body {
                    font-size: 16px;
                }
            }
    + Navigation Responsive:
    ![alt text](screenshots/NavMobile.png)
    ![alt text](screenshots/NavDesktop.png)
BÀI B3:
    lệnh compile SCSS -> CSS:
    npm install -D sass
    npx sass styles/main.scss styles/main.css --watch

        