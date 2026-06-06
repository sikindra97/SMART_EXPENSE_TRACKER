require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const ocrRoutes = require("./routes/ocrRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chartRoutes = require("./routes/chartRoutes"); // NEW

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/expenses",
  expenseRoutes
);

app.use(
  "/api/ocr",
  ocrRoutes
);

app.use(
  "/api/voice",
  voiceRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

// NEW CHART ROUTE
app.use(
  "/api/chart",
  chartRoutes
);

// Health Check Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Server Error",
    });
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});