PHẦN A: KIỂM TRA ĐỌC HIỂU
CÂU A1:
Thứ tự output:

Code
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

Giải thích chi tiết Event Loop, Microtask Queue, Macrotask Queue:

Call Stack (Ngăn xếp gọi): Thực thi code đồng bộ từ trên xuống

Microtask Queue (Hàng đợi vi tác vụ):

Chứa: Promise.then(), Promise.catch(), MutationObserver
Ưu tiên cao hơn Macrotask
Thực thi tất cả microtasks trước khi đến macrotask
Macrotask Queue (Hàng đợi tác vụ):

Chứa: setTimeout(), setInterval(), setImmediate()
Thực thi 1 task rồi kiểm tra lại microtask
Quy trình:

1. Call Stack: console.log("1 - Start") ✓
   → Output: 1 - Start

2. setTimeout → Đẩy vào Macrotask Queue
   
3. Promise.resolve().then() → Đẩy vào Microtask Queue

4. Call Stack: console.log("4 - End") ✓
   → Output: 4 - End

5. setTimeout (100ms) → Đẩy vào Macrotask Queue

6. Promise.resolve().then() → Đẩy vào Microtask Queue
   (bên trong này có nested setTimeout)

7. Call Stack rỗng → Kiểm tra Microtask Queue
   
8. Thực thi Microtask 1: console.log("3 - Promise")
   → Output: 3 - Promise
   
9. Thực thi Microtask 2: console.log("6 - Promise 2")
   → Output: 6 - Promise 2
   → Đẩy nested setTimeout vào Macrotask Queue

10. Microtask Queue rỗng → Lấy 1 Macrotask
    console.log("2 - Timeout 0ms")
    → Output: 2 - Timeout 0ms
    
11. Kiểm tra Microtask Queue (rỗng) → Lấy Macrotask tiếp theo
    console.log("7 - Nested timeout")
    → Output: 7 - Nested timeout
    
12. Sau 100ms: Lấy setTimeout cuối cùng
    console.log("5 - Timeout 100ms")
    → Output: 5 - Timeout 100ms

CÂU A2:
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
Giải thích từng dòng:

1. await fetch(...) — fetch trả về gì? Tại sao cần await?

fetch() trả về một Promise (không phải data trực tiếp)
Promise này resolve thành Response object khi request hoàn thành
Cần await để đợi Promise resolve, lấy Response object
Không có await → biến response sẽ là Promise chưa resolve

Ví dụ:

JavaScript
// ❌ Không await
const response = fetch(url); // response = Promise { <pending> }
console.log(response.ok); // ❌ Error: undefined

// ✅ Với await
const response = await fetch(url); // response = Response object
console.log(response.ok); // ✅ true/false
2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng

response.ok = true khi status code trong range 200-299
response.ok = false khi status code < 200 hoặc > 299
3 status codes cho ok = false:


- 404 Not Found (tài nguyên không tồn tại)
- 500 Internal Server Error (server lỗi)
- 401 Unauthorized (chưa xác thực)
- 403 Forbidden (không có quyền)
- 429 Too Many Requests (rate limit)
3. response.json() — Tại sao cần await lần nữa?

response.json() cũng trả về Promise
Promise này resolve thành parsed JSON object (sau khi đọc và parse body)
Cần await để đợi process này hoàn thành
response.json() là async operation vì phải:
Đọc response body (stream)
Parse text thành JSON object

Ví dụ:

JavaScript
// ❌ Không await
const data = response.json(); // data = Promise { <pending> }
console.log(data.name); // ❌ Error: undefined

// ✅ Với await
const data = await response.json(); // data = { name: "...", ... }
console.log(data.name); // ✅ "John"

4. try...catch — Catch những lỗi gì?
+-------------------+--------------------------------------------+--------------------------------------------+
|      Loại Lỗi     |                  Ví dụ                     |             Thời điểm xảy ra               |
+-------------------+--------------------------------------------+--------------------------------------------+
|   Network errors  | Mất kết nối internet, rớt mạng,            | Khi request chưa kịp chạm tới server       |
|                   | DNS resolution fail (sai tên miền),...     | (fetch sẽ tự động reject tại đây).         |
+-------------------+--------------------------------------------+--------------------------------------------+
|   Lỗi 4xx / 5xx   | 404 Not Found, 401 Unauthorized,           | Server đã nhận request và trả về lỗi,      |
|                   | 500 Internal Server Error,...              | ta phải tự: throw new Error()              |
|                   |                                            | trong đoạn check: if (!response.ok)        |
+-------------------+--------------------------------------------+--------------------------------------------+
| JSON parse errors | Response trả về là mã HTML (khi sập nguồn) | Khi gọi response.json() nhưng dữ liệu      |
|                   | hoặc text thuần chứ không phải chuỗi JSON. | trả về từ server không đúng định dạng.     |
+-------------------+--------------------------------------------+--------------------------------------------+

CÂU A3:
Sơ đồ 3 trạng thái Promise:


                  Pending (khởi tạo)
                       ↓
         ┌─────────────┴─────────────┐
         ↓                           ↓
    Fulfilled              Rejected
   (resolve)              (reject)
   (thành công)          (thất bại)
   

2.
Callback Hell là gì?

Callback Hell (Pyramid of Doom) = khi callback lồng sâu nhau → code khó đọc, khó bảo trì

Ví dụ Callback Hell (4 cấp):

JavaScript
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                getMoreData(d, function(e) {
                    console.log(e);
                });
            });
        });
    });
});

Vấn đề:

Khó theo dõi logic
Khó xử lý error (cần try-catch ở mỗi level)
Khó bảo trì và mở rộng

Refactor thành Async/Await:

async function fetchAll() {
    try {
        const a = await getData();
        const b = await getMoreData(a);
        const c = await getMoreData(b);
        const d = await getMoreData(c);
        const e = await getMoreData(d);
        console.log(e);
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchAll();
