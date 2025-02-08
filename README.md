# Street Style Store API

This project is a RESTful API developed using **Node.js** and **Express** with PostgreSQL for database operations. It includes CRUD operations, asynchronous file handling, rate-limiting middleware, and optional JWT-based authentication.

## Features

- **CRUD Operations:** Manage items in the PostgreSQL database.
- **Asynchronous File Handling:** Store and retrieve metadata using file operations.
- **Rate Limiting:** Limit API usage to 100 requests per 15 minutes.
- **JWT Authentication (Optional):** Secure API endpoints with token-based authentication.
- **Error Handling:** Robust error handling for database, rate-limiting, and input validation.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Naveenchowdarytalluri/Street-Style-Store.git

## Step 2: Install Dependencies

1. Ensure that **Node.js** is installed on your system.  
   - [Download Node.js](https://nodejs.org/) if not already installed.  
   - Verify installation by running:  
     ```bash
     node -v
     npm -v
     ```

2. Install the required packages by running the following command in the terminal:  
   ```bash
   npm install
## Step 3: Set Up PostgreSQL Database

1. **Create a PostgreSQL database:**  
   - You can use free cloud-based PostgreSQL services like [ElephantSQL](https://www.elephantsql.com/) or [Neon](https://neon.tech/).  
   - Alternatively, install PostgreSQL locally and create a database using:  
     ```sql
     CREATE DATABASE street_style_store;
     ```

2. **Configure the Database:**  
   - Create a table for storing item data using the following SQL command:
     ```sql
     CREATE TABLE items (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

3. **Database Connection Setup:**  
   - In the `database.js` file, configure the connection string for PostgreSQL:
     ```javascript
     const { Pool } = require("pg");
     const dotenv = require("dotenv");
     dotenv.config();

     const pool = new Pool({
       connectionString: process.env.DATABASE_URL,
     });

     module.exports = pool;
     ```

4. **Set Environment Variables:**  
   - Create a `.env` file in the root of your project and add the following line:
     ```env
     DATABASE_URL=your_postgresql_connection_string
     ```
     Replace `your_postgresql_connection_string` with the actual URL from ElephantSQL or Neon.

5. **Verify Database Connection:**  
   Run the following command to test the connection:
   ```bash
   node database.js
## Step 4: Implement CRUD Operations

1. **Create CRUD API Routes:**  
   Open `app.js` and define the following routes for your RESTful API:

   - **POST /api/items:** Create a new item  
   ```javascript
   app.post("/api/items", async (req, res) => {
     try {
       const { name, description } = req.body;
       const newItem = await pool.query(
         "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
         [name, description]
       );
       res.json(newItem.rows[0]);
     } catch (err) {
       res.status(500).send("Server error");
     }
   });
### Step 5: Test API Routes

#### **GET /api/items: Retrieve all items**
```javascript
app.get("/api/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM items");
    res.json(allItems.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

### **Step 5: Implement Asynchronous File Handling**

#### **Overview:**  
This step involves using asynchronous file operations to store metadata related to each item, such as timestamps of when new items are created.

#### **Implementation Details:**  
- Use the `fs.promises` module to handle file operations in a non-blocking way.
- Store logs in a `logs.json` file, appending metadata for each POST request.

#### **Sample Code:**  
```javascript
const fs = require("fs").promises;

app.post("/api/items", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = await pool.query(
      "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );

    // Log metadata to file asynchronously
    const logData = {
      id: newItem.rows[0].id,
      name: newItem.rows[0].name,
      created_at: new Date().toISOString(),
    };

    // Append log to logs.json file
    const currentLogs = await fs
      .readFile("logs.json", "utf8")
      .then((data) => JSON.parse(data))
      .catch(() => []);
      
    currentLogs.push(logData);
    await fs.writeFile("logs.json", JSON.stringify(currentLogs, null, 2));

    res.status(201).json(newItem.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});


### **Project Structure**


### **Folder and File Descriptions**
- **node_modules/**: Contains all npm-installed packages.  
- **logs.json**: Stores metadata logs for each POST request.  
- **database.js**: Handles PostgreSQL database connections.  
- **db.sql**: SQL script to create the required database table.  
- **server.js**: Entry point for starting the Express server.  
- **middleware/rateLimiter.js**: Middleware for API rate limiting.  
- **routes/itemsRoutes.js**: Defines API endpoints for CRUD operations.  
