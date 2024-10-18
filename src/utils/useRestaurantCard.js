import { useEffect, useState } from "react";
import { RESCARD_API } from "./constants";

const useRestaurantCard = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);

  useEffect(() => {
    fetchCardData();
  }, []);
  const fetchCardData = async () => {
    const data = await fetch(RESCARD_API);
    const json = await data.json();
    const restaurant =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setListOfRestaurant(restaurant);
  };
  return listOfRestaurant;
};

export default useRestaurantCard;
