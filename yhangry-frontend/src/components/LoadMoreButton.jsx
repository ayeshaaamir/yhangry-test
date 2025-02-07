import { useDispatch, useSelector } from "react-redux";
import { fetchSetMenus } from "../redux/setMenusSlice";

const LoadMoreButton = () => {
  const dispatch = useDispatch();
  const { page, guests, selectedCuisine, totalItems, menus } = useSelector(
    (state) => state.setMenus
  );

  const handleLoadMore = () => {
    dispatch(
      fetchSetMenus({ cuisineSlug: selectedCuisine, page: page + 1, guests })
    );
  };

  if (menus.length >= totalItems) return null;

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={handleLoadMore}
        className="bg-black text-white px-4 py-2 cursor-pointer rounded-full hover:bg-opacity-90 transition-colors"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
