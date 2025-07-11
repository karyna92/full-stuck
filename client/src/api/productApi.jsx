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