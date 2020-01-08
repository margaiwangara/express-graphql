const express = require("express");

// Express Init
const app = express();

// Middleware, BodyParser
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
