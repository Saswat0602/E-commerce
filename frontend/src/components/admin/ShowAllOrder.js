import React, { useEffect, useState } from "react";

const ShowAllOrder = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/allorders")
      .then((response) => response.json())
      .then((data) => {
        setOrderedProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching ordered products:", error);
      });
  }, []);

  const handleOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/order-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
 
      });
  console.log(response)
      if (response.ok) {
        setOrderedProducts((prevOrderedProducts) => {
          const updatedProducts = prevOrderedProducts.map((product) => {
            if (product.id === orderId) {
              return { ...product, order_status: 'Delivered' }; 
            }
            return product;
          });
          return updatedProducts;
        });
      } else {
        console.error('Error updating order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">All Ordered Products</h2>
      <ul className="space-y-4">
      {orderedProducts.map((product) => (
          <div>
          <li key={product.id+product.product_id} className="bg-white shadow-md p-4 rounded-lg">
            <div className="mb-2">
              <strong className="font-bold">Product ID:</strong>
              {product.product_id}
            </div>
            <div className="mb-2"></div>
            <div className="mb-2">
              <strong className="font-bold">Order Date:</strong>
              {product.order_date}
            </div>
            <div className="mb-2">
              <div className="mb-2">
                <strong className="font-bold">Order Status:</strong>
                {product.order_status === "true"
                  ? "Delivered"
                  : "Ordered/Shipped"}
              </div>
            </div>
            <ProductDetails productId={product.product_id} />
            <button onClick={()=>handleOrder(product.id)}  className="px-4 py-2 bg-slate-400 rounded-sm">Send Order </button>
            </li>
            </div>
            ))}
      </ul>
    </div>
  );
};

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((error) => {
        console.error(
          `Error fetching product details for product ID ${productId}:`,
          error
        );
      });
  }, [productId]);

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      {product && (
        <div>
          <strong className="font-bold">Product Name:</strong> {product.name}
          <br />
          <strong className="font-bold">Price:</strong> {product.price}
          <br />
        </div>
      )}
    </div>
  );
};

export default ShowAllOrder;
