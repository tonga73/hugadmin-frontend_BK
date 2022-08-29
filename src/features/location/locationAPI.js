import { axiosClient } from "../../app/axiosClient";

export function fetchLocations() {
  return axiosClient
    .get("/locations")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      const { msg } = err.response.data;
      console.log(err);
      const res = {
        status: "error",
        msg,
      };
      return res;
    });
}

export function fetchNewLocation(req) {
  return axiosClient
    .post("/locations", req)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      const { msg } = err.response.data;
      console.log(err);
      const res = {
        status: "error",
        msg,
      };
      return res;
    });
}
