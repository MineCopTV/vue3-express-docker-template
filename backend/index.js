const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// ROUTER
app.get("/", (req, res) => {
	res.json({ message: "Template WebApp" });
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(__dirname + "./public"));
	app.get("*", (req, res) => res.sendFile(__dirname + "./public/index.html"));

	const limiter = require("./config/rateLimiter.config");
	app.use("/api", limiter);
}

// MIDDLEWARE
app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({
		error: {
			message: err.message || "Internal Server Error",
		},
	});
});

const PORT = process.env.NODE_PORT || 3000;
app.listen(PORT, () => {
	const logger = require("./logger");
	logger.info(`Template WebApp listening on http://localhost:${PORT}/`);
});
