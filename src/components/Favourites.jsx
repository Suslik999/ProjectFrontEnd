import React from "react";

const Favorites = ({ favorites, setQuery, removeFavorite }) => {
  return (
    <div className="my-6">
      <h2 className="text-xl font-light p-2 w-full capitalize focus:outline-none placeholder:lowercase">Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city} className="flex justify-between items-center">
            <span
              className="text-lg font meduim hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in"
              onClick={() => setQuery({ q: city })}
            >
              {city}
            </span>
            <button
              onClick={() => removeFavorite(city)}
              className="text-red-500 text-lg font meduim hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
