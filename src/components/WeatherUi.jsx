import { useState, useEffect } from 'react';
import WeatherItems from './WeatherItems';
import PropTypes from 'prop-types';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location) {
            setError(null);
            fetchWeatherData();
        } else {
            setWeatherData(null);
        }
    }, [location]);


    const fetchWeatherData = async () => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            const currentData = data.current;
            const locationData = data.location;

            const weatherData = {
                location: locationData.name,
                country: locationData.country,
                temperature: `${currentData.temp_c}°C`,
                description: currentData.condition.text,
                icon: currentData.condition.icon,
                wind: currentData.wind_kph,
                last_updated: currentData.last_updated,
                wind_dir: currentData.wind_dir,
                locationTime: locationData.localtime,
            };

            setWeatherData(weatherData);
        } catch (error) {
            setError('Error fetching weather data. Please check your location.');
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="container flex items-center justify-center mt-3 bg-blue-100">
            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Weather App</h2>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter Location"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full"
                        onClick={fetchWeatherData}
                    >
                        Get Weather
                    </button>
                </div>

                {weatherData && !error && (
                    <WeatherItems
                        location={weatherData.location}
                        country={weatherData.country}
                        temperature={weatherData.temperature}
                        description={weatherData.description}
                        icon={weatherData.icon}
                        wind={weatherData.wind}
                        last_updated={weatherData.last_updated}
                        wind_dir={weatherData.wind_dir}
                        locationTime={weatherData.locationTime}
                    />
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
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
export default Weather;
