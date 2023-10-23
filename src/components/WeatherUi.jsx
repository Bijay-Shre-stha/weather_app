import { useState } from 'react';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = () => {
        // You can fetch weather data from an API here (e.g., OpenWeatherMap).
        // For simplicity, we'll mock the data.
        const mockData = {
            location: 'New York',
            temperature: '22°C',
            description: 'Partly Cloudy',
        };

        setWeatherData(mockData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
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
                {weatherData && (
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">{weatherData.location}</h3>
                        <p className="text-gray-700">{weatherData.temperature}</p>
                        <p className="text-gray-700">{weatherData.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
