CÂU A1:
Position	Vẫn chiếm chỗ trong flow?	        Tham chiếu vị trí	                  Cuộn theo trang?	        Use case

static		Có                          top, right, bottom, left không hoạt động       Có                 Mặc định mọi phần tử

relative	Có                          Tham chiếu vị trí của chính nó                 Có             Dịch chuyển nhẹ các element

absolute	Không                       Phần tử cha có relative                        Có             Badge, dropdown, tooltip, overlay

fixed		Không                       Tham chiếu đến viewport                        Không      Chat button, cookie banner, header cố định

sticky		Có                          Tham chiếu đến viewport (khi dính)             Có         Sticky header,sticky table header, sidebar

Trả lời câu hỏi thêm: 
    1.Khi nào absolute tham chiếu body?
    Khi không có phần tử nào là position: relative , absolute , fixed hoặc sticky chứa nó
    2. Khi nào tham chiếu parent?
    Khi parent trực tiếp hoặc gián tiếp có position: relative, absolute, fixed hoặc sticky (thường dùng relative cho parent).
    3.Giải thích khái niệm "nearest positioned ancestor"
    Là phần tử bao ngoài gần nhất (tính từ phần tử đang xét) có thuộc tính position.

CÂU A2:
    Trường hợp 1:
    4 items tạo thành 1 hàng ngang
    -text art:
    [ Item 1 ] [ Item 2 ] [ Item 3 ] [ Item 4 ]

    Trường hợp 2:
    Mỗi hàng 2 items (45% + 2.5% left + 2.5% right = 50% × 2 = 100%)
    có 6 items -> có 3 hàng và 2 cột
    flex-wrap: wrap giúp xuống dòng nếu không đủ chỗ
    -text art:
    [ Item 1 ] [ Item 2 ]
    [ Item 3 ] [ Item 4 ]
    [ Item 5 ] [ Item 6 ]

    Trường hợp 3:
    3 items tạo thành 1 hàng ngang, khoảng cách giữa các item bằng nhau
    -text art:
    [ Item 1 ]            [ Item 2 ]            [ Item 3 ]

    Trường hợp 4:
    3 items tạo thành 1 hàng có 3 cột
    +Cột 1: cố định 200px
    +Cột 2: co giãn chiếm phần còn lại (1fr)
    +Cột 3: cố định 200px
    +Giữa các cột có gap (tạo khoảng cách) 20px
    - text art:
    [ Item 1 ] <---gap 20px--> [      Item 2       ] <---gap 20px---> [ Item 3 ]
    200px                               1fr                             200px

    Trường hợp 5:
    Mỗi hàng 3 items (vì repeat(3, 1fr))
    + Hàng 1: items 1, 2, 3
    + Hàng 2: items 4, 5, 6
    + Hàng 3: chỉ có item 7 ở cột đầu tiên, cột 2 và 3 để trống
    + gap: 10px giữa các item (cả hàng và cột)
    - text art:
    [ Item 1 ] [ Item 2 ] [ Item 3 ]
    [ Item 4 ] [ Item 5 ] [ Item 6 ]
    [ Item 7 ] [  trống ] [  trống ]

PHẦN C: SUY LUẬN

CÂU C1:
1. Navigation bar ngang (logo + menu + buttons): dùng flexbox. Vì Navbar chủ yếu là sắp xếp các phần tử theo 1 chiều ngang,flexbox rất mạnh cho việc căn giữa, spacing (justify-content) và responsive đơn giản.
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước): dùng grid. Đây là layout dạng 2 chiều (hàng + cột). CSS Grid giúp chia đều 3 cột dễ dàng bằng grid-template-columns và tự động xuống hàng khi thêm ảnh mới.
3. Layout blog: main content + sidebar: dùng grid. Blog layout thường cần chia khu vực rõ ràng: content lớn + sidebar nhỏ,grid phù hợp vì quản lý các cột chính xác hơn.
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ): dùng grid. Vì footer có cấu trúc 4 cột nên dùng grid có thể chia các cột tiện hơn.
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy): dùng flexbox. Card là layout theo 1 chiều dọc, nên flexbox phù hợp. Có thể dùng display:flex; flex-direction:column; và margin-top:auto cho button để nút luôn nằm dưới đáy card.

CÂU C2:

1. Lỗi 1: 
   -Nguyên nhân: .card-container là flex, nhưng bản thân mỗi .card không phải flex column. Nội dung dài hơn làm card thấp hơn → nút “Mua” không thẳng hàng.
   -Code sửa: 
    .card-container { display: flex; flex-wrap: wrap; }
    .card { display: flex; flex-direction: column; width: 30%; margin: 1.5%; }
    .card img { width: 100%; }
    .card h3 { font-size: 18px; }
    .card .btn { margin-top: auto; padding: 10px; }
   -Lúc chưa sửa:
    ![alt text](screenshots/Loi1_ChuaSua.png)
   -Khi đã sửa:
    ![alt text](screenshots/Loi1_DaSua.png)

2. Lỗi 2:
    -Nguyên nhân: .hero có display: flex nhưng mặc định flex-direction row, main-axis là ngang, cross-axis dọc. Không có căn chỉnh ⇒ item con co giãn tự nhiên và nằm ở đầu.
    -Code sửa:
    .hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .hero-content {
        text-align: center;
    }
    -Lúc chưa sửa:
    ![alt text](screenshots/Loi2_ChuaSua.png)
    -Khi đã sửa:
    ![alt text](screenshots/Loi2_DaSua.png)

3. Lỗi 3:
    -Nguyên nhân:  .layout {display: flex} mặc định các phần tử con có flex-shrink: 1, khi content quá dài, sidebar phải co lại để tránh tràn.
    -Code sửa:
    .layout { display: flex;}
    .sidebar { width: 250px; flex-shrink: 0}
    .content { flex: 1; }
    -Lúc chưa sửa:
    ![alt text](screenshots/Loi3_ChuaSua.png)
    -Khi đã sửa: 
    ![alt text](screenshots/Loi3_DaSua.png)