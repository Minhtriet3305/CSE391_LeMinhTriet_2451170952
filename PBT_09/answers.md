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

PHẦN C: DEBUG & PHÂN TÍCH
CÂU C1:
LỖI 1: Dòng 224 - addEventListener("onclick", ...)

JavaScript
// ❌ SAI
document.querySelector("#decrementBtn").addEventListener("onclick", function() {

// ✅ ĐÚNG
document.querySelector("#decrementBtn").addEventListener("click", function() {

Giải thích: Tham số thứ nhất của addEventListener phải là tên event ("click"), không phải tên property ("onclick").

LỖI 2: Dòng 231 - countDisplay = count (gán sai)

JavaScript
// ❌ SAI
countDisplay = count;  // Gán biến countDisplay = 0 (mất reference đến element)

// ✅ ĐÚNG
countDisplay.textContent = count;  // Cập nhật nội dung hiển thị

Giải thích: countDisplay là một reference đến DOM element. Nếu gán countDisplay = count, biến sẽ trỏ sang số 0, mất đi reference đến element.

LỖI 3: Dòng 232 - innerHTML = null

JavaScript
// ❌ SAI (không sai về logic, nhưng không best practice)
historyList.innerHTML = null;

// ✅ ĐÚNG
historyList.innerHTML = "";  // Hoặc
historyList.textContent = "";

Giải thích: Nên gán empty string "" thay vì null. Hoặc dùng while (historyList.firstChild) { historyList.removeChild(historyList.firstChild); } để xóa tất cả children.

LỖI 4: Dòng 243 - item.remove (thiếu dấu ngoặc)

JavaScript
// ❌ SAI
items.forEach(item => {
    item.remove;  // Chỉ reference function, không gọi
});

// ✅ ĐÚNG
items.forEach(item => {
    item.remove();  // Phải có () để gọi function
});

Giải thích: item.remove là reference đến method, cần () để thực thi.

LỖI 5: Dòng 255 - localStorage trả về string, không phải number

JavaScript
// ❌ SAI
count = localStorage.getItem("count");  // Trả về string "5", không phải số 5
countDisplay.textContent = count;  // Sẽ hiển thị "5" nhưng type là string

// ✅ ĐÚNG
count = parseInt(localStorage.getItem("count")) || 0;  // Convert thành number
countDisplay.textContent = count;

Giải thích: localStorage.getItem() luôn trả về string. Cần convert sang number để tính toán chính xác.

LỖI 6: Dòng 256 - Cập nhật DOM khi load từ localStorage

JavaScript
// ❌ KHÔNG ĐẦY ĐỦ
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
    // Nhưng history không được restore!
});

// ✅ ĐÚNG - Restore cả count và history
window.addEventListener("load", () => {
    const savedCount = localStorage.getItem("count");
    const savedHistory = localStorage.getItem("history");
    
    if (savedCount) {
        count = parseInt(savedCount);
        countDisplay.textContent = count;
    }
    
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
LỖI 7: Event binding trên null elements

JavaScript
// ❌ NẾU HTML thiếu các elements, addEventListener sẽ crash
// Ví dụ: nếu không có #incrementBtn trong HTML
document.querySelector("#incrementBtn").addEventListener("click", ...);
// TypeError: Cannot read property 'addEventListener' of null

// ✅ CÁCH SỬA: Kiểm tra element tồn tại trước
const incrementBtn = document.querySelector("#incrementBtn");
if (incrementBtn) {
    incrementBtn.addEventListener("click", function() {
        count++;
        countDisplay.textContent = count;
    });
}

CÂU C2:
1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?

Việc sử dụng vòng lặp để gắn addEventListener cho 1000 phần tử riêng biệt được coi là một "tối kỵ" (Bad Practice) trong lập trình Front-end vì hai lý do lớn sau:

+ Tốn tài nguyên bộ nhớ (Memory Consumption)
Mỗi lần bạn gọi addEventListener, trình duyệt phải khởi tạo và cấp phát một vùng nhớ để lưu trữ Event Listener Object.

Gắn cho 1000 phần tử đồng nghĩa với việc tạo ra 1000 object độc lập nằm chễm chệ trong RAM.

Nếu ứng dụng có nhiều trang hoặc các phần tử này bị xóa/thêm liên tục mà không được gỡ event (removeEventListener) đúng cách, nó sẽ dẫn đến hiện tượng Memory Leak (rò rỉ bộ nhớ), khiến ứng dụng bị chậm, giật lag theo thời gian.

+ Quản lý kém và không linh hoạt (Maintainability)
Giả sử sau khi render 1000 phần tử, bạn có tính năng "Tải thêm 500 item nữa". Bạn lại phải viết thêm một vòng lặp nữa để bind event cho 500 item mới này. Ngược lại, nếu một item bị xóa đi, các event gắn với nó vẫn có thể lơ lửng trong bộ nhớ nếu không được dọn dẹp kỹ.

- Event Delegation giải quyết bài toán này thế nào?
Event Delegation (Ủy quyền sự kiện) giải quyết triệt để vấn đề trên bằng cách tận dụng cơ chế Event Bubbling (Sự kiện nổi bọt) của JavaScript. Thay vì gắn 1000 listener cho 1000 con, chúng ta chỉ gắn duy nhất 1 listener lên phần tử CHA bao bọc chúng.

Khi bạn click vào một phần tử con, sự kiện click đó không dừng lại mà sẽ "nổi bọt" lên các tầng cha của nó. Tại phần tử cha, chúng ta chỉ cần dùng thuộc tính e.target để kiểm tra chính xác phần tử con nào vừa được click.    

2. 
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}

Đoạn code cũ: Mỗi lần chạy qua dòng document.body.appendChild(div);, trình duyệt phải chọc trực tiếp vào cây DOM thật (Real DOM). Hành động này bắt trình duyệt phải tính toán lại kích thước, vị trí và vẽ lại giao diện (gọi là Reflow và Repaint). Lặp lại việc này 1000 lần trong một vòng lặp cực kỳ tốn tài nguyên và gây nghẽn hiệu năng (gây sụt giảm FPS).

Code đã được tối ưu (Refactor):
JavaScript
// 1. Tạo một DocumentFragment (DOM ảo/DOM tạm thời trong bộ nhớ)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // 2. Gắn div vào fragment (Chỉ thao tác trên bộ nhớ nền, KHÔNG gây Reflow)
    fragment.appendChild(div); 
}

// 3. Đổ toàn bộ fragment vào DOM thật ĐÚNG 1 LẦN DUY NHẤT
document.body.appendChild(fragment); // ← Chỉ gây ra đúng 1 lần Reflow!
Tại sao sử dụng DocumentFragment lại nhanh hơn?
Hãy tưởng tượng bạn cần chuyển 1000 viên gạch từ ngoài sân vào trong nhà:

Cách cũ (Gây 1000 lần Reflow): Bạn cầm từng viên gạch một, đi vào nhà đặt xuống, rồi lại đi ra lấy viên tiếp theo. Bạn phải đi qua đi lại đúng 1000 chuyến. Trình duyệt cũng vậy, nó phải tính toán lại giao diện 1000 lần.

Cách mới (Dùng DocumentFragment): Bạn xếp sẵn 1000 viên gạch lên một chiếc xe đẩy (đây chính là DocumentFragment). Khi xếp gạch lên xe, bạn vẫn ở ngoài sân (bộ nhớ tạm), cấu trúc ngôi nhà chưa hề bị xáo trộn. Sau khi xếp xong, bạn chỉ cần đẩy xe vào nhà đúng 1 lần duy nhất.

