import axios from "axios";

export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-in",
      data
    );
    console.log(response.data)
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
  

