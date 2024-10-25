import { useEffect, useState } from "react";
import Forcast from "./components/Forcast";
import Search from "./components/Search";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import RecentSearches from "./components/RecentSearches";
import { getFormattedData } from "./services/weather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [query, setQuery] = useState({ q: "tokyo" });
  const [weather, setWeather] = useState(null);
  const [recentCities, setRecentCities] = useState([]);

  const getWeather = async () => {
    const message = query.q;
    const data = await getFormattedData({ ...query, units: "metric" });
    toast.success(`Fetched data for ${message}`);
    setWeather(data);

    // Add to recent cities
    setRecentCities((prevCities) => {
      const updatedCities = [
        message,
        ...prevCities.filter((city) => city !== message),
      ];
      return updatedCities.slice(0, 5); // Keep only the last 5 cities
    });
  };

  useEffect(() => {
    getWeather();
  }, [query]);

  return (
    <div className="m-5 lg:mx-auto flex flex-col sm:block items-center max-w-screen-lg mt-4 py-5 px-5 lg:px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700">
      <Search query={query} setQuery={setQuery} />
      <RecentSearches
        recentCities={recentCities}
        setQuery={setQuery}
        setRecentCities={setRecentCities}
      />
      {weather ? (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />
          <Forcast weather={weather?.forCast?.daily} />
        </>
      ) : (
        <div className="h-80 flex justify-center items-center">
          <span>No data, please try again</span>
        </div>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}
