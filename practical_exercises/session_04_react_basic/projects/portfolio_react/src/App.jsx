import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import User from './userprofile.jsx'
import Product from './productinfo.jsx'
import LifecycleDemo from './lifecircledemo.jsx'


function FlowDemo() {
  console.log("🔄 Component render!");

  const [step, setStep] = useState(1);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Luồng hoạt động</h2>
      <p>Bước hiện tại: {step}</p>

      <button onClick={() => setStep(step + 1)}>
        Bước tiếp theo →
      </button>

      <button onClick={() => setStep(1)}>
        Quay lại đầu
      </button>

      <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
        {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
        {step === 2 && <p>📖 Bước 2: Đang học React</p>}
        {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
        {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
      </div>
    </div>
  );
}


export default FlowDemo
