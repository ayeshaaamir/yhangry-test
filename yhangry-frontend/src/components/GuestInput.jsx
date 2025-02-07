import { useDispatch, useSelector } from "react-redux";
import { setGuests, resetMenus, fetchSetMenus } from "../redux/setMenusSlice";
import { Minus, Plus } from "lucide-react";

const GuestInput = () => {
  const dispatch = useDispatch();
  const { guests, selectedCuisine } = useSelector((state) => state.setMenus);

  const updateGuests = (newGuests) => {
    if (newGuests < 1) return;
    dispatch(setGuests(newGuests));
    dispatch(resetMenus());
    dispatch(fetchSetMenus({ cuisineSlug: selectedCuisine, page: 1, guests: newGuests }));
  };

  const handleChange = (e) => {
    const newGuests = Number(e.target.value);
    updateGuests(newGuests);
  };

  const incrementGuests = () => updateGuests(guests + 1);
  const decrementGuests = () => updateGuests(guests - 1);

  return (
    <div className="flex items-center gap-3">
      <label className="text-lg font-medium">Guests</label>
      <div className="flex items-center border border-gray-400 rounded-full bg-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
        <button
          onClick={decrementGuests}
          className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
          disabled={guests === 1}
        >
          <Minus size={18} className={guests === 1 ? "opacity-50" : ""} />
        </button>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={handleChange}
          className="w-12 text-center border-none bg-transparent focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={incrementGuests}
          className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default GuestInput;