import axios from "axios";

export function GetAllProduct({ sortBy, query, page, sortType }) {
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
  return axios
    .get(`https://myeasykart.codeyogi.io/product/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function GetCartProducts(ids) {
  let commaSeperatedIds = ids.join();

  return axios
    .get(`https://myeasykart.codeyogi.io/products/bulk/`, {
      params: {
        ids: commaSeperatedIds,
      },
    })
    .then((res) => {
      return res.data;
    });
}

let token = localStorage.getItem("token");


export function SaveDataToCart(cart) {
  return axios
    .post(
      "https://myeasykart.codeyogi.io/carts",
      { data: cart },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
}

export function GetSavedCart() {
  return axios
    .get("https://myeasykart.codeyogi.io/carts", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    });
}
