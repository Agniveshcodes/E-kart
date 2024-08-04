import axios from "axios";

export function GetAllProduct({ sortBy, query, page ,sortType }) {
  let params = {};

  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (sortType) {
    params.sortBy = sortType;
  }

  if (query) {
    params.search = query;
  }

  if (page) {
    params.page = page;
  }

  return axios
    .get(`https://myeasykart.codeyogi.io/products`, {
      params,
    })
    .then((res) => {
      return res.data;
    });
}

export function GetSingleProduct(id) {
  return axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
    return res.data;
  });
}
