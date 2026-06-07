// --- 1. DỮ LIỆU ẢNH & COMMANDS ---
const images = [
    { id: 1, url: "https://picsum.photos/id/10/800/400", title: "Bờ biển buổi bình minh" },
    { id: 2, url: "https://picsum.photos/id/16/800/400", title: "Thung lũng núi sương mù" },
    { id: 3, url: "https://picsum.photos/id/28/800/400", title: "Rừng cây đổ lá mùa thu" },
    { id: 4, url: "https://picsum.photos/id/43/800/400", title: "Cơn bão trên đại dương" },
    { id: 5, url: "https://picsum.photos/id/54/800/400", title: "Cảnh quan sa mạc cằn cỗi" },
    { id: 6, url: "https://picsum.photos/id/64/800/400", title: "Hồ nước trong veo soi bóng núi" }
];

const commands = [
    { id: "next", text: "Chuyển sang ảnh tiếp theo", shortcut: "➡", action: () => nextImage() },
    { id: "prev", text: "Quay lại ảnh phía trước", shortcut: "⬅", action: () => prevImage() },
    { id: "toggle-play", text: "Bật/Tắt Slideshow tự động", shortcut: "Space", action: () => toggleSlideshow() },
    { id: "theme", text: "Bật/Tắt Giao diện tối (Dark mode)", shortcut: "Ctrl+T", action: () => toggleTheme() },
    { id: "reset", text: "Nhảy thẳng về ảnh số 1", shortcut: "1", action: () => jumpToImage(0) }
];

// --- 2. TRẠNG THÁI ỨNG DỤNG ---
let currentIndex = 0;
let slideshowInterval = null;
let filteredCommands = [...commands];
let selectedCommandIndex = 0;
let lastActiveElement = null; // Quản lý tiêu điểm thông minh phục vụ phím ESC

// --- 3. ĐỐI TƯỢNG DOM ---
const mainImage = document.querySelector("#mainImage");
const imageIndex = document.querySelector("#imageIndex");
const slideshowBadge = document.querySelector("#slideshowBadge");
const thumbnailGrid = document.querySelector("#thumbnailGrid");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");

const commandOverlay = document.querySelector("#commandOverlay");
const paletteInput = document.querySelector("#paletteInput");
const commandList = document.querySelector("#commandList");

// --- 4. KHỞI TẠO VÀ HIỂN THỊ GALLERY ---
function initGallery() {
    thumbnailGrid.innerHTML = "";
    images.forEach((img, index) => {
        const btn = document.createElement("button");
        btn.className = "thumb-item";
        btn.setAttribute("aria-label", `Xem ảnh ${index + 1}: ${img.title}`);
        btn.setAttribute("aria-controls", "mainImage");
        
        const thumbImg = document.createElement("img");
        thumbImg.src = img.url;
        thumbImg.alt = img.title;
        
        btn.appendChild(thumbImg);
        btn.addEventListener("click", () => jumpToImage(index));
        thumbnailGrid.appendChild(btn);
    });
    updateUI();
}

function updateUI() {
    // Cập nhật ảnh chính và text hỗ trợ Aria đọc màn hình
    mainImage.src = images[currentIndex].url;
    mainImage.alt = `Ảnh hiện tại: ${images[currentIndex].title}`;
    imageIndex.textContent = `${currentIndex + 1} / ${images.length}`;

    // Cập nhật trạng thái active của danh sách hình thu nhỏ
    const thumbs = document.querySelectorAll(".thumb-item");
    thumbs.forEach((thumb, idx) => {
        if (idx === currentIndex) {
            thumb.classList.add("active");
            thumb.setAttribute("aria-current", "true");
        } else {
            thumb.classList.remove("active");
            thumb.removeAttribute("aria-current");
        }
    });
}

// --- 5. LOGIC DI CHUYỂN ẢNH ---
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateUI();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateUI();
}

