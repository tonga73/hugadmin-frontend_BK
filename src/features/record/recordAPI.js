import { axiosClient } from "../../app/axiosClient";

export function fetchGetRecords() {
  return axiosClient
    .get("/records")
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

export function fetchNewRecord(req) {
  return axiosClient
    .post("/record", req)
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
