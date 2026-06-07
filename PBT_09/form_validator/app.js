// --- 1. ĐỐI TƯỢNG DOM ---
const form = document.querySelector('#registerForm');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');
const phoneInput = document.querySelector('#phone');
const submitBtn = document.querySelector('#submitBtn');

const strengthBar = document.querySelector('#strengthBar');
const strengthText = document.querySelector('#strengthText');
const modalContainer = document.querySelector('#modalContainer');

// Trạng thái hợp lệ của các trường
const formState = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// --- 2. HÀM TRỢ GIÚP GIAO DIỆN (UI HELPERS) ---
function setStatus(inputEl, isValid, errorMsg = '') {
    const group = inputEl.closest('.form-group');
    const icon = group.querySelector('.status-icon');
    const errorContainer = group.querySelector('.error-msg');

    if (isValid) {
        group.classList.remove('invalid');
        group.classList.add('valid');
        icon.textContent = '✅';
        errorContainer.textContent = '';
    } else {
        group.classList.remove('valid');
        group.classList.add('invalid');
        icon.textContent = '❌';
        errorContainer.textContent = errorMsg;
    }
}

function clearStatus(inputEl) {
    const group = inputEl.closest('.form-group');
    const icon = group.querySelector('.status-icon');
    const errorContainer = group.querySelector('.error-msg');
    
    group.classList.remove('valid', 'invalid');
    icon.textContent = '';
    errorContainer.textContent = '';
}

// Kiểm tra tổng xem toàn bộ form hợp lệ để kích hoạt nút Submit chưa
function checkFormValidity() {
    const isAllValid = Object.values(formState).every(state => state === true);
    submitBtn.disabled = !isAllValid;
}

// --- 3. CÁC BIỂU THỨC/LOGIC KIỂM ĐỊNH (VALIDATORS) ---

// Validate Tên: 2-50 ký tự
function validateUsername() {
    const value = usernameInput.value.trim();
    if (value.length >= 2 && value.length <= 50) {
        formState.username = true;
        setStatus(usernameInput, true);
    } else {
        formState.username = false;
        setStatus(usernameInput, false, 'Tên phải chứa từ 2 đến 50 ký tự.');
    }
    checkFormValidity();
}

// Validate Email bằng Regex chuẩn bản xứ
function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (value === '') {
        formState.email = false;
        setStatus(emailInput, false, 'Email không được để trống.');
    } else if (!emailRegex.test(value)) {
        formState.email = false;
        setStatus(emailInput, false, 'Định dạng email không hợp lệ (Ví dụ: name@abc.com).');
    } else {
        formState.email = true;
        setStatus(emailInput, true);
    }
    checkFormValidity();
}

// Kiểm tra độ mạnh mật khẩu và cập nhật Meter
function validatePassword() {
    const value = passwordInput.value;
    
    if (value.length === 0) {
        formState.password = false;
        clearStatus(passwordInput);
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Chưa nhập mật khẩu';
        strengthText.style.color = 'inherit';
        validateConfirmPassword(); // Check lại khớp mật khẩu khi đổi pass gốc
        return;
    }

    // Các tiêu chí kiểm thử
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    let strength = "weak"; // mặc định

    // Điều kiện Mạnh: 8+ ký tự, đủ chữ hoa, chữ thường, số, ký tự đặc biệt
    if (value.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial) {
        strength = "strong";
    } 
    // Điều kiện Trung bình: 8+ ký tự và có cả chữ và số
    else if (value.length >= 8 && hasLetter && hasNumber) {
        strength = "medium";
    }

    // Cập nhật giao diện thanh trượt Meter và text đi kèm
    if (strength === "strong") {
        formState.password = true;
        setStatus(passwordInput, true);
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--color-success)';
        strengthText.textContent = 'Mức độ: Mạnh 💪';
        strengthText.style.color = 'var(--color-success)';
    } else if (strength === "medium") {
        formState.password = true; // Trung bình vẫn được coi là Valid (Hợp lệ) để đăng ký
        setStatus(passwordInput, true);
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'var(--color-warn)';
        strengthText.textContent = 'Mức độ: Trung bình ⚡';
        strengthText.style.color = 'var(--color-warn)';
    } else {
        formState.password = false;
        setStatus(passwordInput, false, 'Mật khẩu phải từ 8 ký tự, bao gồm cả chữ và số.');
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = 'var(--color-error)';
        strengthText.textContent = 'Mức độ: Yếu ❌';
        strengthText.style.color = 'var(--color-error)';
    }

    validateConfirmPassword(); // Mỗi lần pass gốc thay đổi, phải chạy re-validate confirm pass
}

