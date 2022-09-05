import { axiosClient } from "../../app/axiosClient";

export function fetchGetDistrict(req) {
  return axiosClient
    .get(`/district/${req}`)
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
