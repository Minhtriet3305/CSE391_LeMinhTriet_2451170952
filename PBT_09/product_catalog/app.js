const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://picsum.photos/id/160/200", rating: 4.9, inStock: true, desc: "Siêu phẩm flagship thế hệ mới từ Apple với chip A18 Pro mãnh mẽ." },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 26490000, category: "phone", image: "https://picsum.photos/id/1/200", rating: 4.8, inStock: true, desc: "Camera 200MP đột phá kết hợp cùng trợ lý quyền năng Galaxy AI." },
    { id: 3, name: "MacBook Air M3", price: 27490000, category: "laptop", image: "https://picsum.photos/id/0/200", rating: 4.7, inStock: true, desc: "Thiết kế siêu mỏng nhẹ thời thượng với hiệu năng xử lý ấn tượng từ vi xử lý M3." },
    { id: 4, name: "ASUS ROG Strix G16", price: 34990000, category: "laptop", image: "https://picsum.photos/id/180/200", rating: 4.6, inStock: true, desc: "Quái thú gaming đích thực giúp game thủ chinh phục mọi tựa game AAA cấu hình cao." },
    { id: 5, name: "iPad Pro M4", price: 26990000, category: "tablet", image: "https://picsum.photos/id/96/200", rating: 4.9, inStock: true, desc: "Màn hình Tandem OLED đỉnh cao siêu mỏng cùng hiệu năng tiệm cận laptop." },
    { id: 6, name: "Samsung Galaxy Tab S9", price: 15490000, category: "tablet", image: "https://picsum.photos/id/60/200", rating: 4.5, inStock: false, desc: "Máy tính bảng Android cao cấp, kháng nước chống bụi IP68, đi kèm bút S-Pen tiện lợi." },
    { id: 7, name: "Sony WH-1000XM5", price: 6490000, category: "audio", image: "https://picsum.photos/id/211/200", rating: 4.8, inStock: true, desc: "Tai nghe chụp tai có công nghệ chống ồn chủ động đỉnh cấp thế giới." },
    { id: 8, name: "AirPods Pro 2", price: 5690000, category: "audio", image: "https://picsum.photos/id/26/200", rating: 4.6, inStock: true, desc: "Tai nghe true wireless hoàn hảo cho hệ sinh thái Apple, chất âm tái tạo xuất sắc." },
    { id: 9, name: "Google Pixel 9", price: 19500000, category: "phone", image: "https://picsum.photos/id/119/200", rating: 4.7, inStock: true, desc: "Trải nghiệm Android thuần khiết mượt mà kết hợp thuật toán xử lý ảnh hàng đầu từ Google." },
    { id: 10, name: "Dell XPS 13 Plus", price: 39990000, category: "laptop", image: "https://picsum.photos/id/48/200", rating: 4.4, inStock: true, desc: "Kiệt tác thiết kế siêu tương lai đến từ dòng laptop văn phòng cao cấp bậc nhất của Dell." },
    { id: 11, name: "Xiaomi Pad 6 Pro", price: 8290000, category: "tablet", image: "https://picsum.photos/id/3/200", rating: 4.3, inStock: true, desc: "Cấu hình hủy diệt phân khúc tầm trung với màn hình tần số quét 144Hz siêu mượt." },
    { id: 12, name: "Marshall Motif II A.N.C", price: 4990000, category: "audio", image: "https://picsum.photos/id/342/200", rating: 4.5, inStock: true, desc: "Mang phong cách thiết kế Rock 'n' Roll cổ điển đậm chất âm bass sống động từ Anh Quốc." }
];

// --- 2. TRẠNG THÁI ỨNG DỤNG (STATE) ---
let activeCategory = "all";
let searchQuery = "";
let currentSort = "default";
let cartCount = 0;

// --- 3. ĐỐI TƯỢNG DOM ---
const productGrid = document.querySelector("#productGrid");
const categoryFilters = document.querySelector("#categoryFilters");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const cartBadge = document.querySelector("#cartBadge");
const darkModeToggle = document.querySelector("#darkModeToggle");
const modalContainer = document.querySelector("#modalContainer");

