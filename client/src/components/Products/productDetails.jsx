const ProductDetailsCard = ({product}) => {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-details-image"
        />
      )}

      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>

      {product.discount > 0 && (
        <p>
          <strong>Discount:</strong> {product.discount}%
        </p>
      )}

      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        {product.stock >= 1 ? (
          <strong>In stock </strong>
        ) : (
          <strong>Out of stock</strong>
        )}
      </p>
    </div>
  );
};

export default ProductDetailsCard;
