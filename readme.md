# Web Server

This project sets up a basic web server in Node.js with an API endpoint that responds with a personalized greeting, including the visitor's IP address, location, and current temperature.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [OpenWeatherMap API Key](https://openweathermap.org/)

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/7maylord/webserver.git
    cd webserver

    ```

2.  Install dependencies:

    ```bash
    npm install

    ```

3.  Create a .env file in the root directory and add your configuration variables:

    ````plaintext
    PORT=3005

        API_KEY=YOUR_OPENWEATHERMAP_API_KEY

        #Replace YOUR_OPENWEATHERMAP_API_KEY with your own API keys.
        ```

    Sign up at [OpenWeatherMap](https://openweathermap.org), Go to your API keys and generate a new key.

    ````

4.  For Local testing: uncomment this code on line 24 to line 26 in index.js

```javascript
//  if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
//     clientIp = '102.89.22.160'; // Example IP address, can be replaced with any public IP address for testing
// }
```

5. Start the server:

   ```bash
   npm start
   ```

6. Access the Server

- Open your web browser and navigate to http://localhost:3005 to view the HTML page.
- Use Postman or your browser to make a GET request to the API endpoint:

```http
http://localhost:3005/api/hello?visitor_name=YourName
```

## Deployment

You can deploy this Node.js web server to any free hosting platform such as Heroku, Vercel, or Render. Follow the platform-specific instructions to deploy your Node.js application.

## Dependencies

Before running this application, ensure you have the following installed:

- express: Fast, unopinionated, minimalist web framework for Node.js.
- axios: used to make HTTP requests to external APIs.
- Dotenv: Used for loading environment variables from a .env file.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

This README file provides an overview of the application, installation instructions, usage guidelines, and other relevant information necessary for users and developers.
