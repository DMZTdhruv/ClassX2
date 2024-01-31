// index.js
import app from "./app.js";

// Start the server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
