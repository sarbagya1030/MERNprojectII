import { Link } from "react-router-dom";
import styles from "../styles/admin.module.css";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../helper/producthelper.js";

export default function AdminDash({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

    return () => {
      setProducts([]);
      setLoading(true);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }
  return (
    <div className="h-screen flex dark:text-slate-200">
      <nav
        className={`${styles.navigation} bg-white h-full py-4 px-6 flex flex-col justify-between`}
      >
        <div className="flex justify-between items-center mb-4">
          <ul className="group:opcity-100 dark:border-slate-800 dark:bg-slate-900 flex flex-col">
            <li className="group relative">
              <Link
                to="#"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Home
              </Link>
            </li>
            <li className="group relative">
              <Link
                to="/admin/manageproducts"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Manage Products
              </Link>
            </li>
            <li className="group relative">
              <Link
                to="/admin/manageusers"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Manage Users
              </Link>
            </li>
            <li className="group relative">
              <a
                href="/profileAdmin"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex-grow flex flex-col">
        <div className="px-6 py-4">
          <div className="text-lg font-extrabold text-right">
            <a href="#" className="text-violet-500 dark:text-slate-400">
              Trade Accessory
            </a>
          </div>
        </div>
        <div className="container mx-auto px-8 py-8 sm:px-12 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  className="w-full"
                  src={product.product_images[0]}
                  alt={product.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                  <p className="text-gray-700 text-base">
                    {product.description}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <span className="text-gray-700 text-base">
                    Rs {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
