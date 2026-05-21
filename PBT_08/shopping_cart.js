function createCart() {
    // Private data - Dữ liệu bảo mật chỉ có thể truy cập qua Closure
    let items = [];
    let currentDiscount = null; 
    
    return {
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const targetItem = items.find(item => item.id === productId);
            if (targetItem) targetItem.quantity = newQuantity;
        },
        
        getTotal() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (!currentDiscount) return subTotal;
            
            switch (currentDiscount) {
                case "SALE10": return subTotal * 0.9;
                case "SALE20": return subTotal * 0.8;
                case "FREESHIP": return Math.max(0, subTotal - 30000); 
                default: return subTotal;
            }
        },
        
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                currentDiscount = code;
                console.log(`[Thành công] Đã áp dụng mã giảm giá: ${code}`);
            } else {
                console.log(`[Thất bại] Mã giảm giá "${code}" không hợp lệ.`);
            }
        },
        
        printCart() {
            if (items.length === 0) {
                console.log(" Giỏ hàng trống rỗng!");
                return;
            }
            const formatter = new Intl.NumberFormat('vi-VN');
            const displayData = items.map((item, index) => ({
                "STT": index + 1,
                "Sản phẩm": item.name,
                "SL": item.quantity,
                "Đơn giá": formatter.format(item.price),
                "Tổng": formatter.format(item.price * item.quantity)
            }));

            console.log("\n--- CHI TIẾT GIỎ HÀNG ---");
            console.table(displayData); // In bảng tự động dựa trên mảng đối tượng
            
            if (currentDiscount) console.log(`Mã giảm giá đang dùng: ${currentDiscount}`);
            console.log(`>> Tổng cộng: ${formatter.format(this.getTotal())}đ`);
            console.log("-------------------------\n");
        },
        
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            currentDiscount = null;
        }
    };
}

const cart = createCart();

// 1. Thêm sản phẩm vào giỏ
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng SL iPhone lên 2

// 2. In giỏ hàng lần đầu
cart.printCart();

// 3. Áp mã giảm giá và in lại
cart.applyDiscount("SALE10");
cart.printCart();

// 4. Kiểm tra số lượng sau khi xóa
console.log("Số SP trong giỏ ban đầu:", cart.getItemCount()); // Kết quả mong đợi: 4
cart.removeItem(3); // Xóa AirPods Pro đi
console.log("Số SP sau khi xóa AirPods:", cart.getItemCount()); // Kết quả mong đợi: 2