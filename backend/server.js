import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Console, error } from "console";
import connect from "./database/conn.js";
import appRoutes from "./router/route.js";
import productRoutes from "./router/routeProduct.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

//http get request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

//api routers
app.use("/api", appRoutes);
app.use("/api/products", productRoutes);

//start server only when valid connection
async function startServer() {
  try {
    await connect(); // Connect to the database
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}
startServer();
