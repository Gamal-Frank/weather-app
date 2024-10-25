/* eslint-disable react/prop-types */
export default function Forcast({ weather }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6 ">
        <p className="font-meduim uppercase">5 days forcast</p>
      </div>{" "}
      <hr className="my-1 " />
      <div className="flex items-center gap-5 justify-between">
        {weather.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="fpnt-light text-sm">{data.title}</p>
            <img src={data.icon} className="w-12 my-1" alt="icon" />
            <p className="font-meduim">{`${data.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
