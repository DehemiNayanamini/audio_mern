import "./productCard.css";

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
  discount,
}) {
  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={title} />

      <h3 className="product-title">{title}</h3>

      <div className="price-section">
        <span className="current-price">Rs.{price}</span>

        <div className="discount-row">
          <span className="old-price">Rs.{oldPrice}</span>
          <span className="discount">-{discount}%</span>
        </div>
      </div>
    </div>
  );
}

