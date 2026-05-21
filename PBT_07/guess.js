let secretNumber;
let soLanDoan;
let daDoanRoi; // Mảng lưu các số đã đoán
let gameActive;

function startGame() {
    // Khởi tạo game mới
    secretNumber = Math.floor(Math.random() * 100) + 1;
    soLanDoan = 0;
    daDoanRoi = [];
    gameActive = true;
    
    console.log(" Đáp án bí mật:", secretNumber); // Để test, có thể comment lại
    
    alert(" Bắt đầu game!\nMáy đã chọn số từ 1 đến 100.\nBạn có 7 lượt đoán.");
    
    choiGame();
}

function choiGame() {
    while (gameActive && soLanDoan < 7) {
        let soLanConLai = 7 - soLanDoan;
        let input = prompt(` Lượt đoán thứ ${soLanDoan + 1}/${7}\nCòn ${soLanConLai} lượt\nNhập số từ 1 đến 100:`);
        
        // Kiểm tra Cancel
        if (input === null) {
            alert(" Bạn đã thoát game. Hẹn gặp lại!");
            gameActive = false;
            return;
        }
        
        // Validate input
        let number = Number(input);
        
        // Kiểm tra có phải số không
        if (isNaN(number) || input.trim() === "") {
            alert(" Lỗi: Vui lòng nhập số hợp lệ!");
            continue;
        }
        
        // Kiểm tra số nguyên
        if (!Number.isInteger(number)) {
            alert(" Lỗi: Vui lòng nhập số NGUYÊN!");
            continue;
        }
        
        // Kiểm tra phạm vi 1-100
        if (number < 1 || number > 100) {
            alert(" Lỗi: Vui lòng nhập số từ 1 đến 100!");
            continue;
        }
        
        // Kiểm tra đã đoán chưa
        if (daDoanRoi.includes(number)) {
            alert(` Bạn đã đoán số ${number} rồi! Hãy thử số khác.`);
            continue;
        }
        
        // Lưu số đã đoán
        daDoanRoi.push(number);
        soLanDoan++;
        
        // So sánh
        if (number === secretNumber) {
            alert(` CHÚC MỪNG! Bạn đoán đúng số ${secretNumber} sau ${soLanDoan} lần! 🎉`);
            gameActive = false;
            break;
        } else if (number < secretNumber) {
            alert(` Cao hơn! (Số ${number} nhỏ hơn đáp án)`);
        } else {
            alert(` Thấp hơn! (Số ${number} lớn hơn đáp án)`);
        }
        
        // Hiển thị các số đã đoán
        if (daDoanRoi.length > 0) {
            alert(` Các số đã đoán: ${daDoanRoi.join(", ")}`);
        }
    }
    
    // Kết thúc game
    if (gameActive && soLanDoan >= 7) {
        alert(` GAME OVER! Bạn đã hết 7 lượt đoán.\nĐáp án đúng là: ${secretNumber}\nChơi lại để thử vận may nhé!`);
    }
    
    // Hỏi chơi lại
    let choiLai = confirm(" Bạn có muốn chơi lại không?");
    if (choiLai) {
        startGame();
    } else {
        alert(" Cảm ơn bạn đã chơi! Hẹn gặp lại!");
    }
}