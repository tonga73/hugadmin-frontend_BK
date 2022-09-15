import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { filterRecords } from "../store/slices/records.slice";

export function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
    dispatch(filterRecords(inputValue));
  };

  return (
    <div className="form-control w-full">
      <div className="input-group w-full">
        <input
          onChange={onChangeHandler}
          value={inputValue}
          type="text"
          placeholder="Search…"
          className="input input-bordered w-full"
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
