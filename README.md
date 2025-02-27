# Yhangry Full-Stack Application

This project is a full-stack application built with **Node.js, React, MySQL, and Docker**. It allows users to browse and filter set menus, calculate total prices based on the number of guests, and load more results dynamically.

---

## How to Run the Project

### Prerequisites:

- **Docker**: Make sure Docker is installed and running on your machine.
- **MySQL**: The project relies on a MySQL database for storing menus and cuisines.

### Running the Project with Docker:

1. Clone the repository:

   ```bash
   git clone https://github.com/ayeshaaamir/yhangry-test.git
   cd yhangry-test
   ```

2. **MySQL**: Start the MySQL container:

   ```bash
   docker-compose up mysql
   ```

   Wait for MySQL to start up successfully.

3. **Backend**: Start the backend service:

   ```bash
   docker-compose up backend
   ```

   This will run the Node.js backend API.

4. **Frontend**: Start the frontend service:

   ```bash
   docker-compose up frontend
   ```

   The frontend will be available on your browser.

5. **Frontend Test Cases in RTL(Jest)**:
   ```bash
   npm test
   ```

---

## Features

### Database Schema

- Analyzed the API response and created a **MySQL database schema** to store set menus and cuisines.

#### Tables:

- **`set_menus`**: Stores details of each set menu (e.g., `id`, `name`, `description`, `price_per_person`, `min_spend`, `status`, `number_of_orders`, etc.).
- **`cuisines`**: Stores cuisine details (e.g., `id`, `name`).
- **`menu_cuisines`**: A many-to-many relationship table linking `set_menus` and `cuisines`.

### Data Harvesting:

- Created a command to **fetch data from the API** ([Yhangry API](https://staging.yhangry.com/booking/test/set-menus)) and store it in the MySQL database.
- Implemented **pagination** to handle large datasets.

---

## Backend

### API Endpoints:

- **`GET /api/set-menus`**
  - Accepts query parameters: `cuisineSlug`, `page`, and `limit`.
  - Filters set menus by `cuisineSlug`.
  - Sorts set menus by `number_of_orders` (popularity).
  - Returns **paginated results** and available cuisine filters with counts and total orders.

---

## Frontend

### Set Menus Page:

- Displays a **list of set menus** with filters and pagination.
- Allows users to input the **number of guests** and calculates the **total price** (`price_per_person * guests`), ensuring it’s never less than the `min_spend`.
- Filters **set menus by cuisine**.
- Lists all **available cuisines** with the number of live set menus for each cuisine.
- Includes a **"Load More" button** to fetch additional results dynamically.

#### Components:

- **`CuisineFilter`**: Allows users to filter set menus by cuisine.
- **`GuestInput`**: Allows users to input the number of guests.
- **`MenuCard`**: Displays individual set menus with details and calculated total price.
- **`LoadMoreButton`**: Loads more set menus when clicked.

---

## How to Improve the Application

### Security

- **Input Validation**: Validate all user inputs (e.g., `guests`, `cuisineSlug`) to prevent SQL injection and other attacks.
- **Authentication**: Implement **JWT-based authentication** for protected routes.
- **Environment Variables**: Store sensitive information (e.g., database credentials) in `.env` files and **never commit them to version control**.

### Latency

- **Caching**: Use **Redis** to cache frequently accessed data (e.g., cuisine filters, popular menus).
- **Compression**: Enable **gzip compression** for API responses to reduce payload size.
- **CDN**: Use a **CDN** to serve static assets (e.g., images) for faster loading times.

### Database Optimization

- **Indexes**: Add indexes to frequently queried columns (e.g., `status`, `number_of_orders`).
- **Query Optimization**: Optimize SQL queries to **reduce execution time** (e.g., avoid `SELECT *`).
- **Connection Pooling**: Use **connection pooling** to manage database connections efficiently.

---

## Deployment

### Backend

- **Dockerize**: I have already dockerized the app.
- **Cloud Hosting**: Deploy the backend on platforms like **AWS**, **Heroku**, or **Vercel**.
