import { useState, useEffect } from 'react'
import getProduct from "./services/api"
import { setItems } from './feature/productSlice/productSlice'
import './App.css'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { useDispatch } from 'react-redux';
import { setCategories } from './feature/categorySlice/categorySlice';
import HomePage from './pages/HomePage';
import AllProduct from './pages/AllProduct';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartToast } from './components/CartToast';

// Scroll to top helper on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location]);

  return null;
}

function App() {

  const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProduct()
      setProducts(result)
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      dispatch(setItems(products));
      const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
      dispatch(setCategories(uniqueCategories));
    }
  }, [products, dispatch]);


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex justify-center transition-colors duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/collection/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      <CartToast />
      <CartDrawer />
      <Footer />
    </BrowserRouter>
  )
}

export default App
