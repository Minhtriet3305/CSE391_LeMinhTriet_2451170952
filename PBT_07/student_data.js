const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1. Tính điểm trung bình cho mỗi sinh viên
function tinhDiemTB(student) {
    return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}

// 2. Xếp loại
function xepLoai(diemTB) {
    if (diemTB >= 8.0) return "Giỏi";
    if (diemTB >= 6.5) return "Khá";
    if (diemTB >= 5.0) return "Trung bình";
    return "Yếu";
}

// Thêm điểm TB và xếp loại vào mảng
students.forEach(student => {
    student.diemTB = tinhDiemTB(student);
    student.xepLoai = xepLoai(student.diemTB);
});

// 3. In bảng kết quả
console.log("+-----+--------+------+-------------+");
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("+-----+--------+------+-------------+");
students.forEach((student, index) => {
    console.log(`| ${(index + 1).toString().padEnd(3)} | ${student.name.padEnd(6)} | ${student.diemTB.toFixed(1).padStart(4)} | ${student.xepLoai.padEnd(11)} |`);
});
console.log("+-----+--------+------+-------------+");

// 4. Đếm số SV mỗi xếp loại
let demLoai = {
    "Giỏi": 0,
    "Khá": 0,
    "Trung bình": 0,
    "Yếu": 0
};

students.forEach(student => {
    demLoai[student.xepLoai]++;
});

console.log("\n Số lượng sinh viên theo xếp loại:");
console.log("Giỏi:", demLoai["Giỏi"]);
console.log("Khá:", demLoai["Khá"]);
console.log("Trung bình:", demLoai["Trung bình"]);
console.log("Yếu:", demLoai["Yếu"]);

// 5. Tìm SV có điểm TB cao nhất và thấp nhất
let diemCaoNhat = students[0];
let diemThapNhat = students[0];

students.forEach(student => {
    if (student.diemTB > diemCaoNhat.diemTB) diemCaoNhat = student;
    if (student.diemTB < diemThapNhat.diemTB) diemThapNhat = student;
});

console.log(`\n Điểm TB cao nhất: ${diemCaoNhat.name} (${diemCaoNhat.diemTB.toFixed(2)} điểm)`);
console.log(` Điểm TB thấp nhất: ${diemThapNhat.name} (${diemThapNhat.diemTB.toFixed(2)} điểm)`);

// 6. Tính điểm TB toàn lớp cho từng môn
let tongMath = 0, tongPhysics = 0, tongCS = 0;
students.forEach(student => {
    tongMath += student.math;
    tongPhysics += student.physics;
    tongCS += student.cs;
});

let tbMath = tongMath / students.length;
let tbPhysics = tongPhysics / students.length;
let tbCS = tongCS / students.length;

console.log("\nĐiểm trung bình toàn lớp:");
console.log(`Toán: ${tbMath.toFixed(2)}`);
console.log(`Vật lý: ${tbPhysics.toFixed(2)}`);
console.log(`CS: ${tbCS.toFixed(2)}`);

// 7. Bonus: Tính điểm TB theo giới tính
let nam = { tong: 0, count: 0 };
let nu = { tong: 0, count: 0 };

students.forEach(student => {
    if (student.gender === "M") {
        nam.tong += student.diemTB;
        nam.count++;
    } else if (student.gender === "F") {
        nu.tong += student.diemTB;
        nu.count++;
    }
});

let tbNam = nam.count > 0 ? nam.tong / nam.count : 0;
let tbNu = nu.count > 0 ? nu.tong / nu.count : 0;

console.log("\n Điểm trung bình theo giới tính:");
console.log(`Nam (${nam.count} SV): ${tbNam.toFixed(2)} điểm`);
console.log(`Nữ (${nu.count} SV): ${tbNu.toFixed(2)} điểm`);