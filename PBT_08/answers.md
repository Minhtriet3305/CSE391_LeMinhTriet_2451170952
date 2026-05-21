PHẦN A: KIỂM TRA ĐỌC HIỂU
CÂU A1:
    // ==================== 1. FUNCTION DECLARATION ====================
    function tinhThueBaoHiem_Declaration(luong) {
        let thue = 0;
        if (luong > 11000000) {
            thue = luong * 0.1;
        }
        
        return {
            thue: thue,
            thuc_nhan: luong - thue
        };
    }

    // ==================== 2. FUNCTION EXPRESSION ====================
    const tinhThueBaoHiem_Expression = function(luong) {
        let thue = 0;
        if (luong > 11000000) {
            thue = luong * 0.1;
        }
        
        return {
            thue: thue,
            thuc_nhan: luong - thue
        };
    };

    // ==================== 3. ARROW FUNCTION ====================
    const tinhThueBaoHiem_Arrow = (luong) => {
        let thue = 0;
        if (luong > 11000000) {
            thue = luong * 0.1;
        }
        
        return {
            thue: thue,
            thuc_nhan: luong - thue
        };
    };

Trả lời câu hỏi:
    Nhóm Hàm khai báo (Cách 1): Sở hữu tính năng Hoisting toàn phần. Trình biên dịch JavaScript sẽ quét toàn bộ file, nhấc toàn bộ cấu trúc và nội dung của hàm này thảy lên đỉnh phạm vi hoạt động trước khi thực thi code. Điều này cho phép bạn "triệu hồi" hàm tại bất kỳ dòng nào, kể cả khi dòng đó nằm trước đoạn định nghĩa hàm.

    Nhóm Hàm gán biến (Cách 2 & 3): Hoàn toàn bị ràng buộc bởi cơ chế quản lý biến của const hoặc let. Mặc dù tên biến có được ghi nhận, nhưng nó bị khóa chặt trong Temporal Dead Zone (Vùng chết tạm thời). JavaScript Engine bắt buộc phải chạy tuần tự từ trên xuống, chỉ khi đi qua dòng gán giá trị thì hàm mới chính thức được sinh ra. Do đó, việc gọi hàm trước dòng khai báo là một hành vi bất hợp pháp.

    VD:
    Kịch bản A: Chạy thành công với Function Declaration
    Do hàm được tự động nạp sẵn vào bộ nhớ từ trước, trình chạy code không gặp bất kỳ trở ngại nào dù thứ tự viết có vẻ ngược đời.

    // Gọi hàm ở ngay dòng đầu tiên của file
    console.log(tinhThueBaoHiem(15000000)); 
    // Đầu ra thành công: { thue: 1500000, thuc_nhan: 13500000 }

    function tinhThueBaoHiem(luong) {
        const thue = luong > 11000000 ? luong * 0.1 : 0;
        return { thue, thuc_nhan: luong - thue };
    }

    Kịch bản B: Sập chương trình với Function Expression & Arrow Function
    Nếu áp dụng cùng một thói quen gọi hàm trước như trên cho cách viết dùng const/let, hệ thống sẽ lập tức chặn lại và ném ra lỗi.

    // Cố tình kích hoạt hàm khi nó chưa bước qua dòng khởi tạo
    console.log(tinhThueBaoHiem(15000000)); 
    // KẾT QUẢ: ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization

    const tinhThueBaoHiem = (luong) => {
        const thue = luong > 11000000 ? luong * 0.1 : 0;
        return { thue, thuc_nhan: luong - thue };
    };


CÂU A2:
+ Đoạn 1:
    console.log(c.increment());  // 1
    console.log(c.increment());  // 2
    console.log(c.increment());  // 3
    console.log(c.decrement());  // 2
    console.log(c.getCount());   // 2
+ Đoạn 2:
    var: 3
    var: 3
    var: 3
    let: 0
    let: 1
    let: 2


Tại sao var và let lại khác nhau trong setTimeout?
Sự khác biệt cốt lõi nằm ở Phạm vi biến (Scope) và cách JavaScript xử lý Bất đồng bộ (Event Loop).

