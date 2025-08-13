import axios from "axios";

const API_URL = "http://localhost:5000/api/products";


///PRODUCTS
export const getProducts = async (page = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product by id:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createProduct = async (product, token) => {
  try {
    const response = await axios.post(API_URL, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProduct = async (product, token) => {
  try {
    const response = await axios.put(`${API_URL}/${product.id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//////////////////////////////////////////
///REVIEWS

export const createReview = async (productId, reviewData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${productId}/reviews`,
      reviewData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReviews = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (reviewId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 //////////////////////////////////////////
 //ORDERS

export const getAllOrders = async (page) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get("http://localhost:5000/api/orders", {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message
    );
    return [];
  }
};
