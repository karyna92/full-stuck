import axios from "axios";

export const getAllProducts = async(page=1)=>{

     try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: { page },
        });
       console.log(response.data)
       return response.data;

     } catch (error) {
       console.error(error);
     }
}

export const getProductById = async(id)=>{ 
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`); 
    return response.data;
    } catch (error) {
      console.error(error);
      }
}

export const addProductToChart = async (userId, productId) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/users/${userId}/cart
      `, { productId });
      return response.data;
      } catch (error) {
        console.error(error);
      }
};