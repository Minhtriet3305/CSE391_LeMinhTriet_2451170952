// --- 1. CONFIGURATION & STATE ---
const API_URL = 'https://jsonplaceholder.typicode.com/users';
let usersState = []; // Mảng lưu trạng thái danh sách thành viên ở Client

// --- 2. DOM ELEMENTS ---
const userGrid = document.querySelector('#userGrid');
const searchInput = document.querySelector('#searchInput');
const userModal = document.querySelector('#userModal');
const userForm = document.querySelector('#userForm');
const modalTitle = document.querySelector('#modalTitle');
const userIdInput = document.querySelector('#userIdInput');

const openCreateModalBtn = document.querySelector('#openCreateModalBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');
const toastContainer = document.querySelector('#toastContainer');

// --- 3. TOAST SYSTEM (ERROR HANDLING & MESSAGES) ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// --- 4. RENDER SKELETON LOADERS ---
function renderSkeletons() {
    userGrid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        
        skeleton.innerHTML = `
            <div class="skeleton-line skeleton-title"></div>
            <div class="skeleton-line skeleton-text" style="width: 70%"></div>
            <div class="skeleton-line skeleton-text" style="width: 85%"></div>
            <div class="skeleton-line skeleton-text" style="width: 50%"></div>
            <div class="skeleton-line skeleton-btn"></div>
        `;
        userGrid.appendChild(skeleton);
    }
}

// --- 5. READ: FETCH AND RENDER USERS ---
async function fetchUsers() {
    renderSkeletons();
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Không thể tải danh sách thành viên từ Server.");
        
        const data = await response.json();
        // Định hình lại dữ liệu phẳng để xử lý dễ dàng hơn
        usersState = data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            company: user.company?.name || user.company || 'N/A'
        }));
        
        renderUsers(usersState);
    } catch (error) {
        userGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--danger)">Có lỗi xảy ra: ${error.message}</p>`;
        showToast(error.message, 'error');
    }
}

function renderUsers(usersArray) {
    userGrid.innerHTML = '';
    
    if (usersArray.length === 0) {
        userGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted)">Không có kết quả trùng khớp.</p>';
        return;
    }

    usersArray.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';

        const infoDiv = document.createElement('div');
        infoDiv.className = 'user-info';

        const nameEl = document.createElement('h3');
        nameEl.textContent = user.name;

        const emailEl = document.createElement('p');
        emailEl.className = 'user-meta';
        emailEl.textContent = `✉️ ${user.email}`;

        const phoneEl = document.createElement('p');
        phoneEl.className = 'user-meta';
        phoneEl.textContent = `📞 ${user.phone}`;

        const companyEl = document.createElement('p');
        companyEl.className = 'user-meta';
        companyEl.textContent = `🏢 ${user.company}`;

        infoDiv.appendChild(nameEl);
        infoDiv.appendChild(emailEl);
        infoDiv.appendChild(phoneEl);
        infoDiv.appendChild(companyEl);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'user-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-edit';
        editBtn.textContent = 'Sửa';
        editBtn.addEventListener('click', () => openEditModal(user));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Xóa';
        deleteBtn.addEventListener('click', () => handleDeleteUser(user.id));

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        card.appendChild(infoDiv);
        card.appendChild(actionsDiv);
        userGrid.appendChild(card);
    });
}

// --- 6. SEARCH: CLIENT-SIDE REAL-TIME FILTER ---
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = usersState.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    renderUsers(filtered);
});

// --- 7. MODAL CONTROLS ---
function openCreateModal() {
    modalTitle.textContent = 'Thêm Thành Viên Mới';
    userIdInput.value = ''; 
    userForm.reset();
    userModal.classList.remove('hidden');
}

function openEditModal(user) {
    modalTitle.textContent = 'Cập Nhật Thông Tin';
    userIdInput.value = user.id;
    
    document.querySelector('#nameInput').value = user.name;
    document.querySelector('#emailInput').value = user.email;
    document.querySelector('#phoneInput').value = user.phone;
    document.querySelector('#companyInput').value = user.company;
    
    userModal.classList.remove('hidden');
}

function closeModal() {
    userModal.classList.add('hidden');
}

openCreateModalBtn.addEventListener('click', openCreateModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === userModal) closeModal(); });

// --- 8. CREATE & UPDATE: HANDLE FORM SUBMIT ---
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = userIdInput.value;
    const userData = {
        name: document.querySelector('#nameInput').value.trim(),
        email: document.querySelector('#emailInput').value.trim(),
        phone: document.querySelector('#phoneInput').value.trim(),
        company: document.querySelector('#companyInput').value.trim()
    };

    if (id) {
        // --- CHẾ ĐỘ UPDATE (PUT) ---
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(userData),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!response.ok) throw new Error("Cập nhật thất bại trên hệ thống Server mẫu.");

            // Cập nhật mảng State cục bộ để cập nhật UI ngay lập tức mà không reload trang
            usersState = usersState.map(user => user.id == id ? { ...user, ...userData } : user);
            renderUsers(usersState);
            closeModal();
            showToast('Cập nhật thông tin thành công!');
        } catch (error) {
            showToast(error.message, 'error');
        }
    } else {
        // --- CHẾ ĐỘ CREATE (POST) ---
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!response.ok) throw new Error("Không thể đẩy thành viên mới lên Server.");

            const newUser = await response.json();
            
            // Giả lập ID tăng tiến cục bộ (vì JSONPlaceholder luôn trả về ID = 11)
            newUser.id = usersState.length > 0 ? Math.max(...usersState.map(u => u.id)) + 1 : 1;
            newUser.company = userData.company;

            usersState.unshift(newUser); // Thêm lên đầu danh sách hiển thị
            renderUsers(usersState);
            closeModal();
            showToast('Thêm thành viên mới thành công!');
        } catch (error) {
            showToast(error.message, 'error');
        }
    }
});

// --- 9. DELETE: CONFIRM & CALL API ---
async function handleDeleteUser(id) {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa thành viên này?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Không thể xử lý yêu cầu xóa trên Server.");

        // Loại bỏ khỏi State và vẽ lại UI
        usersState = usersState.filter(user => user.id !== id);
        renderUsers(usersState);
        showToast('Đã xóa thành viên khỏi danh sách.');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// --- 10. INITIALIZATION ---
fetchUsers();