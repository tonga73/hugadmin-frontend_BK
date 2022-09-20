import { axiosClient } from "../../app/axiosClient";

export async function fetchGetCourt(id) {
  try {
    const { data } = await axiosClient(`/courts/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
