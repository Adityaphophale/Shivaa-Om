import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Import from "./pages/Import";
import Export from "./pages/Export";
import TradeActivities from "./pages/TradeActivities";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import ProductDetail from "./pages/ProductDetail";
import BlogPost from "./pages/BlogPost";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/import" element={<Import />} />
                <Route path="/export" element={<Export />} />
                <Route path="/trade-activities" element={<TradeActivities />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
        
      </Routes>
    </Router>
  );
}