function jumpToImage(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index;
        updateUI();
    }
}

function toggleSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        slideshowBadge.classList.add("hidden");
        playBtn.textContent = "Thuyết minh (Space)";
    } else {
        slideshowBadge.classList.remove("hidden");
        playBtn.textContent = "Dừng lại (Space)";
        slideshowInterval = setInterval(nextImage, 3000); // 3 giây chuyển ảnh tự động
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

// --- 6. LOGIC COMMAND PALETTE (CTRL + K) ---
function openCommandPalette() {
    lastActiveElement = document.activeElement; // Lưu lại element đang focus trước khi mở overlay
    commandOverlay.classList.remove("hidden");
    paletteInput.value = "";
    filterCommands("");
    paletteInput.focus();
}

function closeCommandPalette() {
    commandOverlay.classList.add("hidden");
    if (lastActiveElement) lastActiveElement.focus(); // Trả lại tiêu điểm nguyên vẹn khi thoát
}

function filterCommands(query) {
    filteredCommands = commands.filter(cmd => 
        cmd.text.toLowerCase().includes(query.toLowerCase())
    );
    selectedCommandIndex = 0;
    renderCommands();
}

function renderCommands() {
    commandList.innerHTML = "";
    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = `command-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === selectedCommandIndex ? "true" : "false");
        
        // Ngăn chặn XSS bằng cách truyền text thuần
        const textSpan = document.createElement("span");
        textSpan.textContent = cmd.text;

        const keySpan = document.createElement("span");
        keySpan.className = "command-shortcut";
        keySpan.textContent = cmd.shortcut;

        li.appendChild(textSpan);
        li.appendChild(keySpan);
        
        li.addEventListener("click", () => {
            cmd.action();
            closeCommandPalette();
        });

        commandList.appendChild(li);
    });
}

// --- 7. BỘ LẮNG NGHE SỰ KIỆN BÀN PHÍM TOÀN CỤC (KEYBOARD ENGINE) ---
window.addEventListener("keydown", (e) => {
    const isPaletteOpen = !commandOverlay.classList.contains("hidden");

    // Lệnh Độc Quyền khi đang mở Command Palette Overlay
    if (isPaletteOpen) {
        if (e.key === "Escape") {
            closeCommandPalette();
            e.preventDefault();
        } else if (e.key === "ArrowDown") {
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
            renderCommands();
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommands();
            e.preventDefault();
        } else if (e.key === "Enter") {
            if (filteredCommands[selectedCommandIndex]) {
                filteredCommands[selectedCommandIndex].action();
                closeCommandPalette();
            }
            e.preventDefault();
        }
        return; // Chặn các lệnh chung bên dưới chạy đè khi đang mở Palette
    }

    // Các cụm phím tắt hệ thống chung toàn trang
    // Phím tắt mở Palette: Ctrl + K (hoặc Cmd + K trên Mac)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette();
    }

    // Phím tắt đổi Theme: Ctrl + T
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleTheme();
    }

    // Lệnh điều khiển Gallery ảnh (Khi không tập trung gõ ô input)
    if (document.activeElement.tagName !== "INPUT") {
        if (e.key === "ArrowRight") {
            nextImage();
        } else if (e.key === "ArrowLeft") {
            prevImage();
        } else if (e.key === " ") { // Phím Space
            e.preventDefault(); // Tránh cuộn trang màn hình ngoài ý muốn
            toggleSlideshow();
        } else if (e.key >= "1" && e.key <= "9") {
            const num = parseInt(e.key) - 1;
            jumpToImage(num);
        }
    }
});

// Lắng nghe sự kiện input lọc command trực tiếp
paletteInput.addEventListener("input", (e) => {
    filterCommands(e.target.value);
});

// Đăng ký sự kiện click chuột cho các nút điều khiển HTML cơ bản
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
playBtn.addEventListener("click", toggleSlideshow);

// Khởi động ứng dụng
initGallery();