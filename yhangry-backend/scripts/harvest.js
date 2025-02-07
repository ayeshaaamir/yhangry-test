const axios = require("axios");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function insertData(data) {
  const query = `
    INSERT INTO set_menus (id, name, description, price_per_person, min_spend, is_vegan, is_vegetarian, status, number_of_orders, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  data.forEach((menu) => {
    const createdAt = new Date(menu.created_at).toISOString().slice(0, 19).replace('T', ' ');
    connection.query(
      query,
      [
        menu.id,
        menu.name,
        menu.description,
        menu.price_per_person,
        menu.min_spend,
        menu.is_vegan,
        menu.is_vegetarian,
        menu.status,
        menu.number_of_orders,
        createdAt,
      ],
      (error, results) => {
        if (error) {
          console.error("Error inserting data:", error);
        } else {
          console.log(`Inserted menu with ID: ${menu.id}`);
        }
      }
    );
  });
}

async function harvestData() {
  let url = "https://staging.yhangry.com/booking/test/set-menus";
  while (url) {
    const data = await fetchData(url);
    if (data && data.data) {
      insertData(data.data);
      url = data.links.next;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  connection.end();
}

harvestData();
