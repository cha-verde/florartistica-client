import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import type { Product } from "./Product";
import Admin from "./Admin";

function App() {



  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5209/api/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={
            <div className="flex m-10 gap-5">
          {products.map((product) => (
          <Link to={`/product/${product.id}`}>
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              photo={product.photo}
            />
        </Link>
          ))}
        </div>
          }
          ></Route>
        <Route path="/admin" element={<Admin/>}>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
