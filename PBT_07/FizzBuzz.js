
console.log(" VERSION 1: CLASSIC FIZZBUZZ ");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}


console.log("\n VERSION 2: CUSTOM FIZZBUZZ ");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        // Duyệt qua tất cả các rules
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        // Nếu không có rule nào match, in số
        if (output === "") {
            console.log(i);
        } else {
            // Kiểm tra nếu i = 21 thì in "FizzJazz"
            console.log(`${i} = "${output}"`);
        }
    }
}


console.log("\n--- TEST 1: (3,5,7) ---");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);