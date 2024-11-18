// From the below line, we are able to export the Express module from node_modules.Because of this, we can perform requests from the server.
const express = require("express");
const userName = "Saiteja";
const passWord = "Saiteja@10";
const PORT = 3000;

// Calling the Express function for performing requests (GET, PUT, POST, DELETE)
const app = express();

//This middleware parses JSON data in requests (e.g., POST or PUT) and makes it accessible via req.body in route handlers.
app.use(express.json());

// We use GET request for retrieving the data from the server.
app.get("/user", (req, res) => {
  // req.query is used to get the details from the URL, e.g:-http://localhost:3000/?name=saiteja
  const result = req.query;

  // Check if query parameters are provided
  if (Object.keys(result).length > 0) {
    res.status(200).send("Received the data from query parameters");
  } else {
    res.status(404).send("No query parameters received");
  }
});

// We use POST request for sending the data to the server.
app.post("/user", (req, res) => {
  // req.body is used to get the details from the body.GET requests do not have access to the body by default.

  const { username, password } = req.body;

  if (username === userName || password === passWord)
    res.status(200).send("User deatils are correct");
  else res.status(404).send("Bad Reuest!");
});

// We use PATCH request for Sends data to the server to create a resource.
app.patch(`/:${userName}`, (req, res) => {
  res.status(200).send("In the patch");
});

// We use PUT request for Sends data to the server to create a resource.
app.put(`/:${userName}`, (req, res) => {
  res.status(200).send("In the put");
});

//We use DELETE request for Deleting a resource from the server.
app.delete(`/${userName}`, (req, res) => {
  res.status(200).send("In the Delete function");
});

//We use HEAD request for Retrieves headers for a resource (no body content).
app.head("/users", (req, res) => {
  //With the below we can get the headers from the server
  const resultkeys = Object.keys(req.headers);

  //With the below line we can extract the headvalue based on the header
  const resultvalues = req.get("Authorization");

  if (resultkeys) res.status(200).send("OK");
  else res.status(404).send("BAD REUQEST");
});

app.options("/user", (req, res) => {
  // Set the 'Allow' header to specify the allowed methods for the resource
  res.set("Allow", "GET, POST, PUT, DELETE, PATCH, HEAD");

  // Correctly send the status and body
  res.status(200).send("All methods are Allowed for /user");
});

// The server runs and listens for requests on the port mentioned below.
app.listen(PORT, () => console.log("Connected to port: 3000 successfully"));
