import "../../index.css";
import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

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

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
  axios
    .get<Product[]>("http://localhost:8055/products")
    .then((response) => {
      setProducts(response.data);
      setError(null); // reset error if successful
    })
    .catch((err) => {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
    });
}, []);

  const getProductImage = (id: string): string => {
    return `https://picsum.photos/400/300?random=${id}`;
  };

  const getAverageRating = (reviews: Review[]) =>
    reviews.length === 0
      ? 0
      : reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const renderStars = (average: number) => {
    const percentage = (average / 5) * 100;

    return (
      <div className="stars-container">
        {}
        <div className="stars-bg">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        {}
        <div className="stars-fill" style={{ width: `${percentage}%` }}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="home-title">Shop</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product_details/${product.id}`}
            className="product-container"
          >
            <div className="product-name">{product.name}</div>
            <div className="product-image">
              <img
                className="product-image"
                src={getProductImage(product.id)}
                alt={product.name}
              />
            </div>
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-reviews">
              <h4>Reviews:</h4>
              {product.reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <div className="product-reviews-summary">
                  <div className="review-stars">
                    {renderStars(getAverageRating(product.reviews))}
                  </div>
                  <span>({product.reviews.length} reviews)</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
