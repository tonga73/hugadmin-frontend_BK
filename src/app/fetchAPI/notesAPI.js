import { axiosClient } from "../axiosClient";

export async function fetchGetNotes() {
  try {
    const { data } = await axiosClient("/notes");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchNewNote(req) {
  try {
    const { data } = await axiosClient.post("/notes", req);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDeleteNote(id) {
  try {
    const { data } = await axiosClient.delete(`/notes/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
