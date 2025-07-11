import axios from "axios";

export const registerUser = async (data) =>{ 
    try {
        const response = await axios.post('http://localhost:5000/api/register', data);
        return response.data;
        } catch (error) {
            console.error(error);
            }
};

export const loginUser= async(data)=> { 
    try {
        const response = await axios.post('http://localhost:5000/api/login', data);
        console.log(response.data);
        } catch (error) {
            console.error(error);
        }
}