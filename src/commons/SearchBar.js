import React from "react";
import { useDispatch } from "react-redux";

import { filterRecords } from "../store/slices/records.slice";

export function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
    dispatch(filterRecords(inputValue));
  };

  const handleKeyPress = (e) => {
    if (e.key == "Escape") {
      setInputValue("");
      dispatch(filterRecords(""));
    }
  };

  return (
    <div className="form-control w-full">
      <div className="input-group w-full">
        <input
          onChange={onChangeHandler}
          onKeyUp={handleKeyPress}
          value={inputValue}
          type="text"
          placeholder="Search…"
          className="input input-bordered w-full"
        />
        <button
          onClick={() => {
            setInputValue("");
            dispatch(filterRecords(""));
          }}
          className="btn btn-square"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
