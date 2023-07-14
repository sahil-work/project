import express from "express";

import { TeamsBot } from "./bot/teamsBot";
import { adapter } from "./internal/initialize";
import { mongoConnection } from "./database/mongoConnection";

import NotificationRoutes from "./routes/notification";
import OauthRoutes from "./routes/oauth";

const bot = new TeamsBot();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Used for sending notifications to users
app.use("/api/notification", NotificationRoutes);
// Used	for oauth
app.use("/api/oauth", OauthRoutes);

// Listen for incoming requests from teams.
app.post("/api/messages", async (req, res) => {
	await adapter.process(req, res, async (context) => {
		await bot.run(context);
	});
});

// this is to handle the extra request made after oauth
app.get("/favicon.ico", async (req, res) => res.status(204));

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const startServer = (app) => {
	const port = process.env.port || process.env.PORT || 3978;
	app.listen(port, () => {
		console.log(`\nApp Started, Listening on port ${port}`);
	});
};

const main = async () => {
	try {
		await mongoConnection();
		startServer(app);
	} catch (error) {
		console.error(error);
	}
};

main()