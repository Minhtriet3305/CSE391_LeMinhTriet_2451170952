PHẦN A: KIỂM TRA ĐỌC HIỂU
CÂU A1:
    1. VẼ DOM TREE:
        div#app
        │
        ├── header
        │    │
        │    ├── h1
        │    │    └── "Todo App"
        │    │
        │    └── nav
        │         ├── a [href="#", class="active"]
        │         │    └── "All"
        │         ├── a [href="#"]
        │         │    └── "Active"
        │         └── a [href="#"]
        │              └── "Completed"
        │
        └── main
            │
            ├── form#todoForm
            │    ├── input#todoInput [type="text"]
            │    └── button [type="submit"]
            │         └── "Add"
            │
            └── ul#todoList
                ├── li.todo-item
                │    └── "Learn HTML"
                │
                └── li.todo-item.completed
                        └── "Learn CSS"
    2. querySelector cho mỗi yêu cầu:
    // Chọn thẻ <h1>
    document.querySelector("h1");

    // Chọn input trong form
    document.querySelector("#todoForm input");
    // hoặc
    document.querySelector("#todoInput");

    // Chọn tất cả .todo-item
    document.querySelectorAll(".todo-item");

    // Chọn link đang active
    document.querySelector("a.active");
    // hoặc
    document.querySelector("nav a.active");

    // Chọn <li> đầu tiên trong #todoList
    document.querySelector("#todoList li");
    // hoặc
    document.querySelector("#todoList li:first-child");

    // Chọn tất cả <a> bên trong <nav>
    document.querySelectorAll("nav a");

CÂU A2:
+-------------+------------------------------------+---------------+------------------+
|  Thuộc tính |               Mô tả                |    Trả về     | Có parse HTML    |
+-------------+------------------------------------+---------------+------------------+
|  innerHTML  | Trả về HTML content bên trong      |  HTML string  |    ✅ Có        |
|             | element, bao gồm các tags          |               | (Nguy hiểm! ⚠️) |
+-------------+------------------------------------+---------------+------------------+
| textContent | Trả về chỉ text, không có HTML tags|  Text string  |    ❌ Không     |
+-------------+------------------------------------+---------------+------------------+

Ví dụ minh họa:
 + HTML
<div id="example">
    <p>Hello <strong>World</strong></p>
</div>

 + JavaScript
const el = document.querySelector("#example");

console.log(el.innerHTML);    
console.log(el.textContent);   

// Khi gán giá trị:
el.innerHTML = "<span>New</span>";   // Tạo element <span> mới
el.textContent = "<span>New</span>"; // Hiển thị chuỗi "<span>New</span>" như text

Khi nào dùng mỗi cái:
+ innerHTML: Khi bạn muốn render HTML content (form, card, danh sách phức tạp) từ JavaScript
+ textContent: Khi bạn chỉ cần cập nhật text đơn giản, hoặc khi lấy dữ liệu không có HTML

- Tại sao InnerHTML gây ra lỗ hổng XSS:
Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi ứng dụng web vô tình thực thi một đoạn mã JavaScript độc hại từ phía người dùng.

Khi bạn sử dụng innerHTML, trình duyệt sẽ đóng vai trò là một HTML Parser. Nó không chỉ xem giá trị truyền vào là chữ (text) thuần túy, mà nó sẽ quét qua chuỗi đó, tìm các thẻ HTML và cố gắng biên dịch (parse) rồi render chúng lên màn hình.

Nếu dữ liệu nhập vào (User Input) chứa mã độc như thẻ <script> hoặc các thuộc tính bắt sự kiện lỗi như onerror, onload, trình duyệt sẽ ngay lập tức thực thi đoạn mã đó dưới danh nghĩa của trang web.

- Ví dụ minh họa: 
// ❌ NGUY HIỂM - Không bao giờ dùng innerHTML với user input!
const userInput = document.querySelector("#search").value;
// Giả sử user nhập: <img src=x onerror="alert('Hacked!')">
document.querySelector("#result").innerHTML = userInput;  
// ← Script sẽ được thực thi! alert sẽ popup

// ✅ CÁCH SỬA 1: Dùng textContent thay vì innerHTML
document.querySelector("#result").textContent = userInput;
// ← Hiển thị nguyên văn string, không parse HTML/script

// ✅ CÁCH SỬA 2: Sanitize HTML (loại bỏ tag nguy hiểm)
function sanitizeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;  // Gán vào textContent để escape HTML
    return div.innerHTML;   // Lấy ra HTML đã được escape
}
const safeHTML = sanitizeHTML(userInput);
document.querySelector("#result").innerHTML = safeHTML;

// ✅ CÁCH SỬA 3: Dùng library như DOMPurify
// <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
const cleanHTML = DOMPurify.sanitize(userInput);
document.querySelector("#result").innerHTML = cleanHTML;

CÂU A3:
Không có stopPropagation():
    Khi click vào button, event bubble up (nổi lên) từ button → inner → outer

    Output:
        BUTTON
        INNER
        OUTER

    Giải thích: Event bubbling là quá trình sự kiện được trigger từ element con lên đến các element cha. Thứ tự là:

    Event xảy ra trên #btn → In "BUTTON"
    Event bubble up đến #inner → In "INNER"
    Event tiếp tục bubble up đến #outer → In "OUTER"
    
Có stopPropagation():
    Khi uncomment e.stopPropagation() trong event handler của button:

    Output:
        BUTTON

    Giải thích: stopPropagation() dừng sự lan truyền (bubbling) của event. Chỉ element được click là thực thi handler, event không bubble lên cha.