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

```javascript
console.log(typeof null);              // object
console.log(typeof undefined);         // undefined
console.log(typeof NaN);              // number
console.log("5" + 3);                 // 53
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // ""
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" hoặc 0
```

Trường hợp 1: "5" + 3 ➔ Kết quả: "53" (Kiểu String)
    + Cơ chế: Toán tử + trong JavaScript đóng hai vai trò: Phép cộng toán học và Phép nối chuỗi.
    + Quy tắc: Nếu ít nhất một trong hai vế của toán tử + là một chuỗi (String), JavaScript sẽ ưu tiên chuyển vế còn lại thành chuỗi và thực hiện phép nối chuỗi.
    + Quá trình xử lý: Số 3 bị ép kiểu tự động thành chuỗi "3". Phép toán trở thành "5" + "3", nối lại thành "53".

Trường hợp 2: "5" - 3 ➔ Kết quả: 2 (Kiểu Number)
    + Cơ chế: Khác với toán tử +, toán tử - (trừ), * (nhân), / (chia) chỉ có duy nhất một vai trò là thực hiện các phép tính toán học. Trong JavaScript không hề tồn tại khái niệm "trừ chuỗi".
    + Quy tắc: Khi gặp các toán tử toán học thuần túy này, JavaScript bắt buộc phải ép kiểu (convert) các vế không phải là số về dạng Number để tính toán.
    + Quá trình xử lý: Chuỗi "5" được ép kiểu tự động thành số 5. Phép toán trở thành 5 - 3, kết quả trả về số 2.

CÂU A3:
```
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```
Quy tắc từ giờ trở đi không nên dùng == . Vì; 
+ === không ép kiểu → Kết quả dự đoán được, không có "bẫy"
+ == có nhiều quy tắc ép kiểu phức tạp, dễ gây bug khó tìm

CÂU A4:
if ("0") console.log("A");           //  IN (chuỗi "0" là truthy)
if ("") console.log("B");            //  KHÔNG (chuỗi rỗng là falsy)
if ([]) console.log("C");            //  IN (mảng rỗng là truthy)
if ({}) console.log("D");            //  IN (object rỗng là truthy)
if (null) console.log("E");          //  KHÔNG (null là falsy)
if (0) console.log("F");             //  KHÔNG (0 là falsy)
if (-1) console.log("G");            //  IN (-1 là truthy)
if (" ") console.log("H");           //  IN (dấu cách là truthy - vì nó KHÔNG rỗng)

CÂU A5:
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `
  <div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
  </div>
`;