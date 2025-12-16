import "../../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./productdetails.css";
import { ReviewText } from "../../components/ReviewText/ReviewText";"../../components/ReviewText/ReviewText"

export function ProductDetails() {
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

  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [loadingReview, setLoadingReview] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:8055/products/${id}`,
      );
      setProduct(response.data[0] || null);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const handleSubmitReview = async () => {
    if (!id) return;

    if (!reviewText.trim() && rating === 0) {
      setSubmitError("Please write a review and select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      setSubmitError("Please write a review.");
      return;
    }

    if (rating === 0) {
      setSubmitError("Please select a rating.");
      return;
    }

    setSubmitError(null);
    setLoadingReview(true);

    try {
      await axios.post(`http://localhost:8055/products/${id}/reviews`, {
        text: reviewText,
        rating: rating,
      });

      setReviewText("");
      setRating(0);

      fetchProduct();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setSubmitError("Failed to submit review.");
    } finally {
      setLoadingReview(false);
    }
  };

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
      <div className="product-container-details">
        <div className="img-descr-container">
          <div className="product-image-container">
            <img
              className="product-reviews-image"
              src={getProductImage(product.id)}
              alt={product.name}
            />
          </div>

          <div className="right-product-details">
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

            <p className="title-size">Size</p>
            <div className="buttons-container">
              <button type="button" className="button-size">
                XS
              </button>
              <button type="button" className="button-size">
                S
              </button>
              <button type="button" className="button-size">
                M
              </button>
              <button type="button" className="button-size">
                L
              </button>
              <button type="button" className="button-size">
                XL
              </button>
            </div>
            <button className="button-order">Order</button>
          </div>
        </div>

        <hr className="line" />

        <div className="product-reviews-container">
          <div className="add-review-container">
            <input
              placeholder="Add a review"
              className="review-input"
              id="review-input"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  color={star <= rating ? "gold" : "lightgray"}
                  size={24}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <button
              type="submit"
              className="review-button"
              onClick={handleSubmitReview}
              disabled={loadingReview}
            >
              Submit
            </button>
          </div>
          {submitError && <p className="error-message">{submitError}</p>}

          <p className="title-reviews">Reviews</p>
          {product.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
         <div className="details-reviews-grid">
            {product.reviews.map((review) => (
              <div key={review.id} className="product-reviews-details">
                <ReviewText text={review.text} />
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
