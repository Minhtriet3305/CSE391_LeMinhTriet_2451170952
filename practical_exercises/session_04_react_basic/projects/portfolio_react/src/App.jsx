import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import User from './userprofile.jsx'
import Product from './productinfo.jsx'
import LifecycleDemo from './lifecircledemo.jsx'



// function FlowDemo() {
//   console.log("🔄 Component render!");

//   const [step, setStep] = useState(1);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Luồng hoạt động</h2>
//       <p>Bước hiện tại: {step}</p>

//       <button onClick={() => setStep(step + 1)}>
//         Bước tiếp theo →
//       </button>

//       <button onClick={() => setStep(1)}>
//         Quay lại đầu
//       </button>

//       <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
//         {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
//         {step === 2 && <p>📖 Bước 2: Đang học React</p>}
//         {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
//         {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
//       </div>
//     </div>
//   );
// }


// export default FlowDemo

function App() {
  const AboutMe = () => {
    const ten = "Lê Minh Triết";
    const tuoi = 21;
    const queQuan = {
      thanhPho: 'Hà Nội',
      phuong: 'Hoàng Mai',
    }

    return (
      <div className='Introduct-section'>
        <h3>Xin chào {ten}, {tuoi} tuổi, quê quán: {queQuan.thanhPho}, {queQuan.phuong}</h3>
      </div>
    );

  }


  // Component Greeting
  const Greeting = () => {
    const hour = new Date().getHours();
    let greeting = "";
    let emoji = "";

    if (hour >= 5 && hour < 12) {
      greeting = "Chào buổi sáng";
      emoji = "☀️";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Chào buổi chiều";
      emoji = "⛅";
    } else {
      greeting = "Chào buổi tối";
      emoji = "🌙";
    }

    return (
      <div className="greeting">
        <h2>{greeting} {emoji}</h2>
        <p>Hiện tại: {new Date().toLocaleTimeString('vi-VN')}</p>
      </div>
    );
  };

  // Component BMI Calculator
  const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState(null);

    const handleCalculate = () => {
      if (weight && height && parseFloat(height) > 0) {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height) / 100;
        const bmiValue = weightNum / (heightNum * heightNum);
        setBmiResult(bmiValue.toFixed(2));
      } else {
        alert("Vui lòng nhập số hợp lệ!");
      }
    };

    const getBMIMessage = (bmi) => {
      if (bmi < 18.5) return { text: "Gầy", color: "#ffa500" };
      if (bmi < 23) return { text: "Bình thường", color: "#4caf50" };
      if (bmi < 25) return { text: "Thừa cân", color: "#ff9800" };
      if (bmi < 30) return { text: "Tiền béo phì", color: "#f44336" };
      return { text: "Béo phì", color: "#d32f2f" };
    };

    return (
      <div className="bmi-calculator">
        <h2>Tính chỉ số BMI</h2>
        <div>
          <input
            type="number"
            placeholder="Cân nặng (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Chiều cao (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button onClick={handleCalculate}>Tính BMI</button>

        {bmiResult && (
          <div className="result">
            <h3>BMI: {bmiResult}</h3>
            <p style={{ color: getBMIMessage(bmiResult).color, fontWeight: 'bold' }}>
              {getBMIMessage(bmiResult).text}
            </p>
            <small>Công thức: {weight} / ({height}/100)² = {bmiResult}</small>
          </div>
        )}
      </div>
    );
  };

  // CSS style
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    greeting: {
      background: '#f0f0f0',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '30px',
      textAlign: 'center'
    },
    bmiCalculator: {
      background: '#e8f4f8',
      padding: '20px',
      borderRadius: '10px'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box'
    },
    button: {
      background: '#4caf50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <AboutMe />
      <Greeting />
      <BMICalculator />
    </div>
  );
}

export default App;