import axios from "axios";

export const loginUser = async (data) => {
  console.log(data)
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-in",
      data
    );
   console.log(response.data.user) 
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-up",
      data
    );
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};
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


export const deleteItemFromCart= async(id)=> { 
  try {
    const response = await axios.delete(`http://localhost:5000/api/users/cart/${id}`)
    return response.data
    } catch (error) {
      console.error(error)
}
}

