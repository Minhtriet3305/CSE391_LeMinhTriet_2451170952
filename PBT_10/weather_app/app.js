// --- 1. ĐỐI TƯỢNG DOM & STATE ---
const searchForm = document.querySelector('#searchForm');
const cityInput = document.querySelector('#cityInput');
const searchHistoryContainer = document.querySelector('#searchHistory');
const weatherContent = document.querySelector('#weatherContent');

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

// Bảng ánh xạ mã thời tiết (WMO Weather Interpretation Codes) sang Text và Icon
const weatherCodes = {
    0: { text: "Trời quang mây tạnh", icon: "☀️" },
    1: { text: "Ít mây, trời trong", icon: "🌤️" },
    2: { text: "Mây rải rác", icon: "⛅" },
    3: { text: "Trời nhiều mây", icon: "☁️" },
    45: { text: "Có sương mù", icon: "🌫️" },
    48: { text: "Sương mù đóng băng", icon: "🌫️" },
    51: { text: "Mưa phùn nhẹ", icon: "🌦️" },
    53: { text: "Mưa phùn vừa", icon: "🌦️" },
    55: { text: "Mưa phùn dày đặc", icon: "🌧️" },
    61: { text: "Mưa rơi nhẹ", icon: "🌦️" },
    63: { text: "Mưa vừa phải", icon: "🌧️" },
    65: { text: "Mưa to nặng hạt", icon: "🌧️" },
    71: { text: "Tuyết rơi nhẹ", icon: "🌨️" },
    73: { text: "Tuyết rơi vừa", icon: "🌨️" },
    75: { text: "Bão tuyết lớn", icon: "❄️" },
    80: { text: "Mưa rào nhẹ", icon: "🌦️" },
    81: { text: "Mưa rào mạnh", icon: "🌧️" },
    82: { text: "Mưa xối xả cực lớn", icon: "⛈️" },
    95: { text: "Mông lung sấm sét", icon: "⛈️" },
    96: { text: "Mưa đá kèm giông tố", icon: "⛈️" }
};

// --- 2. QUẢN LÝ LỊCH SỬ TÌM KIẾM (LOCAL STORAGE) ---
function updateHistoryStorage(cityName) {
    // Chuẩn hóa chữ: Viết hoa chữ cái đầu
    const cleanName = cityName.trim().charAt(0).toUpperCase() + cityName.trim().slice(1).toLowerCase();
    
    // Nếu thành phố đã tồn tại, xóa cái cũ để lát nữa đẩy lên đầu (như cơ chế Unshift)
    searchHistory = searchHistory.filter(item => item !== cleanName);
    searchHistory.unshift(cleanName);
    
    // Giới hạn khắt khe tối đa 5 thành phố gần nhất
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    renderHistoryButtons();
}

function renderHistoryButtons() {
    searchHistoryContainer.innerHTML = '';
    
    if (searchHistory.length === 0) {
        searchHistoryContainer.textContent = 'Trống';
        return;
    }

    searchHistory.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'history-btn';
        btn.textContent = city;
        btn.type = 'button';
        
        // Sự kiện: Click vào thẻ lịch sử -> gọi tìm kiếm lại ngay lập tức
        btn.addEventListener('click', () => {
            fetchWeatherData(city);
        });
        searchHistoryContainer.appendChild(btn);
    });
}

