import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const makeRequest = async () => {
    try {
      const promise = fetch("http://localhost:3000/increment", {
        method: "POST"
      });
      const res = await promise;
      // const data = await res.json();
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001/');

    // just so we know when the client has connected
    socket.addEventListener('open', () => {
      console.log("connected to web socket");
    });

    // handle incoming messages
    socket.addEventListener('message', (message) => {
      console.log("received from websocket: ", message.data);

      const body = JSON.parse(message.data);
      setCount(body.count);
    });

    // just to know when the client disconnects
    socket.addEventListener('close', (message) => {
      console.log("disconnected from websocket");
    });

    // returning a function in this useEffect makes it execute when the component unmounts.
    return () => {
      socket.close(); // close socket when the component unmounts
    }
  }, []);

  return (
    <button onClick={() => makeRequest()}>
      count is {count}
    </button>
  );
}

export default App;
