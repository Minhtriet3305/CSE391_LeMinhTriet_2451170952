PHẦN A: KIỂM TRA ĐỌC HIỂU
CÂU A1:
    -Đoạn 1:
        +Dự đoán: undefined
        + Giải thích: Do cơ chế Hoisting (nâng biến). Khi trình biên dịch JavaScript quét qua đoạn code, nó sẽ "nâng" phần khai báo var x; lên đầu phạm vi, nhưng giữ nguyên vế gán giá trị = 5 ở vị trí cũ. Vì vậy, lúc console.log(x) chạy, biến x đã tồn tại nhưng chưa được gán giá trị, mặc định là undefined
    -Đoạn 2:
        +Dự đoán: Lỗi không thể truy cập y
        +Giải thích: Biến khai báo bằng let (và cả const) cũng được hoisted, nhưng chúng bị rơi vào vùng chết tạm thời Temporal Dead Zone (TDZ). Bạn hoàn toàn không thể truy cập, đọc hay ghi vào biến này trước dòng khai báo chính thức của nó. Nếu cố tình truy cập, JavaScript sẽ ném ra lỗi
    -Đoạn 3:
        +Dự đoán: lỗi TypeError
        +Giải thích: Biến khai báo bằng const là một hằng số. Sau khi đã gán giá trị ban đầu (giai đoạn khởi tạo), bạn không thể tái gán (re-assign) một giá trị hoàn toàn mới cho nó. Hành động z = 20 vi phạm quy tắc này và gây ra lỗi TypeError.
    -Đoạn 4:
        +Dự đoán: [1, 2, 3, 4]
        +Giải thích: Tuy arr được khai báo bằng const, nhưng giá trị của nó là một Object (cụ thể là Array - kiểu dữ liệu tham chiếu). const chỉ bảo vệ liên kết (reference) của biến, không cho phép bạn trỏ arr sang một mảng khác (ví dụ: arr = [5, 6]). Tuy nhiên, nội dung bên trong vùng nhớ mà arr trỏ tới (các phần tử mảng) hoàn toàn có thể thay đổi được thông qua các phương thức như .push().
    -Đoạn 5: 
        +Dự đoán: Trong block: 2, Ngoài block: 1
        +Giải thích: Biến let a = 2 nằm bên trong cặp ngoặc nhọn là một biến hoàn toàn độc lập với let a = 1 ở bên ngoài. Khi chạy câu lệnh log trong block, JavaScript sẽ ưu tiên tìm kiếm biến ở phạm vi gần nhất (Local Scope), in ra 2. Khi ra ngoài block, biến let a = 2 bị giải phóng, lệnh log ngoài cùng sẽ đọc biến a = 1.
    
    -Sau khi chạy file JS ta có so sánh sau:
| Đoạn code | Dự đoán Output | Kết quả chạy thực tế | Đánh giá | Nhận xét nhanh |
| :---: | :--- | :--- | :---: | :--- |
| **Đoạn 1** | `undefined` | `undefined` | Khớp 100% | Do biến `var` bị hoisted. |
| **Đoạn 2** | `ReferenceError` | `ReferenceError: Cannot access 'y' before initialization` | Khớp 100% | Do `let` dính lỗi Temporal Dead Zone (Vùng chết tạm thời). |
| **Đoạn 3** | `TypeError` | `TypeError: Assignment to constant variable.` | Khớp 100% | Không thể tái gán (`re-assign`) giá trị mới cho hằng số `const`. |
| **Đoạn 4** | `[1, 2, 3, 4]` | `[1, 2, 3, 4]` | Khớp 100% | `const` với Object/Array chỉ bảo vệ liên kết, vẫn cho phép thay đổi phần tử bên trong. |
| **Đoạn 5** | Trong block: `2`<br>Ngoài block: `1` | Trong block: `2`<br>Ngoài block: `1` | Khớp 100% | Từ khóa `let` tuân thủ nghiêm ngặt Block Scope (Phạm vi khối lệnh). |

CÂU A2: