import { useState, useEffect } from 'react';


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

    const fetchWeatherData = () => {
        const apiKey = "393709fbf1e14b5890b122151232310";
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setWeatherData({
                    location: data.location.name,
                    country: data.location.country,
                    locationTime: data.location.locationTime,
                    temperature: `${data.current.temp_c}°C`,
                    description: data.current.condition.text,
                    icon: data.current.condition.icon,
                    wind: data.current.wind_kph,
                    last_updated: data.current.last_updated,
                    wind_dir: data.current.wind_dir
                });
            })
            .catch((error) => {
                setError('Error fetching weather data. Please check your location.');
                console.error('Error fetching weather data:', error);
            });
    };

    return (
        <div className="container  flex items-center justify-center mt-3 bg-blue-100">
            <div className="bg-white p-4  rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800">Weather App</h2>
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
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">{weatherData.location}</h3>
                        <p className="text-gray-700">{weatherData.country}</p>
                        <p className="text-gray-700">{weatherData.temperature}</p>
                        <p className="text-gray-700">{weatherData.description}</p>
                        <img src={weatherData.icon} alt={weatherData.description} className="mx-auto" />
                        <p className="text-gray-700">{weatherData.wind}</p>
                        <p className="text-gray-700">{weatherData.last_updated}</p>
                        <p className="text-gray-700">{weatherData.wind_dir}</p>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Weather;
