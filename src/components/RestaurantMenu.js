import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) {
    return <h1>Loading...!</h1>;
  }
  const { name, cuisines, costForTwoMessage, avgRating } =
    resInfo.cards[2].card.card.info;
  const { itemCards } =
    resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;
  console.log(itemCards);
  return (
    <div className="menu-container">
      <div>
        <h1>{name}</h1>
        <h3>{cuisines.join(",")}</h3>

        <h3>{costForTwoMessage}</h3>
        <h3>{avgRating}</h3>
      </div>
      <div>
        <h1>Recomended</h1>
        <ul>
          {itemCards.map((items) => (
            <li key={items.card.info.id}>
              {items.card.info.name} -{" "}
              {items.card.info.price || items.card.info.defaultPrice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
