import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetMenus, resetMenus } from "../redux/setMenusSlice";
import CuisineFilter from "../components/CuisineFilter";
import MenuCard from "../components/MenuCard";
import GuestInput from "../components/GuestInput";
import LoadMoreButton from "../components/LoadMoreButton";

const SetMenusPage = () => {
  const dispatch = useDispatch();
  const { menus, loading, guests, selectedCuisine } = useSelector(
    (state) => state.setMenus
  );

  useEffect(() => {
    dispatch(fetchSetMenus({ cuisineSlug: selectedCuisine, page: 1, guests }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetMenus());
    dispatch(fetchSetMenus({ cuisineSlug: selectedCuisine, page: 1, guests }));
  }, [dispatch, guests, selectedCuisine]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Set Menus</h1>
      <GuestInput />
      <CuisineFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {menus.map((menu) => (
          <MenuCard key={menu?.name} menu={menu} />
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      <LoadMoreButton />
    </div>
  );
};

export default SetMenusPage;
