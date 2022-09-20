import axios from "axios";
import { axiosClient } from "../../app/axiosClient";

export async function fetchGetRecords() {
  try {
    const { data } = await axiosClient("/records");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGetRecord(id) {
  try {
    const { data } = await axiosClient(`/records/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchNewRecord(id) {
  try {
    const { data } = await axiosClient.post("/records", id);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchEditRecord({ id, req }) {
  try {
    const { data } = await axiosClient.patch(`/records/${id}`, req);

    return await data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDeleteRecord(id) {
  try {
    const { data } = await axiosClient.delete(`/records/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
  // return axiosClient
  //   .delete(`/record/${req}`)
  //   .then(({ data }) => {
  //     return data;
  //   })
  //   .catch((err) => {
  //     const { msg } = err.response.data;
  //     console.log(err);
  //     const res = {
  //       status: "error",
  //       msg,
  //     };
  //     return res;
  //   });
}
