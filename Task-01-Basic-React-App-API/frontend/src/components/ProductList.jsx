import ProductCard from "./ProductCard";

function ProductList({ products, editProduct, deleteProduct }) {
  return (
    <div>
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;