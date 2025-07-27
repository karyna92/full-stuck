import axios from "axios";



export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-in",
      data
    );
    const { tokens, user } = response.data;

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

   return { user }; 
  } catch (error) {
    console.error("Login API error:", error);
    throw error; 
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-up",
      data
    );

    const { tokens, user } = response.data;
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const authUser = async (navigate) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null; 
  }

  try {
    const response = await axios.get(
      "http://localhost:5000/api/authentication",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 403) {
      await refreshSession(navigate);
      return authUser(navigate); 
    }
    throw error; 
  }
};



export async function refreshSession(navigate) {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/api/authentication/refresh`,
      { refreshToken }
    );
    const { tokens } = response.data;
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("accessToken", tokens.accessToken);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/");
      return;
    }
    throw error;
  }
}


export const addItemToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/users/${userId}/cart`,
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
      `http://localhost:5000/api/users/${userId}/cart`,
      {
        data: { userId, productId },
      }
    );
    console.log({'just updated user': response.data})
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const updateUserProfile = async (userId, data) => {
  const response = await axios.put(
    `http://localhost:5000/api/users/${userId}/update`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};


export const createOrder = async (userId, orderData) => {
  console.log(orderData)
  try {
    const response = await axios.post(
      `http://localhost:5000/api/users/${userId}/order`,
      {
        userId,
        orderData,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
////////
 export const getBot = async (payload) => { 
  try {
    const response = await axios.post("http://localhost:5000/api/chat", payload);
    console.log("Message sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to send message:", error);
  }
 }