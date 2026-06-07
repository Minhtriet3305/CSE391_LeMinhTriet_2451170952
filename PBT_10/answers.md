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

PHẦN C: PHÂN TÍCH
CÂU C1:
1. Network Errors (mất mạng giữa chừng)
JavaScript
async function handleNetworkError(error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Network error: Mất kết nối, DNS fail, CORS blocked
        return {
            type: 'NETWORK_ERROR',
            message: 'Không có kết nối Internet. Vui lòng kiểm tra lại.',
            retryable: true
        };
    }
}
Xử lý:

Hiện thông báo "Mất kết nối Internet"
Cung cấp nút "Thử lại"
Lưu request để retry sau khi online
Dùng navigator.onLine để detect online/offline
JavaScript
window.addEventListener('online', () => {
    console.log('Connection restored. Retrying...');
    retryFailedRequests();
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});
2. API Errors (server trả 4xx/5xx)
JavaScript
async function handleAPIError(response) {
    const statusHandlers = {
        400: {
            message: 'Yêu cầu không hợp lệ. Kiểm tra lại thông tin.',
            retryable: false
        },
        401: {
            message: 'Chưa xác thực. Vui lòng đăng nhập lại.',
            action: 'REDIRECT_LOGIN',
            retryable: false
        },
        403: {
            message: 'Bạn không có quyền truy cập tài nguyên này.',
            retryable: false
        },
        404: {
            message: 'Không tìm thấy tài nguyên yêu cầu.',
            retryable: false
        },
        429: {
            message: 'Quá nhiều yêu cầu. Vui lòng chờ...',
            retryable: true,
            retryAfter: parseInt(response.headers.get('Retry-After')) * 1000
        },
        500: {
            message: 'Lỗi máy chủ. Vui lòng thử lại sau.',
            retryable: true
        },
        503: {
            message: 'Dịch vụ đang bảo trì. Vui lòng quay lại sau.',
            retryable: true
        }
    };
    
    return statusHandlers[response.status] || {
        message: `Lỗi ${response.status}. Vui lòng thử lại.`,
        retryable: true
    };
}
3. Timeout (API chậm > 10 giây)
JavaScript
async function fetchWithTimeout(url, timeoutMs = 10000, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout sau ${timeoutMs}ms`);
        }
        throw error;
    }
}

// Sử dụng:
try {
    const data = await fetchWithTimeout('https://api.example.com/data', 10000);
} catch (error) {
    if (error.message.includes('timeout')) {
        console.log('API quá chậm. Vui lòng thử lại.');
    }
}
4. Retry Logic (thử lại 3 lần nếu lỗi network)
JavaScript
async function fetchWithRetry(url, maxRetries = 3, options = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}: ${url}`);
            
            const response = await fetchWithTimeout(url, 10000, options);
            return response;
        } catch (error) {
            lastError = error;
            
            // Không retry nếu lỗi 4xx (trừ 429)
            if (error.message.includes('HTTP 4') && !error.message.includes('429')) {
                throw error;
            }
            
            // Không retry nếu là lần cuối
            if (attempt === maxRetries) break;
            
            // Exponential backoff: 1s → 2s → 4s
            const delay = 1000 * Math.pow(2, attempt - 1);
            console.log(`Retrying after ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

// Sử dụng:
try {
    const data = await fetchWithRetry('/api/products', 3);
} catch (error) {
    console.error('Failed after 3 retries:', error.message);
    showErrorNotification(error.message);
}

+----------------------+-----------------------------------------------------------------------------------------+
|      MÃ / LOẠI LỖI   |                       CHIẾN LƯỢC XỬ LÝ TRÊN CLIENT (UI/UX & LOGIC)                      |
+----------------------+-----------------------------------------------------------------------------------------+
| Network Error        |  • Hiện thông báo mất kết nối trực quan.                                                |
|                      |  • Hiển thị nút [Thử lại] (Manual Retry).                                               |
|                      |  • Tích hợp Event Listener: Tự động Auto-Retry ngay khi thiết bị có mạng trở lại (Online)|
+----------------------+-----------------------------------------------------------------------------------------+
| 400 Bad Request      |  • NGHIÊM CẤM RETRY tự động (vì gửi lại data lỗi vẫn sẽ ra lỗi).                        |
|                      |  • Parse dữ liệu từ Server để hiển thị thông báo lỗi Validation tương ứng lên form.     |
+----------------------+-----------------------------------------------------------------------------------------+
| 401 Unauthorized     |  • Chạy hàm Refresh Token ngầm (gửi Refresh Token để lấy Access Token mới) rồi thử lại. |
|                      |  • Nếu thất bại: Xóa Session/Cookie và Redirect người dùng về trang [Đăng nhập].        |
+----------------------+-----------------------------------------------------------------------------------------+
| 403 Forbidden        |  • NGHIÊM CẤM RETRY.                                                                    |
|                      |  • Khóa tính năng hoặc hiển thị màn hình thông báo: "Bạn không có quyền truy cập".      |
+----------------------+-----------------------------------------------------------------------------------------+
| 404 Not Found        |  • NGHIÊM CẤM RETRY.                                                                    |
|                      |  • Hiển thị giao diện trống (Empty State) hoặc trang báo: "Đường dẫn không tồn tại".    |
+----------------------+-----------------------------------------------------------------------------------------+
| 429 Too Many Requests|  • Tạm dừng gửi request.                                                                |
|                      |  • Đọc chỉ số từ Header `Retry-After` do Server trả về để thiết lập thời gian hoãn đếm  |
|                        ngược (Delay), sau đó mới tiến hành Retry lại request.                                  |
+----------------------+-----------------------------------------------------------------------------------------+
| 5xx Server Error     |  • Lỗi hệ thống từ máy chủ phía Backend.                                                |
|                      |  • Triển khai cơ chế tự động thử lại tối đa 3 lần dựa trên thuật toán                   |
|                        Exponential Backoff (Thời gian chờ tăng dần theo cấp số nhân, ví dụ: 1s -> 2s -> 4s).   |
+----------------------+-----------------------------------------------------------------------------------------+
| Timeout              |  • Hủy Request (Abort) và hiển thị thông báo: "Hệ thống phản hồi quá chậm".             |
|                      |  • Cho phép người dùng bấm nút kích hoạt gửi lại lệnh thủ công.                         |
+----------------------+-----------------------------------------------------------------------------------------+


