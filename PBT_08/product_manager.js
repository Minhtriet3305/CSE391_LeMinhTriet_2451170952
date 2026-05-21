// 1. Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// 2. Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p => p.category === category && p.price >= minPrice && p.price <= maxPrice);
}

// 3. Sắp xếp theo giá (tăng/giảm)
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
}

// 4. Tìm sản phẩm rẻ nhất mỗi category
function cheapestByCategory(products) {
    return products.reduce((acc, p) => {
        // Nếu category này chưa có trong acc HOẶC giá của p rẻ hơn sản phẩm cũ hiện tại
        if (!acc[p.category] || p.price < acc[p.category].price) {
            acc[p.category] = p;
        }
        return acc;
    }, {}); // Khởi tạo accumulator là một object rỗng {}
}

// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
function totalInventoryValue(products) {
    return products.reduce((total, p) => total + (p.price * p.stock), 0);
}

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        // Dùng Intl.NumberFormat để format chuẩn tiền tệ Việt Nam (25.990.000đ)
        formattedPrice: new Intl.NumberFormat('vi-VN').format(p.price) + 'đ'
    }));
}

// 7. Tính rating trung bình toàn bộ
function averageRating(products) {
    if (products.length === 0) return 0;
    const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
    // Làm tròn lấy 2 chữ số thập phân bằng cách ép kiểu ngược từ toFixed
    return Number((totalRating / products.length).toFixed(2));
}

// 8. Tìm sản phẩm theo keyword (tìm trong name, case-insensitive)
function searchProducts(products, keyword) {
    const cleanKeyword = keyword.toLowerCase().trim();
    return products.filter(p => p.name.toLowerCase().includes(cleanKeyword));
}