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