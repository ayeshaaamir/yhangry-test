import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const MenuCard = ({ menu }) => {
  const { guests } = useSelector((state) => state.setMenus);
  const totalPrice = Math.max(menu.price_per_person * guests, menu.min_spend);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src={menu.image}
        alt={menu.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="bg-gray-800 text-white px-3 py-1 rounded-lg inline-block ml-[-2px]">
          {menu.cuisines.map((cuisine) => cuisine.name).join(", ")}
        </div>
        <h3 className="text-xl font-semibold mb-2">{menu.name}</h3>
        <p className="text-gray-500">{menu.description}</p>
        <p className="mt-2 text-lg font-bold">£{totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cuisines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    price_per_person: PropTypes.number.isRequired,
    min_spend: PropTypes.number.isRequired,
  }).isRequired,
};

export default MenuCard;