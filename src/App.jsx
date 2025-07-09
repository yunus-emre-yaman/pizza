import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>🍕 Pizza Sipariş Uygulaması</h1>
      <div className="card">
        <button onClick={() => setCount((prev) => prev + 1)}>
          Pizza sayısı: {count}
        </button>
        <p>Butona tıklayarak pizza sayısını artırabilirsiniz.</p>
      </div>
    </div>
  );
}

export default App;
