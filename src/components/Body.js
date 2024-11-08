import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { RESCARD_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState([]);
  const onlineStatus = useOnlineStatus();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESCARD_API);
    const json = await data.json();
    // const restaurant = json.data.cards
    //   .map(
    //     (res) => res.card?.card?.gridElements?.infoWithStyle?.restaurants || []
    //   )
    //   .flat()
    //   .filter((res) => res !== undefined);
    console.log(json);
    const restaurant =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    console.log(restaurant);
    setListOfRestaurant(restaurant);
    setFilter(restaurant);
  };

  const handleSearch = () => {
    const filterName = listOfRestaurant.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilter(filterName);
  };

  const handleFilter = () => {
    const topRes = listOfRestaurant.filter((res) => res.info.avgRating > 4);
    setFilter(topRes);
  };
  if (onlineStatus === false)
    return (
      <h1>Oops? looks like you are offline, please check your connections.</h1>
    );
  return (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            className="border border-solid border-black"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg "
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 bg-gray-400 rounded-lg"
            onClick={handleFilter}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>

      <div className="flex flex-wrap">
        {filter.length > 0 ? (
          filter.map((restaurant, index) => (
            <Link
              to={"/restaurants/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))
        ) : (
          <p>No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default Body;
