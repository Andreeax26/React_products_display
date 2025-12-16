import { Routes, Route } from "react-router-dom";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { SearchResults } from "./pages/SearchResults/SearchResults";
import { BackToTop } from "./components/BackToTop/BackToTop";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <BackToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product_details/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
