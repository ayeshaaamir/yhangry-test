const axios = require("axios");

const getSetMenus = async (cuisineSlug, page = 1, limit = 10) => {
  const url = `https://staging.yhangry.com/booking/test/set-menus`;
  const response = await axios.get(url);
  let data = response.data.data;

  if (cuisineSlug) {
    data = data.filter((menu) =>
      menu.cuisines.some(
        (cuisine) => cuisine.name.toLowerCase() === cuisineSlug.toLowerCase()
      )
    );
  }

  // filtering by live status
  data = data.filter((menu) => menu.status === 1 && menu.available === true);

  // sorting by popularity (number_of_orders in descending order)
  data.sort((a, b) => b.number_of_orders - a.number_of_orders);

  // pagination
  const startIndex = (page - 1) * limit;
  const paginatedData = data.slice(startIndex, startIndex + limit);

  // build cuisine list with counts & total orders
  const cuisineStats = {};
  data.forEach((menu) => {
    menu.cuisines.forEach((cuisine) => {
      if (!cuisineStats[cuisine.name]) {
        cuisineStats[cuisine.name] = { count: 0, totalOrders: 0 };
      }
      cuisineStats[cuisine.name].count += 1;
      cuisineStats[cuisine.name].totalOrders += menu.number_of_orders;
    });
  });

  // converting cuisine stats obj into sorted array
  const sortedCuisines = Object.keys(cuisineStats)
    .map((name) => ({
      name,
      count: cuisineStats[name].count,
      totalOrders: cuisineStats[name].totalOrders,
    }))
    .sort((a, b) => b.totalOrders - a.totalOrders);

  // returning final response with pagination details
  return {
    data: paginatedData,
    cuisines: sortedCuisines,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(data.length / limit),
      totalItems: data.length,
    },
  };
};

module.exports = {
  getSetMenus,
};
