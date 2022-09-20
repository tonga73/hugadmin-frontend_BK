import React from "react";
import { useDispatch } from "react-redux";

import { Input, Kbd, Button } from "react-daisyui";

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
    <div className="input-group w-full">
      <Input
        onChange={onChangeHandler}
        onKeyUp={handleKeyPress}
        value={inputValue}
        type="text"
        placeholder="Buscar..."
        className="w-full"
      />
      <Button
        onClick={() => {
          setInputValue("");
          dispatch(filterRecords(""));
        }}
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
      </Button>
    </div>
  );
}