Trường hợp dùng var:
Phạm vi: Biến var không có phạm vi khối (block scope), nó chỉ có phạm vi hàm hoặc phạm vi toàn cục (global scope). Trong đoạn code này, cả 3 vòng lặp đều dùng chung một biến i duy nhất.

Cơ chế chạy: Vòng lặp for chạy rất nhanh và kết thúc ngay lập tức. Sau khi vòng lặp kết thúc, biến i đã tăng lên đến 3 (điều kiện 3 < 3 sai nên dừng).

Khi setTimeout kích hoạt (sau 100ms): Lúc này hàm callback () => console.log("var:", i) mới được gọi. Khi nó nhìn ra ngoài để tìm biến i, nó thấy biến i chung hiện tại đã bằng 3. Vì vậy, cả 3 hàm callback đều in ra var: 3.

Trường hợp dùng let:
Phạm vi: Biến let có phạm vi khối (block scope). Điều đặc biệt là với vòng lặp for, mỗi lượt lặp (iteration) JavaScript sẽ tạo ra một biến j hoàn toàn mới và copy giá trị cũ sang.

Cơ chế chạy:

Lượt lặp 0: Tạo ra biến j_lượt_0 có giá trị 0. Hàm setTimeout đầu tiên "bắt giữ" (closure) biến j_lượt_0 này.
Lượt lặp 1: Tạo ra biến j_lượt_1 có giá trị 1. Hàm setTimeout thứ hai "bắt giữ" biến j_lượt_1.
Lượt lặp 2: Tạo ra biến j_lượt_2 có giá trị 2. Hàm setTimeout thứ ba "bắt giữ" biến j_lượt_2.
Khi setTimeout kích hoạt (sau 200ms): Mỗi hàm callback sẽ in ra giá trị của biến j riêng biệt mà nó đã "chụp lại" tại thời điểm vòng lặp diễn ra. Kết quả thu được là let: 0, let: 1, let: 2.

CÂU A3:
    // 1. Lấy các số chẵn (Dùng filter để lọc)
    const evens = nums.filter(n => n % 2 === 0);

    // 2. Nhân mỗi số với 3 (Dùng map để biến đổi)
    const tripled = nums.map(n => n * 3);

    // 3. Tính tổng tất cả (Dùng reduce để tích lũy, số 0 cuối cùng là giá trị khởi tạo)
    const total = nums.reduce((sum, n) => sum + n, 0);

    // 4. Tìm số đầu tiên > 7 (Dùng find, tìm thấy phát dừng luôn)
    const firstGreaterThan7 = nums.find(n => n > 7);

    // 5. Kiểm tra CÓ số nào > 10 không (Dùng some, chỉ cần 1 ông thỏa mãn là true, ở đây không có ai nên false)
    const hasGreaterThan10 = nums.some(n => n > 10);

    // 6. Kiểm tra TẤT CẢ đều > 0 (Dùng every, bắt buộc tất cả phải thỏa mãn)
    const allPositive = nums.every(n => n > 0);

    // 7. Tạo mảng "Số X là [chẵn/lẻ]" (Dùng map kết hợp Template Literals và toán tử 3 ngôi)
    const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

    // 8. Đảo ngược mảng không mutate gốc (Dùng toán tử spread [...] để clone ra mảng mới rồi mới .reverse())
    const reversed = [...nums].reverse();

CÂU A4:

    // Destructuring
    const { name, price, specs: { ram, color } } = product;
    console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
    console.log(specs);                     // ReferenceError: specs is not defined

    // Spread
    const updated = { ...product, price: 23990000, sale: true };
    console.log(updated.price);            // 23990000
    console.log(updated.sale);             // true
    console.log(product.price);            // 25990000 (gốc KHÔNG đổi)

    // Spread gotcha
    const copy = { ...product };
    copy.specs.ram = 16;
    console.log(product.specs.ram);        // 16 (Bị đổi thành 16!)

