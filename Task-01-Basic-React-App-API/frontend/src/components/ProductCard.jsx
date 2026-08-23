function ProductCard({ product, editProduct, deleteProduct }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>

      <p className="product-price">{`\u20B9${product.price}`}</p>

      <p className="product-category">
        Category: {product.category}
      </p>

      <div className="product-actions">
        <button onClick={() => editProduct(product)}>
          Edit
        </button>

        <button onClick={() => deleteProduct(product._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
