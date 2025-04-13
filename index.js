import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

import dbConnection from "./config/dbConnection.js";
import noteRouter from "./routes/note.js";
import userRouter from "./routes/user.js";

app.use(cors({
	origin: process.env.CLIENT_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/", noteRouter);
app.use("/", userRouter);


app.get("/", (req, res) => {
	res.send("Server is working");
});



dbConnection();

app.listen(process.env.PORT, () => {
	console.log("Server is running on ", process.env.PORT)
})