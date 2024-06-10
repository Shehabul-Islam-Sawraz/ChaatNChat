import './App.scss';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Router/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ProtectedRoute Component={Chat} />} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
