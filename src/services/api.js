import axios from "axios"

const uri = import.meta.env.VITE_FRONTEND_URI
export const getData = async () => {
    if (!uri) {
    throw new Error("FRONTEND_URI is not defined")
  }

  try {
    const response = await axios.get(uri)
    return response.data.data
  } catch (error) {
    console.error("Error fetching data:", error.message)
    throw error
  }
}

export const postData = async (params) => 
{
    try
    {
        const response = await axios.post(uri,params)
        return response
    }catch(err){
        console.error(err.response?.data || err.message)
        throw err
    }
}
