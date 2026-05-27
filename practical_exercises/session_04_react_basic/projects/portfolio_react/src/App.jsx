import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import User from './userprofile.jsx'
import Product from './productinfo.jsx'
import LifecycleDemo from './lifecircledemo.jsx'


function GoodCounter() {
  const [count, setCount] = useState(0);  // ← useState!

  function handleClick() {
    setCount(count + 1);  // React biết cần re-render!
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>✅ Counter "tốt" (dùng useState)</h2>
      <p>Bộ đếm: {count}</p>
      <button onClick={handleClick}>Tăng (+1)</button>
      <p style={{ color: "green" }}>
        ✅ Nhấn nút → Số trên màn hình CẬP NHẬT!
      </p>
    </div>

  );
}

export default GoodCounter;
