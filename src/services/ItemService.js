import axios from "axios";

export const ItemServices = {
  getAllItems,
};

const API_URL = "https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments";

function getAllItems() {
    return axios({
      method: "get",
      url: API_URL,
    })
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        return response.response;
      });
  }