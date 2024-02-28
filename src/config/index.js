import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3025",
    timeout:1000,
    headers: {
        "Content-type": "application/json"
    }
})

export const clientApiCall = async(url, method, data, params) =>{
    const headers = {
            "Content-type": "application/json"
        }
        try {
            const response = await apiClient({
                method,
                url,
                data,
                params,
                headers
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
}