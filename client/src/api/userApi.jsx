import axios from "axios";
import history from "../BrowserHistory"

export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-in",
      data
    );
    console.log(response.data);
    const { tokens, user  } = response.data;
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    return user;
  } catch (error) {
    console.error(error);
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

export const authUser = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/authentication",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.user);
      return response.data.user;

    } catch (error) {
      if (error.response && error.response.status === 403) {
        await refreshSession();
        return authUser();
      } else {
        throw error;
      }
    }
  } else {
    history.push("/");
    return;
  }
};

export async function refreshSession() {
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
      history.push("/");
      return;
    }
    throw error;
  }
}

export const addItemtToCart = async (userId, productId, quantity) => {
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

export const deleteItemFromCart = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/users/cart/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
