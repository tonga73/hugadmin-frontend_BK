import { axiosClient } from "../../app/axiosClient";

export function fetchGetTracings() {
  return axiosClient
    .get("/tracings")
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
