import PropTypes from "prop-types";

const WeatherItems = (props) => {
    const { location, country, temperature, description, icon, wind, last_updated, wind_dir, locationTime } = props;

    return (
        <div className="container mt-5 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 p-6 rounded-lg shadow-lg text-white">
            <div className="text-center">
                <h2 className="text-4xl font-semibold">{location}</h2>
                <h4 className="text-lg">{country}</h4>
            </div>
            <div className="text-center mt-6">
                <p className="text-lg">Local Time</p>
                <p className="text-xl font-semibold">{locationTime}</p>
            </div>
            <div className="flex justify-center items-center my-6">
                <img src={icon} alt={description} className="w-24 h-24" />
            </div>
            <div className="text-center">
                <p className="text-3xl font-semibold">{temperature}</p>
                <p className="text-lg">{description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                    <p className="text-lg">Wind</p>
                    <p className="text-xl font-semibold">{wind} Kph</p>
                </div>
                <div className="text-center">
                    <p className="text-lg">Wind Direction</p>
                    <p className="text-xl font-semibold">{wind_dir}</p>
                </div>
            </div>
            <div className="text-center mt-6">
                <p className="text-lg">Last Updated</p>
                <p className="text-xl font-semibold">{last_updated}</p>
            </div>
        </div>
    );
};

WeatherItems.propTypes = {
    location: PropTypes.string,
    country: PropTypes.string,
    locationTime: PropTypes.string,
    temperature: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    wind: PropTypes.string,
    last_updated: PropTypes.string,
    wind_dir: PropTypes.string,
};

export default WeatherItems;