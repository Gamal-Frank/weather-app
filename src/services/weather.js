import { DateTime } from "luxon";
import { toast } from "react-toastify";

const API_KEY = "703affa140ff621796da77e66ee3b562";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const cache = new Map();

const getWeatherData = async (infoType, searchParams) => {
  try {
    const cacheKey = `${infoType}_${JSON.stringify(searchParams)}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${infoType} data`);

    const data = await response.json();

    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    toast.error(` ${error.message}`);
    throw error;
  }
};

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatTime = (secs, offset, format = "cccc, dd LLL yyyy' ") =>
  DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const format = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;
  const { main: details, icon } = weather[0];
  const formattedTime = formatTime(dt, timezone);
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatTime(sunrise, timezone, "hh:mm a"),
    sunset: formatTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: getIcon(icon),
    formattedTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForcast = (secs, offset, data) => {
  const daily = data
    ?.filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatTime(f.dt, offset, "ccc"),
      icon: getIcon(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { daily };
};

export const getFormattedData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    `weather`,
    searchParams
  ).then((data) => format(data));

  const { dt, lat, lon, timezone } = formattedCurrentWeather;
  const forCast = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForcast(dt, timezone, d.list));
  return { ...formattedCurrentWeather, forCast };
};
