import axios from "axios"

export function GetAllProduct() {
   return axios.get("https://dummyjson.com/products").then(res => {
        return res.data.products
    })
}

export function GetSingleProduct(id) {
    return axios.get(`https://dummyjson.com/products/${id}`).then(res => {
        return res.data
    })
}