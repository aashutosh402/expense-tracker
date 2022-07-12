import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; 
import { Button } from 'antd';
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props){

  if(localStorage.getItem(`Expense-tracker`))
  {
    return props.children
  }else{
   return <Navigate to='/login'/>
  }

}

export default App;