// Kiểm tra mật khẩu khớp nhau
function validateConfirmPassword() {
    const passValue = passwordInput.value;
    const confirmValue = confirmPasswordInput.value;

    if (confirmValue === '') {
        formState.confirmPassword = false;
        clearStatus(confirmPasswordInput);
    } else if (passValue === confirmValue) {
        formState.confirmPassword = true;
        setStatus(confirmPasswordInput, true);
    } else {
        formState.confirmPassword = false;
        setStatus(confirmPasswordInput, false, 'Mật khẩu xác nhận không khớp.');
    }
    checkFormValidity();
}

// Xử lý định dạng tự động số điện thoại dạng 0901-234-567
function handlePhoneInput(e) {
    let input = e.target.value.replace(/\D/g, ''); // Loại bỏ toàn bộ ký tự không phải số
    
    // Giới hạn tối đa 10 chữ số thực tế
    if (input.length > 10) {
        input = input.substring(0, 10);
    }

    // Tiến hành chèn dấu gạch ngang theo mô hình mong muốn
    let formatted = '';
    if (input.length > 0) {
        formatted += input.substring(0, 4);
    }
    if (input.length > 4) {
        formatted += '-' + input.substring(4, 7);
    }
    if (input.length > 7) {
        formatted += '-' + input.substring(7, 10);
    }

    e.target.value = formatted;

    // Validate: Đúng độ dài chuẩn 10 số (sau khi định dạng chuỗi dài 12 ký tự do có 2 dấu gạch)
    if (formatted.length === 12) {
        formState.phone = true;
        setStatus(phoneInput, true);
    } else {
        formState.phone = false;
        setStatus(phoneInput, false, 'Số điện thoại phải chứa đúng 10 chữ số.');
    }
    checkFormValidity();
}

// --- 4. TẠO MODAL BẰNG JAVASCRIPT KHI SUBMIT THÀNH CÔNG ---
function showSuccessModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const title = document.createElement('h3');
    title.textContent = '🎉 Đăng Ký Thành Công!';

    const desc = document.createElement('p');
    desc.textContent = 'Hệ thống đã ghi nhận thông tin tài khoản của bạn:';

    const infoBox = document.createElement('div');
    infoBox.className = 'modal-info-box';
    
    // Trích xuất an toàn dữ liệu từ textContent để đảm bảo không dính XSS
    const nameData = document.createElement('p');
    nameData.textContent = `• Họ tên: ${usernameInput.value}`;
    const emailData = document.createElement('p');
    emailData.textContent = `• Email: ${emailInput.value}`;
    const phoneData = document.createElement('p');
    phoneData.textContent = `• Điện thoại: ${phoneInput.value}`;
    
    infoBox.appendChild(nameData);
    infoBox.appendChild(emailData);
    infoBox.appendChild(phoneData);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn-close-modal';
    closeBtn.textContent = 'Đóng và làm mới';

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(infoBox);
    content.appendChild(closeBtn);
    overlay.appendChild(content);
    modalContainer.appendChild(overlay);

    // Sự kiện đóng modal và reset lại toàn bộ form
    closeBtn.addEventListener('click', () => {
        overlay.remove();
        form.reset();
        // Reset lại state
        Object.keys(formState).forEach(key => formState[key] = false);
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('valid', 'invalid'));
        document.querySelectorAll('.status-icon').forEach(icon => icon.textContent = '');
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Chưa nhập mật khẩu';
        strengthText.style.color = 'inherit';
        submitBtn.disabled = true;
    });
}

// --- 5. ĐĂNG KÝ SỰ KIỆN KHỞI CHẠY (EVENT LISTENERS) ---
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
phoneInput.addEventListener('input', handlePhoneInput);

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn chặn tải lại trang mặc định
    if (submitBtn.disabled === false) {
        showSuccessModal();
    }
});