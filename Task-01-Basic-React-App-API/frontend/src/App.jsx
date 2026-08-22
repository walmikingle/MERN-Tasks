import './App.css'
import ProductCard from './components/ProductCard'

function App() {
  return (
    <div className='products'>
      <h1>Our Products</h1>
      <ProductCard
      name="Laptop"
      price={55000}
      category="Electronics"
      />
      <ProductCard
      name="Mobile"
      price={155000}
      category="Electronics"
      />
      <ProductCard
      name="Wireless Mouse"
      price={1200}
      category="Accessories"
      />
      <ProductCard
      name="Mechanical Keyboard"
      price={2399}
      category="Accessories"
      />
    </div>
  )
  
}

export default App
