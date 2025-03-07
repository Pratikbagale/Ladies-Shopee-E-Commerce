
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Products from './components/products/Products';
import Signup from './components/signup/Signup';
import Nav from './components/nav/Nav';
import Main from './components/main/Main'; 
import Footer from "/src/components/footer/Footer";
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/signup", "/login","/products"];

  return (
    <div>
      {!hideLayoutRoutes.includes(location.pathname) && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      {!hideLayoutRoutes.includes(location.pathname) && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

 
