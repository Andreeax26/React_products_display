import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <h2 className="footer-logo">GreenLeaf</h2>
          <p>Your trusted marketplace for eco-friendly products.</p>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li>All Products</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Categories</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Contact Us</li>
            <li>Shipping Info</li>
            <li>Returns & Refunds</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-icons">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-x-twitter"></i>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} GreenLeaf. All rights reserved.
      </div>
    </footer>
  );
}
