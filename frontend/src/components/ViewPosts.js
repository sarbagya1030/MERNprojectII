import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByUserId, updateProduct } from "../helper/producthelper.js";
import fetchId from "../hooks/fetchid.hook.js";
import { FaEdit } from "react-icons/fa";
// import { Routes, Route } from "react-router-dom";

export default function ViewPosts() {
  const { isLoading, user_id, serverError } = fetchId();
  const [products, setProducts] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    if (!isLoading && user_id) {
      const fetchData = async () => {
        try {
          const products = await getProductsByUserId(user_id);
          setProducts(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchData();
    }
  }, [isLoading, user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (serverError) {
    return <div>Error: {serverError.message}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="container mx-auto px-8 py-8 sm:px-12 mt-0 sm:mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="max-w-xs overflow-hidden bg-white shadow-lg rounded-lg relative"
          >
            <img
              className="w-full h-56 object-cover object-center"
              src={product.product_images[0]}
              alt={product.name}
            />
            <div className="py-4 px-6">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {product.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-lg text-gray-700">Rs {product.price}</div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Available Quantity: {product.quantity_available}</p>
                <p>Category: {product.categories.join(", ")}</p>
                {/* <p>Posted By: {product.posted_by}</p> */}
              </div>
            </div>

            <Link
              to={`/update-product/${product._id}`}
              className="absolute top-2 right-2"
            >
              <FaEdit />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
