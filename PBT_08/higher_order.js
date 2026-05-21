function pipe(...fns) {
    // Trả về một hàm nhận tham số đầu vào ban đầu (arg)
    return function(arg) {
        // Dùng reduce để luân chuyển kết quả từ hàm này sang hàm tiếp theo
        return fns.reduce((currentValue, currentFn) => currentFn(currentValue), arg);
    };
}

// 2. memoize() — Caching kết quả dựa trên tham số đầu vào
function memoize(fn) {
    // Tạo một vùng lưu trữ cache bằng Object thông qua Closure
    const cache = {};
    
    return function(...args) {
        // Biến mảng tham số thành một chuỗi String duy nhất để làm Key cho cache
        const key = JSON.stringify(args);
        
        // Nếu đã có kết quả cho bộ tham số này rồi, trả về luôn từ cache
        if (key in cache) {
            return cache[key];
        }
        
        // Nếu chưa có, thực hiện tính toán, lưu lại và trả kết quả
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// 3. debounce() — Trì hoãn thực thi hàm cho tới khi người dùng ngừng thao tác
function debounce(fn, delay) {
    let timeoutId = null;
    
    return function(...args) {
        // Mỗi khi hàm được kích hoạt lại, xóa bộ đếm thời gian cũ đi
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Thiết lập một bộ đếm thời gian mới
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// 4. retry() — Tự động chạy lại một hàm bất đồng bộ (Promise) nếu xảy ra lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Thử thực thi hàm và đợi kết quả (await)
            return await fn();
        } catch (error) {
            lastError = error;
            console.warn(`[Retry] Thất bại lần ${attempt}/${maxAttempts}. Đang thử lại...`);
        }
    }
    
    // Nếu đi hết số lần thử mà vẫn lỗi, quăng lỗi cuối cùng ra ngoài
    throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn thất bại. Lỗi gốc: ${lastError.message}`);
}