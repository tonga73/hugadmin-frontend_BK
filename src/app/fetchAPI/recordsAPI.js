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

export function fetchGetRecord(req) {
  console.log(req);
  return axiosClient
    .get(`/record/${req}`)
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

export function fetchEditRecord({ id, req }) {
  return axiosClient
    .patch(`/record/${id}`, req)
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

export function fetchDeleteRecord(req) {
  return axiosClient
    .delete(`/record/${req}`)
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
