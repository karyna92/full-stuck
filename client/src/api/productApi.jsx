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
  }
};

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
