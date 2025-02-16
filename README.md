**Pokémon Backend API**
**Overview**

This backend project provides a RESTful API for managing Pokémon data, including fetching all Pokémon, retrieving favorite Pokémon, and adding/removing favorites. The project is built using Node.js, Express, and MongoDB.

**Features**

Fetch all Pokémon from an external API

Retrieve the list of favorite Pokémon stored in the database

Fetch detailed information about a single Pokémon, including its evolutions

Add a Pokémon to favorites

Remove a Pokémon from favorites

**Technologies Used**
Node.js – Backend runtime

Express.js – Web framework for handling routes and API requests

MongoDB & Mongoose – Database for storing favorite Pokémon

dotenv – For environment variable management

CORS – Middleware for cross-origin resource sharing

**Running the Backend Locally**

Make sure you have the following installed:

Node.js (v16+ recommended)

MongoDB (Running locally or using a cloud-based solution like MongoDB Atlas)

Setup Instructions

Clone the Repository

git clone https://github.com/TomHarel9/myPokemons_BE.git

Install Dependencies

npm install

Set Up Environment Variables
Create a .env file in the root of the project and add the following:

PORT=3001
MONGODB_CONNECTION_STRING={{ Sent separately }}

Start the Server

npm start

The backend should now be running on http://localhost:3001/
