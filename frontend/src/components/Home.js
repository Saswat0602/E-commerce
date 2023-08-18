import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="grid lg:grid-cols-4 w-[98%] ml-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
    {products.map(product => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
