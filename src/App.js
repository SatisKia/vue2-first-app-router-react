import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Setting from './Setting';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
