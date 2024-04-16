import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Function to fetch all product data
export async function getAllProducts() {
  try {
    const response = await axios.get("/api/products/getProducts");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
}

//Function to post product data
export const createProduct = async (productData) => {
  try {
    // Get the authentication token from localStorage or wherever it's stored
    const authToken = await localStorage.getItem("token");

    // Set the authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await axios.post(
      "/api/products/createProduct",
      productData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
};

// // Function to fetch product data by ID
// export async function getProductById(productId) {
//   console.log("Fetching product with ID:", productId);
//   try {
//     const response = await axios.get(`/api/products/getProduct/${productId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw new Error("Error fetching product");
//   }
// }

//function to fetch product data by userid(posted_by)
export async function getProductsByUserId(userId) {
  try {
    const response = await axios.get(
      `/api/products/getProductsByUserId/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by user ID:", error);
    throw new Error("Error fetching products by user ID");
  }
}

//function to update product by productid
export async function updateProduct(productId, updatedProductData) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `/api/products/updateProduct/${productId}`,
      updatedProductData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Couldn't update product");
  }
}

//function to delete product
export async function deleteProduct(productId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `/api/products/deleteProduct/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Couldn't delete product");
  }
}
