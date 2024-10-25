/* eslint-disable react/prop-types */
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function TempAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
}) {
  const letsDetails = [
    {
      id: 1,
      icon: FaThermometerEmpty,
      title: "Real feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      icon: BiSolidDropletHalf,
      title: "Humadity",
      value: `${humidity.toFixed()}  %`,
    },
    {
      id: 3,
      icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} km/h`,
    },
  ];

  const horizontal = [
    {
      id: 1,
      icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      icon: MdKeyboardArrowDown,
      title: "low",
      value: `${temp_min.toFixed()}°`,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between py-3">
        <img
          src={icon}
          alt="weather icon"
          className="w-20"
        />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex space-y-3 flex-col items-start">
          {letsDetails.map((item) => (
            <div
              key={item.id}
              className="flex font-light text-sm items-center justify-center"
            >
              <item.icon size={18} className="mr-1" />
              {item.title}:{" "}
              <span className="font-medium ml-1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center ml-5 md:space-x-10 text-sm py-3">
        {horizontal.map((item) => (
          <div key={item.id} className="flex flex-row items-center">
            <item.icon size={18} className="mr-1" />
            <p className="font-light ml-1">
              {item.title}:{" "}
              <span className="font-medium ml-1">{item.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
