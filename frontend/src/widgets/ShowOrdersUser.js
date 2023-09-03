import React, { useEffect, useState } from "react";

const ShowOrdersUser = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:8000/api/ordered-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderedItems(data.ordered_items);
      })
      .catch((error) => {
        console.error("Error fetching ordered items:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Ordered Items</h2>
      <ul>
        {orderedItems.map(
          (item) =>
            item && (
              <div className="bg-white shadow-md p-4 rounded-lg mb-4">
                <li key={item.id}>
                  <h1 className="font-thin">Order Date:
                  {item.order_date}
                  </h1>
                  <h1 className="font-thin">Order Status:{" "}
                  {item.order_status === "true"
                    ? "Delivered"
                    : "Ordered/Shipped"}
                  </h1>
                </li>
                <ProductDetails productId={item.product_id} />
              </div>
            )
        )}
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
          <h1 className="font-thin">Product Name: {product.name}</h1>
          <h1 className="font-thin">Price: {product.price}</h1> 
          <br />
        </div>
      )}
    </div>
  );
};
export default ShowOrdersUser;