// --- 3. GỌI API & QUẢN LÝ 3 STATES (LOADING / SUCCESS / ERROR) ---
async function fetchWeatherData(cityName) {
    // [STATE 1]: Khởi động LOADING STATE
    renderLoadingState();

    try {
        // Kiểm tra kết nối Internet cơ bản trước khi fetch mạng
        if (!navigator.onLine) {
            throw new Error("Mất kết nối mạng. Vui lòng kiểm tra lại thiết bị Internet.");
        }

        // Bước A: Sử dụng Geocoding API miễn phí để đổi "Tên thành phố" thành "Tọa độ vĩ độ/kinh độ"
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
            throw new Error("Không thể kết nối tới máy chủ dữ liệu địa lý.");
        }
        
        const geoData = await geoResponse.json();

        // Trường hợp: Thành phố gõ bậy bạ không tìm thấy tọa độ trên bản đồ thế giới
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Không tìm thấy dữ liệu cho thành phố "${cityName}". Vui lòng kiểm tra lại chính tả.`);
        }

        // Trích xuất tọa độ và tên chuẩn hóa của thành phố từ API Geocoding
        const { latitude, longitude, name, country } = geoData.results[0];
        const fullLocationName = `${name}, ${country}`;

        // Bước B: Gọi API Thời tiết chính thức bằng tọa độ vừa lấy được
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error("Không thể tải thông tin thời tiết từ máy chủ Open-Meteo.");
        }

        const weatherData = await weatherResponse.json();
        
        // [STATE 2]: Thành công, xử lý đổ dữ liệu ra giao diện SUCCESS STATE
        renderSuccessState(fullLocationName, weatherData);
        
        // Lưu lịch sử sau khi chắc chắn thành phố tồn tại và tìm thành công
        updateHistoryStorage(name);

    } catch (error) {
        // [STATE 3]: Gặp lỗi mạng hoặc lỗi logic, kích hoạt ERROR STATE
        renderErrorState(error.message);
    }
}

// --- 4. CÁC HÀM PHÂN TÁCH GIAO DIỆN CON ---

function renderLoadingState() {
    weatherContent.innerHTML = '';
    
    const div = document.createElement('div');
    div.className = 'state-loading';
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    const text = document.createElement('p');
    text.textContent = 'Đang tải thông tin thời tiết...';
    
    div.appendChild(spinner);
    div.appendChild(text);
    weatherContent.appendChild(div);
}

function renderErrorState(errorMessage) {
    weatherContent.innerHTML = '';
    
    const div = document.createElement('div');
    div.className = 'state-error';
    div.textContent = `⚠️ Lỗi: ${errorMessage}`;
    
    weatherContent.appendChild(div);
}

function renderSuccessState(locationName, data) {
    weatherContent.innerHTML = '';

    const current = data.current_weather;
    // Tìm cấu hình text và icon tương ứng qua mã thời tiết, nếu không có thì đặt mặc định
    const weatherInfo = weatherCodes[current.weathercode] || { text: "Thời tiết không xác định", icon: "🌍" };

    const div = document.createElement('div');
    div.className = 'state-success';

    // 1. Tên địa điểm
    const locEl = document.createElement('h3');
    locEl.className = 'weather-location';
    locEl.textContent = locationName;

    // 2. Cụm hiển thị chính (Nhiệt độ + Icon)
    const mainEl = document.createElement('div');
    mainEl.className = 'weather-main';
    
    const iconEl = document.createElement('span');
    iconEl.className = 'weather-icon';
    iconEl.textContent = weatherInfo.icon;
    
    const tempEl = document.createElement('span');
    tempEl.className = 'weather-temp';
    tempEl.textContent = `${Math.round(current.temperature)}°C`;
    
    mainEl.appendChild(iconEl);
    mainEl.appendChild(tempEl);

    // 3. Mô tả chữ thời tiết
    const descEl = document.createElement('p');
    descEl.className = 'weather-desc';
    descEl.textContent = weatherInfo.text;

    // 4. Chi tiết bổ sung (Sức gió, Tốc độ)
    const detailsEl = document.createElement('div');
    detailsEl.className = 'weather-details';

    // Tạo nhanh cụm thông tin gió
    const windBox = document.createElement('div');
    windBox.className = 'detail-item';
    windBox.innerHTML = `<span>Tốc độ gió</span><span>${current.windspeed} km/h</span>`;

    // Tạo nhanh cụm thông tin hướng gió hoặc thông số khác tùy ý
    const directionBox = document.createElement('div');
    directionBox.className = 'detail-item';
    directionBox.innerHTML = `<span>Hướng gió</span><span>${current.winddirection}°</span>`;

    detailsEl.appendChild(windBox);
    detailsEl.appendChild(directionBox);

    // Ghép trục tổng thể
    div.appendChild(locEl);
    div.appendChild(mainEl);
    div.appendChild(descEl);
    div.appendChild(detailsEl);
    
    weatherContent.appendChild(div);
}

// --- 5. BẮT SỰ KIỆN FORM SUBMIT ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    
    fetchWeatherData(city);
    cityInput.value = ''; // Reset rỗng ô text sau khi ấn tìm
});

// Chạy khởi động render các nút lịch sử đã lưu sẵn trong máy từ trước nếu có
renderHistoryButtons();