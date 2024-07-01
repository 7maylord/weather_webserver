const express = require("express");
const path = require("path");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Your OpenWeatherMap API key
const key = process.env.API_KEY;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/hello", async (req, res) => {
  let visitorName = req.query.visitor_name || "Guest";
  let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // For local testing, override the IP address with a known public IP address, handle this case for both the IPv4 and IPv6 loopback addresses
  //  if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
  //     clientIp = '102.89.22.160'; // Example IP address, can be replaced with any public IP address for testing
  // }

  try {
    // Fetch geo-location information based on the client's IP address
    const geoResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const geoData = geoResponse.data;

    if (!geoData || geoData.status !== "success") {
      throw new Error("Failed to fetch geo-location data");
    }

    const { city } = geoData;

    // Fetch weather information for the obtained city

    const weatherResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    const weatherData = weatherResponse.data;

    if (!weatherData || !weatherData.main) {
      throw new Error("Failed to fetch weather data");
    }

    const temperature = weatherData.main.temp;

    // Respond with the required information
    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`,
    });
  } catch (error) {
    // Handle errors, such as failed requests to external APIs
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
