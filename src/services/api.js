import axios from "axios"

export const getData = async () => {
  const uri = import.meta.env.VITE_FRONTEND_URI
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