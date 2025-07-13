import axios from "axios";

export const loginUser = async (data) => {
  console.log(data)
  try {
    const response = await axios.post(
      "http://localhost:5000/api/authentication/sign-in",
      data
    );
   // console.log(response.data.user) 
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


  

