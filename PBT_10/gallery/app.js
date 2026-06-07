// --- 1. CONFIGURATION & STATE ---
let currentPage = 1;
const LIMIT = 20;
let isFetching = false; // Cờ khóa chống trùng lặp request khi đang cào dữ liệu mạng
const API_URL = (page) => `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`;

// --- 2. DOM ELEMENTS ---
const galleryGrid = document.querySelector('#galleryGrid');
const loadTrigger = document.querySelector('#load-trigger');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightboxImg');
const lightboxAuthor = document.querySelector('#lightboxAuthor');
const closeLightboxBtn = document.querySelector('.close-lightbox');

// --- 3. LAZY LOADING OBSERVER ---
// Cơ chế: Khi card ảnh lọt vào Viewport, chuyển đổi src ảo sang src thật để tải ảnh
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Thay thế data-src tạm thành src chính thức để kích hoạt tải mạng thực tế
            img.src = img.dataset.src;
            
            img.addEventListener('load', () => {
                img.classList.add('loaded'); // Kích hoạt hiệu ứng Fade-in trong CSS
            });

            // Sau khi đã xử lý xong phần tử này, hủy theo dõi để giải phóng CPU
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: "0px 0px 200px 0px" // Tải trước ảnh khi nó còn cách đáy màn hình 200px (tăng UX)
});

// --- 4. CORE FUNCTION: LOAD MORE PHOTOS ---
async function loadMorePhotos() {
    if (isFetching) return; // Nếu đang bận fetch đợt trước thì bỏ qua lệnh này
    isFetching = true;
    loadTrigger.classList.remove('hidden');

    try {
        const response = await fetch(API_URL(currentPage));
        if (!response.ok) throw new Error("Không thể kết nối đến API hình ảnh.");
        
        const photos = await response.json();
        
        if (photos.length === 0) {
            // Trường hợp kho ảnh của API đã hết sạch dữ liệu
            loadTrigger.innerHTML = "<span>Bạn đã xem hết toàn bộ kho ảnh 🎉</span>";
            infiniteObserver.unobserve(loadTrigger);
            return;
        }

        renderPhotos(photos);
        currentPage++; // Tăng trang phục vụ đợt cuộn tiếp theo

    } catch (error) {
        console.error("Lỗi hệ thống tải ảnh:", error);
    } finally {
        isFetching = false;
        loadTrigger.classList.add('hidden');
    }
}

// --- 5. RENDER CARDS TO GRID ---
function renderPhotos(photosArray) {
    const fragment = document.createDocumentFragment(); // Sử dụng DocumentFragment chống Reflow hiệu năng cao

    photosArray.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Giảm độ phân giải ảnh hiển thị ở Grid để tải siêu tốc (tối ưu hóa băng thông)
        const optimizedThumbUrl = `https://picsum.photos/id/${photo.id}/400/267`;
        // Ảnh gốc chất lượng cao phục vụ việc phóng to tại Lightbox
        const originalUrl = `https://picsum.photos/id/${photo.id}/1200/800`;

        item.innerHTML = `
            <div class="img-container">
                <img data-src="${optimizedThumbUrl}" alt="Hình ảnh bởi ${photo.author}" class="lazy-img">
            </div>
            <div class="item-info">
                <span>📷 ${photo.author}</span>
            </div>
        `;

        // Đăng ký sự kiện mở Lightbox khi click vào Card
        item.addEventListener('click', () => openLightbox(originalUrl, photo.author));

        // Đăng ký Element Image vừa tạo vào danh sách theo dõi Lazy Load
        const targetImg = item.querySelector('.lazy-img');
        lazyImageObserver.observe(targetImg);

        fragment.appendChild(item);
    });

    galleryGrid.appendChild(fragment);
}

// --- 6. LIGHTBOX CONTROLS ---
function openLightbox(url, author) {
    lightboxImg.src = url;
    lightboxAuthor.textContent = `Tác phẩm của: ${author}`;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Khóa thanh cuộn trang chính khi đang xem ảnh to
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = ''; // Xóa sạch link ảnh cũ để giải phóng RAM cho trình duyệt ngay lập tức
    document.body.style.overflow = ''; // Trả lại thanh cuộn
}

closeLightboxBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// --- 7. INFINITE SCROLL OBSERVER (Yêu cầu kỹ thuật bắt buộc) ---
const infiniteObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    threshold: 0.1 // Kích hoạt ngay khi 10% diện tích khối trigger lọt vào tầm nhìn đáy trang
});

// Tiến hành quan sát mục tiêu đáy trang
infiniteObserver.observe(document.querySelector("#load-trigger"));