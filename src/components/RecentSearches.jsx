/* eslint-disable react/prop-types */

export default function RecentSearches({
  recentCities,
  setQuery,
  setRecentCities,
}) {
  const handleCityClick = (city) => {
    setQuery({ q: city });
  };

  const handleDelete = (city) => {
    setRecentCities((prevCities) => prevCities.filter((c) => c !== city));
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold text-white">Recent Searches</h2>
      <div className="flex gap-2 flex-wrap mt-2">
        {recentCities.map((city) => (
          <div
            key={city}
            className="flex items-center bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 cursor-pointer"
          >
            <span className="text-black" onClick={() => handleCityClick(city)}>{city}</span>
            <button
              onClick={() => handleDelete(city)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
