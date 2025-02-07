import { useDispatch, useSelector } from "react-redux";
import {
  resetMenus,
  fetchSetMenus,
  setSelectedCuisine,
} from "../redux/setMenusSlice";

const CuisineFilter = () => {
  const dispatch = useDispatch();
  const { cuisines, selectedCuisine } = useSelector((state) => state.setMenus);
  const totalCount = cuisines.reduce((acc, cuisine) => acc + cuisine.count, 0);
  const filters = [
    { name: "All", count: totalCount, slug: null },
    ...cuisines.map((c) => ({ ...c, slug: c.name })),
  ];

  const handleFilterClick = (cuisineSlug) => {
    dispatch(setSelectedCuisine(cuisineSlug));
    dispatch(resetMenus());
    dispatch(fetchSetMenus({ cuisineSlug, page: 1 }));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {filters.map((cuisine) => (
        <button
          key={cuisine.name}
          className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 border border-black ${
            selectedCuisine === cuisine.slug
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleFilterClick(cuisine.slug)}
        >
          {cuisine.name} ({cuisine.count})
        </button>
      ))}
    </div>
  );
};

export default CuisineFilter;
