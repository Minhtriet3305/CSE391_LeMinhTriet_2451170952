// --- 1. CONFIGURATION LIST OF APIs ---
// Chuẩn bị danh sách 3 đường dẫn API mục tiêu phân tách tính chất dữ liệu
const API_CONFIG = [
    {
        name: "Thời tiết",
        url: "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
    },
    {
        // Sử dụng mã vĩ độ/kinh độ ngẫu nhiên hoặc lấy trực tiếp 1 nước cố định cho tính ổn định
        name: "Quốc gia",
        url: "https://restcountries.com/v3.1/name/vietnam?fullText=true"
    },
    {
        name: "Người dùng",
        url: "https://randomuser.me/api/"
    }
];

// --- 2. DOM TARGETING ---
const refreshAllBtn = document.querySelector('#refreshAllBtn');
const fetchTimer = document.querySelector('#fetchTimer');

// --- 3. CORE LOGIC: PARALLEL MULTI-FETCH FETCH ENGINE ---
async function loadDashboard() {
    const startTime = Date.now();
    
    // Đưa toàn bộ các ô Widget về trạng thái Loading giao diện đồng bộ
    for (let i = 0; i < API_CONFIG.length; i++) {
        renderWidgetLoading(i);
    }
    fetchTimer.textContent = "Đang kết nối song song các máy chủ dữ liệu...";

    // Khởi tạo tiến trình gọi song song 3 APIs dùng Promise.allSettled() (Yêu cầu bắt buộc)
    const results = await Promise.allSettled([
        fetch(API_CONFIG[0].url).then(r => { if(!r.ok) throw new Error("Mã lỗi " + r.status); return r.json(); }),
        fetch(API_CONFIG[1].url).then(r => { if(!r.ok) throw new Error("Mã lỗi " + r.status); return r.json(); }),
        fetch(API_CONFIG[2].url).then(r => { if(!r.ok) throw new Error("Mã lỗi " + r.status); return r.json(); })
    ]);

    // Duyệt qua mảng kết quả trả về từ cơ chế Settled để phân bổ render UI độc lập
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            // Trường hợp 1 API sập nguồn, cô lập lỗi và in thông báo lỗi lên đúng Widget đó
            renderWidgetError(index, result.reason.message || "Lỗi mạng hoặc bị chặn CORS");
        }
    });

    // Tính toán chính xác thời gian hoàn thành tác vụ nạp (ms)
    const endTime = Date.now() - startTime;
    fetchTimer.textContent = `Dữ liệu đồng bộ hoàn tất trong: ${endTime} ms`;
}

// --- 4. RENDER HOÀN THIỆN DATA CHO TỪNG WIDGET BIỆT LẬP ---
function renderWidget(index, data) {
    const widgetBody = document.querySelector(`#widget-${index} .widget-body`);
    widgetBody.innerHTML = ''; // Clear loading spinner

    if (index === 0) {
        // Render Thời tiết Open-Meteo
        const current = data.current_weather;
        const div = document.createElement('div');
        div.className = 'weather-info';
        div.innerHTML = `
            <div class="weather-temp">${Math.round(current.temperature)}°C</div>
            <div class="weather-meta">Tốc độ gió: ${current.windspeed} km/h</div>
            <div class="weather-meta">Tọa độ trạm: Hà Nội, VN</div>
        `;
        widgetBody.appendChild(div);
    } 
    else if (index === 1) {
        // Render Quốc gia REST Countries
        const country = data[0];
        const div = document.createElement('div');
        div.className = 'country-info';
        div.innerHTML = `
            <div class="country-flag">${country.flag || '🇻🇳'}</div>
            <div class="country-name">${country.name.common}</div>
            <div class="country-meta">Thủ đô: ${country.capital ? country.capital[0] : 'N/A'}</div>
            <div class="country-meta">Dân số: ${country.population.toLocaleString()} người</div>
        `;
        widgetBody.appendChild(div);
    } 
    else if (index === 2) {
        // Render Người dùng Random User
        const user = data.results[0];
        const div = document.createElement('div');
        div.className = 'user-info';
        div.innerHTML = `
            <img class="user-avatar" src="${user.picture.medium}" alt="${user.name.first}">
            <div>
                <div class="user-name">${user.name.title}. ${user.name.first} ${user.name.last}</div>
                <div class="user-email">${user.email}</div>
                <div class="user-meta" style="font-size:0.8rem; color:var(--text-muted)">Quốc tịch: ${user.nat}</div>
            </div>
        `;
        widgetBody.appendChild(div);
    }
}

// --- 5. ĐIỀU PHỐI TRẠNG THÁI PHỤ (LOADING / ERROR VISUALS) ---
function renderWidgetLoading(index) {
    const widgetBody = document.querySelector(`#widget-${index} .widget-body`);
    widgetBody.innerHTML = `
        <div class="widget-loading">
            <div class="spinner"></div>
            <span>Đang tải kết nối...</span>
        </div>
    `;
}

function renderWidgetError(index, errorMessage) {
    const widgetBody = document.querySelector(`#widget-${index} .widget-body`);
    widgetBody.innerHTML = `
        <div class="widget-error">
            <strong>⚠️ Lỗi nạp dữ liệu:</strong><br>
            <span style="font-size:0.85rem">${errorMessage}</span>
        </div>
    `;
}

// --- 6. EVENT REGISTRATION ---
refreshAllBtn.addEventListener('click', loadDashboard);

// Tự động khởi chạy lần đầu khi tải nhập trang web
loadDashboard();