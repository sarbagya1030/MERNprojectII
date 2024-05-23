import React, { useEffect, useState } from "react";
import { getAllProducts } from "../helper/producthelper.js";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.categories.includes(category))
      );
    }
  };

  const handleBuyClick = (product) => {
    navigate("/buy", { state: { product } });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  // Sort products by categories
  const sortProductsByCategory = (products) => {
    const categoryOrder = [
      "bracelet",
      "necklace",
      "earrings",
      "rings",
      "hats",
      "hair",
      "others",
    ];

    return products.sort((a, b) => {
      return (
        categoryOrder.indexOf(a.categories[0]) -
        categoryOrder.indexOf(b.categories[0])
      );
    });
  };

  const sortedProducts = sortProductsByCategory(filteredProducts);

  return (
    <div className="container mx-auto px-8 py-8 sm:px-12 mt-8">
      <div className="flex justify-between mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-3 border border-gray-300 rounded shadow-lg bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="bracelet">Bracelet</option>
          <option value="necklace">Necklace</option>
          <option value="earrings">Earrings</option>
          <option value="rings">Rings</option>
          <option value="hats">Hats</option>
          <option value="hair">Hair Accessory</option>
          <option value="others">Others</option>
        </select>
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search Products"
            className="p-3 border border-gray-300 rounded-l shadow-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-r shadow-lg focus:outline-none"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
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
              <p className="text-gray-700 text-base">{product.description}</p>
              <p className="text-gray-700 text-base">
                Category: {product.categories.join(", ")}
              </p>
            </div>
            <div className="px-6 py-4">
              <span className="text-gray-700 text-base">
                Rs {product.price}
              </span>
              <button
                onClick={() => handleBuyClick(product)}
                className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded float-right"
              >
                Buy
              </button>
              <a
                href={`/showreview/${product._id}`}
                className="pt-2 flex justify-start"
              >
                View Review
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
