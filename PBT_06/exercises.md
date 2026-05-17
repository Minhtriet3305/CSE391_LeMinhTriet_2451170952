TRACK A: BOOTSTRAP 5

PHẦN A: ĐỌC HIỂU
CÂU A1:
+------------------------+------------------------+------------------------+------------------------+
| Kích thước             | < 768px                | 768px - 991px          | >= 992px               |
+------------------------+------------------------+------------------------+------------------------+
| Số cột (mỗi Box)       | 12 cột                 | 6 cột                  | 3 cột                  |
+------------------------+------------------------+------------------------+------------------------+
|                        | [      Box 1      ]    | [  Box 1  ][  Box 2  ] | [B1][B2][B3][B4]       |
|                        | [      Box 2      ]    | [  Box 3  ][  Box 4  ] |                        |
| Box layout             | [      Box 3      ]    |                        |                        |
|                        | [      Box 4      ]    |                        |                        |
+------------------------+------------------------+------------------------+------------------------+

trả lời câu hỏi thêm:
col-md-6:
    col: Viết tắt của Column (Cột).
    md: Medium, ám chỉ breakpoint dành cho các màn hình có kích thước trung bình (thường từ 768px đến 992px).
    6: Số lượng cột mà phần tử đó sẽ chiếm trên lưới 12 cột.
    => Ý nghĩa: Trên các thiết bị có màn hình từ mức trung bình trở lên (width >= 768px), phần tử này sẽ chiếm 6 cột trên tổng số 12 cột của hàng (tương đương 50% chiều rộng của container).
tại sao không cần viết col-sm-12:
    Grid System hoạt động theo nguyên lý Mobile-First (ưu tiên thiết kế cho màn hình nhỏ nhất trước, sau đó mở rộng dần lên màn hình lớn qua Media Queries).Khi bạn đã khai báo col-12, thuộc tính này áp dụng cho tất cả kích thước màn hình từ nhỏ nhất trở lên (từ 0px trở đi).

CÂU A2:
1.
    d-none: Ẩn phần tử này đi (display: none) trên tất cả các kích thước màn hình, bắt đầu từ màn hình nhỏ nhất (0px trở lên).
    d-md-block: Kể từ điểm breakpoint màn hình trung bình (md 768px) trở lên, ghi đè lại thuộc tính hiển thị thành dạng khối (display: block).
2.
    mt-3 (Margin Top 3): Thêm một khoảng cách lề phía trên bên ngoài phần tử. Độ rộng khoảng cách bằng mức 3 theo quy chuẩn của framework (thường là 1rem hoặc 16px).

    mb-auto (Margin Bottom Auto): Tự động căn chỉnh lề phía dưới bên ngoài phần tử dựa trên khoảng trống còn lại. Thường dùng trong Flexbox để đẩy các phần tử khác xuống dưới cùng.

    px-4 (Padding X 4): Thêm khoảng cách đệm bên trong phần tử ở cả 2 hướng trái (left) và phải (right) với mức độ 4.

    py-2 (Padding Y 2): Thêm khoảng cách đệm bên trong phần tử ở cả 2 hướng trên (top) và dưới (bottom) với mức độ 2.

    ms-2 (Margin Start 2): Thêm khoảng cách lề bên ngoài ở phía bắt đầu (bên trái đối với ngôn ngữ đọc từ trái sang phải như tiếng Việt/Anh) với mức độ 2.
3.
    .container: * Có độ rộng cố định (max-width) thay đổi nhảy theo từng breakpoint (576px, 768px, 992px,).Trên màn hình cực nhỏ (576px), nó sẽ tự động tràn 100% chiều rộng. Nó luôn tự căn giữa trang nhờ lề trái/phải tự động.

    .container-fluid: * Luôn luôn chiếm 100% chiều rộng của màn hình (width: 100%) ở mọi cấp độ kích thước, từ điện thoại siêu nhỏ cho đến màn hình tivi lớn. Không bị giới hạn bởi các mốc breakpoint.

    .container-md: * Sẽ tràn viền 100% chiều rộng trên các màn hình nhỏ hơn mức Medium (768px).Khi màn hình đạt từ mức md trở lên ( 768px), nó bắt đầu hoạt động giống hệt như .container thông thường (độ rộng bị giới hạn cố định theo từng nấc breakpoint tiếp theo).

PHẦN C: PHÂN TÍCH 
CÂU C1:
    1.
    Để thay đổi màu $primary từ xanh dương mặc định sang mã màu mới là #E63946, quy trình chuẩn là can thiệp vào mã nguồn SASS (.scss) của Bootstrap trước khi biên dịch, thay vì chỉnh sửa trực tiếp trên file CSS đã đóng gói.
    -Công cụ chuẩn bị: Trình biên dịch SASS (SASS Compiler): Có thể sử dụng Extension Live Sass Compiler trên VS Code hoặc cài đặt gói sass thông qua dòng lệnh npm.
    2.
    - Khi override .btn-primary { background: red; } thì hover, focus, active vẫn giữ màu cũ → giao diện sai.
    - Nếu nhiều file CSS, dễ bị đè qua đè lại, phải dùng !important rất bẩn.
    - Các class liên quan như .bg-primary, .text-primary không thay đổi theo → mất đồng bộ.
    - Khó nâng cấp Bootstrap sau này.

