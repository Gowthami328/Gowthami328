import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { restaurant } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restaurant.info;

  return (
    <div className="res-card m-4 p-4 w-[250px] bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="res-info">
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4 className="cuisines">{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
