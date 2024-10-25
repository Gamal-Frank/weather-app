/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Search({ setQuery, query }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    setCity(query.q);
  }, [query]);
  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-evenly w-full gap-10 my-6">
      <input
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        className=" rounded-lg w-full text-gray-500 font-light p-2 shadow-md capitalize focus:outline-none"
        type="text"
        placeholder="Enter your city"
      />
      <BiSearch
        size={30}
        onClick={() => setQuery({ q: city })}
        className=" cursor-pointer transition ease-out hover:scale-125"
      />
    </div>
  );
}
