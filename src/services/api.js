import axios from "axios";

export default async function getProducts() {

    const response = await axios.get("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json")
    const result = response.data
    return result

}