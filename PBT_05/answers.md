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
PHẦN C: PHÂN TÍCH
BÀI C1:
    Phân tích trang web Shopee
    + Kích thước 375px: ![alt text](screenshots/375px_Shopee.png)
    1.Navigation thay đổi thế nào: 
    Không thay đổi gì cả. Thanh tìm kiếm, các icon danh mục, và dàn menu phía trên vẫn giữ nguyên cấu trúc của bản PC.
    Vấn đề: Do không chuyển sang giao diện Mobile (dạng Hamburger hay Search đơn giản), thanh điều hướng bị co nhỏ lại một cách thảm hại, khiến người dùng rất khó click chính xác.
    2. Lưới content thay đổi mấy cột?
    Vẫn giữ nguyên số cột của Desktop: Nhìn vào phần Danh mục (Category), nó vẫn là 10 cột trên một hàng ngang.
    Phần Flash Sale và Mall vẫn giữ nguyên tỷ lệ chia cột như trên màn hình lớn.
    Kết quả: Các hình ảnh và icon sản phẩm bé tí hon, chữ bên dưới gần như không thể đọc được nếu không dùng thao tác "zoom" thủ công trên điện thoại.
    3. Element nào bị ẩn trên mobile?
    Không có element nào bị ẩn: Trong ảnh bạn gửi, tất cả các banner quảng cáo, các icon danh mục phụ, và các banner Flash Sale vẫn nằm đó.
    Thay vì ẩn bớt các thành phần rườm rà như giao diện Mobile chuẩn, ở đây mọi thứ chỉ bị co lại để cố vừa với chiều rộng 375px.
    4.Font size có thay đổi không?
    Không thay đổi về giá trị (px) nhưng thay đổi về tỷ lệ hiển thị: * Trên Code vẫn là font size đó, nhưng vì trình duyệt đang ép một trang web rộng ~1200px vào màn hình 375px, nên font chữ nhìn thực tế chỉ còn khoảng 3px - 4px.
    Chữ "Flash Sale" hay giá tiền sản phẩm trong ảnh mờ tịt, không thể đọc được nếu không căng mắt ra nhìn.

    + Kích thước 768px: 
![alt text](screenshots/768px_Shopee.png)
    1. Navigation thay đổi thế nào?
    Giữ nguyên 100% layout Desktop. * Không hề có sự xuất hiện của Hamburger menu hay thanh search tối giản. Các dòng text nhỏ xíu như "Kết nối", "Thông báo", "Hỗ trợ" vẫn nằm nguyên vị trí cũ.
    Vấn đề: Ở độ phân giải 768px, các nút bấm này trở nên quá nhỏ so với kích thước đầu ngón tay người dùng
    2. Lưới content thay đổi mấy cột?
    Số cột danh mục: Vẫn là 10 cột/hàng.
    Số cột Flash Sale: Vẫn hiển thị 6 sản phẩm dàn hàng ngang.
    Nhận xét: Web không hề có cơ chế nhảy dòng (wrap) hay thay đổi số lượng cột để phù hợp với chiều ngang hẹp. Việc giữ 10 cột trên màn hình 768px khiến mỗi icon chỉ còn chiếm một diện tích rất bé, nhìn cực kỳ rối mắt.
    3.Element nào bị ẩn trên mobile?
    Không có element nào bị ẩn.
    Thông thường, khi xuống 768px, các banner quảng cáo phụ hoặc các thành phần ít quan trọng sẽ được ẩn đi. Nhưng ở đây, Shopee vẫn hiển thị đầy đủ từ Slider chính, banner phụ bên phải đến các icon dịch vụ nhỏ phía dưới banner. Layout bị "nhồi nhét" y hệt bản PC.
    4.Font size có thay đổi không?
    Font size hệ thống không thay đổi, vì trình duyệt đang ép một trang web (vốn có chiều rộng chuẩn khoảng 1200px) vào không gian 768px, nên font chữ bị tỉ lệ thuận thu nhỏ lại.
    Các nhãn chữ dưới danh mục như "Thời Trang Nam", "Điện Thoại & Phụ Kiện" rất khó để đọc được nội dung nếu không phóng to màn hình.

    +Kích thước 1440px:
![alt text](screenshots/1440px_Shopee.png)
    1. Navigation thay đổi thế nào?
    Ở kích thước 1440 thì các nút bấm có khoảng cách, font chữ rõ ràng, dễ thao tác bằng chuột.
    2. Lưới content thay đổi mấy cột?
    Banner chính: Chia theo tỷ lệ khoảng 2/3 cho Slider lớn bên trái và 1/3 cho 2 banner nhỏ xếp chồng bên phải.
    Hệ thống Icon dịch vụ: Dàn hàng ngang phía dưới banner với đầy đủ text và hình ảnh minh họa rõ nét.
    Tỉ lệ: Ở mức 1440px, các thành phần nội dung tập trung vào khu vực giữa (container), hai bên lề có khoảng trống để cân bằng thị giác.
    3. Element nào bị ẩn?
    Hiển thị đầy đủ 100% các tính năng và quảng cáo.
    Các hiệu ứng hover (khi di chuột vào) và các menu thả xuống (Dropdown) hoạt động đầy đủ trên trình duyệt PC.
    4.Font size thay đổi thế nào?
    Tiêu đề/Menu: Kích thước chuẩn dễ đọc (thường từ 12px đến 14px cho text nhỏ và 16px+ cho tiêu đề).
    Độ tương phản: Chữ trắng trên nền cam của Header cực kỳ nổi bật, đạt tiêu chuẩn về khả năng tiếp cận (Accessibility) trên màn hình lớn.

