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
if (process.env.NODE_ENV === "prod") {
	const limiter = require("./config/rateLimiter.config");
	app.use("/", limiter);
} else {
	app.get("/", (req, res) => {
		res.json({ message: "Template WebApp" });
	});
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
