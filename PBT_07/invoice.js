const danhSachMonAn = [
    { ten: "Phở bò", gia: 65000, soLuong: 2 },
    { ten: "Trà đá", gia: 5000, soLuong: 3 },
    { ten: "Bún chả", gia: 55000, soLuong: 1 },
    { ten: "Nem rán", gia: 45000, soLuong: 2 },
    { ten: "Bia Hà Nội", gia: 20000, soLuong: 4 }
];


const ngayHienTai = new Date(); // Lấy ngày thực tế

const thuTrongTuan = ngayHienTai.getDay(); 


const VAT = 0.08;      
const TIP = 0.05;     
const CO_TIP = true;    

// Tên các thứ trong tuần
const tenThu = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];



// Tính tổng tiền ban đầu
function tinhTongBanDau(danhSach) {
    let tong = 0;
    for (let i = 0; i < danhSach.length; i++) {
        tong += danhSach[i].gia * danhSach[i].soLuong;
    }
    return tong;
}

// Tính giảm giá theo tổng tiền
function tinhGiamGiaTheoTong(tong) {
    if (tong > 1000000) {
        return { phanTram: 15, soTien: tong * 0.15 };
    } else if (tong > 500000) {
        return { phanTram: 10, soTien: tong * 0.10 };
    }
    return { phanTram: 0, soTien: 0 };
}

// Tính giảm giá ngày thứ 3 (Wednesday)
function tinhGiamGiaThuBa(tongSauGiamThuong, laNgayThuBa) {
    if (laNgayThuBa) {
        return { phanTram: 5, soTien: tongSauGiamThuong * 0.05 };
    }
    return { phanTram: 0, soTien: 0 };
}

// Định dạng số tiền
function formatTien(tien) {
    return tien.toLocaleString('vi-VN') + "đ";
}

// ==================== XỬ LÝ CHÍNH ====================

const tongBanDau = tinhTongBanDau(danhSachMonAn);
const giamGiaThuong = tinhGiamGiaTheoTong(tongBanDau);
const tongSauGiamThuong = tongBanDau - giamGiaThuong.soTien;

const laNgayThuBa = (thuTrongTuan === 3); // Thứ 4? Chú ý: 0=CN,1=T2,2=T3,3=T4
// const laNgayThuBa = true; // Test: bỏ comment để test giảm giá thứ 3

const giamGiaThuBa = tinhGiamGiaThuBa(tongSauGiamThuong, laNgayThuBa);
const tongSauGiam = tongSauGiamThuong - giamGiaThuBa.soTien;

const tienVAT = tongSauGiam * VAT;
const tienTip = CO_TIP ? tongSauGiam * TIP : 0;
const tongThanhToan = tongSauGiam + tienVAT + tienTip;



console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║                    HÓA ĐƠN NHÀ HÀNG                        ║");
console.log("╠════════════════════════════════════════════════════════════╣");

// In danh sách món ăn
for (let i = 0; i < danhSachMonAn.length; i++) {
    const mon = danhSachMonAn[i];
    const thanhTien = mon.gia * mon.soLuong;
    const tenMon = mon.ten.padEnd(15);
    const giaMon = (mon.gia / 1000).toFixed(0) + "k";
    const thanhTienStr = (thanhTien / 1000).toFixed(0) + "k";
    console.log(`║ ${(i+1).toString().padStart(2)}. ${tenMon} x${mon.soLuong}   @${giaMon.padStart(3)} = ${thanhTienStr.padStart(4)}   ║`);
}

console.log("╠════════════════════════════════════════════════════════════╣");

// In các khoản mục
console.log(`║ Tổng cộng:                           ${formatTien(tongBanDau).padStart(18)} ║`);
console.log(`║ Giảm giá (${giamGiaThuong.phanTram}%):                    ${formatTien(giamGiaThuong.soTien).padStart(18)} ║`);

if (laNgayThuBa) {
    console.log(`║ Giảm thứ 3 (${giamGiaThuBa.phanTram}%):                ${formatTien(giamGiaThuBa.soTien).padStart(18)} ║`);
}

console.log(`║ VAT (8%):                            ${formatTien(tienVAT).padStart(18)} ║`);

if (CO_TIP) {
    console.log(`║ Tip (5%):                            ${formatTien(tienTip).padStart(18)} ║`);
}

console.log("╠════════════════════════════════════════════════════════════╣");
console.log(`║ THANH TOÁN:                          ${formatTien(tongThanhToan).padStart(18)} ║`);
console.log("╚════════════════════════════════════════════════════════════╝");
