import { useState } from 'react'
import './App.css'
import LoginForm from './component/LoginForm'
import Home from './component/Home'
import {BrowserRouter as Router,
        Routes,
        Route,
        Navigate,
        useNavigate,
        Outlet
} from 'react-router-dom'
import ProtectedRoute from './component/ProtectedRoute'
import SearchResult from './component/SearchResult'
import ProductDetail from './component/ProductDetail'
import ProductCheckout from './component/ProductCheckout'

function App() {
  const [token,setToken] = useState(null);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
      <Route path='/login' element={<LoginForm isLogin={true} setToken/>}></Route>
        <Route path='/signup'element={<LoginForm isLogin={false}/>}></Route>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/search' element={<SearchResult/>}></Route>
        <Route path='/product/:id' element={<ProductDetail/>}></Route>
        <Route path='/checkout' element={<ProductCheckout/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