// --- 4. HÀM CHỨC NĂNG CHÍNH ---

// Khởi tạo các nút chọn danh mục dựa trên dữ liệu sản phẩm
function initCategoryButtons() {
    const categories = ["all", ...new Set(products.map(p => p.category))];
    categoryFilters.innerHTML = ""; // Xóa dữ liệu cũ nếu có

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `filter-btn ${cat === activeCategory ? 'active' : ''}`;
        btn.textContent = cat.toUpperCase();
        btn.dataset.category = cat;

        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = cat;
            filterAndRender();
        });
        categoryFilters.appendChild(btn);
    });
}

// Xử lý bộ lọc, tìm kiếm và sắp xếp kết hợp (Master Process)
function filterAndRender() {
    let result = [...products];

    // 1. Lọc theo Category
    if (activeCategory !== "all") {
        result = result.filter(p => p.category === activeCategory);
    }

    // 2. Tìm kiếm theo tên (Realtime Search)
    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Sắp xếp (Sorting)
    if (currentSort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(result);
}

// Hàm render danh sách sản phẩm (An toàn không dùng innerHTML bừa bãi)
function renderProducts(productArray) {
    productGrid.innerHTML = "";

    if (productArray.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Không tìm thấy sản phẩm phù hợp.";
        emptyMsg.style.gridColumn = "1/-1";
        emptyMsg.style.textAlign = "center";
        productGrid.appendChild(emptyMsg);
        return;
    }

    productArray.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.className = "product-img";
        img.src = product.image;
        img.alt = product.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;

        const meta = document.createElement("div");
        meta.className = "product-meta";
        
        const rating = document.createElement("span");
        rating.className = "product-rating";
        rating.textContent = `⭐ ${product.rating}`;

        const stock = document.createElement("span");
        stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
        stock.style.color = product.inStock ? "#10b981" : "#ef4444";

        meta.appendChild(rating);
        meta.appendChild(stock);

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn-add-cart";
        btnAdd.textContent = product.inStock ? "Thêm vào giỏ" : "Tạm hết hàng";
        btnAdd.disabled = !product.inStock;

        // Sự kiện thêm vào giỏ hàng (Badge tăng lên)
        btnAdd.addEventListener("click", (e) => {
            e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài gây mở Modal
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Hiệu ứng bong bóng nhỏ khi click thêm giỏ hàng thành công
            btnAdd.textContent = "✅ Đã thêm";
            setTimeout(() => { btnAdd.textContent = "Thêm vào giỏ"; }, 1000);
        });

        // Sự kiện Click Card để mở Modal chi tiết
        card.addEventListener("click", () => {
            openProductModal(product);
        });

        // Ghép nối các element thành cấu trúc card hoàn chỉnh
        info.appendChild(name);
        info.appendChild(meta);
        info.appendChild(price);
        info.appendChild(btnAdd);

        card.appendChild(img);
        card.appendChild(info);

        productGrid.appendChild(card);
    });
}

// Tạo Modal chi tiết sản phẩm hoàn toàn bằng JS
function openProductModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.textContent = "×";

    const img = document.createElement("img");
    img.className = "modal-img";
    img.src = product.image;

    const title = document.createElement("h2");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const desc = document.createElement("p");
    desc.className = "modal-desc";
    desc.textContent = product.desc;

    content.appendChild(closeBtn);
    content.appendChild(img);
    content.appendChild(title);
    content.appendChild(price);
    content.appendChild(desc);
    overlay.appendChild(content);
    modalContainer.appendChild(overlay);

    // Hàm đóng modal
    const closeModal = () => { overlay.remove(); };
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(); // Click ra ngoài vùng đen để đóng
    });
}



// Sự kiện Tìm kiếm Realtime
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    filterAndRender();
});

// Sự kiện Sắp xếp giá/tên
sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    filterAndRender();
});

// Sự kiện Bật/Tắt chế độ Dark Mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});


initCategoryButtons();
filterAndRender();