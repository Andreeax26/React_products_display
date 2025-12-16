import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

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

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query: string = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8055/products").then((response) => {
      const filtered = response.data.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      );
      setProducts(filtered);
    });
  }, [query]);

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
    <div className="products-grid">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product_details/${product.id}`}
          className="product-container"
        >
          <div className="product-image-container">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="product-name">{product.name}</div>
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
  );
}
