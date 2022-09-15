import { axiosClient } from "../../app/axiosClient";

export function fetchNewTracing(req) {
  return axiosClient
    .post("/tracing", req)
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

export function fetchDeleteTracing(req) {
  return axiosClient
    .delete(`/tracing/${req}`)
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
