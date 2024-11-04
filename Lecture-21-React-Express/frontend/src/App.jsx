import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => {
        console.log({res})
      }, (rej) => {
        console.log({rej})
      })

  }, []);

  return (
    <button onClick={() => setCount(count + 1)}>
      count is {count}
    </button>
  );
}

export default App;
