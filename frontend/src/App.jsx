import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeDetails from './pages/EmployeeDetails';
import Header from './components/Header';
import './App.css';

function App() {
  console.log('App component rendering...');
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;