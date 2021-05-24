import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const { RESTREVIEWS_DB_URI, RESTREVIEWS_ND, PORT } = process.env;
const port = PORT || 3013;

MongoClient.connect(RESTREVIEWS_DB_URI, {
	poolSize: 120,
	wtimeout: 2500,
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await RestaurantsDAO.injectDB(client);
		await ReviewsDAO.injectDB(client)
		app.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	});
