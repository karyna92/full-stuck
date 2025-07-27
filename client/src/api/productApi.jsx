import axios from "axios";

export const getAllProducts = async (page = 1) => {
  try {
    const response = await axios.get("http://localhost:5000/api/products", {
      params: { page },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  };
}


export const createProduct = async (product) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      "http://localhost:5000/api/products",
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.put(
      `http://localhost:5000/api/products/${id}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//////////////////////////////////////////

export const createReview = async (userId, productId, reviewData) => {
  console.log("console api:", reviewData);
  try {
    const response = await axios.post(
      `http://localhost:5000/api/products/${productId}/reviews`,
      {
        userId,
        reviewData,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
