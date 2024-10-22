import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GravitySim from './GravitySim';
import "./App.css"

function Home() {
  return <div>Home Page</div>;
}

function Navbar() {
  return (
    <div style={{
      display: "flex",
      width: "100%",
      background: "cyan",
      padding: "8px",
      boxSizing: "border-box",
      justifyContent: "space-between"
    }}>
      <div>WAP</div>

      <div style={{
        display: "flex",
        gap: "8px"
      }}>
        <Link to="/">Home</Link>
        <Link to="/gravity-sim">Gravity Sim</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/gravity-sim" element={<GravitySim/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;