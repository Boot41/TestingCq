import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <header className="App-header">
          {/* Removed logo, link, and paragraph as per request */}
        </header>
      </div>
      <Routes>
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        {/* Add other routes here if needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;