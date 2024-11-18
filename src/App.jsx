import React, { useState, useEffect } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/MyInputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import Favorites from "./components/Favourites";

const App = () => {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem("query");
    return savedQuery ? JSON.parse(savedQuery) : { q: "london" };
  });

  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(query));
  }, [query]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  const addFavorite = (city) => {
    if (city && !favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((item) => item !== city));
  };

  return (
    <div className={`mx-auto w-full mt-4 py-1 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} addFavorite={addFavorite} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}
      
      <Favorites 
        favorites={favorites} 
        setQuery={setQuery} 
        removeFavorite={removeFavorite} 
      />
    </div>
  );
};

export default App;
