import './App.css';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <div className="App">
      <h1>Chaat N Chat</h1>
      <Chat />
      <Login />
      <Register />
    </div>
  );
}

export default App;
