import React, { useState } from "react";
import { LeftArrowHead, SearchIcon, SettingIcon } from "./Icons";
import { logout } from "../Utils/Firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { searchResult } from "../Utils/Api/Api";
import cross from "../Assets/cross.svg";

export default function Navbar({ location }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log("logout");
    navigate("/auth/login");
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // Search functions
  const handleChange = (e) => {
    setSearchText(e.target.value);
    setSearchResults([]);
  };

  // const isEmail = (email) => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  const handleSearch = async () => {
    if (searchText.length === 0) return;
    setLoading(true);
    try {
      const response = await searchResult(searchText);
      setSearchResults(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-[8vh] p-2 flex items-center">
      <div className="flex w-full items-center gap-2 justify-between">
        <div className="flex-1 text-3xl font-medium text-blue-800 capitalize">
          {location}
        </div>

        {/* 
        //! Search Bar
        */}
        <div
          className={`lg:w-[40rem] flex items-center justify-between relative bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-lg
          ${inputFocused && "shadow-lg bg-zinc-200"}
          `}
        >
          <div className="flex gap-2 flex-1">
            <SearchIcon className="w-6 h-6 opacity-70" />
            <input
              type="text"
              value={searchText}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              placeholder="Search by name"
              className="hidden lg:block min-w-[18rem] w-full bg-transparent outline-none border-none placeholder:text-zinc-700 "
            />
          </div>
          {searchText.length !== 0 && (
            <button
              onClick={() => setSearchText("")}
              className="rounded-full hover:bg-zinc-300 transition-all box-border"
            >
              <img
                src={cross}
                alt="cross icon"
                className="w-6 h-6 opacity-70 object-cover"
              />
            </button>
          )}
          {
            // ? This is the dropdown for search
          }
          {searchResults.length > 0 && searchText.length !== 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 top-11 left-0 w-full border bg-white-og rounded-lg shadow-xl"
            >
              <div className="flex flex-col">
                {searchResults.map((result) => {
                  let email = result.addressDetail.parentsEmail;
                  return (
                    <Link
                      to={`student/${result._id}`}
                      key={result._id}
                      className="hover:bg-blue-100 px-2 py-1 text-black-1 flex justify-between items-center"
                    >
                      <span className="text-[15px]">
                        {result.firstName} {result.lastName}
                      </span>
                      <span className="text-[13px] lowercase px-2 py-1 rounded-md bg-amber-200">
                        {email}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/*
        //! Profile
        */}
        <div className="lg:flex-1 flex justify-end items-center relative">
          {isOpen && <LeftArrowHead className="w-3 h-3" />}
          <button
            onClick={handleIsOpen}
            className={` ${
              isOpen && "rotate-45 translate-x-2"
            } " transition-all"`}
          >
            <SettingIcon className="lg:w-6 lg:h-6" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute shadow-md backdrop-blur-lg rounded-[5px] right-10 top-0 overflow-hidden z-10 "
              >
                <div className="flex flex-col items-center text-[15px]">
                  <div className="py-2 px-5">Profile</div>
                  <div className="py-2 px-5">Settings</div>
                  <div className="py-2 px-5 border-t border-zinc-300 w-full text-center hover:bg-red-200 bg-red-100 transition-all">
                    <button onClick={handleLogout} className="text-red-500 ">
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
