import axios from "axios";

const API_URL = "http://localhost:5001/api";

///user

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/authentication/sign-in`, data);
  return {
    user: response.data.user,
    tokens: response.data.tokens,
  };
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/authentication/sign-up`, data);
  return {
    user: response.data.user,
    tokens: response.data.tokens,
  };
};

export const fetchCurrentUser = async (accessToken) => {
  return axios.get(`${API_URL}/authentication`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const refreshTokens = async (refreshToken) => {
  return axios.post(`${API_URL}/authentication/refresh`, { refreshToken });
};

export const updateUserProfile = async (token, data) => {
  const response = await axios.put(`${API_URL}/users/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

////// orders
export const createOrder = async (token, orderData) => {
  console.log(orderData);
  try {
    const response = await axios.post(`${API_URL}/users/order`, orderData, {
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

export const getOrdersByUser= async (token) => {
  const response = await axios.get(`${API_URL}/users/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

////////
export const getBot = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/chat",
      payload
    );
    console.log("Message sent:", response.data);
    return response;
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

////
export const addItemToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(
      `http://localhost:5001/api/users/${userId}/cart`,
      {
        userId,
        productId,
        quantity: quantity,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteItemFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5001/api/users/${userId}/cart`,
      {
        data: { userId, productId },
      }
    );
    console.log({ "just updated user": response.data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
