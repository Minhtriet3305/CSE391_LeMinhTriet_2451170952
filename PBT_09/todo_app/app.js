
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // Có 3 giá trị: 'all', 'active', 'completed'

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filtersContainer = document.querySelector('#filters');
const clearCompletedBtn = document.querySelector('#clearCompleted');



// Lưu mảng todos vào localStorage
function saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Thêm Todo mới vào mảng
function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(), // Tạo id độc bản ngẫu nhiên
        text: text.trim(),
        completed: false
    };
    todos.push(newTodo);
    saveToStorage();
    render();
}

// Xóa Todo dựa theo ID
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToStorage();
    render();
}

// Bật/tắt trạng thái hoàn thành của Todo
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveToStorage();
    render();
}

// Cập nhật nội dung chữ của Todo sau khi sửa (Edit)
function updateTodoText(id, newText) {
    if (newText.trim() === '') {
        deleteTodo(id); // Nếu xóa hết chữ thì coi như xóa todo
        return;
    }
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, text: newText.trim() };
        }
        return todo;
    });
    saveToStorage();
    render();
}

// Xóa toàn bộ các Todo đã hoàn thành
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveToStorage();
    render();
}


function render() {
    // Xóa sạch list hiện tại trước khi render list mới để tránh trùng lặp
    todoList.innerHTML = '';

    // Lọc todos dựa theo bộ lọc hiện tại
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // mặc định 'all'
    });

    // Sử dụng createElement xây dựng DOM bảo mật, ngăn chặn XSS hoàn toàn
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id; // Gán ID vào thẻ li để phục vụ Event Delegation
        if (todo.completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text; // An toàn tuyệt đối trước mã độc dạng chuỗi

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Cập nhật bộ đếm (Chỉ tính những item chưa completed)
    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}



// Sự kiện Submit Form để thêm mới Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value.trim() === '') return;
    addTodo(todoInput.value);
    todoInput.value = ''; // Reset ô input
});

// [EVENT DELEGATION] - Bắt mọi hành động Click trong danh sách #todoList
todoList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('.todo-item');
    if (!li) return; // Nếu click lệch ra ngoài item thì bỏ qua
    const id = li.dataset.id;

    // Trường hợp 1: Click nút Xóa ❌
    if (target.classList.contains('delete-btn')) {
        deleteTodo(id);
    } 
    // Trường hợp 2: Click vào phần Text để Toggle Complete
    else if (target.classList.contains('todo-text')) {
        toggleTodo(id);
    }
});

// [EVENT DELEGATION] - Sửa Todo khi Double-Click vào phần Text
todoList.addEventListener('dblclick', (e) => {
    const target = e.target;
    if (!target.classList.contains('todo-text')) return;

    const li = target.closest('.todo-item');
    const id = li.dataset.id;
    const currentText = target.textContent;

    // Tạo nhanh một thẻ input để người dùng chỉnh sửa
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = currentText;

    // Thay thế tạm thời thẻ text thành thẻ input
    li.replaceChild(editInput, target);
    editInput.focus();

    // Hàm lưu lại khi hoàn thành sửa
    let isSaved = false;
    const saveEdit = () => {
        if (isSaved) return;
        isSaved = true;
        updateTodoText(id, editInput.value);
    };

    // Nhấn Enter hoặc Blur (click ra ngoài vùng input) để lưu
    editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') saveEdit();
        if (event.key === 'Escape') render(); // Hủy, quay lại như cũ
    });
    editInput.addEventListener('blur', saveEdit);
});

// Sự kiện đổi Bộ lọc (Filter All/Active/Completed)
filtersContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    // Đổi class active trên giao diện các nút
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Cập nhật bộ lọc hiện tại và render lại UI
    currentFilter = e.target.dataset.filter;
    render();
});

// Sự kiện xóa toàn bộ item đã hoàn thành
clearCompletedBtn.addEventListener('click', clearCompleted);


render();