import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useParams,
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";

import { v4 } from "node-uuid";

import {
  getRecords,
  selectRecords,
  selectRecordStatus,
} from "../../record/recordSlice";

export function DashboardPanel() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToRecord = (value) => {
    navigate({
      pathname: "/record",
      search: `?id=${value}`,
    });
  };

  const records = useSelector(selectRecords);
  const recordStatus = useSelector(selectRecordStatus);

  const UserTopBar = () => {
    return <nav className="p-3 text-3xl bg-green-500">User</nav>;
  };

  const SearchBar = () => {
    return (
      <div className="form-control w-full">
        <div className="input-group w-full">
          <input
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
  };

  const RecordsMenu = () => {
    return (
      <ul className="menu bg-base-100 w-[97%] self-center rounded-box">
        <li className="bordered">
          {recordStatus === "loading"
            ? "Loading..."
            : records.map((record) => {
                return (
                  <button
                    key={v4()}
                    onClick={() => {
                      goToRecord(record.id);
                    }}
                  >
                    {record.order} | {record.title}
                  </button>
                );
              })}
        </li>
      </ul>
    );
  };

  useEffect(() => {
    dispatch(getRecords({}));
  }, []);

  return (
    <div className="h-full flex flex-col gap-y-1.5">
      {UserTopBar()}
      {SearchBar()}
      <Link
        to="new-record"
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-block"
      >
        Crear Expediente
      </Link>
      {RecordsMenu()}
    </div>
  );
}
