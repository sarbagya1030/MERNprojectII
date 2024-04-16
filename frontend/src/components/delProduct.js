import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import styles from "../styles/admin.module.css";
import { getAllProducts, deleteProduct } from "../helper/producthelper.js";

export default function DeleteProducts() {
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

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
                to="/admin"
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
          <div className="text-3xl font-bold text-right">
            <a href="#" className="text-violet-500 dark:text-slate-400">
              Trade Accessory
            </a>
          </div>
        </div>
        <div className="container mx-auto px-8 py-8 sm:px-12 mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg text-gray-900">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg text-gray-900">
                      Rs {product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(product._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
