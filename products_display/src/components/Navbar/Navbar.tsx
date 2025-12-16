import "./navbar.css";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchList } from "../../pages/SearchList/SearchList";

type Review = {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
};

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  reviews: Review[];
};

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8055/products")
      .then((response) => setProducts(response.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setSearch("");
    setSearchVisible(false);

    navigate(`/search?query=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="search-item">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>

          <form className="search-wrapper" onSubmit={handleSubmit}>
            <button type="submit" id="search-icon">
              <FaSearch />
            </button>
            <input
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchVisible(true)}
            />
          </form>
        </div>
        <div className="nav-bar-right">
          <p>Contact</p>
          <p>About</p>
        </div>
      </nav>
      <div className="search-results">
        {searchVisible && (
          <SearchList
            search={search}
            products={products}
            onSelect={() => {
              setSearchVisible(false);
              setSearch("");
            }}
          />
        )}
      </div>
    </>
  );
}