CÂU C2:
    1.Kích thước mobile:
    Ở Mobile, chúng ta ưu tiên việc cuộn trang (scrolling). Mọi thứ đều full chiều ngang để dễ đọc.
    Header: [Logo] | [Call Icon]
    Hero Image: Ảnh to, tràn viền.
    Grid: 6 ảnh món ăn xếp thành 1 cột dọc (hoặc 2 cột nếu ảnh nhỏ).
    Form: Nằm ngay dưới ảnh món ăn.
    Map: Cuối trang.

    +----------------------------+
    | [LOGO]        [PHONE ICON] |  <-- Header: Tối giản
    +----------------------------+
    |                            |
    |       HERO IMAGE           |  <-- Full width
    |                            |
    +----------------------------+
    |      [FOOD PHOTO 1]        |  <-- Grid 1 cột
    |      [FOOD PHOTO 2]        |      (Ảnh to, dễ nhìn)
    |      [FOOD PHOTO 3]        |
    |      [FOOD PHOTO 4]        |
    |      [FOOD PHOTO 5]        |
    |      [FOOD PHOTO 6]        |
    +----------------------------+
    |      BOOKING FORM          |  <-- Form nằm dọc
    |  [ Ngày ] [ Giờ ]          |
    |  [ Số người ]              |
    |  [ Ghi chú ]               |
    |  [[ ĐẶT BÀN NGAY ]]        |
    +----------------------------+
    |       GOOGLE MAPS          |  <-- Full width
    +----------------------------+
    |      FOOTER (Gọn)          |  <-- Ẩn bớt text phụ
    +----------------------------+
        
    2.Kích thước tablet:

    Header: [Logo] | [Số điện thoại]
    Grid: Chia thành 2 cột x 3 hàng.
    Booking Section: Chia đôi: [Form đặt bàn] và [Giờ mở cửa/Thông tin].
    Map: Tràn khung bên dưới.

    +------------------------------------------+
    |  [ LOGO ]              [ 090x.xxx.xxx ]  |
    +------------------------------------------+
    |                                          |
    |              HERO IMAGE                  |
    |                                          |
    +------------------------------------------+
    |  [ FOOD PHOTO 1 ]  |  [ FOOD PHOTO 2 ]   | <-- Grid 2 cột
    |  [ FOOD PHOTO 3 ]  |  [ FOOD PHOTO 4 ]   |
    |  [ FOOD PHOTO 5 ]  |  [ FOOD PHOTO 6 ]   |
    +------------------------------------------+
    |       BOOKING FORM      |   INFO / TIME  | <-- Chia đôi 
    | [ Date ]   [ Time ]     |   Open: 8AM    |     Form & Info
    | [ Guest ]  [ Note ]     |   Close: 10PM  |
    |    [[ RESERVE ]]        |                |
    +------------------------------------------+
    |              GOOGLE MAPS                 |
    +------------------------------------------+
    |             FOOTER (Full)                |
    +------------------------------------------+

    3.Kích thước desktop:
    Grid: Chia thành 3 cột x 2 hàng.
    Layout chính (Main content): * Trái (8 cột): Hero content + Grid ảnh + Bản đồ.
    Phải (4 cột - Sidebar): Form đặt bàn (Sticky). Khi khách cuộn xem ảnh món ăn bên trái, cái Form bên phải vẫn luôn hiện diện để họ đặt bàn bất cứ lúc nào.

    +--------------------------------------------------------------+
    | [ LOGO ]   Home  Menu  Contact          [ Hotline: 090x... ] |
    +--------------------------------------------------------------+
    |                                                              |
    |                        HERO IMAGE                            |
    |                                                              |
    +--------------------------------------------------------------+
    |        MAIN CONTENT (8 Cột)        |      SIDEBAR (4 Cột)    |
    |                                    |                         |
    |  +--- GRID MÓN ĂN (3 Cột) ---+     |    +--------------+     |
    |  | [Ảnh 1]  [Ảnh 2]  [Ảnh 3] |     |    |   BOOKING    |     |
    |  | [Ảnh 4]  [Ảnh 5]  [Ảnh 6] |     |    |    FORM      |     |
    |  +---------------------------+     |    |              |     |
    |                                    |    | (Sticky - Chạy |     |
    |  +--- BẢN ĐỒ GOOGLE MAPS ----+     |    |  theo trang) |     |
    |  |                           |     |    |              |     |
    |  |          MAP HERE         |     |    +--------------+     |
    |  +---------------------------+     |                         |
    +--------------------------------------------------------------+
    |                      FOOTER                                  |
    +--------------------------------------------------------------+

    CSS SKELETON:
    /* MOBILE FIRST */
    .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    }

    .food-grid {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột mobile */
    }

    /* TABLET (>= 768px) */
    @media (min-width: 768px) {
    .food-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 cột tablet */
    }
    }

    /* DESKTOP (>= 1024px) */
    @media (min-width: 1024px) {
        .food-grid {
            grid-template-columns: repeat(3, 1fr); /* 3 cột desktop */
        }

        .main-layout {
            display: grid;
            grid-template-columns: 8fr 4fr; /* Sidebar 4 phần */
            gap: 30px;
        }

        .sidebar {
            position: sticky;
            top: 20px; /* Form dính khi cuộn */
        }
    }